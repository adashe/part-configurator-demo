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
        this.enclosure = null;
        this.base = null;
        this.disconnect = null;
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
        this.enclosure = null;
        this.base = null;
    }

    // GET DATA FROM JSON //
    async getMotorStarterData(){
        const uri = "data/motorStarterData.json";
        const response = await fetch(uri);
        const data = await response.json();

        return data;
    }

    async getMotorStarterEnclosureData(){
        const uri = "data/motorStarterEnclosureData.json";
        const response = await fetch(uri);
        const data = await response.json();

        return data;
    }

    async getMotorStarterBaseData(){
        const uri = "data/motorStarterBaseData.json";
        const response = await fetch(uri);
        const data = await response.json();

        return data;
    }

    async getMotorStarterDisconnectData(){
        const uri = "data/motorStarterDisconnectData.json";
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

    // UPDATE BASE
    async updateBase(voltage){
        const data = await this.getMotorStarterBaseData()

        let result = data.filter(base => base.voltage == voltage);

        this.base = result[0];

        return this.base
    }

    // UPDATE ENCLOSURE
    async updateEnclosure(numStarters){
        const data = await this.getMotorStarterEnclosureData();

        // Calculate the maximum enclosure y value from motor assembly
        const motorsArr = [this.motor1, this.motor2, this.motor3, this.motor4];
        let yArr = [];

        motorsArr.forEach(motor => {
            if(motor.starter){
                if(motor.starter.enclosureY){
                    yArr.push(motor.starter.enclosureY);
                };
            };
        });

        const maxY = Math.max(...yArr);
        console.log(...yArr);
        console.log('maxY', maxY);

        let result;

        // Select enclosre based on maxY and number of starters
        if(maxY == 24){
            result = data.filter(enclosure => enclosure.code == "24H");
        } else if(maxY == 20){
            if(numStarters > 2){
                result = data.filter(enclosure => enclosure.code == "24H");
            } else if(numStarters <= 2){
                result = data.filter(enclosure => enclosure.code == "20H");
            };
        } else if(maxY == 16){
            if(numStarters == 4){
                result = data.filter(enclosure => enclosure.code == "24H");
            } else if(numStarters == 3){
                result = data.filter(enclosure => enclosure.code == "18H");
            } else if(numStarters < 3){
                result = data.filter(enclosure => enclosure.code == "16H");
            }
        };

        this.enclosure = result[0];

        return this.enclosure;
    }

    // UPDATE DISCONNECT
    async updateDisconnect(){
        const data = await this.getMotorStarterDisconnectData();

        let totalAmp = 0;

        const motorsArr = [
            this.motor1,
            this.motor2,
            this.motor3,
            this.motor4
        ];

        motorsArr.forEach(motor => {
            if(motor.starter){
                if(motor.starter.FLA){
                    totalAmp += motor.starter.FLA;
                };
            };
        });

        totalAmp += this.base.amperage;

        let result = data.filter(disconnect => disconnect.FLA >= totalAmp);

        this.disconnect = result.reduce((prev, curr) => (prev.FLA < curr.FLA) ? prev : curr);

        return this.disconnect;
    }

    // CALC TOTAL COST
    calcCost(){
        let cost = 0;

        // Add cost of base, enclosure, and disconnect
        cost += this.base.cost + this.enclosure.cost + this.disconnect.cost;

        // Add cost of each motor starter
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
                };
            };
        });

        return cost;
    }

    buildPartNum(){
        // Returns string

        const motorsArr = [
            this.motor1,
            this.motor2,
            this.motor3,
            this.motor4
        ];

        let partNum = `MS-${this.base.voltage}-${this.enclosure.code}`;

        motorsArr.forEach(motor => {
            if(motor.starter){
                partNum += `-${motor.starter.HP}`
            };

            if(motor.leader){
                partNum +=`L${motor.leader}`;
            };
        });
        
        return partNum;
    }

}