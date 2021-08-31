browser.tabs.query({
    active: true,
    currentWindow: true,
}).then(([tab]) => {
    browser.messageDisplay.getDisplayedMessage(tab.id).then(message => {
        document.getElementById('text').value = message.subject
    })
        .catch(console.error)
}).catch(console.error)

document.querySelector('form').addEventListener('submit', async e => {
    e.preventDefault()

    await sms()
})

async function sms() {
    const requestInit = {
        body: JSON.stringify({
            from: document.getElementById('from').value,
            text: document.getElementById('text').value,
            to: document.getElementById('to').value,
        }),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            SentWith: 'Thunderbird',
            'X-Api-Key': (await browser.storage.local.get('apiKey')).apiKey
        },
        method: 'POST',
    }

    const res = await fetch('https://gateway.sms77.io/api/sms', requestInit)
    const json = await res.json()

    await notify(json)
}

async function notify(message, title = 'sms77') {
    if (typeof message !== 'string') message = JSON.stringify(message)

    return browser.notifications.create({
        iconUrl: browser.extension.getURL('img/64x64.png'),
        message,
        title,
        type: 'basic',
    })
}
