const grid = document.querySelector('#grid-quotes');
const getQuotes = () => {
    fetch("http://127.0.0.1:8800/api/quotes")
    .then(res=>res.json())
    .then(data=>{
            printQuotes(data);
        }
    );
}

const printQuotes = (quotes) => {
    grid.innerHTML="";
    quotes.forEach(quote => {
        grid.innerHTML+=`
            <article >
                <p>${quote.quote}</p>
                <p>${quote.author}</p>
                <p>${quote.year}</p>
            </article>
        `;
    });
}

function init() {
    getQuotes();
}
init();