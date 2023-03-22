
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js'
import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js'


const appSettings = {
    databaseURL: "https://playground-550b2-default-rtdb.europe-west1.firebasedatabase.app/"
}

const form = document.getElementById("submit-form")
const listEl = document.getElementById("list")
let inputField = document.getElementById("input-field")
let toInputField = document.getElementById("to")
let fromInputField = document.getElementById("from")

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementInDB = ref(database, "endorsements")



form.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(form)

    clearInputField()

    let data = {}
    for(let [key, value] of formData){
        data[key] = value
    } 

    push(endorsementInDB, data)

})

onValue(endorsementInDB, snapshot => {
    const endorsementsArr = Object.entries(snapshot.val()).reverse()

    clearEndorsementsList()

    for (let endorsement of endorsementsArr){
        appendEndorsementsToList(endorsement)
    }

})

function clearInputField(){
    inputField.value = ""
    toInputField.value = ""
    fromInputField.value = ""
}

function clearEndorsementsList(){
    listEl.innerHTML = ""
    
}

function appendEndorsementsToList(item){
    let itemId = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    let newFromEl = document.createElement('h4')
    let newToEl = document.createElement('h4')
    let newValueEl = document.createElement('p')

    newFromEl.textContent = `From ${itemValue.from}`
    newToEl.textContent = `To ${itemValue.to}`
    newValueEl.textContent = itemValue.input

    newEl.append(newFromEl, newValueEl, newToEl)

    newEl.addEventListener('dblclick', function(){
        let exactItemLocation = ref(database, `endorsements/${itemId}`)
        remove(exactItemLocation)
    })

    listEl.appendChild(newEl)
}

