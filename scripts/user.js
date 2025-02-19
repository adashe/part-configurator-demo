class User{
    constructor(){
        this.username = null,
        this.userType = null
    }

    async getUserData(){
        const uri = "data/userData.json";
        const response = await fetch(uri);
        const data = await response.json();
        return data;
    }

    async login(un, pw){
        const data = await this.getUserData();

        let result = data.filter(user => user.username === un && user.password === pw)

        if(result.length == 0){
            return this;
        } else {
            this.username = result[0].username;
            this.userType = result[0].userType;
        }

        return this;
    }
}