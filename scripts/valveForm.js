const valveSolVoltDiv = document.querySelector('#valve-sol-volt-div');
const solenoidVoltage = document.querySelector('#SolenoidVoltage');

const valvePopupWrapper = document.querySelector('.valve-popup-wrapper');
const valvePopupCloseButton = document.querySelector('.valve-popup-close');
const valvePopupContent = document.querySelector('.valve-popup-content');
const valvePopupForm = document.querySelector('#valve-popup-form');


// Display popup to edit valves, flow controls, and check valves
const displayValvePopup = () => {

    prefillValveSettingsFromHPUInputs();
    prefillValvePopupFromValveAssembly();

    valvePopupWrapper.style.display = 'block';

};

// Valve popup close button
valvePopupCloseButton.addEventListener('click', e => {
    e.preventDefault();
    valvePopupWrapper.style.display = 'none';
});

// Initiate null values for valve inputs
let valveInputs = {
    numStat: null,
    portSize: null,
    solVolt: null,
};

// Reset valve inputs
const resetValveInputs = () => {
    valveInputs = {
        numStat: null,
        portSize: null,
        solVolt: null,
    };
};

// Prefill popup if user has already submitted port size, num stat in HPU form
const prefillValveSettingsFromHPUInputs = () => {

    // Reset popup when closed and reopened
    valvePopupContent.innerHTML = '';

    // Check for values in hpuInputs array and prefill each dropdown if present
    if(hpuInputs.portSize){
        valveInputs.portSize = hpuInputs.portSize;
    };

    if(hpuInputs.numStat){
        valveInputs.numStat = hpuInputs.numStat;
    };

};

// Prefill popup with valve assembly
async function prefillValvePopupFromValveAssembly(){

    if(valveAssem.voltage){
        solenoidVoltage.value = valveAssem.voltage;
        valveInputs.solVolt = solenoidVoltage.value;
        await generateAllValveDropdowns()
    }

    for(i = 0; i < valveInputs.numStat; i++){
        let station = `station${i}`;

        if(valveAssem[station]){
            if(valveAssem[station].valve && valveAssem[station].valve.code){
                let elementID = `valve${i}`;
                let element = document.getElementById(elementID);
                element.value = valveAssem[station].valve.code;
            };
    
            if(valveAssem[station].flowControl && valveAssem[station].flowControl.code){
                let elementID = `flowControl${i}`;
                let element = document.getElementById(elementID);
                element.value = valveAssem[station].flowControl.code;
            };
    
            if(valveAssem[station].checkValve && valveAssem[station].checkValve.code){
                let elementID = `checkValve${i}`;
                let element = document.getElementById(elementID);
                element.value = valveAssem[station].checkValve.code;
            };
        };
    };
};

// Event listener to create valve selectors based on numSt and solVolt
solenoidVoltage.addEventListener('change', e => {
    e.preventDefault();

    valvePopupContent.innerHTML = '';

    valveInputs.solVolt = solenoidVoltage.value;

    // Generate valve options dropdowns for each number of stations containing selected solVolt data
    generateAllValveDropdowns();

});

// Create individual valve dropdown
const generateValveDropdown = (data, i) => {

    // i represents the station
    html = `
                <label for="valve${i}"></label>
                <select name="valve${i}" id="valve${i}" class="valve" required>
                    <option value="" disabled selected hidden>Select valve...</option>
                    <option value="0">No valve</option>
                `;

    data.forEach(valve => {
        html += `<option value=${valve.code}>${valve.code}</option>`;
    });

    html += `</select>`;

    return html;
};


// Create individual flow control dropdown
const generateFlowControlDropdown = (data, i) => {

    let html = `
                <label for="flowControl${i}"></label>
                <select name="flowControl${i}" id="flowControl${i}" class="flowControl" required>
                    <option value="" disabled selected hidden>Select flow control...</option>
                    <option value="0">No flow control</option>
                `;

    data.forEach(flowControl => {
        html += `<option value=${flowControl.code}>${flowControl.code}</option>`;
    });

    html += `</select>`;

    return html;
};

// Create individual check valve dropdown
const generateCheckValveDropdown = (data, i) => {

    let html = `
                <label for="checkValve${i}"></label>
                <select name="checkValve${i}" id="checkValve${i}" class="checkValve" required>
                    <option value="" disabled selected hidden>Select check valve...</option>
                `;

    data.forEach(checkValve => {
        if(checkValve.code == 0){
            html += `<option value="0">No check valve</option>`
        } else {
            html += `<option value=${checkValve.code}>${checkValve.code}</option>`;
        }
    });

    html += `</select>`;

    return html;
};

// Generate valve options dropdowns for each number of stations containing selected solVolt data
async function generateAllValveDropdowns(){

    if(valveInputs.solVolt == 'null'){
        valvePopupContent.innerHTML = '';
    
    } else {

        let valveData = await valveAssem.getFilteredValveData(valveInputs.portSize, valveInputs.solVolt);
        let flowControlData = await valveAssem.getFilteredFlowControlData(valveInputs.portSize);
        let checkValveData = await valveAssem.getCheckValveData();

        for(i = 0; i < valveInputs.numStat; i++){

            let valveHtml = generateValveDropdown(valveData, i);
            let flowControlHtml = generateFlowControlDropdown(flowControlData, i);
            let checkValveHtml = generateCheckValveDropdown(checkValveData, i);

            let stationHtml = `<div id="station${i}">Station ${i}: ${valveHtml}${flowControlHtml}${checkValveHtml}</div>`

            valvePopupContent.innerHTML += stationHtml;

        };

    };

};

valvePopupForm.addEventListener('submit', e => {
    e.preventDefault();

    updateValvesAndHPU();

    valvePopupWrapper.style.display = 'none';

});

async function addValveInputsToValveAssembly(){

    let counter = []

    for(i = 0; i < valveInputs.numStat; i++){
        counter.push(i);
    };

    let promises = [];

    // create a stations object for each submitted set of values
    for await (i of counter){
        console.log('counter', i);
        let stationName = `station${i}`;
        let valveID = `valve${i}`;
        let flowControlID = `flowControl${i}`;
        let checkValveID = `checkValve${i}`;

        let valve = document.getElementById(valveID);
        let flowControl = document.getElementById(flowControlID);
        let checkValve = document.getElementById(checkValveID);

        let promise = valveAssem.updateStation(stationName, valve.value, flowControl.value, checkValve.value);
    
        promises.push(promise);
    };

    await Promise.all(promises);
    console.log('in async function: valves added', valveAssem);

    // Update voltage attribute based on the solenoid voltage selection
    valveAssem.voltage = valveInputs.solVolt;

    // Update number of L valves (for hpu calc)
    valveAssem.countLValves();
    console.log('L VALVES', valveAssem.numLvalves);

    // Update number of flow controls (for hpu calc)
    valveAssem.countFlowControl();
    console.log('FLOW CONTROL', valveAssem.numFlwCtrl);

};

async function updateValvesAndHPU(){

    await addValveInputsToValveAssembly();

    if(partNumDiv.style.display == 'block'){
        await updateHpuDiv();
        console.log('update!');
    };
}


