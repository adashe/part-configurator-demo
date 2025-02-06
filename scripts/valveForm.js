const valvePortSize = document.querySelector('#valvePortSize');
const valveNumberStationsDiv = document.querySelector('#valve-number-stations-div');
const valveSolVoltDiv = document.querySelector('#valve-sol-volt-div');

const valvePopupContent = document.querySelector('.valve-popup-content');
const valvePopupForm = document.querySelector('#valve-popup-form');


// Initiate null values for valve inputs
let valveInputs = {
    numStat: null,
    portSize: null,
    solVolt: null,
    valves: [],
    flowCtrl: [],
    checkValves: []
};

// Reset valve inputs
const resetValveInputs = () => {
    valveInputs = {
        numStat: null,
        portSize: null,
        solVolt: null,
        valves: [],
        flowCtrl: [],
        checkValves: []
    };
};

// Prefill popup if user has already submitted port size, num stat, sol volt in HPU form
async function prefillValveSettings(){

    // Reset popup when closed and reopened
    valveNumberStationsDiv.innerHTML = '';
    valveSolVoltDiv.innerHTML = '';
    valvePopupContent.innerHTML = '';

    // Check for values in hpuInputs array and prefill each dropdown if present
    if(hpuInputs.portSize){
        valvePortSize.value = hpuInputs.portSize;
        valveInputs.portSize = valvePortSize.value;
        generateValveNumberStationsDropdown();
    };

    if(hpuInputs.numStat){
        valveNumberStations.value = hpuInputs.numStat;
        valveInputs.numStat = valveNumberStations.value;
        generateValveSolVoltDropdown();
    };

    if(hpuInputs.solVolt){
        valveSolenoidVoltage.value = hpuInputs.solVolt;
        valveInputs.solVolt = valveSolenoidVoltage.value;
        await generateAllValveDropdowns()
    };

    if(hpuInputs.valves && hpuInputs.valves.length > 0){
        hpuInputs.valves.forEach((valve, i) => {
            let elementID = `valve${i}`;
            let element = document.getElementById(elementID);
            element.value = valve;
        });
    };

};


// Generate and show number of stations dropdown when port size is selected or changed
valvePortSize.addEventListener('change', e => {
    e.preventDefault();

    valveInputs.portSize = valvePortSize.value;

    generateValveNumberStationsDropdown();
    valveSolVoltDiv.innerHTML = '';
    valvePopupContent.innerHTML = '';
    // hpuValveOptsForm.reset();
});


// Create numberStations dropdown based on port size selection
const generateValveNumberStationsDropdown = () => {
    const htmlD03 = `
        <label for="valveNumberStations">Number of Stations:</label>
            <select name="valveNumberStations" id="valveNumberStations" required>
                <option value="" disabled selected hidden>...</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
            </select>`

    const htmlD05 = `
            <label for="valveNumberStations">Number of Stations:</label>
                <select name="valveNumberStations" id="valveNumberStations" required>
                    <option value="" disabled selected hidden>...</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                </select>`

    if(valveInputs.portSize == 'D03'){
        valveNumberStationsDiv.innerHTML = htmlD03;
    } else if (valveInputs.portSize == 'D05'){
        valveNumberStationsDiv.innerHTML = htmlD05;
    } else {
        valveNumberStationsDiv.innerHTML = 'NO STATIONS';
    };


    // Event listener to reset valve dropdowns and solVolt dropdown if number of stations is changed
    const valveNumberStations = document.querySelector('#valveNumberStations');
    
    valveNumberStations.addEventListener('change', e => {
        e.preventDefault();

        valveInputs.numStat = valveNumberStations.value;
        valvePopupContent.innerHTML = '';
        generateValveSolVoltDropdown();
    
    });
};

