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
    async updateStation(stationName, valveCode, flowControlCode = null, checkValveCode = null){
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

        return this;
    } 

    // RETURN NUMBER OF VALVES WITH L IN THE VALVE CODE TO USE IN HPU CALC
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

        return count;

    }

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
            if(station.flowControl){
                count ++;
            }
        });

        console.log('num flow control', count);

        return count;

    }
    
}