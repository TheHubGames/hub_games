const morseCode = {
    'A': '·−', 'B': '−···', 'C': '−·−·', 'D': '−··', 'E': '·', 'F': '··−·',
    'G': '−−·', 'H': '····', 'I': '··', 'J': '·−−−', 'K': '−·−', 'L': '·−··',
    'M': '−−', 'N': '−·', 'O': '−−−', 'P': '·−−·', 'Q': '−−·−', 'R': '·−·',
    'S': '···', 'T': '−', 'U': '··−', 'V': '···−', 'W': '·−−', 'X': '−··−',
    'Y': '−·−−', 'Z': '−−··', '0': '−−−−−', '1': '·−−−−', '2': '··−−−',
    '3': '···−−', '4': '····−', '5': '·····', '6': '−····', '7': '−−···',
    '8': '−−−··', '9': '−−−−·',
    'À': '·−−·−', 'Â': '·−−·−', 'Ä': '·−·−', 'Æ': '·−·−', 'Ç': '−·−··',
    'È': '·−··−', 'É': '··−··', 'Ê': '···−', 'Ë': '·−··−', 'Ï': '··−··',
    'Î': '··−·−', 'Ô': '−−−·', 'Ö': '−−−·', 'Œ': '−−−·', 'Û': '··−−·',
    'Ü': '··−−', 'Ù': '··−−', 'Ÿ': '−·−−·', 'Ñ': '−−·−−',
    '.': '·−·−·−', ',': '−−··−−', '?': '··−−··', '\'': '·−−−−·',
    '!': '−·−·−−', '/': '−··−·', '(': '−·−−·', ')': '−·−−·−', '&': '·−···',
    ':': '−−−···', ';': '−·−·−·', '=': '−···−', '+': '·−·−·', '-': '−····−',
    '_': '··−−·−', '"': '·−··−·', '$': '···−··−', '@': '·−−·−·', 
    '¿': '··−−·', '¡': '−·−·−', '¿': '··−·−', '§': '···−·−', '°': '−·−−·−'
};

const morseCodeul = {
    'A': '·−', 'B': '−···', 'C': '−·−·', 'D': '−··', 'E': '·', 'F': '··−·',
    'G': '−−·', 'H': '····', 'I': '··', 'J': '·−−−', 'K': '−·−', 'L': '·−··',
    'M': '−−', 'N': '−·', 'O': '−−−', 'P': '·−−·', 'Q': '−−·−', 'R': '·−·',
    'S': '···', 'T': '−', 'U': '··−', 'V': '···−', 'W': '·−−', 'X': '−··−',
    'Y': '−·−−', 'Z': '−−··', '0': '−−−−−', '1': '·−−−−', '2': '··−−−',
    '3': '···−−', '4': '····−', '5': '·····', '6': '−····', '7': '−−···',
    '8': '−−−··', '9': '−−−−·'};

const column1 = document.getElementById('column1');
const column2 = document.getElementById('column2');
const column3 = document.getElementById('column3');
const column4 = document.getElementById('column4');

let count = 0;

for (let char in morseCodeul) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `${char}<div class="red">${morseCode[char]}</div>`;

    if (char >= '0' && char <= '9') {
        column4.appendChild(listItem);
    } else {
        if (count < 10) {
            column1.appendChild(listItem);
        } else if (count < 20) {
            column2.appendChild(listItem);
        } else {
            column3.appendChild(listItem);
        }
        count++;
    }
}

const latinCode = Object.keys(morseCode).reduce((obj, key) => {
    obj[morseCode[key]] = key;
    return obj;
}, {});

document.getElementById('latinText').addEventListener('input', () => {
    const text = document.getElementById('latinText').value.toUpperCase();
    let morseText = '';
    for (let char of text) {
        morseText += (morseCode[char] || '') + ' ';
    }
    document.getElementById('morseText').value = morseText.trim();
});

document.getElementById('morseText').addEventListener('input', () => {
    const morseText = document.getElementById('morseText').value.trim().split(' ');
    let latinText = '';
    for (let code of morseText) {
        latinText += (latinCode[code] || '');
    }
    document.getElementById('latinText').value = latinText;
});

function addDot() {
    const morseField = document.getElementById('morseText');
    morseField.value += '·';
    morseField.dispatchEvent(new Event('input'));
}

function addDash() {
    const morseField = document.getElementById('morseText');
    morseField.value += '−';
    morseField.dispatchEvent(new Event('input'));
}

function addSpace() {
    const morseField = document.getElementById('morseText');
    morseField.value += ' ';
    morseField.dispatchEvent(new Event('input'));
}

function copyText(id) {
    const textArea = document.getElementById(id);
    textArea.select();
    document.execCommand('copy');
}

function clearText(id) {
    const textArea = document.getElementById(id);
    textArea.value = '';
    textArea.dispatchEvent(new Event('input'));
}

function saveText(id, filename) {
    const textArea = document.getElementById(id);
    const blob = new Blob([textArea.value], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
}
