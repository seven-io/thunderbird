browser.browserAction.onClicked.addListener(() => {
    browser.runtime.openOptionsPage()
})

browser.messageDisplay.onMessageDisplayed.addListener((tab, message) => {
    console.log(`Message displayed in tab ${tab.id}: ${message.subject}`)
})
