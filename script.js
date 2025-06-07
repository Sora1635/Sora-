async function showFreeOption() {
    const username = document.getElementById('username').value;
    const channel = document.getElementById('channel').value;
    const subscribers = document.getElementById('subscribers').value;
    const message = document.getElementById('form-message');

    if (!username || !channel) {
        message.textContent = 'Заполните все поля!';
        return;
    }

    try {
        const response = await fetch('https://239642ad-9c8c-4e3e-9492-ab1cc5f8c96f-00-zuyrpq1neq7j.pike.replit.dev/api/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, channel, subscribers: parseInt(subscribers), paid: false })
        });
        const data = await response.json();
        if (response.ok) {
            message.textContent = `Подпишитесь на ${subscribers} канала(ов) ниже!`;
            document.getElementById('channels-section').style.display = 'block';
            const list = document.getElementById('channel-list');
            list.innerHTML = '';
            data.channels.forEach(ch => {
                const li = document.createElement('li');
                li.innerHTML = `<a href="https://t.me/${ch}" target="_blank">${ch}</a>`;
                list.appendChild(li);
            });
        } else {
            message.textContent = data.error || 'Ошибка. Попробуйте снова.';
        }
    } catch (error) {
        message.textContent = 'Ошибка соединения.';
    }
}

async function showPaidOption() {
    const username = document.getElementById('username').value;
    const channel = document.getElementById('channel').value;
    const subscribers = document.getElementById('subscribers').value;
    const message = document.getElementById('form-message');

    if (!username || !channel) {
        message.textContent = 'Заполните все поля!';
        return;
    }

    try {
        const response = await fetch('https://239642ad-9c8c-4e3e-9492-ab1cc5f8c96f-00-zuyrpq1neq7j.pike.replit.dev/api/create-checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, channel, subscribers: parseInt(subscribers) })
        });
        const data = await response.json();
        if (response.ok) {
            window.location.href = data.url;
        } else {
            message.textContent = data.error || 'Ошибка. Попробуйте снова.';
        }
    } catch (error) {
        message.textContent = 'Ошибка соединения.';
    }
}