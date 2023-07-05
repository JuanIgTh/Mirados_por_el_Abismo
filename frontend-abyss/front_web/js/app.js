const grid = document.querySelector('#grid-quotes');
const inputSearch = document.querySelector("#input-search");
let charactersJSON = [];

const getQuotes = () => {
    fetch("http://127.0.0.1:8800/api/quotes")
    .then(res => res.json())
    .then(data => {
        charactersJSON = data;
        printQuotes(charactersJSON);
    });
}

const printQuotes = (quotes) => {
    grid.innerHTML = "";
    quotes.forEach(quote => {
        grid.innerHTML += `
            <article class="background-${quote.author}">
                <div>
                    <p>${quote.quote}</p>
                </div>

                <div>
                <hr>
                    <div class="author-year">
                    
                        <div>
                    
                        <p>-${quote.author}</p>
                        <p>${quote.year}</p>
                        </div>

                        <div>
                        <button class="favorito-btn" onclick="toggleFavorito('${quote.id}')">
                            <i class="fa ${tarjetasFavoritas.includes(quote.id) ? 'fa-heart fa-2xl'  : 'fa-heart-o fa-2xl'}" style="color: #4f4f4f;"></i>
                        </button>
                        </div>
                    </div>
                </div>
            </article>
        `;
    });
}

const searchQuote = (event) => {
    event.preventDefault();
    const input = event.target;
    if (input.value.length >= 1) {
        let nameSearch = input.value.toLowerCase();
        filtrarPersonajes(nameSearch);
    } else if (input.value.length == 0) {
        init();
    }
}

window.onload = async () => {
    
    const respuesta = await fetch('http://127.0.0.1:8800/api/quotes');
    charactersJSON = await respuesta.json();
    init();
    getFavQuotes();
};

const filtrarPersonajes = () => {
    if (inputSearch.value === "") {
        printQuotes(charactersJSON);
        return;
    }
    const nuevaLista = charactersJSON.filter(e => {
        return e.author.toUpperCase().includes(inputSearch.value.toUpperCase());
    });
    printQuotes(nuevaLista);
};

const gridFav = document.querySelector('#grid-favs');
let tarjetasFavoritas = localStorage.getItem('tarjetasFavoritas');
tarjetasFavoritas = tarjetasFavoritas ? JSON.parse(tarjetasFavoritas) : [];

const getFavQuotes = () => {
    fetch("http://127.0.0.1:8800/api/quotes")
    .then(res => res.json())
    .then(data => {
        printFavQuotes(data);
    });
}

const printFavQuotes = (quotes) => {
    gridFav.innerHTML = "";
    const favQuotes = quotes.filter(quote => tarjetasFavoritas.includes(quote.id));
    favQuotes.forEach(quote => {
        const tarjetaElement = document.createElement('article');
        tarjetaElement.innerHTML = `
            <div>
                <p>${quote.quote}</p>
            </div>
            <hr>
            <div class="author-year">
                
                <p>-${quote.author}</p>
                <p>${quote.year}</p>
            </div>
        `;
        gridFav.appendChild(tarjetaElement);
    });
}

const searchFavQuote = (event) => {
    event.preventDefault();
    const input = event.target;
    if (input.value.length >= 1) {
        let nameSearch = input.value.toLowerCase();
        filtrarFavPersonajes(nameSearch);
    } else if (input.value.length == 0) {
        init();
    }
}

const filtrarFavPersonajes = () => {
    if (inputSearch.value === "") {
        printFavQuotes(charactersJSON);
        return;
    }
    const nuevaLista = charactersJSON.filter(e => {
        return e.author.toUpperCase().includes(inputSearch.value.toUpperCase());
    });
    printFavQuotes(nuevaLista);
};

function toggleFavorito(id) {
    const index = tarjetasFavoritas.findIndex(item => item === id);
    if (index > -1) {
        tarjetasFavoritas.splice(index, 1);
    } else {
        tarjetasFavoritas.push(id);
    }
    localStorage.setItem('tarjetasFavoritas', JSON.stringify(tarjetasFavoritas));
    renderFavoritos();
    printFavQuotes(charactersJSON);
}

function renderFavoritos() {
    const favoritosBtns = document.querySelectorAll('.favorito-btn');
    favoritosBtns.forEach(btn => {
        const id = btn.getAttribute('onclick').match(/'([^']+)'/)[1];
        const heartIcon = btn.querySelector('i');
        if (tarjetasFavoritas.includes(id)) {
            heartIcon.classList.remove('fa-heart-o');
            heartIcon.classList.add('fa-heart');
        } else {
            heartIcon.classList.remove('fa-heart');
            heartIcon.classList.add('fa-heart-o');
        }
    });
}

function init() {
    getQuotes();
    renderFavoritos();
    inputSearch.addEventListener("keyup", searchQuote);
}

init();
