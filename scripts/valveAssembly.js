class ValveAssembly{
    constructor(){
        this.station0 = {
            valve: null,
            flowControl: null,
            checkValve: null
        };
        this.station1 = {
            valve: null,
            flowControl: null,
            checkValve: null
        };
        this.station2 = {
            valve: null,
            flowControl: null,
            checkValve: null
        };
        this.station3 = {
            valve: null,
            flowControl: null,
            checkValve: null
        };
        this.station4 = {
            valve: null,
            flowControl: null,
            checkValve: null
        };
        this.station5 = {
            valve: null,
            flowControl: null,
            checkValve: null
        };
        this.voltage = null;
        this.numLvalves = 0;
        this.numFlwCtrl = 0;
    }

    reset(){
        this.station0 = {
            valve: null,
            flowControl: null,
            checkValve: null
        };
        this.station1 = {
            valve: null,
            flowControl: null,
            checkValve: null
        };
        this.station2 = {
            valve: null,
            flowControl: null,
            checkValve: null
        };
        this.station3 = {
            valve: null,
            flowControl: null,
            checkValve: null
        };
        this.station4 = {
            valve: null,
            flowControl: null,
            checkValve: null
        };
        this.station5 = {
            valve: null,
            flowControl: null,
            checkValve: null
        };
        this.voltage = null;

        return this
    }

    // GET DATA FROM JSON //
    async getValveData(){
        const uri = "data/valveData.json";
        const response = await fetch(uri);
        const data = await response.json();

        return data;
    }

    async getFilteredValveData(size, voltage){
        const data = await this.getValveData();

        let result = data.filter(valve => valve.valvePattern == size && valve.voltage == voltage);

        return result;
    }

    async getFlowControlData(){
        const uri = "data/flowControlData.json";
        const response = await fetch(uri);
        const data = await response.json();

        return data;
    }

    async getFilteredFlowControlData(size){
        const data = await this.getFlowControlData();

        let result = data.filter(valve => valve.valvePattern == size);

        return result;
    }

    async getCheckValveData(){
        const uri = "data/checkValveData.json";
        const response = await fetch(uri);
        const data = await response.json();

        return data;
    }

    // UPDATE DATA FOR AN INDIVIDUAL STATION OBJECT
    async updateStation(stationName, valveCode, flowControlCode = 0, checkValveCode = 0){
        const valveData = await this.getValveData();
        const flowControlData = await this.getFlowControlData();
        const checkValveData = await this.getCheckValveData();

        let valveArr = valveData.filter(valve => valve.code == valveCode);
        let flowControlArr = flowControlData.filter(flowControl => flowControl.code == flowControlCode);
        let checkValveArr = checkValveData.filter(checkValve => checkValve.code == checkValveCode);

        this[stationName] = {
            valve: valveArr[0],
            flowControl: flowControlArr[0],
            checkValve: checkValveArr[0]
        };

        return this[stationName];
    }

    // COUNT VALVES WITH L IN THE VALVE CODE TO USE IN HPU CALC
    countLValves(){

        let count = 0;

        const stationsArr = [
            this.station0, 
            this.station1, 
            this.station2, 
            this.station3, 
            this.station4, 
            this.station5
        ];

        stationsArr.forEach(station => {
            if(station.valve && station.valve.code && station.valve.code.includes('L')){
                count ++;
            }
        });

        this.numLvalves = count;

    }

    // COUNT FLOW CONTROLS TO USE IN HPU CALC
    countFlowControl(){
        let count = 0;

        const stationsArr = [
            this.station0, 
            this.station1, 
            this.station2, 
            this.station3, 
            this.station4, 
            this.station5
        ];

        stationsArr.forEach(station => {
            if(station.flowControl != null && station.flowControl.code != '0'){
                count ++;
            }
        });

        this.numFlwCtrl = count;

    }

    calcCost(){
        let cost = 0;

        const stationsArr = [
            this.station0, 
            this.station1, 
            this.station2, 
            this.station3, 
            this.station4, 
            this.station5
        ];

        stationsArr.forEach(station => {
            if(station.valve != null){
                cost += station.valve.cost + station.flowControl.cost + station.checkValve.cost
            };
        });

        return cost;

    }
    
}