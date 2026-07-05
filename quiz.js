var playerName = "";
var quizQuestions = [];
var currentQuestionIndex = 0;

var chosenCategory = "";
var chosenDifficulty = "";
var chosenAmount = 10;



if (document.querySelector(".question")) {

    chosenCategory = sessionStorage.getItem("category") || 9;
    chosenDifficulty = sessionStorage.getItem("difficulty") || "easy";
    chosenAmount = sessionStorage.getItem("amount") || 10;

    chosenAmount = parseInt(chosenAmount);

    currentQuestionIndex = 0;

    loadQuestions();
}



function loadQuestions() {

    var apiUrl = "https://opentdb.com/api.php?amount=" + chosenAmount + "&type=multiple";

    if (chosenCategory !== "any") {
        apiUrl += "&category=" + chosenCategory;
    }

    if (chosenDifficulty !== "any") {
        apiUrl += "&difficulty=" + chosenDifficulty;
    }

    console.log("API URL:", apiUrl);

    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {

            if (data.response_code !== 0) {
                alert("No questions found. Try different settings.");
                window.location.href = "category.html";
                return;
            }

            quizQuestions = data.results || [];
            currentQuestionIndex = 0;
            showQuestion();
        })
        .catch(err => {
            console.log("Error:", err);
            alert("Could not load questions. Check internet connection.");
        });
}




function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}



function decodeHTML(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}


function showQuestion() {

    var q = quizQuestions[currentQuestionIndex];

    if (!q) return;

    document.querySelector("h4").innerHTML =
        "Question " + (currentQuestionIndex + 1);

    document.querySelector("h3").innerHTML =
        decodeHTML(q.question);

   
    var options = [
        q.correct_answer,
        ...q.incorrect_answers
    ];

    options = shuffle(options);

    var optionBoxes = document.querySelectorAll(".text");

    for (var i = 0; i < optionBoxes.length; i++) {
        optionBoxes[i].innerHTML = decodeHTML(options[i]);
    }

    // store correct answer for checking later
    document.querySelector(".card").dataset.correct =
        decodeHTML(q.correct_answer);
}



function nextQuestion() {

    currentQuestionIndex++;

    if (currentQuestionIndex >= quizQuestions.length) {
        alert("Quiz finished!");
        window.location.href = "score.html";
        return;
    }

    showQuestion();
}


function skipQuestion() {
    nextQuestion();
}

var optionButtons = document.querySelectorAll(".option");

for (let i = 0; i < optionButtons.length; i++) {

    optionButtons[i].onclick = function () {

        // remove selection from all options
        for (let j = 0; j < optionButtons.length; j++) {
            optionButtons[j].classList.remove("selected");
        }

        // keep clicked option selected
        this.classList.add("selected");
    };
}
