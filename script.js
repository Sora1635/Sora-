// Управление боковым меню
document.querySelector('.menu-toggle').addEventListener('click', () => {
    document.querySelector('.sidebar').classList.add('open');
});

document.querySelector('.close-menu').addEventListener('click', () => {
    document.querySelector('.sidebar').classList.remove('open');
});

async function showFreeOption() {
    const username = document.getElementById('username').value;
    const channel = document.getElementById('channel').value;
    const subscribers = document.getElementById('subscribers').value;
    const message = document.getElementById('form-message');

    if (!username || !channel) {
        message.textContent = 'Заполните поля!';
        return;
    }

    try {
        const response = await fetch('https://ca7e0132-c0b4-4338-a5c6-c68338a91a6f-00-29axe4yldg87c.pike.replit.dev/api/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, channel, subscribers: parseInt(subscribers), paid: false })
        });
        const data = await response.json();
        if (response.ok) {
            message.textContent = `Подпишитесь на ${subscribers} канала(ов)!`;
            document.getElementById('channels-section').style.display = 'block';
            const list = document.getElementById('channel-list');
            list.innerHTML = '';
            data.channels.forEach(ch => {
                const li = document.createElement('li');
                li.innerHTML = `<a href="https://t.me/${ch}" target="_blank">${ch}</a>`;
                list.appendChild(li);
            });
        } else {
            message.textContent = data.error || 'Ошибка.';
        }
    } catch (error) {
        message.textContent = 'Ошибка сервера.';
    }
}

async function showPaidOption() {
    const username = document.getElementById('username').value;
    const channel = document.getElementById('channel').value;
    const subscribers = document.getElementById('subscribers').value;
    const message = document.getElementById('form-message');

    if (!username || !channel) {
        message.textContent = 'Заполните поля!';
        return;
    }

    try {
        const response = await fetch('https://ca7e0132-c0b4-4338-a5c6-c68338a91a6f-00-29axe4yldg87c.pike.replit.dev/api/create-checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, channel, subscribers: parseInt(subscribers) })
        });
        const data = await response.json();
        if (response.ok) {
            window.location.href = data.url;
        } else {
            message.textContent = data.error || 'Ошибка.';
        }
    } catch (error) {
        message.textContent = 'Ошибка сервера.';
    }
}