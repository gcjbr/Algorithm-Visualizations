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
        return (index === lineNumber - 1) ? `<span class="highlight">${line}</span>` : line;
    }).join('\n');
}

function startVisualization() {
    const { nums, sum } = parseInput();
    displayArray(nums);

    let total = 0, start = 0, end = 0, minLen = Infinity;
    let step = 0;

    function updateVisual(minLength) {
        for (let i = 0; i < nums.length; i++) {
            let element = document.getElementById('index' + i);
            element.className = '';
            if (i >= start && i < end) {
                element.className = 'active';
            }
            if (minLength === end - start && i >= start && i < end) {
                element.className = 'min-length';
            }
        }
    }

    let interval = setInterval(() => {
        if (step === 0) highlightLine(3);
        if (total < sum && end < nums.length) {
            total += nums[end];
            end++;
            highlightLine(5);
        } else if (total >= sum) {
            minLen = Math.min(minLen, end - start);
            total -= nums[start];
            start++;
            highlightLine(8);
        } else {
            clearInterval(interval);
            alert('Minimum Length Subarray: ' + (minLen === Infinity ? 0 : minLen));
        }
        updateVisual(minLen);
        updateVariableDisplay(total, start, end, minLen);
        step++;
    }, 1000);
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
