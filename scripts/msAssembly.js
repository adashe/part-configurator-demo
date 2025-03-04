class MsAssembly{
    constructor(){
        this.starter1 = {
            voltage: null,
            leader: null
        };
        this.starter2 = {
            voltage: null,
            leader: null
        };
        this.starter3 = {
            voltage: null,
            leader: null
        };
        this.starter4 = {
            voltage: null,
            leader: null
        };
    }

    reset(){
        this.starter1 = {
            voltage: null,
            leader: null
        };
        this.starter2 = {
            voltage: null,
            leader: null
        };
        this.starter3 = {
            voltage: null,
            leader: null
        };
        this.starter4 = {
            voltage: null,
            leader: null
        };
    }

    // GET DATA FROM JSON //
    async getMotorStarterData(){
        const uri = "data/motorStarterData.json";
        const response = await fetch(uri);
        const data = await response.json();

        return data;
    }

}