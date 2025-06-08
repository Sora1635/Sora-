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
        console.log('Sending request to /api/subscribe with:', { username, channel, subscribers });
        const response = await fetch('https://ca7e0132-c0b4-4338-a5c6-c68338a91a6f-00-29axe4yldg87c.pike.replit.dev/api/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, channel, subscribers: parseInt(subscribers), paid: false })
        });
        const data = await response.json();
        console.log('Response:', data);
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
        console.error('Fetch error:', error);
        message.textContent = 'Ошибка соединения. Проверьте сервер.';
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
        console.log('Sending request to /api/create-checkout with:', { username, channel, subscribers });
        const response = await fetch('https://ca7e0132-c0b4-4338-a5c6-c68338a91a6f-00-29axe4yldg87c.pike.replit.dev/api/create-checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, channel, subscribers: parseInt(subscribers) })
        });
        const data = await response.json();
        console.log('Response:', data);
        if (response.ok) {
            window.location.href = data.url;
        } else {
            message.textContent = data.error || 'Ошибка. Попробуйте снова.';
        }
    } catch (error) {
        console.error('Fetch error:', error);
        message.textContent = 'Ошибка соединения. Проверьте сервер.';
    }
}