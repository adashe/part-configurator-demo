const msVoltageForm = document.querySelector('#ms-voltage-form');
const msStartersForm = document.querySelector('#ms-starters-form');

const msVoltageBtn = document.querySelector('.ms-voltage-btn');
const msNumStarters = document.querySelector('#msNumStarters');

const starterSelectorDivs = document.querySelectorAll('.starter-div');
const generatedStartersDiv = document.querySelector('#generated-starters-div');

const msCurrHpMsg = document.querySelector('#ms-curr-hp-msg');
const msMaxHpMsg = document.querySelector('#ms-max-hp-msg');

const msAssem = new MsAssembly();


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
    maxHp: null,
    numStarters: null,
};

const resetMsInputs = () => {
    msInputs = {
        voltage: null,
        maxHp: null,
        numStarters: null,
    };
};

msVoltageForm.addEventListener('submit', e => {
    e.preventDefault();

    msInputs.voltage = msVoltageForm.msVoltage.value;
    msInputs.numStarters = msVoltageForm.msNumStarters.value;
    
    updateMaxHpDisplay();
    updateCurrentHpDisplay();
    displayMsStartersForm();
});

msNumStarters.addEventListener('change', e => {
    e.preventDefault();

    msInputs.voltage = msVoltageForm.msVoltage.value;
    msInputs.numStarters = msVoltageForm.msNumStarters.value;

    msStartersForm.reset();
    generateAllStarterDivs();
    updateCurrentHpDisplay();
});

// Build starter divs based on number of indicated starters
const generateAllStarterDivs = () => {

    generatedStartersDiv.innerHTML = '';

    // Begin at 1 because starter 1 is already built into index.html
    for(i = 1; i < msInputs.numStarters; i++){
        generateStarterDiv(i + 1);        
    };

    // Add event listeners to starter div elements after elements have been generated
    addEventListenersToStarterDivs();
};

// Build individual starter div with starter selector, leader checkbox, and leader selector
const generateStarterDiv = (idx) => {
    // idx represents the motor number for which the div is being created

    const openingDivHtml = `        
        <p>STARTER ${idx}</p>
        <div class="starter-selector-div">
    `;

    const starterSelectorHtml = `
            <label for="starter${idx}"></label>
            <select name="starter${idx}" id="starter${idx}" class="starter-selector" disabled required>
                <option value="" disabled selected hidden>Select starter...</option>
                <option value="1.5">1.5 hp</option>
                <option value="2">2 hp</option>
                <option value="3">3 hp</option>
                <option value="5">5 hp</option>
                <option value="7.5">7.5 hp</option>
                <option value="10">10 hp</option>
                <option value="15">15 hp</option>
                <option value="20">20 hp</option>
                <option value="25">25 hp</option>
                <option value="30">30 hp</option>
                <option value="40">40 hp</option>
                <option value="50">50 hp</option>
                <option value="60">60 hp</option>
                <option value="75">75 hp</option>
            </select>
        </div>
    `;

    const leaderCheckboxHtml = `
        <div class="leader-checkbox-div">
            <label for="leader${idx}-checkbox">Follower?</label>
            <input type="checkbox" id="leader${idx}-checkbox" name="leader${idx}-checkbox" class="leader-checkbox" disabled/>
        </div>
    `;

    const leaderSelectorHtml = generateLeaderSelectors(idx);

    const closingDivHtml = '</div>';

    const starterDivHtml = openingDivHtml
        + starterSelectorHtml 
        + leaderCheckboxHtml 
        + leaderSelectorHtml 
        + closingDivHtml;

    generatedStartersDiv.innerHTML += starterDivHtml;
};

// Generate leader selector options based on num starters and omitting the follower
const generateLeaderSelectors = (idx) => {

    const openingHtml = `
        <div class="leader-selector-div" id="leaderSelectorDiv${idx}">
            <label for="leader${idx}"></label>
            <select name="leader${idx}" id="leader${idx}" class="leader-selector" disabled>
    `;
    
    let optionsHtml = generateLeaderOptions(idx);

    const closingHtml = '</select></div>';

    const html = openingHtml + optionsHtml + closingHtml;

    return html;
};

// Generate only selectors based on available options
const generateLeaderOptions = (idx) => {

    let html = '<option value="" disabled selected hidden>Select leader...</option>';

    if(idx == 2){
        html += '<option value="1">Motor 1</option>';
    }

    if(idx == 3){
        html += '<option value="1">Motor 1</option>';
        html += '<option value="2">Motor 2</option>';
    }

    if(idx == 4){
        html += '<option value="1">Motor 1</option>';
        html += '<option value="2">Motor 2</option>';
        html += '<option value="3">Motor 3</option>';
    }

    return html;
}

