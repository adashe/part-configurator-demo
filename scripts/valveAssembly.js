class ValveAssembly{
    constructor(){
        this.assembly = null;
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

    async updateStation(stationName, valveCode, flowControlCode = null, checkValveCode = null){
        const valveData = await getValveData();
        const flowControlData = await getFlowControlData();
        const checkValveData = await getCheckValveData();

        let valve = valveData.filter(valve => valve.code == valveCode);
        let flowControl = flowControlData.filter(flowControl => flowControl.code == flowControlCode);
        let checkValve = checkValveData.filter(checkValve => checkValve.code == checkValveCode);

        this.stations[stationName] = {
            valve,
            flowControl,
            checkValve
        };

        return this;
    }

    async 
    
}