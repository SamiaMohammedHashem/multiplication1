(function() {

/* DOM ELEMENTS */


const dom_mainSection = document.querySelector('.main-section');
const dom_timeIndicator = dom_mainSection.querySelector('.indicators span[data-time-remaining]');
const dom_correctAnswerIndicator = dom_mainSection.querySelector('.indicators div[data-correct]');
const dom_incorrectAnswerIndicator = dom_mainSection.querySelector('.indicators div[data-incorrect]');
const dom_scoreIndicator = dom_mainSection.querySelector('.indicators span[data-score]');
const dom_startMessage = dom_mainSection.querySelector('.quest-container div[data-start-message]');
const dom_countDownMessage = dom_mainSection.querySelector('.quest-container div[data-countdown]');
const dom_questStatement = dom_mainSection.querySelector('.quest-container__statement');
const dom_gameOverMessage = dom_mainSection.querySelector('.quest-container div[data-gameover-message]');
const dom_gameOverScore = dom_gameOverMessage.querySelector('span[data-score]');
const dom_answerOptions = dom_mainSection.querySelectorAll('.interactive__answer-item');
const dom_startButton = dom_mainSection.querySelector('.interactive__game-options button[data-start]');
const dom_stopButton = dom_mainSection.querySelector('.interactive__game-options button[data-stop]');


/* VARIABLES */


let playing, timeRemaining, score, countdownInterval, timeRemainingInterval, indicatorTimeout, statementAnswer;
let alreadyGeneratedAnswers = [];


/* MAIN */


dom_startButton.addEventListener('click', gameStartCountdown);
dom_stopButton.addEventListener('click', gameOver);


/* FUNCTIONS */


function initGame() {
    playing = false;
    timeRemaining = 30;
    score = 0
    clearInterval(countdownInterval);
    clearInterval(timeRemainingInterval);
    statementAnswer = null;
    alreadyGeneratedAnswers = []
}

// Display time remaining or score state
// indicatorElement is a DOM element, indicatorValue is an integer that will then be turned into string, 
// timeFormatted is a boolean to indicate if string is formated as time in seconds (if true)
function updateStateIndicator(indicatorElement, indicatorValue = 0, timeFormatted = false) {
    if (indicatorElement.style.visibility === '' || indicatorElement.style.visibility === 'hidden') {
        indicatorElement.style.visibility = 'visible';
    }
    // indicatorValue must be an integer (will be converted to string)
    timeFormatted 
    ? indicatorElement.textContent = `${indicatorValue}s` 
    : indicatorElement.textContent = indicatorValue
}

// Hide time remaining or score state indicators
function hideStateIndicators(...indicatorElements) {
    indicatorElements.forEach(indicatorElement => {
        indicatorElement.style.visibility = 'hidden'
    })
}

// Alternate correctness indicator
function alternateCorrectnessIndicator(indicatorElementToShow, indicatorElementToHide) {
    if (indicatorElementToShow.style.visibility === '' || indicatorElementToShow.style.visibility === 'hidden') {
        indicatorElementToShow.style.visibility = 'visible'
    }
    clearTimeout(indicatorTimeout);
    // Animated appearance for a determinated time
    indicatorElementToShow.setAttribute('data-show', '');
    indicatorTimeout = setTimeout(() => {
        indicatorElementToShow.removeAttribute('data-show')
    }, 1500)
    // Ensure the other indicator remains hidden so only one shows
    indicatorElementToHide.removeAttribute('data-show');
}

// Display message in the quest container
function displayQuestMessage(messageElement) {
    messageElement.style.visibility = 'visible';
}

// Hide message from the quest container
function hideQuestMessages(...messageElements) {
    messageElements.forEach(messageElement => {
        messageElement.style.visibility = 'hidden';
    })
}

// Generate the multiplication statement (multiplier by multiplicand)
function generateMultiplicationStatement() {
    let multiplier, multiplicand;
    do {
        // First difficulty (first 26 statements): Single digit numbers multiplication
        // Multiplier and multiplicand are always a number between 3 and 10
        if (alreadyGeneratedAnswers.length < 26) {
            multiplier = 3 + Math.floor(Math.random() * 7);
            multiplicand = 3 + Math.floor(Math.random() * 7);
            statementAnswer = multiplier * multiplicand;
        }
        // Second difficulty (between the 26th and 52nd statement): Single and double digit multiplication
        // Multiplier is a number between 2 and 9, multiplicand is a number between 10 and 20
        else if (26 < alreadyGeneratedAnswers.length < 52) {
            multiplier = 2 + Math.floor(Math.random() * 7);
            multiplicand = 10 + Math.floor(Math.random() * 10);
            statementAnswer = multiplier * multiplicand;
        }
        // Third difficulty (greater than 52nd statement): Single and double digit multiplication
        // Multiplier is a number between 2 and 9, multiplicand is a number between 20 and 30
        else if (alreadyGeneratedAnswers.length > 52) {
            multiplier = 2 + Math.floor(Math.random() * 7);
            multiplicand = 20 + Math.floor(Math.random() * 10);
            statementAnswer = multiplier * multiplicand;
        } else {
            // When all posible statements are generated, multiplier and multiplicand remain with a null value
            break
        }
    }
    // Generate statement until all posible unrepeated statements are generated
    while (alreadyGeneratedAnswers.indexOf(statementAnswer) >= 0);
    // Statement answers are stored so no statement is repeated
    alreadyGeneratedAnswers = [...alreadyGeneratedAnswers, statementAnswer];

    return { multiplier, multiplicand }
}

// Display the generated multiplication statement on the quest section
function displayMultiplicationStatement(multiplicationComponents) { // Parameter multiplicationComponents is an object containing multiplier and multiplicand
    const { multiplier, multiplicand  } = multiplicationComponents;
    if (multiplier && multiplicand) {
        dom_questStatement.textContent = `${multiplier} x ${multiplicand}`
    } else {
        dom_questStatement.textContent = 'You have completed all questions!'
    }
    displayQuestMessage(dom_questStatement);
}

// Generate the answer options. Total based on the number of options displayed in the UI
function generateAnswerOptions(correctAnswer) {
    let answerOptions = [correctAnswer];
    // Iterate through the length of the UI options minus one, as the correct answer is already taken into account
    for (let i = 0; i < dom_answerOptions.length - 1; i++) {
        let wrongAnswer;
        do {
            // Wrong answer's value is close to the right answer. The interval is +-5
            wrongAnswer = (correctAnswer - 5) + Math.round(Math.random() * 10);
        }
        // Generate a random wrong answer until is different from all previous options contained in answerOptions
        while (answerOptions.indexOf(wrongAnswer) >= 0);

        answerOptions = [...answerOptions, wrongAnswer]
    }

    return answerOptions
}

// Randomize array items order
function shuffleArray(array) { 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
  };

// Display options content on the interactive section
function displayAnswerOptions(answerOptions) {
    const shuffledOptions = shuffleArray(answerOptions);
    dom_answerOptions.forEach((option, i) => {
        option.textContent = `${shuffledOptions[i]}`;
    })
}

// Generate and display multiplication statement, as well as the answer options
function promptMultiplicationStatement() {
    const statement = generateMultiplicationStatement();
    displayMultiplicationStatement(statement);
    const answerOptions = generateAnswerOptions(statementAnswer);
    displayAnswerOptions(answerOptions)
}

// Handle click on answer
function handleAnswerClick(e) {
    const answer = parseInt(e.target.textContent);
    if (answer === statementAnswer) {
        score++;
        updateStateIndicator(dom_scoreIndicator, score);
        promptMultiplicationStatement();
        alternateCorrectnessIndicator(dom_correctAnswerIndicator, dom_incorrectAnswerIndicator)
    } else {
        score--;
        updateStateIndicator(dom_scoreIndicator, score);
        promptMultiplicationStatement();
        alternateCorrectnessIndicator(dom_incorrectAnswerIndicator, dom_correctAnswerIndicator);
    }
}

// Countdown for game start
function gameStartCountdown() {
    if (playing) return;

    let count = 3;
    initGame();
    playing = true;
    updateStateIndicator(dom_scoreIndicator, score);
    updateStateIndicator(dom_timeIndicator, timeRemaining, true);
    hideQuestMessages(dom_startMessage, dom_questStatement, dom_gameOverMessage);
    dom_countDownMessage.textContent = count;
    displayQuestMessage(dom_countDownMessage);
    countdownInterval = setInterval(() => {
        count--;
        dom_countDownMessage.textContent = count;
        if (count < 1) {
            clearInterval(countdownInterval);
            hideQuestMessages(dom_countDownMessage);
            updateStateIndicator(dom_timeIndicator, timeRemaining, true);
            handleGameTimer();
            promptMultiplicationStatement();
            dom_answerOptions.forEach(option => option.addEventListener('click', handleAnswerClick));
        }
    }, 1000)
}

// Clear answer options
function clearAnswerOptions() {
    dom_answerOptions.forEach(option => {
        option.textContent = ''
    })
}

// Display game over message that shows final score
function displayGameOverMessage() {
    hideQuestMessages(dom_startMessage, dom_countDownMessage, dom_questStatement);
    dom_gameOverScore.textContent = score;
    displayQuestMessage(dom_gameOverMessage);
}

// Game over
function gameOver() {
    if (!playing) return;

    playing = false;
    clearInterval(countdownInterval);
    clearInterval(timeRemainingInterval);
    dom_answerOptions.forEach(option => option.removeEventListener('click', handleAnswerClick));
    hideStateIndicators(dom_correctAnswerIndicator, dom_incorrectAnswerIndicator);
    clearAnswerOptions();
    displayGameOverMessage();
}

// Handle game timer
function handleGameTimer() {
    timeRemainingInterval = setInterval(() => {
        timeRemaining--;
        updateStateIndicator(dom_timeIndicator, timeRemaining, true);
        if (timeRemaining < 1) {
            clearInterval(timeRemainingInterval);
            gameOver()
        }
    }, 1000)
}

}())