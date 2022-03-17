browser.tabs.query({
    active: true,
    currentWindow: true,
}).then(([tab]) => {
    browser.messageDisplay.getDisplayedMessage(tab.id).then(async message => {
        setInputValue('from', await getOptionValue('sms').from)
        setInputValue('text', message.subject)
    })
        .catch(console.error)
}).catch(console.error)

document.querySelector('form').addEventListener('submit', async e => {
    e.preventDefault()

    await sms()
})

async function request(endpoint, body) {
    const requestInit = {
        body: JSON.stringify(body),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            SentWith: 'Thunderbird',
            'X-Api-Key': await getOptionValue('apiKey')
        },
        method: 'POST',
    }

    const res = await fetch(`https://gateway.sms77.io/api/${endpoint}`, requestInit)
    const json = await res.json()

    await notify(json)
}

async function sms() {
    await request('sms', {
        from: getInputValue('from'),
        text: getInputValue('text'),
        to: getInputValue('to'),
    })
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

async function getOptionValue(key) {
    const obj = await browser.storage.local.get(key)
    return obj[key]
}

function getInputValue(elementId) {
    return document.getElementById(elementId).value
}

function setInputValue(elementId, value) {
    const el = document.getElementById(elementId)
    if (!el) return false
    el.value = value
    return true
}
