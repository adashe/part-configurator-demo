const loginPopup = document.querySelector('.login-popup-wrapper');
const loginForm = document.querySelector('#login-form');
const loginErrorMsg = document.querySelector('#login-error');

const userStatus = document.querySelector('#user-status');

const currentUser = new User();

loginForm.addEventListener('submit', e => {
    e.preventDefault();

    let un = loginForm.username.value;
    let pw = loginForm.password.value;

    loginUser(un, pw);

});

async function loginUser(un, pw){

    await currentUser.login(un, pw);

    if(!currentUser.username){
        loginErrorMsg.innerHTML = 'Invalid username or password';
    } else if(currentUser.username){
        loginPopup.style.display = 'none';
        userStatus.innerHTML = `Signed in as: ${currentUser.username}`;
    };
};