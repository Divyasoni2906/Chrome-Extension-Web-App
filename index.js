let myLeads = []

const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

// Load saved leads
chrome.storage.sync.get("myLeads", (data) => {
  if (data.myLeads) {
    myLeads = data.myLeads
    render(myLeads)
  }
})

// Save current tab
tabBtn.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const url = tabs[0].url
    addLead(url)
  })
})

// Save input
inputBtn.addEventListener("click", () => {
  if (inputEl.value.trim()) {
    addLead(inputEl.value.trim())
    inputEl.value = ""
  }
})

// Delete all
deleteBtn.addEventListener("dblclick", () => {
  chrome.storage.sync.clear(() => {
    myLeads = []
    render(myLeads)
  })
})

// 🔹 Add lead with Gemini summary (ask background.js to fetch)
async function addLead(url) {
  const summary = await getSummary(url)
  myLeads.push({ url, summary })
  chrome.storage.sync.set({ myLeads })
  render(myLeads)
}

// 🔹 Get summary from background.js
function getSummary(url) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ action: "summarize", url }, (response) => {
      resolve(response.summary || "Summary unavailable")
    })
  })
}

// 🔹 Render
function render(leads) {
  let listItems = ""
  for (let i = 0; i < leads.length; i++) {
    listItems += `
      <li>
        <a target='_blank' href='${leads[i].url}'>${leads[i].url}</a>
        <p style="font-size:12px; color:#555; margin:2px 0;">${leads[i].summary}</p>
      </li>
    `
  }
  ulEl.innerHTML = listItems
}


