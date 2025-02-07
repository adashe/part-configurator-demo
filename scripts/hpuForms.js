const hpuSysParamsForm = document.querySelector('#hpu-sys-params-form');
const hpuManifoldForm = document.querySelector('#hpu-manifold-form');
const hpuValveForm = document.querySelector('#hpu-valve-form');

const hpuRestartButtons = document.querySelectorAll('.hpu-restart');
const hpuSysParamsButtons = document.querySelectorAll('.hpu-sys-params-btn');
const hpuManifoldButtons = document.querySelectorAll('.hpu-mani-btn');

const hpuPortSize = document.querySelector('#hpuPortSize');
const hpuNumStatDiv = document.querySelector('#hpu-number-stations-div');
const hpuSolenoidVoltage = document.querySelector('#hpuSolenoidVoltage');
const hpuValveDiv = document.querySelector('#hpu-valve-div');

const hpuAssembly = new HpuAssembly();
const valveAssembly = new ValveAssembly();


// DISPLAY AND HIDE FORM ELEMENTS
const displayHpuSysParamsForm = () => {
    hpuSysParamsForm.style.display = 'block';
    hpuManifoldForm.style.display = 'none';
    hpuValveForm.style.display = 'none';
};

const displayHpuManifoldForm = () => {
    hpuSysParamsForm.style.display = 'none';
    hpuManifoldForm.style.display = 'block';
    hpuValveForm.style.display = 'none';
};

const displayHpuValveForm = () => {
    hpuSysParamsForm.style.display = 'none';
    hpuManifoldForm.style.display = 'none';
    hpuValveForm.style.display = 'block';
};


// BUTTONS
// Restart buttons
hpuRestartButtons.forEach((button) => {
    button.addEventListener('click', e => {
        e.preventDefault();

        resetHpuInputs();

        hpuSysParamsForm.reset();
        hpuManifoldForm.reset();
        hpuValveForm.reset();

        displayHpuSysParamsForm();
        displayComponentDiv();

        console.log('RESTARTED', hpuInputs);
    });
});

// Buttons to display system parameters form
hpuSysParamsButtons.forEach((button) => {
    button.addEventListener('click', e => {
        e.preventDefault();
        displayHpuSysParamsForm();
    });
});

// Buttons to display manifold options form
hpuManifoldButtons.forEach((button) => {
    button.addEventListener('click', e => {
        e.preventDefault();
        displayHpuManifoldForm();
    });
});


// PROCESS FORM INPUTS
// Initiate null values for HPU inputs
let hpuInputs = {
    maxPres: null,
    maxFlow: null,
    appType: null,
    heatExchType: null,
    numStat: null,
    portSize: null,
    solVolt: null,
    valves: [],
    flowCtrl: [],
    checkValves: []
};

// Reset HPU inputs
const resetHpuInputs = () => {
    hpuInputs = {
        maxPres: null,
        maxFlow: null,
        appType: null,
        heatExchType: null,
        numStat: null,
        portSize: null,
        solVolt: null,
        valves: [],
        flowCtrl: [],
        checkValves: []
    };
};

// Process sys params form inputs
hpuSysParamsForm.addEventListener('submit', e => {
    e.preventDefault();

    hpuInputs.maxPres = hpuSysParamsForm.maxPressure.value;
    hpuInputs.maxFlow = hpuSysParamsForm.maxFlow.value;
    hpuInputs.appType = hpuSysParamsForm.applicationType.value;
    hpuInputs.heatExchType = hpuSysParamsForm.heatExchType.value;

    displayHpuManifoldForm();
});

// Process manifold form inputs
hpuManifoldForm.addEventListener('submit', e => {
    e.preventDefault();

    hpuInputs.numStat = hpuManifoldForm.hpuNumberStations.value;
    hpuInputs.portSize = hpuManifoldForm.hpuPortSize.value;

    displayHpuValveForm();
    
});

