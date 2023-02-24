const express = require('express');
const app = express();
const cors = require('cors')
app.use(cors());
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);
let currentQuestionTimeoutIDs = []

let data = [
    {"name":"Ersin Destanoğlu", "age":22, "pos":"Kaleci", "num":1, "nationality": "Türk", "team":"Beşiktaş JK"},
    /*{"name":"Mert Günok", "age":33, "pos":"Kaleci", "num":34, "nationality": "Türk", "team":"Beşiktaş JK"},
    {"name":"Emre Bilgin", "age":18, "pos":"Kaleci", "num":99, "nationality": "Türk", "team":"Beşiktaş JK"},
    {"name":"Mert Günok", "age":33, "pos":"Kaleci", "num":34, "nationality": "Türk", "team":"Beşiktaş JK"},
    {"name":"Utku Yuvakuran", "age":25, "pos":"Kaleci", "num":97, "nationality": "Türk", "team":"Beşiktaş JK"},
    {"name":"Romain Saïss", "age":32, "pos":"Defans", "num":26, "nationality": "Fas", "team":"Beşiktaş JK"},
    {"name":"Tayyip Sanuc", "age":23, "pos":"Defans", "num":3, "nationality": "Türk", "team":"Beşiktaş JK"},
    {"name":"Necip Uysal", "age":32, "pos":"Defans", "num":20, "nationality": "Türk", "team":"Beşiktaş JK"},
    {"name":"Welinton", "age":33, "pos":"Defans", "num":23, "nationality": "Brezilya", "team":"Beşiktaş JK"},
    {"name":"Arthur Masuaku", "age":29, "pos":"Defans", "num":25, "nationality": "Kongo DC", "team":"Beşiktaş JK"},
    {"name":"Umut Meras", "age":27, "pos":"Defans", "num":77, "nationality": "Türk", "team":"Beşiktaş JK"},
    {"name":"Valentin Rosier", "age":26, "pos":"Defans", "num":2, "nationality": "Fransa", "team":"Beşiktaş JK"},
    {"name":"Onur Bulut", "age":28, "pos":"Defans", "num":4, "nationality": "Türk", "team":"Beşiktaş JK"},
    {"name":"Tayfur Bingöl", "age":30, "pos":"Defans", "num":88, "nationality": "Türk", "team":"Beşiktaş JK"},
    {"name":"Amir Hadziahmetovic", "age":25, "pos":"Ortasaha", "num":19, "nationality": "Bosna-Hersek", "team":"Beşiktaş JK"},
    {"name":"Berkay Vardar", "age":20, "pos":"Ortasaha", "num":22, "nationality": "Türk", "team":"Beşiktaş JK"},
    {"name":"Atiba Hutchinson", "age":40, "pos":"Ortasaha", "num":13, "nationality": "Kanada", "team":"Beşiktaş JK"},
    {"name":"Gedson Fernandes", "age":24, "pos":"Ortasaha", "num":83, "nationality": "Portekiz", "team":"Beşiktaş JK"},
    {"name":"Salih Ucan", "age":29, "pos":"Ortasaha", "num":8, "nationality": "Türk", "team":"Beşiktaş JK"},
    {"name":"Kerem Atakan Kesgin", "age":22, "pos":"Ortasaha", "num":17, "nationality": "Türk", "team":"Beşiktaş JK"},
    {"name":"Dele Alli", "age":26, "pos":"Ortasaha", "num":11, "nationality": "İngiliz", "team":"Beşiktaş JK"},
    {"name":"Alexandru Maxim", "age":32, "pos":"Ortasaha", "num":-1, "nationality": "Romanya", "team":"Beşiktaş JK"},
    {"name":"Nathan Redmond", "age":28, "pos":"Ortasaha", "num":15, "nationality": "İngiliz", "team":"Beşiktaş JK"},
    {"name":"Georges-Kevin N'Koudou", "age":28, "pos":"Ortasaha", "num":7, "nationality": "Fransa", "team":"Beşiktaş JK"},
    {"name":"Rachid Ghezzal", "age":30, "pos":"Ortasaha", "num":18, "nationality": "Cezayir", "team":"Beşiktaş JK"},
    {"name":"Jackson Muleka", "age":23, "pos":"Ortasaha", "num":40, "nationality": "Kongo DC", "team":"Beşiktaş JK"},
    {"name":"Vincent Aboubakar", "age":31, "pos":"Forvet", "num":10, "nationality": "Kamerun", "team":"Beşiktaş JK"},
    {"name":"Cenk Tosun", "age":31, "pos":"Forvet", "num":9, "nationality": "Türk", "team":"Beşiktaş JK"},*/

]

let playerList = []
let scores = {}
let currentQuestion
let isQuestionGuessed = false;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/game', (req, res) => {
    res.sendFile(__dirname + '/game.html');
});

