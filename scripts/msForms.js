const msVoltageForm = document.querySelector("#ms-voltage-form");
const msStartersForm = document.querySelector("#ms-starters-form");

const msVoltageSelector = document.querySelector("#msVoltage");
const msVoltageBtn = document.querySelector(".ms-voltage-btn");
const msNumStarters = document.querySelector("#msNumStarters");

const generatedStartersDiv = document.querySelector("#generated-starters-div");

const msAssem = new MsAssembly();

// DISPLAY AND HIDE FORM ELEMENTS
const displayMsVoltageForm = () => {
    mspDiv.style.display = "block";
    partNumDiv.style.display = "none";

    msVoltageForm.style.display = "block";
    msStartersForm.style.display = "none";
};

const displayMsStartersForm = () => {
    msVoltageForm.style.display = "none";
    msStartersForm.style.display = "block";
};

// BUTTONS
// Return to voltage form when voltage button is clicked (on starter page)
msVoltageBtn.addEventListener("click", (e) => {
    e.preventDefault();
    displayMsVoltageForm();
});

// FORMS
// Initiate null values for MS inputs
let msInputs = {
    voltage: null,
    numStarters: null,
    enclosureMaterial: null,
    hpArr: [],
};

// Reset null values for MS inputs
const resetMsInputs = () => {
    msInputs = {
        voltage: null,
        numStarters: null,
        enclosureMaterial: null,
        hpArr: [],
    };
};

// Process voltage form inputs and proceed to starters form
msVoltageForm.addEventListener("submit", (e) => {
    e.preventDefault();

    msInputs.voltage = msVoltageForm.msVoltage.value;
    msInputs.numStarters = msVoltageForm.msNumStarters.value;
    msInputs.enclosureMaterial = msVoltageForm.msEnclosureMaterial.value;

    displayMsStartersForm();
});

// Generate / reset starter selectors and HP values when the number of starters is changed
msNumStarters.addEventListener("change", (e) => {
    e.preventDefault();

    msInputs.voltage = msVoltageForm.msVoltage.value;
    msInputs.numStarters = msVoltageForm.msNumStarters.value;

    msStartersForm.reset();
    generateAllStarterDivs();
});

msVoltageSelector.addEventListener("change", (e) => {
    msInputs.voltage = msVoltageForm.msVoltage.value;

    msStartersForm.reset();
    generateAllStarterDivs();
});

// Build starter divs based on number of indicated starters
const generateAllStarterDivs = () => {
    generatedStartersDiv.innerHTML = "";

    // Generate a starter div for each starter
    for (i = 0; i < msInputs.numStarters; i++) {
        generateStarterDiv(i + 1);
    }

    // Add event listeners to starter div elements after elements have been generated
    addEventListenersToStarterDivs();
};

// Build individual starter div with starter selector, leader checkbox, and leader selector
const generateStarterDiv = (idx) => {
    // idx represents the motor number for which the div is being created

    const maxHP = calculateStarterMaxHP();

    const openingDivHtml = `        
        <p>MOTOR ${idx}</p>
        <div class="starter-selector-div">
    `;

    const starterSelectorHtml = `
            <label for="starter${idx}"></label>
            <input type="number" id="starter${idx}" class="starter-input" placeholder="Enter motor hp ..." min="0" max="${maxHP}" step="0.1" required>
            <p class="max-hp">Maximum: ${maxHP} hp</p>
        </div>
    `;

    let leaderCheckboxHtml = "";
    let leaderSelectorHtml = "";

    if (msInputs.numStarters > 1) {
        leaderCheckboxHtml = `
            <div class="leader-checkbox-div">
                <label for="leader${idx}-checkbox">Follower?</label>
                <input type="checkbox" id="leader${idx}-checkbox" name="leader${idx}-checkbox" class="leader-checkbox"/>
            </div>
        `;

        leaderSelectorHtml = generateLeaderSelectors(idx);
    }

    const closingDivHtml = "</div>";

    const starterDivHtml =
        openingDivHtml +
        starterSelectorHtml +
        leaderCheckboxHtml +
        leaderSelectorHtml +
        closingDivHtml;

    generatedStartersDiv.innerHTML += starterDivHtml;
};

// Generate an individual leader selector
const generateLeaderSelectors = (idx) => {
    // idx represents the motor number for which the div is being created

    const openingHtml = `
        <div class="leader-selector-div" id="leaderSelectorDiv${idx}">
            <label for="leader${idx}"></label>
            <select name="leader${idx}" id="leader${idx}" class="leader-selector" disabled>
    `;

    let optionsHtml = generateLeaderOptions(idx);

    const closingHtml = "</select></div>";

    const html = openingHtml + optionsHtml + closingHtml;

    return html;
};

