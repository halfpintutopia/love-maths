// Wait for the DOM to finish loading before running the game
// Get the button elements and add event listeners to them
document.addEventListener("DOMContentLoaded", () => {
    let buttons = document.getElementsByTagName('button')

    /*
    Arrow functions - Arrow functions have no concept of this.
    this inside of an arrow function is whatever this is in their containing lexical environment.
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures
    Don't use arrow functions if you need to bind the value of this

    !! Does not work
     for (let button of buttons) {
        button.addEventListener('click', () => {
            if (this.getAttribute("data-type") === "submit") {
                alert("You clicked submit!")
            }
        })
    }
    */

    for (let button of buttons) {
        button.addEventListener('click', function () {
            if (this.getAttribute("data-type") === "submit") {
                checkAnswer()
            } else {
                let gameType = this.getAttribute('data-type')
                runGame(`${gameType}`)
            }
        })
    }

    runGame('addition')
})

/**
* The main game "loop", called when the script is first loaded
* and after the user's answer has been processed
*/
function runGame(gameType) {
    // Creates two random numbers between 1 and 25
    let num1 = Math.floor(Math.random() * 25) + 1
    let num2 = Math.floor(Math.random() * 25) + 1

    if (gameType === 'addition') {
        displayAdditionQuestion(num1, num2)
    } else {
        alert(`Unknown game type: ${gameType}`)
        // In console
        throw `Unknown game type: ${gameType}. Aborting!`
    }
}

/**
 * Checks the answers against the first element in
 * the returned calculatedCorrectAnswer array
 */
function checkAnswer() {
    let userAnswer = parseInt(document.getElementById('answer-box').value)
    let calculatedAnswer = calculateCorrectAnswer()
    let isCorrect = userAnswer === calculatedAnswer[0]
    if (isCorrect) {
        alert(`Hey! You got it right :D`)
    } else {
        alert(`Awww.... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}`)
    }

    runGame(calculatedAnswer[1])
}

/**
 * Gets the operands (the numbers) and the operator (plus, minus, etc)
 * directly from the DOM and returns the correct answer
 */
function calculateCorrectAnswer() {
    // By default, when JS get data from the DOM, it returns it as a string - reason for using partInt
    let operand1 = parseInt(document.getElementById('operand-1').innerText)
    let operand2 = parseInt(document.getElementById('operand-2').innerText)
    let operator = document.getElementById('operator').innerText

    if (operator === "+") {
        return [operand1 + operand2, 'addition']
    } else {
        alert(`Unimplemented operator ${operator}`)
        throw `Unimplemented operator ${operator}. Aborting!`
    }
}

function incrementScore() {
}

function incrementWrongAnswer() {
}

function displayAdditionQuestion(operand1, operand2) {
    // Interrogate HTML
    document.getElementById('operand-1').textContent = operand1
    document.getElementById('operand-2').textContent = operand2
    document.getElementById('operator').textContent = "+"
}

function displaySubtractQuestion() {
}

function displayMultiplyQuestion() {
}

function displayDivisionQuestion() {
}