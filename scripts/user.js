class User{
    constructor(){
        username = null,
        password = null,
        loggedIn = false;
    }

    login(un, pw){
        if(un === this.username && pw === this.password){
            loggedIn = true;
        } else {
            displayErrorMsg("Invalid username or password");
        }
    }
}