import  * as UserService  from './services/UserService.js';
const btnLogin = document.querySelector('#btn-login');
const btnLogout = document.querySelector('#btn-logout');
const btnShowLogin = document.querySelector('#btn-show-login');

const btnRegister = document.querySelector('#btn-register');
const btnShowRegister = document.querySelector('#btn-show-register');

const pageLogin = document.querySelector('#page-login');
const pageRegister = document.querySelector('#page-register');
const pageAdmin = document.querySelector('#page-admin');

const userName = document.querySelector('#user-name');
let userData = null;

const links ={
    
    "QUOTE": "man-quotes.html"
}

function init() {
    // Botón login
    btnLogin.addEventListener("click", function(){
        const email = document.querySelector('#field-login-email').value;
        const password = document.querySelector('#field-login-password').value;
        const params={email, password};
        UserService.login(params).then(data=>{
            if (!data.error){
                pageLogin.classList.replace("d-flex", "d-none");
                pageAdmin.classList.replace("d-none", "d-block");
                userName.innerHTML=data.user.name +" " + data.user.surname;
                userData=data.user;

            }else{
                alert(data.message);
            }
        });
    });

    // Botón register
    btnRegister.addEventListener("click", function(){
        const name = document.querySelector('#field-register-name').value;
        const surname = document.querySelector('#field-register-surname').value;
        const email = document.querySelector('#field-register-email').value;
        const password = document.querySelector('#field-register-password').value;
        const params={name, surname, email, password};
        UserService.register(params).then(data=>{
            if (!data.error){
                pageRegister.classList.replace("d-flex", "d-none");
                pageAdmin.classList.replace("d-none", "d-block");
                userName.innerHTML=data.user.name +" " + data.user.surname;
                userData=data.user;
            }else{
                alert(data.message);
            }
        });
    });

    // Botón logout
    btnLogout.addEventListener("click", ()=>{
        document.querySelector('#field-login-email').value="";
        document.querySelector('#field-login-password').value="";
        pageLogin.classList.replace("d-none", "d-flex");
        pageAdmin.classList.replace("d-block", "d-none");
    });

    // Mostrar pantalla registro
    btnShowRegister.addEventListener("click", ()=>{
        pageLogin.classList.replace("d-flex", "d-none");
        pageRegister.classList.replace("d-none", "d-flex");
    })

    // Mostrar pantalla login
    btnShowLogin.addEventListener("click", ()=>{
        pageRegister.classList.replace("d-flex", "d-none");
        pageLogin.classList.replace("d-none", "d-flex");
    })

    // Preparamos los enlaces a partir de un array
    const items = document.querySelectorAll('.nav-link');
    items.forEach(e => {
        e.addEventListener("click", function(event) {
            document.querySelector('.nav-link.active').classList.replace("active", "text-white");
            this.classList.replace("text-white", "active");
            document.querySelector('#current-page').src=links[this.dataset.link];
        })
    });
}
init();