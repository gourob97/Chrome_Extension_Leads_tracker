let myLeads = []
let inputEl = document.getElementById("input-el")
let inputBtn = document.getElementById("input-btn")
let tabBtn = document.getElementById("tab-btn")
let dltBtn = document.getElementById("dlt-btn")
let ulEl = document.getElementById("ul-el")


const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))



tabBtn.addEventListener("click",function(){
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        const currentTab = tabs[0].url
        myLeads.push(currentTab)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
      });
    
})

if(leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value)
    inputEl.value = null
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    
}) 


dltBtn.addEventListener("dblclick", function(myLeads){
    localStorage.clear()
    myLeads =[]
    render(myLeads)
})
function render(leads) {
    let listItems = ""

    for (let i = 0; i < leads.length; i++) {
        listItems += `
        <li> 
            <a target="_blank" href="${leads[i]}">
                ${leads[i]}
            </a>
        </li>`
    }

    ulEl.innerHTML = listItems
}

