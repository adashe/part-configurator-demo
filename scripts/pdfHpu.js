const pdfHpuDiv = document.querySelector('#pdf-hpu-div');
const pdfValveDiv = document.querySelector('#pdf-valve-div');

const pdfTotalListPriceDiv = document.querySelector('#pdf-total-list-price-div');

const generateHpuPdf = () => {
    fillHpuPdfDets();
    fillValvePdfDets();
    fillHpuTotalCostPdfDets();
};

const fillHpuPdfDets = () => {

    // Determine individual item cost based on V or H reservoir
    let reservoirCost = null;
    let pumpCost = null;
    let protoMotorCost = null;
    let manifoldCost = null;
    let heatExchangerCost = null;

    const filterCost = () => {
        if(hpuAssem.reservoir.code.includes('H')){
            reservoirCost = hpuAssem.reservoir.hCost.toFixed(2);
            pumpCost = hpuAssem.pump.hCost.toFixed(2);
            protoMotorCost = hpuAssem.motor.hCost.toFixed(2);
            manifoldCost = hpuAssem.manifold.hCost.toFixed(2);
            heatExchangerCost = hpuAssem.heatExchanger.hCost.toFixed(2);
        } else if (hpuAssem.reservoir.code.includes('V')){
            reservoirCost = hpuAssem.reservoir.vCost.toFixed(2);
            pumpCost = hpuAssem.pump.vCost.toFixed(2);
            protoMotorCost = hpuAssem.motor.vCost.toFixed(2);
            manifoldCost = hpuAssem.manifold.vCost.toFixed(2);
            heatExchangerCost = hpuAssem.heatExchanger.vCost.toFixed(2);
        };
    };

    filterCost();

    // Add adapter cost to SAE B motor types
    let motorCost = null; 

    if(hpuAssem.pump.mountType == 'SAE A' && hpuAssem.motor.type == 'MF'){
        motorCost = protoMotorCost;
    } else if(hpuAssem.pump.mountType == 'SAE A' && hpuAssem.motor.type == 'MTC'){
        motorCost = (parseFloat(protoMotorCost) + hpuAssem.motor.SAEAadapterCost).toFixed(2);
    } else if(hpuAssem.pump.mountType == 'SAE B'){
        motorCost = (parseFloat(protoMotorCost) + hpuAssem.motor.SAEBadapterCost).toFixed(2);
    };

    pdfHpuDiv.innerHTML = '';
        
    const hpuHeaderHTML = `<h2>HPU SELECTION: N-${hpuAssem.reservoir.code}-${hpuAssem.pump.code}-${hpuAssem.motor.code}-${hpuAssem.manifold.code}-${hpuAssem.heatExchanger.code}</h2>`;

    const reservoirHTML = `
        <h3>RESERVOIR: ${hpuAssem.reservoir.code}</h3>
        <ul>
            <li>Capacity: ${hpuAssem.reservoir.capacity}</li>
            <li>Heat Dissipation: ${hpuAssem.reservoir.heatDis}</li>
            <li>Price: $${reservoirCost}</li>
        </ul>
    `;

    const pumpHTML = `
        <h3>PUMP: ${hpuAssem.pump.code}</h3>
        <ul>
            <li>Part Number: ${hpuAssem.pump.partNum}</li>
            <li>Description: ${hpuAssem.pump.description}</li>
            <li>Dissipation: ${hpuAssem.pump.dispCID}</li>
            <li>Mount Type: ${hpuAssem.pump.mountType}</li> 
            <li>Price: $${pumpCost}</li>
        </ul> 
    `;

    const motorHTML = `
        <h3>MOTOR: ${hpuAssem.motor.code}</h3>
        <ul>
            <li>Part Number: ${hpuAssem.motor.partNum}</li>
            <li>Description: ${hpuAssem.motor.description}</li>
            <li>Output HP: ${hpuAssem.motor.outputHP}</li>
            <li>Price: $${motorCost}</li>
        </ul>
    `;

    const manifoldHTML = `
        <h3>MANIFOLD: ${hpuAssem.manifold.code}</h3>
        <ul>
            <li>Description: ${hpuAssem.manifold.description}</li>
            <li>Valve Pattern: ${hpuAssem.manifold.valvePattern}</li>
            <li>Number of Stations: ${hpuAssem.manifold.numStations}</li>
            <li>Price: $${manifoldCost}</li>
        </ul>
    `;

    let heatExchangerHTML = '';

    if(hpuAssem.heatExchanger.code == 0){
         heatExchangerHTML = `
            <h3>HEAT EXCHANGER: ${hpuAssem.heatExchanger.code}</h3>
            <ul>
                <li>Description: No heat exchanger</li>
                <li>Price: $${heatExchangerCost}</li>
            </ul> 
        `;
    } else {
        heatExchangerHTML = `
            <h3>HEAT EXCHANGER: ${hpuAssem.heatExchanger.code}</h3>     
            <ul>
                <li>Description: ${hpuAssem.heatExchanger.description}</li>
                <li>Type: ${hpuAssem.heatExchanger.type}</li>
                <li>Max Flow: ${hpuAssem.heatExchanger.maxFlow}</li>
                <li>Heat Dissipation: ${hpuAssem.heatExchanger.heatDis}</li>
                <li>Price: $${heatExchangerCost}</li>
            </ul>
        `;
    };

    const hpuCostHTML = `<div class="pdf-cost"><h4>HPU LIST PRICE: $${hpuAssem.totalCost}</h4></div>`;

    pdfHpuDiv.innerHTML = hpuHeaderHTML + reservoirHTML + pumpHTML + motorHTML + manifoldHTML + heatExchangerHTML + hpuCostHTML;

};

