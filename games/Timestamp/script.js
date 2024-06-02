function convertDateToTimestamp() {
    const dateInput = document.getElementById('dateInput').value;
    const timeInput = document.getElementById('timeInput').value;
    if (dateInput && timeInput) {
        const dateTimeString = dateInput + 'T' + timeInput;
        const timestamp = Math.floor(new Date(dateTimeString).getTime() / 1000);
        displayTimestampResult(timestamp);
        updateExamples(timestamp);
    } else {
        document.getElementById('timestampResult').innerText = 'Veuillez entrer une date et une heure valides.';
    }
}

function convertTimestampToDate() {
    const timestampInput = document.getElementById('timestampInput').value;
    if (timestampInput) {
        const timestamp = parseInt(timestampInput);
        displayDateResult(timestamp);
        updateExamples(timestamp);
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

function updateExamples(timestamp) {
    document.getElementById('exemple').innerHTML = `
        <div class="example-code">Exemple Discord</div>
        <ul class="list-unstyled">
            <li id="example1" class="content-center"><code>&lt;t:${timestamp}:t&gt;</code> 
                <button class="copy-button p-1 btn-neutral-100" onclick="copyToClipboard('example1')" alt="Copy">
                <svg class="clipboard" xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="black" viewBox="0 0 16 16">
                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
                </svg>
                <svg class="check hidden" xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="black" viewBox="0 0 16 16">
                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                </svg>
                </button><t:${timestamp}:t>
                ${renderTime(timestamp)}
            </li>
            <li id="example2"><code>&lt;t:${timestamp}:T&gt;</code>
            <button class="copy-button p-1 btn-neutral-100" onclick="copyToClipboard('example2')" alt="Copy">
            <svg class="clipboard" xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="black" viewBox="0 0 16 16">
                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
                </svg>
                <svg class="check hidden" xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="black" viewBox="0 0 16 16">
                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                </svg>
            </button><t:${timestamp}:T>
            ${renderFullTime(timestamp)}
            </li>
            <li id="example3"><code>&lt;t:${timestamp}:d&gt;</code> 
            <button class="copy-button p-1 btn-neutral-100" onclick="copyToClipboard('example3')" alt="Copy">
            <svg class="clipboard" xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="black" viewBox="0 0 16 16">
                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
                </svg>
                <svg class="check hidden" xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="black" viewBox="0 0 16 16">
                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                </svg>
            </button><t:${timestamp}:d>
            ${renderDate(timestamp)}
            </li>
            <li id="example4"><code>&lt;t:${timestamp}:D&gt;</code> 
            <button class="copy-button p-1 btn-neutral-100" onclick="copyToClipboard('example4')" alt="Copy">
            <svg class="clipboard" xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="black" viewBox="0 0 16 16">
                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
                </svg>
                <svg class="check hidden" xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="black" viewBox="0 0 16 16">
                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                </svg>
            </button><t:${timestamp}:D>
            ${renderFullDate(timestamp)}
            </li>
            <li id="example5"><code>&lt;t:${timestamp}:f&gt;</code> 
            <button class="copy-button p-1 btn-neutral-100" onclick="copyToClipboard('example5')" alt="Copy">
            <svg class="clipboard" xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="black" viewBox="0 0 16 16">
                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
                </svg>
                <svg class="check hidden" xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="black" viewBox="0 0 16 16">
                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                </svg>
            </button><t:${timestamp}:f>
            ${renderDateTime(timestamp)}
            </li>
            <li id="example6"><code>&lt;t:${timestamp}:F&gt;</code> 
            <button class="copy-button p-1 btn-neutral-100" onclick="copyToClipboard('example6')" alt="Copy">
            <svg class="clipboard" xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="black" viewBox="0 0 16 16">
                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
                </svg>
                <svg class="check hidden" xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="black" viewBox="0 0 16 16">
                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                </svg>
            </button><t:${timestamp}:F>
            ${renderFullDateTime(timestamp)}
            </li>
            <li id="example7"><code>&lt;t:${timestamp}:R&gt;</code> 
            <button class="copy-button p-1 btn-neutral-100" onclick="copyToClipboard('example7')" alt="Copy">
            <svg class="clipboard" xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="black" viewBox="0 0 16 16">
                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
                </svg>
                <svg class="check hidden" xmlns="http://www.w3.org/2000/svg" width="8" height="8" fill="black" viewBox="0 0 16 16">
                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z"/>
                </svg>
            </button><t:${timestamp}:R>
            ${renderRelativeTime(timestamp)}
            </li>
        </ul>
    `;
}

function copyToClipboard(id) {
    const element = document.getElementById(id).querySelector('code');
    const range = document.createRange();
    range.selectNode(element);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);

    try {
        document.execCommand('copy');
        const copyButton = document.getElementById(id).querySelector('.clipboard');
        copyButton.classList.add('hidden');
        const checks = document.getElementById(id).querySelector('.check');
        checks.classList.remove('hidden');
        setTimeout(function() {
            checks.classList.add('hidden');
            copyButton.classList.remove('hidden');
          }, 2000);
    } catch (err) {
        alert('Impossible de copier le texte');
    }

    window.getSelection().removeAllRanges();
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

function renderTime(timestamp) {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `(${hours}:${minutes})`;
}

function renderFullTime(timestamp) {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `(${hours}:${minutes}:${seconds})`;
}

function renderDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `(${day}/${month}/${year})`;
}

function renderFullDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return `(${date.toLocaleDateString('fr-FR', options)})`;
}

