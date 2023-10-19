let display = document.querySelector('.display');
let buttons = document.querySelectorAll('.button');

const maxLength = 11; // Максимальная длина, чтобы цифры не выходили за блок калькулятора
let percentPressed = false; // Флаг для проверки кнопки %

buttons.forEach((button) => {

    // event для анимации нажатия кнопок
    button.addEventListener('mousedown', (event) => {
        button.style.transform = 'scale(0.95)';
    });

    button.addEventListener('mouseup', (event) => {
        button.style.transform = 'scale(1)';
    });

    button.addEventListener('click', (event) => {
        const buttonText = event.target.innerText;
        const displayText = display.innerText;

        switch (buttonText) {

            case "=":
                try {
                    let result = eval(display.innerText);
                    if (Number.isInteger(result)) {
                        display.innerText = result;
                    } else {
                        display.innerText = result.toFixed(6);
                    }
                    percentPressed = false;
                } catch (e) {
                    display.innerText = "Error";
                    percentPressed = false;
                }
                break;

            case "AC":
                display.innerText = "0";
                percentPressed = false;
                break;

            case '+/-':
                if (displayText.includes('-')) {
                    display.innerText = displayText.replace('-', '');
                } else {
                    display.innerText = '-' + displayText;
                }
                percentPressed = false;
                break;

            case "%":
                if (!percentPressed) {
                    let passedText = displayText + "/100";
                    display.innerText = eval(passedText);
                    percentPressed = true;
                }
                break;

            default:
                if (displayText === '0' && buttonText !== ".") {
                    display.innerText = buttonText;
                } else {
                    if (displayText.length < maxLength) {
                        // Check if the last character is an operator and replace it
                        if (isOperator(displayText.charAt(displayText.length - 1)) && isOperator(buttonText)) {
                            display.innerText = displayText.slice(0, -1) + buttonText;
                        } else {
                            display.innerText += buttonText;
                        }
                    }
                }
        }
    });
});

function isOperator(char) {
    return ['+', '-', '*', '/'].includes(char);
}
// GET-запрос к API с фактами о числах
function getAndDisplayFact() {
    const factText = document.getElementById('factText');
    factText.textContent = "Loading...";

    const apiUrl = 'https://numbersapi.p.rapidapi.com/random/trivia?min=10&max=20&fragment=true&json=true';
    const apiOptions = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '1282bbb77bmsh851a03e2abf66b0p11c245jsnc249ed441410',
            'X-RapidAPI-Host': 'numbersapi.p.rapidapi.com'
        }
    };

    fetch(apiUrl, apiOptions)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Произошла ошибка при получении данных');
            }
        })
        .then(data => {
            const number = data.number;
            const fact = data.text;
            factText.textContent = `Fact about number ${number}: ${fact}`;
            localStorage.setItem('fact', factText.textContent); // Сохранение факта в localStorage
        })
        .catch(error => {
            factText.textContent = 'Ошибка при получении данных: ' + error.message;
            console.error('Произошла ошибка при получении данных:', error);
        });
}
function displaySavedFact() {
    const savedFact = localStorage.getItem('fact');
    if (savedFact) {
        document.getElementById('factText').textContent = savedFact;
    }
}
document.getElementById('getFactButton').addEventListener('click', getAndDisplayFact);
displaySavedFact();