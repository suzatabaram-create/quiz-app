var chosenCategory = "";
var chosenDifficulty = "";
var chosenAmount = 10;

//accessing username stored in home page 
var storedName = sessionStorage.getItem("playerName");
var welcomeText = document.getElementById("welcomeText");

if (storedName != null && welcomeText) {
    welcomeText.innerHTML =
        "Hi " + storedName + ", choose your quiz settings";
}


function beginQuizClicked() {

    chosenCategory = document.getElementById("categorySelect").value;
    chosenDifficulty = document.getElementById("difficultySelect").value;
    chosenAmount = parseInt(document.getElementById("amountSelect").value);

    sessionStorage.setItem("category", chosenCategory);
    sessionStorage.setItem("difficulty", chosenDifficulty);
    sessionStorage.setItem("amount", chosenAmount);

    window.location.href = "quiz.html";
}