const hpuSysParamsForm = document.querySelector('#hpu-sys-params-form');
const hpuManifoldOptsForm = document.querySelector('#hpu-manifold-options-form');
const hpuValveOptsForm = document.querySelector('#hpu-valve-options-form');

const hpuRestartButtons = document.querySelectorAll('.hpu-restart');
const sysParamsButtons = document.querySelectorAll('.sys-params-btn');
const manifoldOptsButtons = document.querySelectorAll('.mani-opts-btn');

const numberStations = document.querySelector('#numberStations');
const solenoidVoltage = document.querySelector('#solenoidVoltage');
const valveSelectionDiv = document.querySelector('#valve-selection-div');

// DISPLAY AND HIDE FORM ELEMENTS
const displaySysParamsForm = () => {
    hpuSysParamsForm.style.display = 'block';
    hpuManifoldOptsForm.style.display = 'none';
    hpuValveOptsForm.style.display = 'none';
};

const displayManifoldOptsForm = () => {
    hpuSysParamsForm.style.display = 'none';
    hpuManifoldOptsForm.style.display = 'block';
    hpuValveOptsForm.style.display = 'none';
};

const displayValveOptsForm = () => {
    hpuSysParamsForm.style.display = 'none';
    hpuManifoldOptsForm.style.display = 'none';
    hpuValveOptsForm.style.display = 'block';
};


// BUTTONS
// Restart buttons
hpuRestartButtons.forEach((button) => {
    button.addEventListener('click', e => {
        e.preventDefault();

        resetHpuInputs();

        hpuSysParamsForm.reset();
        hpuManifoldOptsForm.reset();
        hpuValveOptsForm.reset();

        displaySysParamsForm();
        displayComponentDiv();

        console.log('RESTARTED', hpuInputs);
    });
});

// Buttons to display system parameters form
sysParamsButtons.forEach((button) => {
    button.addEventListener('click', e => {
        e.preventDefault();
        displaySysParamsForm();
    });
});

// Buttons to display manifold options form
manifoldOptsButtons.forEach((button) => {
    button.addEventListener('click', e => {
        e.preventDefault();
        displayManifoldOptsForm();
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

    console.log(hpuInputs);

    displayManifoldOptsForm();
});

// Process manifold options form inputs
hpuManifoldOptsForm.addEventListener('submit', e => {
    e.preventDefault();

    hpuInputs.numStat = hpuManifoldOptsForm.numberStations.value;
    hpuInputs.portSize = hpuManifoldOptsForm.portSize.value;

    console.log(hpuInputs);

    displayValveOptsForm();
    
});

// Process valve options form inputs
hpuValveOptsForm.addEventListener('submit', e => {
    e.preventDefault();

    hpuInputs.solVolt = hpuValveOptsForm.solenoidVoltage.value;
    addValvesToHpuInputs();

    console.log(hpuInputs);

});

// Generate valve selectors based on numSt and solVolt
solenoidVoltage.addEventListener('change', e => {
    e.preventDefault();

    valveSelectionDiv.innerHTML = '';

    let numValves = hpuInputs.numStat;

    // Generate numSt# of valve dropdowns containing selected solVolt data
    // TODO: UPDATE to further narrow data based on port size options
    if(solenoidVoltage.value == 'null'){
        valveSelectionDiv.style.display = 'none';

    } else if (solenoidVoltage.value == '110VAC'){
        for(let i = 0; i < numValves; i++){
            hpuNum.get110VACValveData()
                .then(data => generateValveDropdown(data, i))
                .catch(err => console.log(err.message));
        };

    } else if(solenoidVoltage.value == '24VDC'){
        for(let i = 0; i < numValves; i++){
            hpuNum.get24VDCValveData()
                .then(data => generateValveDropdown(data, i))
                .catch(err => console.log(err.message));
        };
    };

    valveSelectionDiv.style.display = 'inline-block';
});

// Create individual valve selectors
const generateValveDropdown = (data, i) => {

    let html = `<label for="valveSelection${i}">Valve ${i}:</label>
                <select name="valveSelection${i}" id="valveSelection${i}" class="valveSelection">
                    <option value="none">None Selected</option>`

    data.forEach((valve, index) => {
        html += `<option value=${index}>${valve.code}</option>`;
    });

    html += `</select>`;

    valveSelectionDiv.innerHTML += html;
};

// Check for valid valve inputs and add to hpuInputs object
const addValvesToHpuInputs = () => {
    hpuInputs.valves = [];

    if(hpuValveOptsForm.valveSelection0 && hpuValveOptsForm.valveSelection0.value != 'none'){
        hpuInputs.valves.push(hpuValveOptsForm.valveSelection0.value);
    };
    if(hpuValveOptsForm.valveSelection1 && hpuValveOptsForm.valveSelection1.value != 'none'){
        hpuInputs.valves.push(hpuValveOptsForm.valveSelection1.value);
    };
    if(hpuValveOptsForm.valveSelection2 && hpuValveOptsForm.valveSelection2.value != 'none'){
        hpuInputs.valves.push(hpuValveOptsForm.valveSelection2.value);
    };
    if(hpuValveOptsForm.valveSelection3 && hpuValveOptsForm.valveSelection3.value != 'none'){
        hpuInputs.valves.push(hpuValveOptsForm.valveSelection3.value);
    };
    if(hpuValveOptsForm.valveSelection4 && hpuValveOptsForm.valveSelection4.value != 'none'){
        hpuInputs.valves.push(hpuValveOptsForm.valveSelection4.value);
    };
    if(hpuValveOptsForm.valveSelection5 && hpuValveOptsForm.valveSelection5.value != 'none'){
        hpuInputs.valves.push(hpuValveOptsForm.valveSelection5.value);
    };

    return hpuInputs.valves;
}