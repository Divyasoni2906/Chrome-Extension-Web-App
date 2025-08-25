# Lead Tracker AI (Chrome Extension)

AI-powered Chrome extension to **save, organize, and summarize website leads**.  
Whenever you save a link, the extension automatically generates a **concise one-line summary** using **Google Gemini API**.

---

## Features
- 📌 Save the current tab or enter a custom URL  
- 🤖 Automatic AI summary of websites (via Gemini)  
- 💾 Persistent storage using Chrome Sync (`chrome.storage.sync`)  
- 🔗 Clickable saved leads with context preview  
- 🗑️ Double-click delete button to clear all leads  
- 🌐 Works across Chrome browsers with the same account  

---

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Divyasoni2906/Chrome-Extension-Web-App.git
   cd Chrome-Extension-Web-App
- Set up API key
- Get a free Gemini API key from Google AI Studio
- Create a .env file in the project root:
- GEMINI_API_KEY=your_api_key_here
- Load into Chrome
- Open Chrome and go to chrome://extensions/
- Enable Developer mode (toggle in top-right)
- Click Load unpacked and select this folder
- The extension will now appear in your Chrome toolbar 🚀

## Demo
- ![Extension Demo](Screenshot%20(4).png)

## Tech Stack
- JavaScript (Vanilla)
- Chrome Extensions API
- Google Gemini API

## Roadmap / Future Enhancements
- Export/import leads to CSV or JSON
   Dark mode UI
