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

        let result = data.filter(starter => starter.voltage == voltage && starter.HP >= hp);
        let selected = null;

        if(result.length == 0){
            console.log('No valid motor starter results.');
            displayErrorMsg('No valid motor starter results.');
        } else {
            selected = result.reduce((prev,curr) => (prev.HP < curr.HP) ? prev : curr);
        };

        this[motorName] = {
            starter: selected,
            leader: leaderName
        };

        return this[motorName];
    }

    // CALC TOTAL COST
    calcCost(){
        let cost = 0;

        const motorsArr = [
            this.motor1,
            this.motor2,
            this.motor3,
            this.motor4
        ];

        motorsArr.forEach(motor => {
            if(motor.starter){
                if(motor.starter.cost){
                    cost += motor.starter.cost;
                }
            };
        });

        return cost;

    }

    buildPartNum(){
        // Returns string
        
        const partNum = 'MS-###';

        return partNum;
    }

}