let socket = io();
let currentUser = localStorage.getItem("username")
console.log(currentUser)

let currentTimeoutIDs= []

window.onload = function (event) {
    console.log("onload called")
    fetch("/scores").then(response => response.json())
        .then((scores) => {
            console.log("Current scores: ", scores)
            updateScoreboard(scores)
        });

    fetch("/api/game/active").then(response => response.json())
        .then((response) => {
            console.log(response)
            if (response["is_game_active"]){
                console.log("game is running")
                let playerHintBox = document.getElementById("player-hints-id")
                if ('content' in document.createElement('template')) {
                    const template = document.querySelector('#t1');
                    const clone = template.content.cloneNode(true);
                    playerHintBox.appendChild(clone)
                } else {
                    alert("Tarayıcı template özelliğini desteklemiyor.")
                    return
                }
            }
        });
}

socket.on("SCOREBOARD_UPDATED", function (scores) {
    updateScoreboard(scores)
})

socket.on("GAME_WILL_START_IN", function (data) {
    let playerHintBox = document.getElementById("player-hints-id")
    playerHintBox.innerHTML = ""
    playerHintBox.style.display = "flex"
    playerHintBox.style.justifyContent = "center"
    playerHintBox.style.alignItems = "center"
    playerHintBox.style.flexDirection = "column"
    let h3 = document.createElement("h3")
    h3.style.textTransform = "uppercase"
    h3.style.textAlign = "center"
    h3.textContent = "OYUN BAŞLIYOR"
    let h1 = document.createElement("h1")
    h1.textContent = data
    h1.style.textAlign = "center"
    h1.style.fontSize = "4.5rem"
    playerHintBox.appendChild(h3)
    playerHintBox.appendChild(h1)
})

socket.on("FIRST_HINT_RECEIVED", function (hint) {
    let playerHintBox = document.getElementById("player-hints-id")
    playerHintBox.style.display = "block"
    playerHintBox.innerHTML = ""
    if ('content' in document.createElement('template')) {
        const template = document.querySelector('#t1');
        const clone = template.content.cloneNode(true);
        playerHintBox.appendChild(clone)
        document.getElementById("answer-image-id").style.padding = "15px"
    } else {
        alert("Tarayıcı template özelliğini desteklemiyor.")
        return
    }
    document.getElementById("player-guess-button").disabled = false;
    addHint(hint)
    countDownFrom(9, function (currentTime) {
        document.getElementById("timer-text-id").innerText = currentTime
    }, function () {

    })
})

socket.on("SECOND_HINT_RECEIVED", function (hint) {
    addHint(hint)
    countDownFrom(9, function (currentTime) {
        document.getElementById("timer-text-id").innerText = currentTime
    }, function () {

    })
})

socket.on("THIRD_HINT_RECEIVED", function (hint) {
    addHint(hint)
    countDownFrom(9, function (currentTime) {
        document.getElementById("timer-text-id").innerText = currentTime
    }, function () {

    })
})

socket.on("FOURTH_HINT_RECEIVED", function (hint) {
    addHint(hint)
    countDownFrom(9, function (currentTime) {
        document.getElementById("timer-text-id").innerText = currentTime
    }, function () {

    })
})

socket.on("FIFTH_HINT_RECEIVED", function (hint) {
    addHint(hint)
    countDownFrom(9, function (currentTime) {
        document.getElementById("timer-text-id").innerText = currentTime
    }, function () {

    })
})

