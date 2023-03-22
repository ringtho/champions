const listEl = document.getElementById("list")
const publishBtn = document.getElementById("btn")
let inputField = document.getElementById("input-field")


publishBtn.addEventListener('click', () => {
    let newEl = document.createElement("li")
    let inputValue = inputField.value
    newEl.textContent = inputValue
    listEl.appendChild(newEl)
    inputField.value = ""
})

