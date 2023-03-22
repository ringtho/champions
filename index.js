
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js'
import { getDatabase, ref, push, onValue } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js'


const appSettings = {
    databaseURL: "https://playground-550b2-default-rtdb.europe-west1.firebasedatabase.app/"
}


const listEl = document.getElementById("list")
const publishBtn = document.getElementById("btn")
let inputField = document.getElementById("input-field")

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementInDB = ref(database, "endorsements")

publishBtn.addEventListener('click', () => {
    let inputValue = inputField.value
    appendEndorsementsToList(inputValue)

    clearInputField()

    push(endorsementInDB, inputValue)
})

onValue(endorsementInDB, snapshot => {

    const endorsementsArr = Object.values(snapshot.val())

    for (let endorsement of endorsementsArr){
        appendEndorsementsToList(endorsement)
    }

})

function clearInputField(){
    inputField.value = ""
}

function appendEndorsementsToList(item){
    let newEl = document.createElement("li")
    newEl.textContent = item

    listEl.appendChild(newEl)
}