socket.on("QUESTION_GUESSED", function (data) {
    clearTimeouts()
    let playerHintsDiv = document.getElementById("player-hints-id")
    playerHintsDiv.innerHTML = ""
    let outerDiv = document.createElement("div")
    outerDiv.style.display = "flex"
    outerDiv.style.flexDirection = "column"
    outerDiv.style.justifyContent ="center"
    outerDiv.style.alignItems = "center"
    let h2 = document.createElement("h2")
    h2.style.textTransform = "uppercase"
    h2.appendChild(document.createTextNode(`${data["guessedBy"]} doğru tahmin etti!!`))
    let div = document.createElement("div")
    let img = document.createElement("img")
    img.style.display = "block"
    img.style.width = "100px"
    img.style.height = "100px"
    img.style.margin = "0 auto"
    img.src = data["picture_path"]
    let h3 = document.createElement("h3")
    h2.appendChild(document.createTextNode(data["name"]))
    div.appendChild(img)
    div.appendChild(h3)
    outerDiv.appendChild(h2)
    outerDiv.appendChild(div)
    playerHintsDiv.appendChild(outerDiv)
    document.getElementById("player-guess-button").disabled = true;
})

socket.on("WRONG_GUESS_RECEIVED", function (username) {
    console.log("WRONG_GUESS_RECEIVED arrived. ", username)
    if (username === currentUser) {
        let playerHintBox = document.getElementById("player-hints-id")
        playerHintBox.classList.add("shake")
        playerHintBox.classList.add("red-border")
        playerHintBox.addEventListener("animationend", ev => {
            playerHintBox.classList.remove("shake")
            playerHintBox.classList.remove("red-border")
        })
    }
})

socket.on("QUESTION_COULD_NOT_GUESSED", function (data) {
    clearTimeouts()
    document.getElementById("answer-image-id").style.padding = "0"
    document.getElementById("answer-image-id").src = data["picture_path"]
    document.getElementById("player-name-id").innerText = data["name"]
    document.getElementById("player-guess-button").disabled = true;
})

document.getElementById("player-guess-button").addEventListener("click", function () {
    let guess = document.getElementById("user-guess-input").value
    document.getElementById("user-guess-input").value = ""
    socket.emit("GUESS_RECEIVED", {"username": currentUser, "guess": guess})
})

let updateScoreboard = function (scores) {
    let ul = document.getElementById("player-list");
    ul.innerHTML = "";
    let sortedScores = sortObject(scores)
    for (const [key, value] of Object.entries(sortedScores)) {
        console.log("Current key: ", key)
        let li = document.createElement("li");
        li.classList.add("scoreboard-li")
        let div = document.createElement("div")
        let h4 = document.createElement("h4")
        h4.classList.add("player-username-header")
        let h5 = document.createElement("h5")
        h5.classList.add("player-score-text")
        h4.appendChild(document.createTextNode(key))
        h5.appendChild(document.createTextNode(value));
        div.appendChild(h4)
        div.appendChild(h5)
        li.appendChild(div)
        ul.appendChild(li);
    }
}

let sortObject = function (scores) {
    let sortable = []
    for (let player in scores) {
        sortable.push([player, scores[player]]);
    }
    sortable.sort(function (a, b) {
        return b[1] - a[1];
    });
    let sortedScores = {}
    sortable.forEach(function (item) {
        sortedScores[item[0]] = item[1]
    })
    return sortedScores
}

let addHint = function (hint) {
    let container = null
    switch (hint["attribute"]) {
        case "nationality":
            container = document.getElementById("nationality-img-id")
            container.src = "/images/country-flags/" + hint["value"] + ".png"
            break
        case "position":
            container = document.getElementById("pos-container")
            container.innerText = hint["value"]
            break
        case "team":
            container = document.getElementById("team-img-id")
            container.src = "/images/teams/super-lig/" + hint["value"] + ".png"
            break
        case "age":
            container = document.getElementById("age-container")
            container.innerText = hint["value"]
            break
        case "num":
            container = document.getElementById("num-container")
            container.innerText = hint["value"]
            break
    }
}

let countDownFrom = function (from, callingFunction, onComplete) {
    let countdownFrom = from;
    let countdownID = setInterval(function () {
        callingFunction(countdownFrom)
        if (countdownFrom === 0) {
            clearInterval(countdownID)
            onComplete()
        }
        countdownFrom--;
    }, 1000)
    currentTimeoutIDs.push(countdownID)
}

let clearTimeouts = function (){
    for (let timeout of currentTimeoutIDs) {
        clearTimeout(timeout)
    }
    currentTimeoutIDs = []
}