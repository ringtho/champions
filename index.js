
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js'
import { getDatabase, ref, push } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js'


const appSettings = {
    databaseURL: "https://playground-550b2-default-rtdb.europe-west1.firebasedatabase.app/"
}


const listEl = document.getElementById("list")
const publishBtn = document.getElementById("btn")
let inputField = document.getElementById("input-field")

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementInDB = ref(database, "endorsements")

console.log(endorsementInDB)


publishBtn.addEventListener('click', () => {
    let newEl = document.createElement("li")
    let inputValue = inputField.value
    newEl.textContent = inputValue
    listEl.appendChild(newEl)
    clearInputField()

    push(endorsementInDB, inputValue)
})

function clearInputField(){
    inputField.value = ""
}

