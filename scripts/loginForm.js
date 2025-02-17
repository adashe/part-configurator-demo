const loginPopup = document.querySelector('.login-popup-wrapper');
const loginForm = document.querySelector('#login-form');

const admin = new User(username='admin', password='banana-pancakes');
const dist = new User(username='dist', password='suncoast-dist-4130');

let currentUser = null;

loginForm.addEventListener('click', e => {
    e.preventDefault();

    let un = loginForm.username.value;
    let pw = loginForm.password.value;

    login(un, pw);

    if(un == 'admin' && admin.loggedIn == true){
        currentUser = admin;
        loginPopup.style.display = 'none'
    }

    if(un == 'dist' && admin.loggedIn == true){
        currentUser = dist;
        loginPopup.style.display = 'none'
    }

});

const displayLoginDiv = () => {
    loginPopup.style.display = 'block';
};