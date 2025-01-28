
class HPUNumber{
    constructor(){
        this.reservoir = null;
        this.pump = null;
        this.motor = null;
        this.manifold = null;
        this.heatExchanger = null;
        this.valves = [];
    }

    // GET DATA FROM JSON //
    async getReservoirData(){
        const uri = "data/reservoirData.json";
        const response = await fetch(uri);
        const data = await response.json();
        return data;
    }

    async getPumpData(){
        const uri = "data/pumpData.json";
        const response = await fetch(uri);
        const data = await response.json();
        return data;
    }

    async getMotorData(){
        const uri = "data/motorData.json";
        const response = await fetch(uri);
        const data = await response.json();
        return data;
    }

    async getManifoldData(){
        const uri = "data/manifoldData.json";
        const response = await fetch(uri);
        const data = await response.json();
        return data;
    }

    async getHeatExchangerData(){
        const uri = "data/heatExchangerData.json";
        const response = await fetch(uri);
        const data = await response.json();
        return data;
    }

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


    // CALCULATE PART NUMBER //
    async calcReservoir(maxFl){
        const data = await this.getReservoirData();

        // calculation //
        // let reservoirCapacity = pump.gpm@1750
        // select reservoir with smallest greater than capacity


        if(this.pump == null){
            console.log('Cannot calculate reservoir without pump.');
            return this.reservoir;
        }

        const minCap = this.pump.gpm1750;
        // console.log('minCap:', minCap);

        let result = data.filter(reservoir => reservoir.capacity >= minCap);

        if(result.length == 0){
            console.log('No valid reservoir results.');
            alert('No valid reservoir results.');
        } else {
            this.reservoir = result.reduce((prev, curr) => (prev.capacity < curr.capacity) ? prev : curr);
        };

        // console.log('reservoir', this.reservoir);

        return this.reservoir;
    }

    async calcPump(maxPres, maxFl, appType){
        const data = await this.getPumpData();

        // calculation //
        // if maxPressure >= 1500 or if sysType == 'pressure holding':
        // use gear pump table
        // else use piston pump table
        // find smallest displacement greater than minDis
        // if minDis is greater than available values, 'flow is too high'

        const rotationSpeed = 1750;
        const minDis = 231 * maxFl / rotationSpeed;

        // console.log('minDis:', minDis);

        let result = [];

        if(maxPres >= 1500 || appType == 'pressure-holding'){
            result = data.filter(pump => pump.type == "gear" && pump.dispCID >= minDis);
        } else {
            result = data.filter(pump => pump.type == 'piston' && pump.dispCID >= minDis);
        };

        if(result.length == 0){
            console.log('Cannot calculate pump, flow is too high.');
            alert('Cannot calculate pump, flow is too high.');
        } else {
            this.pump = result.reduce((prev, curr) => (prev.dispCID < curr.dispCID) ? prev : curr);
        };

        // console.log('pump', this.pump);

        return this.pump;
    }

    async calcMotor(maxPres, maxFl){
        const data = await this.getMotorData();

        // calculation //
        // if pump mount type SAE == A: use F motors (first table)
        // if pump mount type SAE == B: use M motors (second table)
        // select motor with output HP within 10% of minHP

        if(this.pump == null){
            console.log('Cannot calculate motor without pump.');
            this.motor = null;
            return this.motor;
        }

        // minHIP includes 10% fudge factor 
        const minHP = (maxPres * maxFl / 1714 * 0.85) - .1;
        // console.log('minHP:', minHP);

        let result = [];

        if(this.pump.mountType == 'SAE A'){
            result = data.filter(motor => motor.type == "MF" && motor.outputHP >= minHP);
        } else if (this.pump.mountType == 'SAE B'){
            result = data.filter(motor => motor.type == "MTC" && motor.outputHP >= minHP);
        } else {
            console.log('Cannot calculate motor without pump mount type');
        };

        if(result.length == 0){
            this.motor = null;
            console.log('No valid motor results');
            alert('No valid motor results');
        } else {
            this.motor = result.reduce((prev, curr) => (prev.outputHP < curr.outputHP) ? prev : curr);
        };

        // console.log('motor', this.motor);

        return this.motor;
    }

    async calcManifold(numSt, portSz){
        const data = await this.getManifoldData();

        // calculation //
        // port size D03 can use 0-6 stations
        // select manifold with selected number of stations
        // port size D05 can use 0-1 station
        // select manifold with selected number of stations
        // 0 means no valves // add null row

        if(numSt == 0){
            this.manifold = data[0];
            // console.log('numSt is 0');
            return this.manifold;
        }

        let result = [];

        if(portSz == 'D03'){
            // console.log('port size is D03');
            result = data.filter(manifold => manifold.valvePattern == 'D03' && manifold.numStations == numSt);
            this.manifold = result[0];
        } else if(portSz == 'D05'){
            // console.log('port size is D05');
            result = data.filter(manifold => manifold.valvePattern == 'D05' && manifold.numStations == numSt);
            this.manifold = result[0];
        } else {
            console.log('Cannot calculate manifold without port size');
        };

        // console.log('manifold', this.manifold);

        return this.manifold;
    }