// Generate leader selector options for an individual leader selector based on available options
const generateLeaderOptions = (idx) => {
    // idx represents the motor number for which the div is being created

    let html =
        '<option value="" disabled selected hidden>Select leader...</option>';

    // Hardcoded options for leaders; unable to get dynamic option generation to function
    // Options for one motor
    if (idx == 1 && msInputs.numStarters == 1) {
        html += '<option value="0">None</option>';
    }
    if (idx == 1 && msInputs.numStarters == 2) {
        html += '<option value="2">Motor 2</option>';
    }
    if (idx == 1 && msInputs.numStarters == 3) {
        html += '<option value="2">Motor 2</option>';
        html += '<option value="3">Motor 3</option>';
    }
    if (idx == 1 && msInputs.numStarters == 4) {
        html += '<option value="2">Motor 2</option>';
        html += '<option value="3">Motor 3</option>';
        html += '<option value="4">Motor 4</option>';
    }

    // Options for two motors
    if (idx == 2 && msInputs.numStarters == 2) {
        html += '<option value="1">Motor 1</option>';
    }
    if (idx == 2 && msInputs.numStarters == 3) {
        html += '<option value="1">Motor 1</option>';
        html += '<option value="3">Motor 3</option>';
    }
    if (idx == 2 && msInputs.numStarters == 4) {
        html += '<option value="1">Motor 1</option>';
        html += '<option value="3">Motor 3</option>';
        html += '<option value="4">Motor 4</option>';
    }

    // Options for three motors
    if (idx == 3 && msInputs.numStarters == 3) {
        html += '<option value="1">Motor 1</option>';
        html += '<option value="2">Motor 2</option>';
    }
    if (idx == 3 && msInputs.numStarters == 4) {
        html += '<option value="1">Motor 1</option>';
        html += '<option value="2">Motor 2</option>';
        html += '<option value="4">Motor 4</option>';
    }

    // Options for four motors
    if (idx == 4) {
        html += '<option value="1">Motor 1</option>';
        html += '<option value="2">Motor 2</option>';
        html += '<option value="3">Motor 3</option>';
    }

    return html;
};

const calculateStarterMaxHP = () => {
    let maxHP = 0;

    if (msInputs.voltage == "208V") {
        if (msInputs.numStarters == 1) {
            maxHP = 50;
        } else if (msInputs.numStarters == 2) {
            maxHP = 25;
        } else if (msInputs.numStarters == 3 || msInputs.numStarters == 4) {
            maxHP = 7.5;
        }
    }

    if (msInputs.voltage == "240V") {
        if (msInputs.numStarters == 1) {
            maxHP = 60;
        } else if (msInputs.numStarters == 2) {
            maxHP = 25;
        } else if (msInputs.numStarters == 3 || msInputs.numStarters == 4) {
            maxHP = 10;
        }
    }

    if (msInputs.voltage == "480V") {
        if (msInputs.numStarters == 1) {
            maxHP = 75;
        } else if (msInputs.numStarters == 2) {
            maxHP = 40;
        } else if (msInputs.numStarters == 3 || msInputs.numStarters == 4) {
            maxHP = 15;
        }
    }

    return maxHP;
};

// FORM INTERACTIVITY
// Add event listeners to starter checkboxes after generating starter divs
const addEventListenersToStarterDivs = () => {
    const leaderCheckboxes = document.querySelectorAll(".leader-checkbox");
    const leaderSelectors = document.querySelectorAll(".leader-selector");

    let leaderCheckboxesArr = [null];
    let leaderSelectorsArr = [null];

    leaderCheckboxes.forEach((checkbox) => {
        leaderCheckboxesArr.push(checkbox);
    });

    leaderSelectors.forEach((selector) => {
        leaderSelectorsArr.push(selector);
    });

    // Add event listeners to each checkbox to enable the leader selector when checked
    leaderCheckboxesArr.forEach((checkbox, i) => {
        if (checkbox) {
            checkbox.addEventListener("change", (e) => {
                e.preventDefault();

                if (checkbox.checked) {
                    leaderSelectorsArr[i].removeAttribute("disabled");
                    leaderSelectorsArr[i].setAttribute("required", true);
                } else {
                    leaderSelectorsArr[i].value = "";
                    leaderSelectorsArr[i].setAttribute("disabled", true);
                    leaderSelectorsArr[i].removeAttribute("required");
                }
            });
        }
    });
};

// FORM SUBMISSION
// On submit, process starter inputs, generate MS part number, and display part number page
msStartersForm.addEventListener("submit", (e) => {
    e.preventDefault();
    updateMsAssemblyAndDisplay();
});

// Update and show part number display with msAssem object
async function updateMsAssemblyAndDisplay() {
    await addMSInputsToMsAssembly();
    await updateMsEnclosure();
    await updateMsBase();
    await updateMsDisconnect();
    msAssem.calcCost();

    // Builds and displays assembly number details page if number is valid
    // Interrupts user flow if invalid
    if (msAssem.totalCost != null) {
        buildMsNumberDisplay(msAssem);
        displayPartNumDiv();
    }
}

// Add starter and leader selections to msAssem object
async function addMSInputsToMsAssembly() {
    // Reset msAssem when new data is submitted
    msAssem.reset();

    // Reset msInputs.hpArr when new data is submitted
    msInputs.hpArr = [];

    // Use a counter based on how many motors are selected to track motor iterations
    let counter = [];

    for (i = 0; i < msInputs.numStarters; i++) {
        counter.push(i);
    }

    // Create a msAssem motor object for each submitted set of values
    let promises = [];

    for await (i of counter) {
        const voltage = msInputs.voltage;

        const starterID = `starter${i + 1}`;
        const starterLeaderID = `leader${i + 1}`;
        const motorName = `motor${i + 1}`;

        const starter = document.getElementById(starterID);
        const starterLeader = document.getElementById(starterLeaderID);

        const hp = parseFloat(starter.value);

        // Add hp to hpArr to display in part number display inputs dropdown
        msInputs.hpArr.push(hp);

        // Filter for null leaders
        let leaderName = null;
        if (starterLeader) {
            if (starterLeader.value) {
                leaderName = starterLeader.value;
            }
        }

        const promise = msAssem.updateMotor(motorName, voltage, hp, leaderName);

        promises.push(promise);
    }

    await Promise.all(promises);
}

// Update assembly object; separated from parent functions to manage async flow
async function updateMsEnclosure() {
    await msAssem.updateEnclosure(
        msInputs.enclosureMaterial,
        msInputs.numStarters
    );
}

async function updateMsBase() {
    await msAssem.updateBase(msInputs.voltage);
}

async function updateMsDisconnect() {
    await msAssem.updateDisconnect();
}
