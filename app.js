const express = require('express');
const app = express();
const cors = require('cors')
app.use(express.static('public'));
app.use(cors());
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);
let currentQuestionTimeoutIDs = []

let data = require('./player-data.json');

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

app.get('/api/game/active', (req, res) => {
    if(currentQuestion != null || currentQuestion !== undefined){
        res.json({"is_game_active":true})
    } else {
        res.send({"is_game_active":false})
    }
});

app.delete('/game', (req, res) => {
    resetGame()
    res.sendStatus(204)
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
    console.log("get scores called. Current table is: ", scores)
    res.json(scores)
})


io.on('connection', (socket) => {
    console.log(`a user connected. socket_id: ${socket.id}`);
    socket.on('disconnect', () => {
        console.log(`user disconnected. socket_id: ${socket.id}`);
    });

    socket.on("PLAYER_JOIN_REQUEST_RECEIVED", function (username) {
        let role = "host"
        if (playerList.length !== 0)
            role = "player"
        else {
            io.emit("GAME_CREATED", username)
        }
        playerList.push({"socket_id":socket.id, "socket": socket, "username": username, "role": role})
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
        if (normalizeAnswer(currentQuestion["name"]).includes(normalizeGuess(guess))) {
            if (scores.hasOwnProperty(guessByUser)) {
                console.log(`player ${guessByUser} found on scores object. Current score: ${scores[guessByUser]}`)
                scores[guessByUser]++;
            } else {
                console.log("player is not found on scores object. assigning the user...")
                scores[guessByUser] = 1
            }
            isQuestionGuessed = true;
            io.emit("SCOREBOARD_UPDATED", scores)
            io.emit("QUESTION_GUESSED", {
                "guessedBy": guessByUser,
                "name": currentQuestion["name"],
                "picture_path": currentQuestion["picture_path"]
            })
            clearTimeouts()
            setTimeout(function () {
                startGameLoop(function (answer, picturePath) {
                    io.emit("QUESTION_COULD_NOT_GUESSED", {"name": answer, "picture_path": picturePath})
                })
            }, 5000)
        } else {
            io.emit("WRONG_GUESS_RECEIVED", guessByUser)
            console.log("wrong answer")
        }
    })
});

const port = parseInt(process.env.PORT) || 8080;

server.listen(port, () => {
    console.log(`listening on *:${port}`);
});

function getPlayerBySocketID(socketID){
    for (let player of playerList){
        if (player["socket_id"] === socketID){
            return player
        }
    }
    return null
}

function resetGame(){
    playerList = []
    scores = {}
    currentQuestion = null
    isQuestionGuessed = false
    clearTimeouts()
}

function clearTimeouts(){
    for (let timeout of currentQuestionTimeoutIDs) {
        clearTimeout(timeout)
    }
    currentQuestionTimeoutIDs = []
}

function normalizeAnswer(answer) {
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

function getRandomQuestion() {
    let randomIdx = Math.floor(Math.random() * data.length);
    return data[randomIdx]
}

function countDownFrom(from, callingFunction, onComplete) {
    let countdownFrom = from;
    let countdownID = setInterval(function () {
        callingFunction(countdownFrom)
        if (countdownFrom === 0) {
            clearInterval(countdownID)
            onComplete()
        }
        countdownFrom--;
    }, 1000)
}

function startGameLoop(onTimeout) {
    countDownFrom(10, function (countdown) {
        io.emit("GAME_WILL_START_IN", countdown)
    }, function () {
        isQuestionGuessed = false;
        currentQuestion = getRandomQuestion()
        io.emit("FIRST_HINT_RECEIVED", {attribute: "nationality", value: currentQuestion["nationality"]})
        let firstHintID = setTimeout(function () {
            io.emit("SECOND_HINT_RECEIVED", {attribute: "position", value: currentQuestion["pos"]})
            let secondHintID = setTimeout(function () {
                io.emit("THIRD_HINT_RECEIVED", {attribute: "team", value: currentQuestion["team"]})
                let thirdHintID = setTimeout(function () {
                    io.emit("FOURTH_HINT_RECEIVED", {attribute: "age", value: currentQuestion["age"]})
                    let fourthHintID = setTimeout(function () {
                        io.emit("FIFTH_HINT_RECEIVED", {attribute: "num", value: currentQuestion["num"]})
                        let fifthHintID = setTimeout(function () {
                            onTimeout(currentQuestion["name"], currentQuestion["picture_path"])
                            currentQuestionTimeoutIDs = []
                            io.emit("QUESTION_COULD_NOT_GUESSED", {"name": currentQuestion["name"], "picture_path": currentQuestion["picture_path"]})
                            setTimeout(function () {
                                startGameLoop(onTimeout)
                            }, 5000)
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