    async calcHeatExchanger(maxPres, maxFl, htExType, lenFlowCtrl){
        const data = await this.getHeatExchangerData();

        // calculation //

        // constants
        // Base multiplier	= 15%
        // Adder for > 1000 psi	= 2% (.02)
        // Adder for > 2000 psi	= 5% (.05)
        // Adder per flow control	= 2% (.02)
        // Adder per L spool Valve	= -10%

        // Calculate adder 1
        // L valves = num valves with L spool (contains L in code)
        // ADDER 1 = #Lspools * L spool multiplier (above)
        let numL = 0;

        this.valves.forEach(valve => {
            if(valve.code.includes('L')){
                numL ++;
            }
            return numL;
        })

        // console.log('NUM L VALVES', numL);

        const adder1 = numL * -.1;

        // Calculate adder 2
        // ADDER 2 = if max pressure > 2000, use 5%, if max pressure > 1000 use 2%, if neither use 0%
        let adder2 = 0;

        if(maxPres > 2000){
            adder2 = .05;
        } else if (maxPres > 1000){
            adder2 = .02;
        } else {
            adder2 = 0;
        }

        // Calculate adder 3
        // ADDER 3 = total num flow controls * flow control adder value (above)
        const adder3 = lenFlowCtrl * .02;

        // needed dissipation = minHP (from motor calc) * (base multiplier + ADDER1 + ADDER2 + ADDER3) 
        const minHP = (maxPres * maxFl / 1714 * 0.85);
        const baseMult = .15;
        const minHtDis = minHP * (baseMult + adder1 + adder2 + adder3);

        // reservoir heat dissipation (reservoir table)
        // value = needed dissipation - reservoir dissipation 
        const reqDis = minHtDis - this.reservoir.heatDis;

        // console.log('reqDis:', reqDis);

        // if value is negative, you don't need a heat exchanger ==> select 0 from table
        if(reqDis <= 0){
            this.heatExchanger = data[0];
            return this.heatExchanger;
        };
        
        // if value is positive: 
            // look up heat exchanger with the smallest greater than heat dissipation in the matching cooling type table
        // if no cooling type, use 0 for heat exchanger
        let result = [];

        if(htExType == 'air'){
            result = data.filter(exchanger => exchanger.type == "AIR" && exchanger.heatDis >= reqDis);
        } else if (htExType = 'water'){
            result = data.filter(exchanger => exchanger.type == "WATER" && exchanger.heatDis >= reqDis);
        } else {
            this.heatExchanger = data[0];
            return this.heatExchanger;
        };

        if(result.length == 0){
            console.log('No valid heat exchanger results');
            alert('No valid heat exchanger results');
        } else {
            this.heatExchanger = result.reduce((prev, curr) => (prev.heatDis < curr.heatDis) ? prev : curr);
        };

        // final calculation of needed dissipation cannot be less than 0

        // console.log('heat exchanger', this.heatExchanger);

        return this.heatExchanger;
    }

    calcCost(){
        let prices = [];
        let totalCost = 0;

        if(this.reservoir.code.includes('H')){
            prices = [this.pump.hCost, this.motor.hCost, this.manifold.hCost, this.heatExchanger.hCost];
        } else if (this.reservoir.code.includes('V')){
            prices = [this.pump.vCost, this.motor.vCost, this.manifold.vCost, this.heatExchanger.vCost];
        };

        if(prices.includes(null)){
            console.log('Invalid configuration.');
            alert('Invalid configuration.')
        } else {
            totalCost = prices.reduce((x, y) => x + y, totalCost);
        }

        console.log('prices', prices);
        console.log('total cost', totalCost);

        return totalCost.toFixed(2);
    }

    async calcHpuNum(maxPres, maxFl, appType, htExType, numSt, portSz, lenFlowCtrl, ){

        // console.log(maxPres, maxFl, hydrType, numSt, portSz, numFlwCtrl, htExType);

        await this.calcPump(maxPres, maxFl, appType);
        await this.calcMotor(maxPres, maxFl);
        await this.calcReservoir(maxFl);
        await this.calcManifold(numSt, portSz);
        await this.calcHeatExchanger(maxPres, maxFl, htExType, lenFlowCtrl);

        return this;
    }

    // UPDATE PART NUMBER //
    async updateReservoir(idx){
        const data = await this.getReservoirData();
        this.reservoir = data[idx];

        return this;
    }

    async updatePump(idx){
        const data = await this.getPumpData();
        this.pump = data[idx];

        return this;
    }

    async updateMotor(idx){
        const data = await this.getMotorData();
        this.motor = data[idx];

        return this;
    }

    async updateManifold(idx){
        const data = await this.getManifoldData();
        this.manifold = data[idx];

        return this;
    }

    async updateHeatExchanger(idx){
        const data = await this.getHeatExchangerData();
        this.heatExchanger = data[idx];

        return this;
    }

    async updateValves(idx){
        const data = await this.getValveData();
        this.valves.push(data[idx]);

        return this;
    }
}