document.addEventListener('DOMContentLoaded', function() {
    const analyzeButton = document.getElementById('analyzeButton');
    analyzeButton.addEventListener('click', handleFile);
})

function handleFile() {
    const fileInput = document.getElementById('fileInput');
    const resultsDiv = document.getElementById('results');

    if(!fileInput.files || fileInput.files.length === 0) {
        resultsDiv.innerText = 'Please select  a file';
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.readAsText(file);                        

    reader.onload = function(event) {
        const content = event.target.result;

        const numbers = content.split('\n').map(Number);

        const filteredNumbers = numbers.filter(num => !isNaN(num) && num !== '');

        let maxNumber = Number.MIN_SAFE_INTEGER;
        let minNumber = Number.MAX_SAFE_INTEGER;

        for(const num of filteredNumbers) {
            if (num > maxNumber){
                maxNumber = num;
            }

            if(num < minNumber) {
                minNumber = num;
            }
        }

        const sortedNumbers = filteredNumbers.sort((a, b) => a - b);
        const median = sortedNumbers.length % 2 === 0 
        ? (sortedNumbers[sortedNumbers.length / 2 - 1] + sortedNumbers[sortedNumbers.length / 2]) / 2 
        : sortedNumbers[Math.floor(sortedNumbers.length / 2)];

        const sum = filteredNumbers.reduce((acc, curr) => acc + curr, 0);
        const average = sum / filteredNumbers.length;

        let longestIncreasingSequence = 1;
        let longestDecreasingSequence = 1;
        let increasingSequence = 1;
        let decreasingSequence = 1;

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
        
        resultsDiv.innerHTML = `<p>Maximum number: ${maxNumber}</p>
                                <p>Minimum number: ${minNumber}</p>
                                <p>Median: ${median}</p>
                                <p>Average: ${average}</p>
                                <p>Longest increasing sequence: ${longestIncreasingSequence}</p>
                                <p>Longest decreasing sequence: ${longestDecreasingSequence}</p>`; 
    }
}