// Generate sol volt dropdown
const generateValveSolVoltDropdown = () => {
    const html = `                        
        <label for="valveSolenoidVoltage">Solenoid Voltage:</label>
        <select name="valveSolenoidVoltage" id="valveSolenoidVoltage">
            <option value="none">None Selected</option>
            <option value="110VAC">110VAC</option>
            <option value="24VDC">24VDC</option>
        </select>
    `;

    valveSolVoltDiv.innerHTML = html;

    // Event listener to create valve selectors based on numSt and solVolt
    const valveSolenoidVoltage = document.querySelector('#valveSolenoidVoltage');

    valveSolenoidVoltage.addEventListener('change', e => {
        e.preventDefault();

        valvePopupContent.innerHTML = '';

        valveInputs.solVolt = valveSolenoidVoltage.value;

        // Generate valve options dropdowns for each number of stations containing selected solVolt data
        generateAllValveDropdowns();

    });
};


// Create individual valve dropdown
const generateValveDropdown = (data, i) => {

    // i represents the station
    html = `
                <label for="valve${i}"></label>
                <select name="valve${i}" id="valve${i}" class="valve" required>
                    <option value="" disabled selected hidden>Select valve...</option>
                    <option value="null">No valve</option>
                `;

    data.forEach(valve => {
        html += `<option value=${valve.code}>${valve.code}</option>`;
    });

    html += `</select>`;

    return html;
}


// NOT WORKING. WHERE DOES THIS GO?? #FIX
// const createValveOptionEventListeners = () => {

//     const selects = document.querySelectorAll('.valveSelection');

//     selects.forEach(select => {
//         select.addEventListener('mouseover', e => {
//             console.log('ouch!');
//         });
//     });
// };


// Create individual flow control dropdown
const generateFlowControlDropdown = (data, i) => {

    let html = `
                <label for="flowControl${i}"></label>
                <select name="flowControl${i}" id="flowControl${i}" class="flowControl" required>
                    <option value="" disabled selected hidden>Select flow control...</option>
                    <option value="null">No flow control</option>
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
                    <option value="null">No check valve</option>
                `;

    data.forEach(checkValve => {
        html += `<option value=${checkValve.code}>${checkValve.code}</option>`;
    });

    html += `</select>`;

    return html;
};

// Generate valve options dropdowns for each number of stations containing selected solVolt data
async function generateAllValveDropdowns(){

    if(valveInputs.solVolt == 'null'){
        valvePopupContent.innerHTML = '';
    
    } else {

        let valveData = await hpuNum.getFilteredValveData(valveInputs.portSize, valveInputs.solVolt);
        let flowControlData = await hpuNum.getFilteredFlowControlData(valveInputs.portSize);
        let checkValveData = await hpuNum.getCheckValveData();

        for(i = 0; i < valveInputs.numStat; i++){

            let valveHtml = generateValveDropdown(valveData, i);
            let flowControlHtml = generateFlowControlDropdown(flowControlData, i);
            let checkValveHtml = generateCheckValveDropdown(checkValveData, i);

            let stationHtml = `<div id="station${i}">Station ${i}: ${valveHtml}${flowControlHtml}${checkValveHtml}</div>`

            valvePopupContent.innerHTML += stationHtml;

        };

    };

};


// Save submitted valve form inputs in stations object
let stations = {};

valvePopupForm.addEventListener('submit', e => {
    e.preventDefault();

    // reset values when form is resubmitted
    stations = {};

    // create a stations object for each submitted set of values
    for(i = 0; i < valveInputs.numStat; i++){
        let valveID = `valve${i}`;
        let flowControlID = `flowControl${i}`;
        let checkValveID = `checkValve${i}`;

        let valve = document.getElementById(valveID);
        let flowControl = document.getElementById(flowControlID);
        let checkValve = document.getElementById(checkValveID);

        stations[i] = {
            valve: valve.value,
            flowControl: flowControl.value,
            checkValve: checkValve.value
        };
    };

    valvePopupWrapper.style.display = 'none';

    return stations;

});
