const msVoltageForm = document.querySelector('#ms-voltage-form');
const msStartersForm = document.querySelector('#ms-starters-form');

const msVoltageBtn = document.querySelector('.ms-voltage-btn');

const msNumStarters = document.querySelector('#msNumStarters');
const starterSelectorDivs = document.querySelectorAll('.starter-div');
const leaderCheckboxes = document.querySelectorAll('.leader-checkbox');
const starterSelectors = document.querySelectorAll('.starter-selector');
const leaderSelectors = document.querySelectorAll('.leader-selector');

const msAssem = new MsAssembly;

// DISPLAY AND HIDE FORM ELEMENTS
const displayMsVoltageForm = () => {
    mspDiv.style.display = 'block';
    partNumDiv.style.display = 'none';

    msVoltageForm.style.display = 'block';
    msStartersForm.style.display = 'none';
};

const displayMsStartersForm = () => {
    msVoltageForm.style.display = 'none';
    msStartersForm.style.display = 'block';
};


// BUTTONS
msVoltageBtn.addEventListener('click', e=> {
    e.preventDefault();

    displayMsVoltageForm();
});

// FORMS
// Initiate null values for MS inputs
let msInputs = {
    voltage: null,
    numStarters: null,
};

const resetMsInputs = () => {
    msInputs = {
        voltage: null,
        numStarters: null,
    };
};

msVoltageForm.addEventListener('submit', e => {
    e.preventDefault();

    msInputs.voltage = msVoltageForm.msVoltage.value;
    msInputs.numStarters = msVoltageForm.msNumStarters.value;

    displayMsStartersForm();    
});

msStartersForm.addEventListener('submit', e => {
    e.preventDefault();

    updateMsDisplay();
    displayPartNumDiv();
    
});

// Add starter and leader selections to MS inputs object
async function addMSInputsToMsAssembly(){

    // Reset msAssem when new data is submitted
    msAssem.reset();

    // Use a counter based on how many motors are selected to track motor iterations
    let counter = [];

    for(i = 0; i < msInputs.numStarters; i++){
        counter.push(i);
    };

    let promises = [];

    // Create a motor object for each submitted set of values
    for await(i of counter){
        const voltage = msInputs.voltage;

        const starterID = `starter${i + 1}`;
        const starterIDleader = `starter${i + 1}leader`;

        const motorName = `motor${i + 1}`;
        const starter = document.getElementById(starterID);
        const starterLeader = document.getElementById(starterIDleader);

        const hp = starter.value;

        // Filter for null leaders
        let leaderName = null
        if(starterLeader.value){
            leaderName = starterLeader.value;
        };

        const promise = msAssem.updateMotor(motorName, voltage, hp, leaderName);

        promises.push(promise);

    };

    await Promise.all(promises);
}

// Update and show part number display with msAssem object
async function updateMsDisplay(){

    await addMSInputsToMsAssembly();
    buildMsNumberDisplay(msAssem);
    
};


// Display and hide starter selector divs based on number of starters selected
msNumStarters.addEventListener('change', e => {
    e.preventDefault();

    const numStart = msNumStarters.value;

    let divArray = [];

    // Hide all starter dropdowns
    starterSelectorDivs.forEach(div => {
        div.style.display = 'none';
        divArray.push(div);
    });

    // Enable starter dropdowns based on number of starters selected
    for(i = 0; i < numStart; i++){
        divArray[i].style.display = 'flex';
    }

});

// Display and hide leader selectors when the leader checkbox is selected
leaderCheckboxes.forEach((checkbox, i) => {
    checkbox.addEventListener('change', e => {
        e.preventDefault();

        const selectorID = `#starter${i + 1}leader`;
        const selector = document.querySelector(selectorID);
        
        if(checkbox.checked){
            selector.removeAttribute('disabled');
        } else {
            selector.value = '';
            selector.setAttribute("disabled", true);
        }
    });

});