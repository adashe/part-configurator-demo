const loginPopup = document.querySelector('.login-popup-wrapper');
const loginForm = document.querySelector('#login-form');
const loginErrorMsg = document.querySelector('#login-error');

const userStatus = document.querySelector('#user-status');
const logoutBtn = document.querySelector('#logout');

const currentUser = new User();

// Login if user is in session
let savedUser = null;
let parsedUser = null;

try{
    loginFromSessionStorage();
} catch (error){
    console.error(error);
}

async function loginFromSessionStorage(){
    savedUser = sessionStorage.getItem("currentUser");
    let parsedUser = JSON.parse(savedUser);

    if(parsedUser){
        loginUser(parsedUser.username, parsedUser.password);
    } else {
        sessionStorage.clear();
    }
};


// Login when login form is submitted
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
        sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
        loginPopup.style.display = 'none';
        userStatus.innerHTML = `Signed in as: ${currentUser.username}`;
    };
};

logoutBtn.addEventListener('click', e => {
    sessionStorage.clear();
    window.location.reload();
})