# MATHTIME

This is a simple Math Multiplication game developed with HTML, CSS and Vanilla JavaScript. It generates multiplication statements and answer options for the user to interact with. The game has a one minute timer and keeps track of the user’s score, which also determines the game difficulty.

The app aims to provide a user-friendly interface and experience on both desktop and mobile devices. This is achieved by using the most recent CSS technologies along with HTML, while up-to-date JavaScript takes care of the main functionality.

The JavaScript code is the core part of the app and is responsible for the game logic. The approach is driven towards Functional Programming and centered in clean, readable code with good practices. It's divided in four sections: *DOM Elements*, *Variables*, *Main* and *Functions*.

As the name implies, the *DOM Elements* section stores the elements that will be manipulated to achieve the game's visual functionallity.

The *Variables* section initializes the variables in the highest scope so they can then be accessed and modified inside different functions.

The *Main* section sets the event listeners for the main controls, which are the Start and Stop button.

The *Functions* section contains all the necessary functions for the game to work. These include:

- `initGame()`: This function initializes the game by setting the values of the global variables to their initial state.

- `updateStateIndicator(indicatorElement, indicatorValue = 0, timeFormatted = false)`: This function updates the state indicators for time remaining or score. It takes in three parameters: `indicatorElement`, which is the DOM element for the indicator; `indicatorValue`, which is the value to be displayed; and `timeFormatted`, which is a boolean indicating whether the value should be formatted as time in seconds. The function sets the visibility of the `indicatorElement` to visible and updates its `textContent` with the `indicatorValue`. If `timeFormatted` is `true`, the value is displayed as a string with an “s” appended to it.

- `hideStateIndicators(...indicatorElements)`: This function hides the state indicators for time remaining or score. It takes in any number of `indicatorElements` as arguments and sets their visibility to hidden.

- `alternateCorrectnessIndicator(indicatorElementToShow, indicatorElementToHide)`: This function alternates between showing and hiding the correctness indicators for correct and incorrect answers. It takes in two parameters: `indicatorElementToShow`, which is the DOM element for the indicator to be shown; and `indicatorElementToHide`, which is the DOM element for the indicator to be hidden. The function sets the visibility of `indicatorElementToShow` to visible and uses a timeout to animate its appearance for a determined time. It also ensures that `indicatorElementToHide` remains hidden.

- `displayQuestMessage(messageElement)`: This function displays a message in the quest container. It takes in one parameter: `messageElement`, which is the DOM element for the message to be displayed. The function sets the visibility of `messageElement` to visible.

- `hideQuestMessages(...messageElements)`: This function hides messages from the quest container. It takes in any number of `messageElements` as arguments and sets their visibility to hidden.

- `generateMultiplicationStatement()`: This function generates a multiplication statement by randomly selecting a multiplier and a multiplicand. The difficulty of the statement increases as more statements are generated. The function returns an object containing the multiplier and multiplicand.

- `displayMultiplicationStatement(multiplicationComponents)`: This function updates and displays a string representation of the multiplication statement on the quest section. It takes in one parameter: `multiplicationComponents`, which is an object containing the multiplier and multiplicand.

- `generateAnswerOptions(correctAnswer)`: This function generates answer options for a given correct answer. It takes in one parameter: `correctAnswer`, which is an integer. The function generates an array of answer options containing both the correct and filling incorrect answers. The incorrect answers are generated randomly within a certain range of values close to the correct answer.

- `shuffleArray(array)`: This function shuffles an array by randomly swapping its elements. It takes in one parameter: `array`, which is an array of any length. The function returns a new array with its elements shuffled.

- `displayAnswerOptions(answerOptions)`: This function displays answer options on the interactive section. It takes in one parameter: `answerOptions`, which is an array of integers representing answer options. The function shuffles the `answerOptions` array using `shuffleArray()` and updates the `textContent` of each option element.

- `promptMultiplicationStatement()`: This function generates and displays a multiplication statement as well as its corresponding answer options. It calls `generateMultiplicationStatement()` to generate a multiplication statement and `displayMultiplicationStatement()` to display it on the quest section. It also calls `generateAnswerOptions()` with `statementAnswer` as an argument to generate answer options and `displayAnswerOptions()` to display them on the interactive section.

- `handleAnswerClick(e)`: This function handles clicks on answer options by checking if they are correct or incorrect. It takes in one parameter: `e`, which is an event object representing a click event on an answer option. The function parses the `textContent` of `e.target` as an integer and compares it with `statementAnswer`. If they are equal, it increments score by 1, updates the score indicator element with the updated score using `updateStateIndicator()`, calls `promptMultiplicationStatement()` again to generate another multiplication statement and answer options, and calls `alternateCorrectnessIndicator()` with the parameters according to the answer correctness. If they are not equal, it decrements score by 1, and performs the same updates and actions.

- `clearAnswerOptions()`: This function clears the `textContent` of each answer option element.

- `displayGameOverMessage()`: This function displays a game over message that shows the final score. It hides any other quest messages using `hideQuestMessages()`, updates the `textContent` of the game over score element with the updated score, and displays the game over message using `displayQuestMessage()`.

- `gameOver()`: This function ends the game by setting `playing` to `false`, clearing any intervals or timeouts, removing event listeners from each answer option element, hiding state indicators using `hideStateIndicators()`, clearing answer options using `clearAnswerOptions()`, and displaying a game over message using `displayGameOverMessage()`.

- `handleGameTimer()`: This function handles the game timer by decrementing the `timeRemaining` variable every second and updating the time indicator element with the `timeRemaining` value using `updateStateIndicator()`. When the `timeRemaining` value reaches 0, it clears the `timeRemainingInterval` and calls `gameOver()` to end the game.

- `gameStartCountdown()`: This function starts a countdown timer for the game to begin. It checks if the game is already playing and, if not, calls `initGame()` to initialize the game, sets `playing` to `true`, updates the score indicator element and time indicator element using `updateStateIndicator()` to the updated values, hides any quest messages using `hideQuestMessages()`, and displays a countdown using `displayQuestMessage()`. It then sets an interval to decrement a `count` variable every second and update the `textContent` of the countdown message element. When `count` reaches 0, it clears the interval, hides the countdown using `hideQuestMessages()`, updates the time indicator element using `updateStateIndicator()`, calls `handleGameTimer()` to start the game timer, calls `promptMultiplicationStatement()` to generate the first multiplication statement and answer options, and adds an event listener to each answer option element to handle clicks on answer options using `handleAnswerClick()`.

This code is mainly a use example of CSS for responsiveness across devices and JavaScript for interactivity by implementing DOM manipulation, Event Listeners, Intervals and Timeouts using the latest ECMAScript features such as template strings, default parameters, arrow functions, object destructuring, spread syntax, conditionals using ternary operator, etc.