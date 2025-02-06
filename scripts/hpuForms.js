const hpuSysParamsForm = document.querySelector('#hpu-sys-params-form');
const hpuManifoldOptsForm = document.querySelector('#hpu-manifold-options-form');
const hpuValveOptsForm = document.querySelector('#hpu-valve-options-form');

const hpuRestartButtons = document.querySelectorAll('.hpu-restart');
const sysParamsButtons = document.querySelectorAll('.sys-params-btn');
const manifoldOptsButtons = document.querySelectorAll('.mani-opts-btn');

const portSize = document.querySelector('#portSize');
const numberStationsDiv = document.querySelector('#number-stations-div');
const solenoidVoltage = document.querySelector('#solenoidVoltage');
const valveSelectionDiv = document.querySelector('#valve-selection-div');

const hpuNum = new HPUNumber();


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

    // console.log(hpuInputs);

    displayManifoldOptsForm();
});

// Process manifold options form inputs
hpuManifoldOptsForm.addEventListener('submit', e => {
    e.preventDefault();

    hpuInputs.numStat = hpuManifoldOptsForm.numberStations.value;
    hpuInputs.portSize = hpuManifoldOptsForm.portSize.value;

    // console.log(hpuInputs);

    displayValveOptsForm();
    
});

// Process valve options form inputs
hpuValveOptsForm.addEventListener('submit', e => {
    e.preventDefault();

    hpuInputs.solVolt = hpuValveOptsForm.solenoidVoltage.value;
    addValvesToHpuInputs();

    // console.log(hpuInputs);

});

// Generate valve selectors based on numSt and solVolt
solenoidVoltage.addEventListener('change', e => {
    e.preventDefault();

    valveSelectionDiv.innerHTML = '';

    let numValves = hpuInputs.numStat;
    let size = hpuInputs.portSize;
    let voltage = solenoidVoltage.value;

    // Generate valve dropdowns for each number of stations containing selected solVolt data
    if(voltage == 'null'){
        valveSelectionDiv.innerHTML = '';

    } else {
        for(let i = 0; i < numValves; i++){
            hpuNum.getFilteredValveData(size, voltage)
                .then(data => generateHpuValveDropdown(data, i))
                .catch(err => console.log(err.message));
        } 
    };

});

// Create individual valve selectors
const generateHpuValveDropdown = (data, i) => {

    let html = `<div>
                    <label for="hpuValveSelection${i}">Valve ${i}:</label>
                    <select name="hpuValveSelection${i}" id="hpuValveSelection${i}" class="hpuValveSelection">
                        <option value="none">None Selected</option>`

    data.forEach(valve => {
        html += `<option value=${valve.code}>${valve.code}</option>`;
    });

    html += `</select></div>`;

    valveSelectionDiv.innerHTML += html;
};

// Check for valid valve inputs and add to hpuInputs object
const addValvesToHpuInputs = () => {

    hpuInputs.valves = [];

    for(i = 0; i < hpuInputs.numStat; i++){
        let selection = `hpuValveSelection${i}`;

        if(hpuValveOptsForm[selection]){
            hpuInputs.valves.push(hpuValveOptsForm[selection].value)
        };
    };

    return hpuInputs.valves;

    // hpuInputs.valves = [];

    // if(hpuValveOptsForm.hpuValveSelection0 && hpuValveOptsForm.hpuValveSelection0.value != 'none'){
    //     hpuInputs.valves.push(hpuValveOptsForm.hpuValveSelection0.value);
    // };
    // if(hpuValveOptsForm.hpuValveSelection1 && hpuValveOptsForm.hpuValveSelection1.value != 'none'){
    //     hpuInputs.valves.push(hpuValveOptsForm.hpuValveSelection1.value);
    // };
    // if(hpuValveOptsForm.hpuValveSelection2 && hpuValveOptsForm.hpuValveSelection2.value != 'none'){
    //     hpuInputs.valves.push(hpuValveOptsForm.hpuValveSelection2.value);
    // };
    // if(hpuValveOptsForm.hpuValveSelection3 && hpuValveOptsForm.hpuValveSelection3.value != 'none'){
    //     hpuInputs.valves.push(hpuValveOptsForm.hpuValveSelection3.value);
    // };
    // if(hpuValveOptsForm.hpuValveSelection4 && hpuValveOptsForm.hpuValveSelection4.value != 'none'){
    //     hpuInputs.valves.push(hpuValveOptsForm.hpuValveSelection4.value);
    // };
    // if(hpuValveOptsForm.hpuValveSelection5 && hpuValveOptsForm.hpuValveSelection5.value != 'none'){
    //     hpuInputs.valves.push(hpuValveOptsForm.hpuValveSelection5.value);
    // };

    // return hpuInputs.valves;
}

// Add valves to HPU number
const addValvesToHpuNum = () => {
    hpuInputs.valves.forEach(valve => {
        hpuNum.updateValves(valve);
    });
};

// Limit number of stations available based on port size selection
const generateNumberStationsDropdown = () => {
    const htmlD03 = `
        <label for="numberStations">Number of Stations:</label>
            <select name="numberStations" id="numberStations" required>
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
            <label for="numberStations">Number of Stations:</label>
                <select name="numberStations" id="numberStations" required>
                    <option value="" disabled selected hidden>...</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                </select>`

    if(portSize.value == 'D03'){
        numberStationsDiv.innerHTML = htmlD03;
    } else if (portSize.value == 'D05'){
        numberStationsDiv.innerHTML = htmlD05;
    } else {
        numberStationsDiv.innerHTML = '';
    };

    const numberStations = document.querySelector('#numberStations');

    // Add event listener to reset valve options form if number of stations is changed
    numberStations.addEventListener('change', e => {
        e.preventDefault();
        valveSelectionDiv.innerHTML = '';
        hpuValveOptsForm.reset();
    
    });
};

// Reset number of stations and valve options form if port size is changed
portSize.addEventListener('change', e => {
    e.preventDefault();
    generateNumberStationsDropdown();
    valveSelectionDiv.innerHTML = '';
    hpuValveOptsForm.reset();
});


// SUBMIT HPU INPUT DATA AND GENERATE HPU NUMBER
hpuValveOptsForm.addEventListener('submit', e => {

    // Add valves in HPU form inputs to hpuNum for use in heat exchanger calculation
    addValvesToHpuNum();

    // Calculate hpuNum using form input values
    hpuNum.calcHpuNum(
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