(function i18n() {
    document.querySelectorAll('[data-i18n]').forEach(elem => {
        elem.innerText = browser.i18n.getMessage(elem.dataset.i18n)
    })
})()
