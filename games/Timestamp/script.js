function convertDateToTimestamp() {
            const dateInput = document.getElementById('dateInput').value;
            const timeInput = document.getElementById('timeInput').value;
            if (dateInput && timeInput) {
                const dateTimeString = dateInput + 'T' + timeInput;
                const timestamp = Math.floor(new Date(dateTimeString).getTime() / 1000);
                displayTimestampResult(timestamp);
            } else {
                document.getElementById('timestampResult').innerText = 'Veuillez entrer une date et une heure valides.';
            }
        }

function convertTimestampToDate() {
    const timestampInput = document.getElementById('timestampInput').value;
    if (timestampInput) {
        const timestamp = parseInt(timestampInput);
        displayDateResult(timestamp);
    } else {
        document.getElementById('dateResult').innerText = 'Veuillez entrer un timestamp valide.';
    }
}

function displayTimestampResult(timestamp) {
    document.getElementById('timestampResult').innerHTML = `
        <div class="example-code">Timestamp: ${timestamp}</div>
    `;
}

function displayDateResult(timestamp) {
    const date = new Date(timestamp * 1000);
    const dateString = date.toISOString().split('T')[0];
    const timeString = date.toTimeString().split(' ')[0];

    document.getElementById('dateResult').innerHTML = `
        Date: ${dateString} ${timeString} <br>
    `;
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const dateInput = document.getElementById('dateInput').value;
        const timeInput = document.getElementById('timeInput').value;
        const timestampInput = document.getElementById('timestampInput').value;

        if (document.activeElement === document.getElementById('dateInput') || document.activeElement === document.getElementById('timeInput')) {
            convertDateToTimestamp();
        } else if (document.activeElement === document.getElementById('timestampInput')) {
            convertTimestampToDate();
        }
    }
});