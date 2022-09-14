window.addEventListener("beforeunload", save)

let accountsTableBody = document.querySelector("#accounts-table-body")

let allLinks = document.querySelectorAll(".nav-link")
let views = document.querySelectorAll(".view")

let idInput = document.querySelector('[placeholder="id"]')
let nameInput = document.querySelector('[placeholder="name')
let lastnameInput = document.querySelector('[placeholder="lastname"]')
let emailInput = document.querySelector('[placeholder="email"]')
let phoneInput = document.querySelector('[placeholder="phone"]')
let saveBtn = document.querySelector("#save")

let editId = document.querySelector(".edit-id")
let editName = document.querySelector(".edit-name")
let editLastname = document.querySelector(".edit-lastname")
let editEmail = document.querySelector(".edit-email")
let editPhone = document.querySelector(".edit-phone")
let editBtn = document.querySelector("#edit")
let id

editBtn.addEventListener("click", saveEditedAccount)
saveBtn.addEventListener("click", saveAccount)

function saveEditedAccount() {
    const edited_account = {
        id : editId.value,
        name : editName.value,
        lastname : editLastname.value,
        email : editEmail.value,
        phone : editPhone.value
    }
    
    db[id] = edited_account
    createAccountsTable()
    showView("#accounts-view")
}

function saveAccount() {
    const new_account = {
        id : idInput.value,
        name : nameInput.value,
        lastname : lastnameInput.value,
        email : emailInput.value,
        phone : phoneInput.value
    }
    db.push(new_account)
    idInput.value = ""
    nameInput.value = ""
    lastnameInput.value = ""
    emailInput.value = ""
    phoneInput.value = ""

    createAccountsTable()
    showView("#accounts-view")
}

for(let i = 0; i < allLinks.length; i++) {
    allLinks[i].addEventListener("click", showView)
}

function showView(e) {
    for(let i = 0; i < views.length; i++) {
        views[i].style.display = "none"
    }
    if(e instanceof Event) {
        e.preventDefault()
        let id = `#${e.target.getAttribute("href")}`
        document.querySelector(id).style.display = "block"
    } else {
        document.querySelector(e).style.display = "block"
    } 
    
}


createAccountsTable()

function createAccountsTable() {
    let htmlAccounts = ``

    for(let i = 0; i < db.length; i++) {
        const account = db[i]
        htmlAccounts += `
            <tr>
                <td>${account.id}</td>
                <td>${account.name}</td>
                <td>${account.lastname}</td>
                <td>${account.email}</td>
                <td>${account.phone}</td>
                <td><button data-id="${i}" class="edit-btn btn btn-sm btn-warning form-control">Edit</button></td>
                <td><button data-id="${i}" class="delete-btn btn btn-sm btn-danger form-control">Delete</button></td>
            </tr>
        `
    }

    accountsTableBody.innerHTML = htmlAccounts
    let allEditBtns = document.querySelectorAll(".edit-btn")
    let allDeleteBtns = document.querySelectorAll(".delete-btn")

    for(let i = 0; i < allDeleteBtns.length; i++) {
        allDeleteBtns[i].addEventListener("click", deleteAccount)
        allEditBtns[i].addEventListener("click", editAccount)
    }
}

function deleteAccount() {
    let id = this.getAttribute("data-id")
    db.splice(id, 1)
    createAccountsTable()
    showView("#accounts-view")
}

function editAccount() {
    id = this.getAttribute("data-id")
    const selected_account = db[id]

    editId.value = selected_account.id
    editName.value = selected_account.name
    editLastname.value = selected_account.lastname 
    editEmail.value = selected_account.email
    editPhone.value = selected_account.phone

    showView("#edit-account-view")
}

function save() {
    localStorage.db = JSON.stringify(db)
}


