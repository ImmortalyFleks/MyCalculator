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
        switch (event.target.innerText) {

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
                if (display.innerText.includes('-')) {
                    display.innerText = display.innerText.replace('-', '');
                } else {
                    display.innerText = '-' + display.innerText;
                }
                percentPressed = false;
                break;

            case "%":
                if (!percentPressed) {
                    let passedText = display.innerText + "/100";
                    display.innerText = eval(passedText);
                    percentPressed = true;
                }
                break;

            default:
                if(display.innerText === '0' && event.target.innerText !== ".") {
                    display.innerText = event.target.innerText;
                } else {
                    if (display.innerText.length < maxLength) {
                        display.innerText += event.target.innerText;
                    }
                }
        }
    })
});

// GET-запрос к API с фактами о числах
function getAndDisplayFact() {
    fetch('http://numbersapi.com/random/trivia')
        .then(response => response.text())
        .then(data => {
            const factText = document.getElementById('factText');
            factText.textContent = data;
            localStorage.setItem('fact', data); // Добавления факта в localStorage
        })
        .catch(error => {
            console.error('Произошла ошибка при получении данных', error);
        });
}

// Метод для отображения факта, сохраненного в localStorage, после перезагрузки страницы
function displaySavedFact() {
    const savedFact = localStorage.getItem('fact');
    if (savedFact) {
        document.getElementById('factText').textContent = savedFact;
    }
}

document.getElementById('getFactButton').addEventListener('click', getAndDisplayFact);
displaySavedFact();
