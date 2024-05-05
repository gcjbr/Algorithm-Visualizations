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

function updateVisual(minLen, start, end) {
    for (let i = 0; i < visualArray.children.length; i++) {
        let element = visualArray.children[i];
        element.className = '';
        if (i >= start && i < end) {
            element.className = 'active';
        }
        if (minLen === end - start && i >= start && i < end) {
            element.className = 'min-length';
        }
    }
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
    let delay = 500;  // Delay between steps

    function executeStep() {
        if (start < nums.length) {
            if (total < sum && end < nums.length) {
                highlightLine(3); // Highlight condition check
                setTimeout(() => {
                    total += nums[end];
                    highlightLine(4); // Highlight addition operation
                    end++;
                    highlightLine(5); // Highlight end increment
                    proceed();
                }, delay);
            } else if (total >= sum) {
                highlightLine(7); // Highlight condition check
                setTimeout(() => {
                    minLen = Math.min(minLen, end - start);
                    highlightLine(8); // Highlight min length update
                    total -= nums[start];
                    highlightLine(9); // Highlight subtraction operation
                    start++;
                    highlightLine(10); // Highlight start increment
                    proceed();
                }, delay);
            } else {
                highlightLine(14); // Highlight the break condition
                setTimeout(() => {
                    alert('Minimum Length Subarray: ' + (minLen === Infinity ? 0 : minLen));
                }, delay);
            }
        }
    }

    function proceed() {
        updateVariableDisplay(total, start, end, minLen);
        updateVisual(minLen, start, end);
        setTimeout(executeStep, delay * 2);  // Wait before next step
    }

    setTimeout(executeStep, delay); // Start the process
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
