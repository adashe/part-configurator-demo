class MsAssembly{
    constructor(){
        this.motor1 = {
            starter: null,
            leader: null
        };
        this.motor2 = {
            starter: null,
            leader: null
        };
        this.motor3 = {
            starter: null,
            leader: null
        };
        this.motor4 = {
            starter: null,
            leader: null
        };
    }

    reset(){
        this.motor1 = {
            starter: null,
            leader: null
        };
        this.motor2 = {
            starter: null,
            leader: null
        };
        this.motor3 = {
            starter: null,
            leader: null
        };
        this.motor4 = {
            starter: null,
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

    // UPDATE DATA FOR AN INDIVIDUAL MOTOR OBJECT
    async updateMotor(motorName, voltage, hp, leaderName){
        const data = await this.getMotorStarterData();

        let result = data.filter(starter => starter.voltage == voltage && starter.HP == hp);

        this[motorName] = {
            starter: result[0],
            leader: leaderName
        };

        return this[motorName];
    }

}