const hpuSysParamsForm = document.querySelector('#hpu-sys-params-form');
const hpuManifoldForm = document.querySelector('#hpu-manifold-form');
const hpuValveForm = document.querySelector('#hpu-valve-form');

const hpuSysParamsButtons = document.querySelectorAll('.hpu-sys-params-btn');
const hpuManifoldButtons = document.querySelectorAll('.hpu-mani-btn');
const hpuValvesPopupButtons = document.querySelectorAll('.hpu-valves-btn');

const hpuPortSize = document.querySelector('#hpuPortSize');
const hpuNumStatDiv = document.querySelector('#hpu-number-stations-div');

const hpuAssem = new HpuAssembly();
const valveAssem = new ValveAssembly();


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

// Buttons to display valve popup form
hpuValvesPopupButtons.forEach(button => {
    button.addEventListener('click', e => {
        e.preventDefault();
        displayValvePopup();
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
        hpuValveForm.reset();
    
    });
};

// Reset number of stations and valve options form if port size is changed
hpuPortSize.addEventListener('change', e => {
    e.preventDefault();
    generateHpuNumberStationsDropdown();
    hpuValveForm.reset();
});


// SUBMIT HPU INPUT DATA AND GENERATE HPU NUMBER
hpuValveForm.addEventListener('submit', e => {
    e.preventDefault();

    // Calculate number of valves with 'L' codes
    const numLValves = valveAssem.countLValves();

    // Calculate number of flow controls
    const numFlowControl = valveAssem.countFlowControl();

    // Calculate hpuNum using form input values
    hpuAssem.calcHpuNum(
        hpuInputs.maxPres, 
        hpuInputs.maxFlow, 
        hpuInputs.appType, 
        hpuInputs.heatExchType,
        hpuInputs.numStat, 
        hpuInputs.portSize,
        numLValves, 
        numFlowControl, 
        )
        .then(data => displayHpuNumber(data))
        .catch(err => console.log(err.message));

});