const fillValvePdfDets = () => {

    pdfValveDiv.innerHTML = '';
    const valveHeaderHTML = `<h2>VALVE SELECTIONS</h2>`;
    let valvePrice = 0;

    if(valveAssem.voltage == null){

        return;

    }else if(valveAssem.station0.valve == null){

        pdfValveDiv.innerHTML += valveHeaderHTML;

        for(i = 0; i < hpuInputs.numStat; i++){

            let valveHTML = `
                <h3>STATION ${i + 1}: None Selected</h3>
                <ul>
                    <li>Valve: None Selected</li>
                    <li>Flow Control: None Selected</li>
                    <li>Check Valve: None Selected</li>
                </ul>
            `;

            pdfValveDets.innerHTML += valveHTML

        };

    }else{

        pdfValveDiv.innerHTML += valveHeaderHTML;

        for(i = 0; i < hpuInputs.numStat; i++){

            let station = `station${i}`;
            let valve = valveAssem[station].valve;
            let flowControl = valveAssem[station].flowControl;
            let checkValve = valveAssem[station].checkValve;
    
            // Update price with the cost of each stations' components
            valvePrice += valve.cost + flowControl.cost + checkValve.cost;
    
            let valveHTML = `
                <h3>STATION ${i + 1}: ${valve.code}-${flowControl.code}-${checkValve.code}</h3>

                <ul>
                    <li><h5>VALVE: ${valve.code}</h5></li>
                    <li>Description: ${valve.description}</li>
                    <li>Price: $${valve.cost.toFixed(2)}</li>
                </ul>
            
                <ul>
                    <li><h5>FLOW CONTROL: ${flowControl.code}</h5></li>
                    <li>Description: ${flowControl.description}</li>
                    <li>Price: $${flowControl.cost.toFixed(2)}</li>
                </ul>
            
                <ul>
                    <li><h5>CHECK VALVE: ${checkValve.code}</h5></li>
                    <li>Description: ${checkValve.description}</li>
                    <li>Price: $${checkValve.cost.toFixed(2)}</li>
                </ul>

            `;
    
            pdfValveDiv.innerHTML += valveHTML;
        };

        const valveCostHTML = `<div class="pdf-cost"><h4>VALVES LIST PRICE: $${valvePrice.toFixed(2)}</h4></div>`

        pdfValveDiv.innerHTML += valveCostHTML;

    };
};

const fillHpuTotalCostPdfDets = () => {

    const total = calcTotalCost();

    pdfTotalListPriceDiv.innerHTML = `<div class="pdf-total-list"><h4>TOTAL LIST PRICE: ${total.toFixed(2)}</h4></div>`;

};