let visualArray = document.getElementById('arrayVisualizer');
let code = document.getElementById('code');

function parseInput() {
    const numsInput = document.getElementById('numsInput').value;
    const sumInput = document.getElementById('sumInput').value;

    return {
        nums: numsInput.split(',').map(num => parseInt(num.trim(), 10)),
        sum: parseInt(sumInput, 10)
    };
}

function displayArray(nums) {
    visualArray.innerHTML = '';
    nums.forEach((num, index) => {
        let element = document.createElement('div');
        element.textContent = num;
        element.id = 'index' + index;
        visualArray.appendChild(element);
    });
}

function updateVariableDisplay(total, start, end, minLen) {
    document.getElementById('totalValue').textContent = total.toString();
    document.getElementById('startIndex').textContent = start.toString();
    document.getElementById('endIndex').textContent = end.toString();
    document.getElementById('minLen').textContent = minLen === Infinity ? 'Infinity' : minLen.toString();
}

function highlightLine(lineNumber) {
    let lines = code.textContent.split('\n');
    code.innerHTML = lines.map((line, index) => {
        return (index === lineNumber) ? `<span class="highlight">${line}</span>` : line;
    }).join('\n');
}

function startVisualization() {
    const { nums, sum } = parseInput();
    displayArray(nums);

    let total = 0, start = 0, end = 0, minLen = Infinity;
    let currentIndex = 0; // To track which line to highlight

    function executeSteps() {
        highlightLine(currentIndex); // Highlight the initial line
        if (total < sum && end < nums.length) {
            currentIndex = 3; // Line index of the if condition
            highlightLine(currentIndex);
            setTimeout(() => {
                total += nums[end];
                currentIndex = 4; // Line index where total is incremented
                highlightLine(currentIndex);
                end++;
                currentIndex = 5; // Line index where end is incremented
                highlightLine(currentIndex);
                proceed();
            }, 500);
        } else if (total >= sum) {
            currentIndex = 7; // Line index of the else-if condition
            highlightLine(currentIndex);
            setTimeout(() => {
                minLen = Math.min(minLen, end - start);
                currentIndex = 8; // Line where minLen is potentially updated
                highlightLine(currentIndex);
                total -= nums[start];
                currentIndex = 9; // Line where total is decremented
                highlightLine(currentIndex);
                start++;
                currentIndex = 10; // Line where start is incremented
                highlightLine(currentIndex);
                proceed();
            }, 500);
        } else {
            currentIndex = 14; // Return
            highlightLine(currentIndex);
        }
    }

    function proceed() {
        updateVariableDisplay(total, start, end, minLen);
        setTimeout(executeSteps, 1000); // Continue to next step after 1 second
    }

    executeSteps(); // Start the execution steps
}

document.getElementById('numsInput').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        startVisualization();
    }
});

document.getElementById('sumInput').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        startVisualization();
    }
});
