function saveOptions(e) {
    e.preventDefault()

    const options = {
        apiKey: document.getElementById('apiKey').value
    }

    browser.storage.local.set(options)
}

function setOptions() {
    browser.storage.local.get('apiKey').then(({apiKey}) => {
        document.getElementById('apiKey').value = apiKey || ''
    }).catch(console.error)
}

document.addEventListener('DOMContentLoaded', setOptions)

document.querySelector('form').addEventListener('submit', saveOptions)
