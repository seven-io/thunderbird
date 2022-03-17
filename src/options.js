document.addEventListener('DOMContentLoaded', function setOptions() {
    browser.storage.local.get().then(({apiKey, sms}) => {
        setInputValue('apiKey', apiKey || '')
        setInputValue('sms_from', sms.from || '')
    }).catch(console.error)
})

document.querySelector('form').addEventListener('submit', function saveOptions(e) {
    e.preventDefault()

    const options = {
        apiKey: getInputValue('apiKey'),
        sms: {
            from: getInputValue('sms_from'),
        },
    }

    browser.storage.local.set(options)
})

function getInputValue(elementId) {
    return document.getElementById(elementId).value
}

function setInputValue(elementId, value) {
    const el = document.getElementById(elementId)
    if (!el) return false
    el.value = value
    return true
}
