// Даний Event Listener очікує на повну загрузку DOM перед виконанням вказаної функції
document.addEventListener('DOMContentLoaded', e => {
    // Отримую елемент 'analyzeButton' з DOM
    const analyzeButton = document.getElementById('analyzeButton');
    // Додаю подію 'click' для кнопки 'Analyze', цим самим активовую функцію 'handleFile' під час кліку
    analyzeButton.addEventListener('click', handleFile);
})

// Функція для введення файлу та проведення аналізу
function handleFile() {
    // Отримую елементи 'fileInput' та 'results' з DOM
    const fileInput = document.getElementById('fileInput');
    const resultsDiv = document.getElementById('results');

    // Перевіряю, чи вибрали файл
    if(!fileInput.files || fileInput.files.length === 0) {
        // Якщо ні, то користувачу виводяться дане повідомлення
        return resultsDiv.innerText = 'Please select  a file';
    }

    // Отримую перший файл з вибраних файлів
    const file = fileInput.files[0];
    // Додаю об'єкт 'FileReader'
    const reader = new FileReader();

    // Даний об'єкт зчитує вміст файлу як текст
    reader.readAsText(file);                        

    // Додаю Event Listener для аналізу завантаженого файлу
    reader.addEventListener('load', e => {
        // Отримую вміст файлу
        const content = e.target.result;

        // Ділю вміст файла за символами нового рядка та перетворюю кожний рядок у число
        const numbers = content.split('\n').map(Number);

        // Відфільтровую нечислові значення та порожні рядки
        const filteredNumbers = numbers.filter(num => !isNaN(num) && num !== '');

        // Створюю змінні для максимального та мінімального числа
        let maxNumber = Number.MIN_SAFE_INTEGER;
        let minNumber = Number.MAX_SAFE_INTEGER;

        // Через цикл знаходжу максимальні та мінімальні числа
        for(const num of filteredNumbers) {
            if (num > maxNumber){
                maxNumber = num;
            }

            if(num < minNumber) {
                minNumber = num;
            }
        }

        // Сортую відфільтровані числа за зростанням
        const sortedNumbers = filteredNumbers.sort((a, b) => a - b);

        // Знаходжу медіану за допомогою математичних обчислень та тернарного оператора
        const median = sortedNumbers.length % 2 === 0 
        ? (sortedNumbers[sortedNumbers.length / 2 - 1] + sortedNumbers[sortedNumbers.length / 2]) / 2 
        : sortedNumbers[Math.floor(sortedNumbers.length / 2)];

        // Обчислуюю суму відфільтрованих чисел
        const sum = filteredNumbers.reduce((acc, curr) => acc + curr, 0);
        // Знаходжу середнє арифметичне
        const average = sum / filteredNumbers.length;

        // Створюю змінні для найдовших зростаючих та спадаючих послідовностей
        let longestIncreasingSequence = 1;
        let longestDecreasingSequence = 1;
        let increasingSequence = 1;
        let decreasingSequence = 1;

        // Чере цикл відфілтрованих чисел знаходжу найдовші зростаючі та спадаючі послідовності
        for (let i = 1; i < filteredNumbers.length; i++) {
            if(filteredNumbers[i] > filteredNumbers[i - 1]) {
                increasingSequence++;
                decreasingSequence = 1;
                longestIncreasingSequence = Math.max(longestIncreasingSequence, increasingSequence);
            } else if (filteredNumbers[i] < filteredNumbers[i - 1]) {
                decreasingSequence++;
                increasingSequence = 1;
                longestDecreasingSequence = Math.max(longestDecreasingSequence, decreasingSequence);
            }
        }
        
        // Виводжу результат для користувача
        resultsDiv.innerHTML = `<p>Maximum number: ${maxNumber}</p>
                                <p>Minimum number: ${minNumber}</p>
                                <p>Median: ${median}</p>
                                <p>Average: ${average}</p>
                                <p>Longest increasing sequence: ${longestIncreasingSequence}</p>
                                <p>Longest decreasing sequence: ${longestDecreasingSequence}</p>`; 
    })
}



