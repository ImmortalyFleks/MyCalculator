// Функция управления калькулятором, используя клавиатуру
document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (!isNaN(key) || key === '.' || isOperator(key)) {
        const displayText = display.innerText;

        if (displayText === '0' && key !== "." && !isOperator(key)) {
            display.innerText = key;

        } else {
            if (displayText.length < maxLength) {
                if (isOperator(displayText.charAt(displayText.length - 1)) && isOperator(key)) {
                    display.innerText = displayText.slice(0, -1) + key;
                } else {
                    display.innerText += key;
                }
            }
        }

    } else if (key === 'Enter') {
        try {
            let result = eval(display.innerText);
            if (Number.isInteger(result)) {
                display.innerText = result;
            } else {
                display.innerText = result.toFixed(4);
            }
            percentPressed = false;
        } catch (e) {
            display.innerText = "Error";
            percentPressed = false;
        }

    } else if (key === 'Escape') {
        display.innerText = "0";
        percentPressed = false;

    } else if (key === 'Backspace') {
        // Если нажата клавиша Backspace
        const displayText = display.innerText;
        if (displayText.length <= 1) {
            // Если длина текста меньше или равна 1, установите текст на дисплее в "0"
            display.innerText = "0";
        } else {
            // В противном случае удаляйте последний символ с дисплея
            display.innerText = displayText.slice(0, -1);
        }
        percentPressed = false;

    } else if (key === '%') {
        if (!percentPressed) {
            let passedText = display.innerText + "/100";
            display.innerText = eval(passedText);
            percentPressed = true;
        }
    }
});
