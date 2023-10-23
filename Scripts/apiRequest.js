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