// FORM INTERACTIVITY
// Add event listener to sequentially enable / disable starter selectors
const addEventListenersToStarterDivs = () => {

    const starterSelectors = document.querySelectorAll('.starter-selector');
    const leaderCheckboxes = document.querySelectorAll('.leader-checkbox');
    const leaderSelectors = document.querySelectorAll('.leader-selector');

    let starterSelectorsArr = [];
    let leaderCheckboxesArr = [null];
    let leaderSelectorsArr = [null];

    starterSelectors.forEach((selector) => {
        starterSelectorsArr.push(selector);
    });

    leaderCheckboxes.forEach((checkbox) => {
        leaderCheckboxesArr.push(checkbox);
    });

    leaderSelectors.forEach((selector) => {
        leaderSelectorsArr.push(selector);
    });

    // Add event listeners to each starter selector to enable the next selector when changed
    starterSelectorsArr.forEach((selector, i) => {
        selector.addEventListener('change', e => {
            e.preventDefault();

            // Enable the associated leader checkbox
            if(leaderCheckboxesArr[i]){
                leaderCheckboxesArr[i].removeAttribute('disabled');
            };

            // Enable the next starter selector
            if(starterSelectorsArr[i+1]){
                starterSelectorsArr[i+1].removeAttribute('disabled');
            };
        });
    });

    // Add event listeners to each checkbox to enable the leader selector when checked
    leaderCheckboxesArr.forEach((checkbox, i) => {
        if(checkbox){
            checkbox.addEventListener('change', e => {
                e.preventDefault();
                
                if(checkbox.checked){
                    leaderSelectorsArr[i].removeAttribute('disabled');
                    leaderSelectorsArr[i].setAttribute("required", true);
                } else {
                    leaderSelectorsArr[i].value = '';
                    leaderSelectorsArr[i].setAttribute("disabled", true);
                    leaderSelectorsArr[i].removeAttribute('required');
                };
            });
        };
    });

    // Add event listeners for current HP calculation and display
    addEventListenersForCurrentHPcalc();
    updateMaxHpDisplay();
};

// CALC AND SHOW CURRENT HP AND MAX HP
// Calc and display maximum hp based on voltage selections
const updateMaxHpDisplay = () => {
    if(msInputs.voltage == '208V'){
        msInputs.maxHp = 60;
    }else if(msInputs.voltage == '240V'){
        msInputs.maxHp = 80;
    }else if(msInputs.voltage == '480V'){
        msInputs.maxHp = 120;
    };

    msMaxHpMsg.innerHTML = `Maximum: ${msInputs.maxHp} hp`;
};

// Add event listeners to starter selectors to update current hp as starters are selected
const addEventListenersForCurrentHPcalc = () => {
    const starterSelectors = document.querySelectorAll('.starter-selector');

    starterSelectors.forEach(selector => {
        selector.addEventListener('change', e => {
            e.preventDefault();

            updateCurrentHpDisplay();
        });
    });
};

// Update current hp display
const updateCurrentHpDisplay = () => {
    currentHp = calcCurrentHp();
    
    if(currentHp > msInputs.maxHp){
        msCurrHpMsg.classList.add('alert');
    }else{
        msCurrHpMsg.classList.remove('alert');
    }

    msCurrHpMsg.innerHTML = `Current: ${currentHp} hp`;
};

// Calculate current hp based on selected starters
const calcCurrentHp = () => {
    const starterSelectors = document.querySelectorAll('.starter-selector');

    let hp = 0;

    starterSelectors.forEach(selector => {

        if(selector.value){
            const val = parseFloat(selector.value);

            hp += val;
        };

    });

    return hp;
};

// FORM SUBMISSION
// On submit, process starter inputs, generate MS part number, and display part number page
msStartersForm.addEventListener('submit', e => {
    e.preventDefault();

    const currentHp = calcCurrentHp();

    if(currentHp > msInputs.maxHp){
        let message = 'Total starter HP exceeds the maximum for the selected voltage.';
        message += '<br><br>';
        message += 'Please select a combination with total HP below the maximum HP.';

        displayErrorMsg(message);
    }else{
        updateMsDisplay();
        displayPartNumDiv();
    };
});


// Add starter and leader selections to msAssem object
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
        const starterIDleader = `leader${i + 1}`;

        const motorName = `motor${i + 1}`;
        const starter = document.getElementById(starterID);
        const starterLeader = document.getElementById(starterIDleader);

        const hp = starter.value;

        // Filter for null leaders
        let leaderName = null
        if(starterLeader){
            if(starterLeader.value){
                leaderName = starterLeader.value;
            };
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

