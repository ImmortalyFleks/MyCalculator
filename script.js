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