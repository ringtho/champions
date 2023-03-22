
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js'
import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js'


const appSettings = {
    databaseURL: "https://playground-550b2-default-rtdb.europe-west1.firebasedatabase.app/"
}


const listEl = document.getElementById("list")
const publishBtn = document.getElementById("btn")
let inputField = document.getElementById("input-field")
let toInputField = document.getElementById("to")
let fromInputField = document.getElementById("from")

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementInDB = ref(database, "endorsements")

publishBtn.addEventListener('click', () => {
    let inputValue = inputField.value
    let fromValue = fromInputField.value
    let toValue = toInputField.value

    clearInputField()

    push(endorsementInDB, {input: inputValue, from: fromValue, to: toValue})
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
}

function clearEndorsementsList(){
    listEl.innerHTML = ""
}

function appendEndorsementsToList(item){
    let itemId = item[0]
    let itemValue = item[1]

    console.log(itemValue)

    let newEl = document.createElement("li")

    let newFromEl = document.createElement('h4')
    let newToEl = document.createElement('h4')
    let newValueEl = document.createElement('p')

    newFromEl.textContent = `From ${itemValue.from}`
    newToEl.textContent = `To ${itemValue.to}`
    newValueEl.textContent = itemValue.input

    newEl.append(newFromEl, newValueEl, newToEl)

    listEl.appendChild(newEl)


    newEl.addEventListener('dblclick', function(){
        let exactItemLocation = ref(database, `endorsements/${itemId}`)
        remove(exactItemLocation)
    })

    listEl.appendChild(newEl)
}