app.get("/players", (req, res) => {
    let playerUsernames = playerList.map(value => {
            return {"username": value["username"], "role": value["role"]}
        }
    )
    console.log(playerUsernames)
    res.json(playerUsernames)
})

app.get("/scores", (req, res) => {
    res.json(scores)
})


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on("PLAYER_JOIN_REQUEST_RECEIVED", function (username) {
        let role = "host"
        if (playerList.length !== 0)
            role = "player"
        else {
            io.emit("GAME_CREATED", username)
        }
        playerList.push({"socket": socket, "username": username, "role": role})
        scores[username] = 0
        io.emit("PLAYER_JOINED", {"username": username, "role": role})
    })

    socket.on("START_GAME_REQUEST_RECEIVED", async function () {
        io.emit("GAME_STARTED")
        startGameLoop(function (answer) {
            io.emit("QUESTION_COULD_NOT_GUESSED", answer)
        })
    })

    socket.on("GUESS_RECEIVED", function (data) {
        console.log("GUESS_RECEIVED arrived with data: ", JSON.stringify(data))
        let guessByUser = data["username"]
        let guess = data["guess"]
        if (normalizeAnswer(currentQuestion["name"]).includes(normalizeGuess(guess))){
            if (scores.hasOwnProperty(guessByUser)){
                console.log(`player ${guessByUser} found on scores object. Current score: ${scores[guessByUser]}`)
                scores[guessByUser]++;
            } else {
                console.log("player is not found on scores object. assigning the user...")
                scores[guessByUser] = 1
            }
            isQuestionGuessed = true;
            io.emit("SCOREBOARD_UPDATED", scores)
            io.emit("QUESTION_GUESSED", {"guessedBy": guessByUser})
            for (let timeout of currentQuestionTimeoutIDs){
                clearTimeout(timeout)
            }
            currentQuestionTimeoutIDs = []
            setTimeout(function () {
                startGameLoop(function (answer) {
                    io.emit("QUESTION_COULD_NOT_GUESSED", answer)
                })
            }, 5000)
        }else{
            io.emit("WRONG_GUESS_RECEIVED", guessByUser)
            console.log("wrong answer")
        }
    })
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});

function normalizeAnswer(answer){
    return normalizeGuess(answer).split(" ")
}

function normalizeGuess(guess) {
    guess = guess.toLowerCase()
    guess = guess.replace("ç", "c")
    guess = guess.replace("ı", "i")
    guess = guess.replace("ö", "o")
    guess = guess.replace("ş", "s")
    guess = guess.replace("ü", "u")
    return guess
}

function getRandomQuestion(){
    let randomIdx = Math.floor(Math.random() * data.length);
    return data[randomIdx]
}

function countDownFrom(from, callingFunction, onComplete){
    let countdownFrom = from;
    let countdownID = setInterval(function () {
        callingFunction(countdownFrom)
        if (countdownFrom === 0){
            clearInterval(countdownID)
            onComplete()
        }
        countdownFrom--;
    }, 1000)
}

function startGameLoop(onTimeout){
    countDownFrom(10, function(countdown){
        io.emit("GAME_WILL_START_IN", countdown)
    }, function () {
        isQuestionGuessed = false;
        currentQuestion = getRandomQuestion()
        io.emit("FIRST_HINT_RECEIVED", {attribute:"Uyruk", value: currentQuestion["nationality"]})
        let firstHintID = setTimeout(function () {
            io.emit("SECOND_HINT_RECEIVED", {attribute:"Pozisyon", value: currentQuestion["pos"]})
            let secondHintID = setTimeout(function () {
                io.emit("THIRD_HINT_RECEIVED", {attribute:"Takım", value: currentQuestion["team"]})
                let thirdHintID = setTimeout(function () {
                    io.emit("FOURTH_HINT_RECEIVED", {attribute:"Yaş", value: currentQuestion["age"]})
                    let fourthHintID = setTimeout(function () {
                        io.emit("FIFTH_HINT_RECEIVED", {attribute:"Numara", value: currentQuestion["num"]})
                        let fifthHintID = setTimeout(function () {
                            onTimeout(currentQuestion["name"])
                            currentQuestionTimeoutIDs = []
                            startGameLoop(function (answer) {
                                io.emit("QUESTION_COULD_NOT_GUESSED", answer)
                            })
                        }, 10000)
                        currentQuestionTimeoutIDs.push(fifthHintID)
                    }, 10000);
                    currentQuestionTimeoutIDs.push(fourthHintID)
                }, 10000);
                currentQuestionTimeoutIDs.push(thirdHintID)
            }, 10000);
            currentQuestionTimeoutIDs.push(secondHintID)
        }, 10000);
        currentQuestionTimeoutIDs.push(firstHintID)
    })
}