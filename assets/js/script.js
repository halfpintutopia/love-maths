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

    document.getElementById('answer-box').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            checkAnswer()
        }
    })

    runGame('addition')
})

/**
* The main game "loop", called when the script is first loaded
* and after the user's answer has been processed
*/
function runGame(gameType) {
    document.getElementById('answer-box').value = ''
    document.getElementById('answer-box').focus()

    // Creates two random numbers between 1 and 25
    let num1 = Math.floor(Math.random() * 25) + 1
    let num2 = Math.floor(Math.random() * 25) + 1

    switch (gameType) {
        case 'addition':
            displayAdditionQuestion(num1, num2)
            break
        case 'subtract':
            displaySubtractQuestion(num1, num2)
            break
        case 'multiply':
            displayMultiplyQuestion(num1, num2)
            break
        case 'division':
            displayDivisionQuestion(num1, num2)
            break
        default:
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
        incrementScore()
    } else {
        alert(`Awww.... you answered ${userAnswer}. The correct answer was ${calculatedAnswer[0]}`)
        incrementWrongAnswer()
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

    switch(operator) {
        case '+':
            return [operand1 + operand2, 'addition']
        case '-':
            return [operand1 - operand2, 'subtract']
        case 'x':
            return [operand1 * operand2, 'multiply']
        case '/':
            return [operand1 / operand2, 'division']
        default:
            alert(`Unimplemented operator ${operator}`)
            throw `Unimplemented operator ${operator}. Aborting!`
    }
}

/**
 * Gets the correct score from the DOM and increments it by 1
 */
function incrementScore() {
    // Interrogate the HTML
    // textContent gets the content of all elements, including <script> and <style> elements. In contrast, innerText only shows "human-readable"
    // https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
    /*
    The reason that we're putting the  double plus signs before the variable
    instead of after is quite interesting. If you  put the double plus signs after the variable
    then JavaScript will do something like this.  It will get the ID of score, and it will set
    the inner text to the old score variable, and then it will add one to old score.
    The result is that we never see the score being  updated. Because it's been written back to the
    dom before it has had one added to it. Putting  the double plus signs before the variable means
    that JavaScript will get the ID of score,  then set the inner text to one plus old score.
    So we see our score being updated. It's just  an interesting little thing that sometimes you
    have to take into account, as to put  the double plus before or after the variable.
     */
    let oldScore = parseInt(document.getElementById('score').innerText)
    document.getElementById('score').innerText = ++oldScore // compound addition operator
}

/**
 * Gets the correct incorrect score from the DOM and increments it by 1
 */
function incrementWrongAnswer() {
    // Interrogate the HTML
    let oldIncorrectScore = parseInt(document.getElementById('incorrect').innerText)
    document.getElementById('incorrect').innerText = ++oldIncorrectScore
}

function displayAdditionQuestion(operand1, operand2) {
    // Interrogate HTML
    document.getElementById('operand-1').textContent = operand1
    document.getElementById('operand-2').textContent = operand2
    document.getElementById('operator').textContent = "+"
}

function displaySubtractQuestion(operand1, operand2) {
    document.getElementById('operand-1').textContent = operand1 > operand2 ? operand1 : operand1
    document.getElementById('operand-2').textContent = operand1 > operand2 ? operand2 : operand1
    document.getElementById('operator').textContent = "-"
}

function displayMultiplyQuestion(operand1, operand2) {
    document.getElementById('operand-1').textContent = operand1
    document.getElementById('operand-2').textContent = operand2
    document.getElementById('operator').textContent = "x"
}

function displayDivisionQuestion(operand1, operand2) {
    document.getElementById('operand-1').textContent = operand1
    document.getElementById('operand-2').textContent = operand2
    document.getElementById('operator').textContent = "/"
}