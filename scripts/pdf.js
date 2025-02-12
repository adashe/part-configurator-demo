const appContainer = document.querySelector('#container');
const pdfContainer = document.querySelector('#container-pdf');

const pdfButton = document.querySelector('.pdf');

const pdfContactDiv = document.querySelector('#pdf-contact-div');
const pdfHpuDets = document.querySelector('#pdf-hpu-dets');
const pdfValveDets = document.querySelector('#pdf-valve-dets');


pdfButton.addEventListener('click', e => {
    e.preventDefault();

    generatePDF();
    displayPdfContainer();

});

const displayPdfContainer = () => {
    pdfContainer.style.display = 'block';
    appContainer.style.display = 'none';
};

const displayAppContainer = () => {
    pdfContainer.style.display = 'none';
    appContainer.style.display = 'flex';
};

const generatePDF = () => {
    fillContactDets();
    fillHpuDets();
    fillValveDets();
};

let contactInputs = {
    contactName: 'Andrea Dashe',
    companyName: 'West Coast Controls Manufacturing'
};

const fillContactDets = () => {
    const date = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

    let day = date.getDate();
    let monthIndex = date.getMonth();
    let monthName = monthNames[monthIndex];
    let year = date.getFullYear();

    html = `            
            <h3 class="contact" id="pdf-contact-name">CONTACT NAME: ${contactInputs.contactName}</h3>
            <h3 class="contact" id="pdf-company-name">COMPANY NAME: ${contactInputs.companyName}</h3>
            <h3 class="contact" id="pdf-date">DATE: ${monthName} ${day}, ${year}</h3>
    `;

    pdfContactDiv.innerHTML = html;

};

const fillHpuDets = () => {

    pdfHpuDets.innerHTML = '';

    const reservoirHTML = `
        <h3>RESERVOIR: ${hpuAssem.reservoir.code}</h3>
        <ul>
            <li>Capacity: ${hpuAssem.reservoir.capacity}</li>
            <li>Heat Dissipation: ${hpuAssem.reservoir.heatDis}</li>
            <li>Price: $</li>
        </ul>
    `;

    const pumpHTML = `
        <h3>PUMP: ${hpuAssem.pump.code}</h3>
        <ul>
            <li>Part Number: ${hpuAssem.pump.partNum}</li>
            <li>Description: ${hpuAssem.pump.description}</li>
            <li>Dissipation: ${hpuAssem.pump.dispCID}</li>
            <li>Mount Type: ${hpuAssem.pump.mountType}</li> 
            <li>Price: $</li>
        </ul> 
    `;

    const motorHTML = `
        <h3>MOTOR: ${hpuAssem.motor.code}</h3>
        <ul>
            <li>Part Number: ${hpuAssem.motor.partNum}</li>
            <li>Description: ${hpuAssem.motor.description}</li>
            <li>Output HP: ${hpuAssem.motor.outputHP}</li>
            <li>Price: $</li>
        </ul>
    `;

    const manifoldHTML = `
        <h3>MANIFOLD: ${hpuAssem.manifold.code}</h3>
        <ul>
            <li>Description: ${hpuAssem.manifold.description}</li>
            <li>Valve Pattern: ${hpuAssem.manifold.valvePattern}</li>
            <li>Number of Stations: ${hpuAssem.manifold.numStations}</li>
            <li>Price: $</li>
        </ul>
    `;

    let heatExchangerHTML = '';

    if(hpuAssem.heatExchanger.code == 0){
         heatExchangerHTML = `
            <h3>HEAT EXCHANGER: ${hpuAssem.heatExchanger.code}</h3>
            <ul>
                <li>Description: No heat exchanger</li>
                <li>Price: $</li>
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
                <li>Price: $</li>
            </ul>
        `;
    };

    const hpuCostHTML = `<h4>HPU LIST PRICE: $${hpuAssem.totalCost}</h4>`;

    pdfHpuDets.innerHTML = reservoirHTML + pumpHTML + motorHTML + manifoldHTML + heatExchangerHTML + hpuCostHTML;

};

const fillValveDets = () => {

    pdfValveDets.innerHTML = '';
    let valvePrice = 0;

    if(valveAssem.voltage == null){

        return;

    }else if(valveAssem.station0.valve == null){

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
    
            pdfValveDets.innerHTML += valveHTML;
        };

        const valveCostHTML = `<h4>VALVES LIST PRICE: $${valvePrice.toFixed(2)}</h4>`

        pdfValveDets.innerHTML += valveCostHTML;

    };
};
