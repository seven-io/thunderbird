browser.tabs.query({
    active: true,
    currentWindow: true,
}).then(([tab]) => {
    browser.messageDisplay.getDisplayedMessage(tab.id).then(async message => {
        await setFrom('sms')
        setInputValue('text', message.subject)
    })
        .catch(console.error)
}).catch(console.error)

document.querySelectorAll('input[name=msgType]').forEach(radio => radio.addEventListener('change', async e => {
    e.preventDefault()
    const type = e.target.value

    await setFrom(type)
}))

document.querySelector('form').addEventListener('submit', async e => {
    e.preventDefault()

    const type = document.querySelector('input[name=msgType]:checked').value

    await ('voice' === type ? voice() : sms())
})

async function setFrom(type) {
    const {from} = await getOptionValue(type)
    setInputValue('from', from)
}

async function request(endpoint, body = {}) {
    const requestInit = {
        body: JSON.stringify({
            from: getInputValue('from'),
            text: getInputValue('text'),
            to: getInputValue('to'),
            ...body
        }),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            SentWith: 'Thunderbird',
            'X-Api-Key': await getOptionValue('apiKey')
        },
        method: 'POST',
    }

    const res = await fetch(`https://gateway.seven.io/api/${endpoint}`, requestInit)
    const json = await res.json()

    await notify(json)
}

async function sms() {
    await request('sms')
}

async function voice() {
    await request('voice')
}

async function notify(message, title = 'seven') {
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