function renderDateTime(timestamp) {
    const date = new Date(timestamp * 1000);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return `(${date.toLocaleDateString('fr-FR', options)})`;
}

function renderFullDateTime(timestamp) {
    const date = new Date(timestamp * 1000);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return `(${date.toLocaleDateString('fr-FR', options)})`;
}

function renderRelativeTime(timestamp) {
    const currentDate = new Date();
    const targetDate = new Date(timestamp * 1000);
    const diff = targetDate - currentDate; // Différence entre la date cible et la date actuelle
    const seconds = Math.abs(Math.floor(diff / 1000));
    const minutes = Math.abs(Math.floor(seconds / 60));
    const hours = Math.abs(Math.floor(minutes / 60));
    const days = Math.abs(Math.floor(hours / 24));
    const months = Math.abs(Math.floor(days / 30));
    const years = Math.abs(Math.floor(months / 12));

    if (diff < 0) {
        if (years > 0) {
            return `il y a ${years === 1 ? '1 an' : `${years} ans`}`;
        } else if (months > 0) {
            return `il y a ${months === 1 ? '1 mois' : `${months} mois`}`;
        } else if (days > 0) {
            return `il y a ${days === 1 ? '1 jour' : `${days} jours`}`;
        } else if (hours > 0) {
            return `il y a ${hours === 1 ? '1 heure' : `${hours} heures`}`;
        } else if (minutes > 0) {
            return `il y a ${minutes === 1 ? '1 minute' : `${minutes} minutes`}`;
        } else {
            return `il y a ${seconds === 1 ? '1 seconde' : `${seconds} secondes`}`;
        }
    } else {
        if (years > 0) {
            return `dans ${years === 1 ? '1 an' : `${years} ans`}`;
        } else if (months > 0) {
            return `dans ${months === 1 ? '1 mois' : `${months} mois`}`;
        } else if (days > 0) {
            return `dans ${days === 1 ? '1 jour' : `${days} jours`}`;
        } else if (hours > 0) {
            return `dans ${hours === 1 ? '1 heure' : `${hours} heures`}`;
        } else if (minutes > 0) {
            return `dans ${minutes === 1 ? '1 minute' : `${minutes} minutes`}`;
        } else {
            return `dans ${seconds === 1 ? '1 seconde' : `${seconds} secondes`}`;
        }
    }
}
