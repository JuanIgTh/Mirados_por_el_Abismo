import QuoteService from "./services/QuoteService.js";
import Loading from "./components/Loading.js";
import { scrollToHash } from "./util.js";
const listContainer = document.querySelector('#list-container');
const btnInsert = document.querySelector('#btn-insert');
const btnUpdate = document.querySelector('#btn-update');
const btnCancel = document.querySelector('#btn-cancel');
const messageAlert = document.querySelector('#message');
const form = document.querySelector('#frm-item');
const inputSearch = document.querySelector("#input-search");
const loadingObj = new Loading("modal-message", "Loading...")
const inputName = document.querySelector('#field-name');


let currentQuote = null;

const newQuote = () => {
    const author = document.querySelector('#field-description').value;
    const year = document.querySelector('#field-developer').value;
    const quote = document.querySelector('#field-name').value;
    
    const quotes = {author, year, quote};
    console.log("quotes", quotes);
    loadingObj.open();
    QuoteService.insert(quotes).then(data => {
        console.log("message", data);
        renderQuotes();
        form.reset();
        scrollToHash("title-list");
    }).finally(() => {
        loadingObj.close();
    });
}

const editQuote = (id) => {
    QuoteService.getItemById(id).then(data => {
        currentQuote = data;
        document.querySelector('#field-name').value = data.quote;
        document.querySelector('#field-developer').value = data.year;
        document.querySelector('#field-description').value = data.author;
        //country
    });
    btnInsert.classList.replace("d-inline", "d-none");
    btnUpdate.classList.replace("d-none", "d-inline");
    btnCancel.classList.replace("d-none", "d-inline");
    scrollToHash("title-form");
}

const updateQuote = () => {
    const id = currentQuote.id;
    const author = document.querySelector('#field-description').value;
    const year = document.querySelector('#field-developer').value;
    const quote = document.querySelector('#field-name').value;
    const quotes = {id, author, year, quote};

    QuoteService.update(quotes).then(data => {
        currentQuote = null;
        messageAlert.textContent = data.message;
        btnCancel.classList.replace("d-inline", "d-none");
        btnUpdate.classList.replace("d-inline", "d-none");
        btnInsert.classList.replace("d-none", "d-inline");
        form.reset();
        renderQuotes();
    });

}

const deleteQuote = (id) => {
    QuoteService.delete(id)
        .then(data => {
            messageAlert.textContent = data.message;
            //Change state
            renderQuotes();
        })
}

const populateQuotes = (items) => {
    items.forEach((e, i) => {
        listContainer.innerHTML += `
            <tr>
                <td>${i + 1}</td>
                <td>${e.quote}</td>
                <td>${e.author}</td>
                <td>${e.year}</td>
                <td class="text-center">
                    <button id="btn-delete-${e.id}" class="btn btn-danger btn-delete">Delete</button>
                    <button id="btn-edit-${e.id}" class="btn btn-info btn-edit" >Edit</button>
                </td>
            </tr>
        `;
    });

    // Buttons delete
    const buttonsDelete = document.querySelectorAll('.btn-delete');
    buttonsDelete.forEach(button => {
        button.addEventListener("click", function () {
            let id = this.id.split("-")[2];
            deleteQuote(id);
        })
    });

    // Buttons Edit
    const buttonsEdit = document.querySelectorAll('.btn-edit');
    buttonsEdit.forEach(button => {
        button.addEventListener("click", function () {
            let id = this.id.split("-")[2];
            editQuote(id);
        })
    });
}

const renderQuotes = (searchValue) => {
    listContainer.innerHTML = "";
    if (searchValue) {
        loadingObj.open();
        QuoteService.searchItemByName(searchValue)
            .then(items => {
                
                populateQuotes(items);
            }).finally(() => {
                loadingObj.close();
            });
    } else {
        loadingObj.open();
        QuoteService.getItemsList()
            .then(items => {
                populateQuotes(items);
            }).finally(() => {
                loadingObj.close();
            });
    }
}
const validateForm = (event) => {
    event.preventDefault();
    // Validate each field
    if(!inputName.validity.valid) {
        alert("Nombre no válido");
        inputName.focus();
        return false;
    }

  
    //Execute insert or update depends to button name 
    if (event.target.id === "btn-insert") {
        newQuote();
    } else if (event.target.id === "btn-update") {
        updateQuote();
    }else{
        console.log("id button not found in validateForm function");
    }
}

const searchQuote = (event) => {
    event.preventDefault();
    const input = event.target;
    if (input.value.length >= 3) {
        let nameSearch = input.value.toLowerCase();
        renderQuotes(nameSearch);
    } else if (input.value.length == 0) {
        renderQuotes();
    }
}
/*
const renderGategoriesSelect = () => {
    selectCategory.innerHTML = "";
    loadingObj.open();
    QuoteService.getItemsList()
        .then(items => {
            items.forEach(cat => {
                selectCategory.innerHTML+=`
                    <option value="${cat.id}">${cat.author}</option>
                `;
            });
            
        }).finally(() => {
            loadingObj.close();
        });
    
}*/ 

function init() {
    renderQuotes();
    btnCancel.addEventListener("click", function (e) {
        currentQuote = null;
        messageAlert.textContent = "";
        btnCancel.classList.replace("d-inline", "d-none");
        btnUpdate.classList.replace("d-inline", "d-none");
        btnInsert.classList.replace("d-none", "d-inline");
        form.reset();
    });

    inputSearch.addEventListener("keyup", searchQuote);
    btnInsert.addEventListener("click", validateForm);
    btnUpdate.addEventListener("click", validateForm);
    // Reiniciamos el formulario por si hay datos precargados
    form.reset();

   

}

init();