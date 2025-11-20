<img src="https://www.seven.io/wp-content/uploads/Logo.svg" width="250" />

# Seven Thunderbird Extension

Send SMS or make text-to-speech calls directly from within Thunderbird.

## Features

- 📧 Send SMS messages from email content
- 📞 Make text-to-speech calls
- ⚙️ Configure default sender for SMS and voice calls
- 🚀 Quick access via "Send via seven" button

## Installation

1. Download the [latest release](https://github.com/seven-io/thunderbird/releases/latest/download/seven-thunderbird-latest.xpi)
2. Open Thunderbird and navigate to **Add-ons Manager** → **Extensions**
3. Click the **gear icon** (⚙️) and select **Install Add-on From File**
4. Select the downloaded `.xpi` file and click **Open**
5. Accept the permissions dialog by clicking **Add**

## Configuration

After installation, configure your API credentials:

1. In the Add-ons Manager, find the **Seven** extension
2. Click the **wrench icon** to open preferences
3. Enter your **API Key** (required)
4. Optionally set default senders for SMS and voice calls
5. Click **Save**

### Where to get your API Key

Get your API key from your [seven.io dashboard](https://app.seven.io/developer).

## Usage

### Send SMS or Voice Messages

1. Open any email in Thunderbird
2. Click the **Send via seven** button
3. Choose between **SMS** or **Voice** message type
4. The email subject is automatically used as message text (you can edit it)
5. Enter the recipient's phone number
6. Click **Send**

## Options

- **API Key**: Your seven.io API key (required)
- **SMS From**: Default sender ID for SMS messages (optional, max 16 characters)
- **Voice From**: Default caller ID for voice calls (optional, max 16 characters)

## Support

Need help? Feel free to [contact us](https://www.seven.io/en/company/contact/).

## License

[![MIT](https://img.shields.io/badge/License-MIT-teal.svg)](LICENSE)