// Process valve form inputs
hpuValveForm.addEventListener('submit', e => {
    e.preventDefault();

    hpuInputs.solVolt = hpuValveForm.hpuSolenoidVoltage.value;
    addValvesToHpuInputs();

});

// Generate valve selectors based on numSt and solVolt
hpuSolenoidVoltage.addEventListener('change', e => {
    e.preventDefault();

    hpuValveDiv.innerHTML = '';

    let numValves = hpuInputs.numStat;
    let size = hpuInputs.portSize;
    let voltage = hpuSolenoidVoltage.value;

    // Generate valve dropdowns for each number of stations containing selected solVolt data
    if(voltage == 'null'){
        hpuValveDiv.innerHTML = '';

    } else {
        for(let i = 0; i < numValves; i++){
            valveAssembly.getFilteredValveData(size, voltage)
                .then(data => generateHpuValveDropdown(data, i))
                .catch(err => console.log(err.message));
        } 
    };

});

// Create individual valve selectors
const generateHpuValveDropdown = (data, i) => {

    let html = `<div>
                    <label for="hpuValve${i}">Valve ${i}:</label>
                    <select name="hpuValve${i}" id="hpuValve${i}" class="hpuValve">
                        <option value="">None Selected</option>`

    data.forEach(valve => {
        html += `<option value=${valve.code}>${valve.code}</option>`;
    });

    html += `</select></div>`;

    hpuValveDiv.innerHTML += html;
};

// Check for valid valve inputs and add to hpuInputs object
const addValvesToHpuInputs = () => {

    hpuInputs.valves = [];

    for(i = 0; i < hpuInputs.numStat; i++){
        let selection = `hpuValve${i}`;

        if(hpuValveForm[selection]){
            hpuInputs.valves.push(hpuValveForm[selection].value)
        };
    };

    return hpuInputs.valves;

}

// Add valves to HPU number
const addValvesToHpuNum = () => {
    hpuInputs.valves.forEach(valve => {
        hpuAssembly.updateValves(valve);
    });
};

// Limit number of stations available based on port size selection
const generateHpuNumberStationsDropdown = () => {
    const htmlD03 = `
        <label for="hpuNumberStations">Number of Stations:</label>
            <select name="hpuNumberStations" id="hpuNumberStations" required>
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
            <label for="hpuNumberStations">Number of Stations:</label>
                <select name="hpuNumberStations" id="hpuNumberStations" required>
                    <option value="" disabled selected hidden>...</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                </select>`

    if(hpuPortSize.value == 'D03'){
        hpuNumStatDiv.innerHTML = htmlD03;
    } else if (hpuPortSize.value == 'D05'){
        hpuNumStatDiv.innerHTML = htmlD05;
    } else {
        hpuNumStatDiv.innerHTML = '';
    };

    const hpuNumberStations = document.querySelector('#hpuNumberStations');

    // Add event listener to reset valve options form if number of stations is changed
    hpuNumberStations.addEventListener('change', e => {
        e.preventDefault();
        hpuValveDiv.innerHTML = '';
        hpuValveForm.reset();
    
    });
};

// Reset number of stations and valve options form if port size is changed
hpuPortSize.addEventListener('change', e => {
    e.preventDefault();
    generateHpuNumberStationsDropdown();
    hpuValveDiv.innerHTML = '';
    hpuValveForm.reset();
});


// SUBMIT HPU INPUT DATA AND GENERATE HPU NUMBER
hpuValveForm.addEventListener('submit', e => {

    // Add valves in HPU form inputs to hpuNum for use in heat exchanger calculation
    addValvesToHpuNum();

    // Calculate hpuNum using form input values
    hpuAssembly.calcHpuNum(
        hpuInputs.maxPres, 
        hpuInputs.maxFlow, 
        hpuInputs.appType, 
        hpuInputs.heatExchType,
        hpuInputs.numStat, 
        hpuInputs.portSize, 
        hpuInputs.flowCtrl.length, 
        )
        .then(data => displayHpuNumber(data))
        .catch(err => console.log(err.message));
});