const vPortSize = document.querySelector('#vPortSize');
const vNumberStationsDiv = document.querySelector('#v-number-stations-div');
const vSolVoltDiv = document.querySelector('#v-sol-volt-div');

const valvePopupContent = document.querySelector('.valve-popup-content');

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

// Generate and show number of stations dropdown when port size is selected or changed
vPortSize.addEventListener('change', e => {
    e.preventDefault();

    valveInputs.portSize = vPortSize.value;

    vGenerateNumberStationsDropdown();
    vSolVoltDiv.innerHTML = '';
    valvePopupContent.innerHTML = '';
    // hpuValveOptsForm.reset();
});


// Create numberStations dropdown based on port size selection
const vGenerateNumberStationsDropdown = () => {
    const htmlD03 = `
        <label for="vNumberStations">Number of Stations:</label>
            <select name="vNumberStations" id="vNumberStations" required>
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
            <label for="vNumberStations">Number of Stations:</label>
                <select name="vNumberStations" id="vNumberStations" required>
                    <option value="" disabled selected hidden>...</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                </select>`

    if(valveInputs.portSize == 'D03'){
        vNumberStationsDiv.innerHTML = htmlD03;
    } else if (valveInputs.portSize == 'D05'){
        vNumberStationsDiv.innerHTML = htmlD05;
    } else {
        vNumberStationsDiv.innerHTML = 'NO STATIONS';
    };


    // Event listener to reset valve dropdowns and solVolt dropdown if number of stations is changed
    const vNumberStations = document.querySelector('#vNumberStations');
    
    vNumberStations.addEventListener('change', e => {
        e.preventDefault();

        valveInputs.numStat = vNumberStations.value;
        valvePopupContent.innerHTML = '';
        vGenerateSolVoltDropdown();
    
    });
};

// Generate sol volt dropdown
const vGenerateSolVoltDropdown = () => {
    const html = `                        
        <label for="vSolenoidVoltage">Solenoid Voltage:</label>
        <select name="vSolenoidVoltage" id="vSolenoidVoltage">
            <option value="none">None Selected</option>
            <option value="110VAC">110VAC</option>
            <option value="24VDC">24VDC</option>
        </select>
    `;

    vSolVoltDiv.innerHTML = html;

    // Event listener to create valve selectors based on numSt and solVolt
    const vSolenoidVoltage = document.querySelector('#vSolenoidVoltage');

    vSolenoidVoltage.addEventListener('change', e => {
        e.preventDefault();

        valvePopupContent.innerHTML = '';

        valveInputs.solVolt = vSolenoidVoltage.value;

        // Generate valve options dropdowns for each number of stations containing selected solVolt data
        if(valveInputs.solVolt == 'null'){
            valvePopupContent.innerHTML = '';

        } else {
            for(let i = 0; i < valveInputs.numStat; i++){
                hpuNum.getFilteredValveData(valveInputs.portSize, valveInputs.solVolt)
                    .then(data => vGenerateValveDropdown(data, i))
                    .catch(err => console.log(err.message));
                hpuNum.getFilteredFlowControlData(valveInputs.portSize)
                    .then(data => vGenerateFlowControlDropdown(data, i))
                    .catch(err => console.log(err.message));
                hpuNum.getCheckValveData()
                    .then(data => vGenerateCheckValveDropdown(data, i))
                    .catch(err => console.log(err.message));
            }; 
        };
    });
};


// Create individual valve dropdown
const vGenerateValveDropdown = (data, i) => {

    let html = `
                <label for="valveSelection${i}">Valve ${i}:</label>
                <select name="valveSelection${i}" id="valveSelection${i}" class="valveSelection">
                    <option value="none">None Selected</option>
                `

    data.forEach((valve, index) => {
        html += `<option value=${index}>${valve.code}</option>`;
    });

    html += `</select>`;

    valvePopupContent.innerHTML += html;
};



// Create individual flow control dropdown
const vGenerateFlowControlDropdown = (data, i) => {

    let html = `
                <label for="flowControl${i}">Flow Control ${i}:</label>
                <select name="flowControl${i}" id="flowControl${i}" class="flowControl">
                    <option value="none">None Selected</option>
                `

    data.forEach((flowControl, index) => {
        html += `<option value=${index}>${flowControl.code}</option>`;
    });

    html += `</select>`;

    valvePopupContent.innerHTML += html;
};

// Create individual check valve dropdown
const vGenerateCheckValveDropdown = (data, i) => {

    let html = `
                <label for="checkValve${i}">Check Valve ${i}:</label>
                <select name="checkValve${i}" id="checkValve${i}" class="checkValve">
                    <option value="none">None Selected</option>
                `

    data.forEach((checkValve, index) => {
        html += `<option value=${index}>${checkValve.code}</option>`;
    });

    html += `</select></div>`;

    valvePopupContent.innerHTML += html;
};