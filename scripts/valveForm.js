const valvePortSizeDiv = document.querySelector("#valve-port-size-div");
const valveSolVoltDiv = document.querySelector("#valve-sol-volt-div");
const solenoidVoltage = document.querySelector("#SolenoidVoltage");

const valvePopupWrapper = document.querySelector(".valve-popup-wrapper");
const valvePopupCloseButtonX = document.querySelector(".valve-popup-close-x");
const valvePopupContent = document.querySelector(".valve-popup-content");
const valvePopupForm = document.querySelector("#valve-popup-form");

// Display popup to edit valves, flow controls, and check valves
const displayValvePopup = () => {
    prefillValveSettingsFromHPUInputs();
    prefillValvePopupFromValveAssembly();

    valvePopupWrapper.style.display = "block";
};

// Valve popup close button
valvePopupCloseButtonX.addEventListener("click", (e) => {
    e.preventDefault();
    solenoidVoltage.value = "";
    resetValveInputs();
    valvePopupWrapper.style.display = "none";
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
    valvePopupContent.innerHTML = "";

    // Check for values in hpuInputs array and prefill each dropdown if present
    if (hpuInputs.portSize) {
        valveInputs.portSize = hpuInputs.portSize;
        valvePortSizeDiv.innerHTML = `Port Size: ${valveInputs.portSize}`;
    }

    if (hpuInputs.numStat) {
        valveInputs.numStat = hpuInputs.numStat;
    }
};

// Prefill popup with valve assembly
async function prefillValvePopupFromValveAssembly() {
    if (valveAssem.voltage) {
        solenoidVoltage.value = valveAssem.voltage;
        valveInputs.solVolt = solenoidVoltage.value;
        await generateAllValveDropdowns();
    }

    for (i = 0; i < valveInputs.numStat; i++) {
        let station = `station${i}`;

        if (valveAssem[station]) {
            if (valveAssem[station].valve && valveAssem[station].valve.code) {
                let elementID = `valve${i}`;
                let element = document.getElementById(elementID);
                element.value = valveAssem[station].valve.code;

                // Prefill flow control and check valve only if valve is selected
                if (valveAssem[station].valve.code != 0) {
                    if (
                        valveAssem[station].flowControl &&
                        valveAssem[station].flowControl.code
                    ) {
                        let elementID = `flowControl${i}`;
                        let element = document.getElementById(elementID);
                        element.value = valveAssem[station].flowControl.code;
                        element.removeAttribute("disabled");
                    }

                    if (
                        valveAssem[station].checkValve &&
                        valveAssem[station].checkValve.code
                    ) {
                        let elementID = `checkValve${i}`;
                        let element = document.getElementById(elementID);
                        element.value = valveAssem[station].checkValve.code;
                        element.removeAttribute("disabled");
                    }
                }
            }
        }
    }
}

// Event listener to create valve selectors based on numSt and solVolt
solenoidVoltage.addEventListener("change", (e) => {
    e.preventDefault();

    valvePopupContent.innerHTML = "";

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
                    <option value="0">No valve (includes coverplate)</option>
                `;

    data.forEach((valve) => {
        html += `<option value=${valve.code}>${valve.description}</option>`;
    });

    html += `</select>`;

    return html;
};

// Create individual flow control dropdown
const generateFlowControlDropdown = (data, i) => {
    let html = `
                <label for="flowControl${i}"></label>
                <select name="flowControl${i}" id="flowControl${i}" class="flowControl" required disabled>
                    <option value="" disabled selected hidden>Select flow control...</option>
                    <option value="0">No flow control</option>
                `;

    data.forEach((flowControl) => {
        html += `<option value=${flowControl.code}>${flowControl.description}</option>`;
    });

    html += `</select>`;

    return html;
};

// Create individual check valve dropdown
const generateCheckValveDropdown = (data, i) => {
    let html = `
                <label for="checkValve${i}"></label>
                <select name="checkValve${i}" id="checkValve${i}" class="checkValve" required disabled>
                    <option value="" disabled selected hidden>Select check valve...</option>
                `;

    data.forEach((checkValve) => {
        if (checkValve.code == 0) {
            html += `<option value="0">No check valve</option>`;
        } else {
            html += `<option value=${checkValve.code}>${checkValve.description}</option>`;
        }
    });

    html += `</select>`;

    return html;
};

// Generate valve options dropdowns for each number of stations containing selected solVolt data
async function generateAllValveDropdowns() {
    if (valveInputs.solVolt == "null") {
        valvePopupContent.innerHTML = "";
    } else {
        const valveData = await valveAssem.getFilteredValveData(
            valveInputs.portSize,
            valveInputs.solVolt
        );
        const flowControlData = await valveAssem.getFilteredFlowControlData(
            valveInputs.portSize
        );
        const checkValveData = await valveAssem.getCheckValveData();

        for (i = 0; i < valveInputs.numStat; i++) {
            const valveHtml = generateValveDropdown(valveData, i);
            const flowControlHtml = generateFlowControlDropdown(
                flowControlData,
                i
            );
            const checkValveHtml = generateCheckValveDropdown(
                checkValveData,
                i
            );

            const stationHtml = `<div id="station${i}">Station ${
                i + 1
            }: ${valveHtml}${flowControlHtml}${checkValveHtml}</div>`;

            valvePopupContent.innerHTML += stationHtml;
        }
    }

    // Add event listener to enable flow control and check valve dropdowns when valve is selected
    addEventListenerToEnableDropdowns();
}

// Event listener to enable flow control and check valve dropdowns when the valve selection is changed from null / no valve
const addEventListenerToEnableDropdowns = () => {
    const valveDropdowns = document.querySelectorAll(".valve");

    valveDropdowns.forEach((dropdown, i) => {
        const flCtrlID = `flowControl${i}`;
        const chValveID = `checkValve${i}`;

        const flCtl = document.getElementById(flCtrlID);
        const chValve = document.getElementById(chValveID);

        dropdown.addEventListener("change", (e) => {
            e.preventDefault();

            if (e.target.value != 0) {
                flCtl.removeAttribute("disabled");
                chValve.removeAttribute("disabled");
            } else if (e.target.value == 0) {
                flCtl.value = "";
                chValve.value = "";

                flCtl.setAttribute("disabled", true);
                chValve.setAttribute("disabled", true);
            }
        });
    });
};

valvePopupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    updateValvesAndHPU();

    valvePopupWrapper.style.display = "none";
});

// Build valve assembly object from valve form inputs
async function addValveInputsToValveAssembly() {
    let counter = [];

    for (i = 0; i < valveInputs.numStat; i++) {
        counter.push(i);
    }

    let promises = [];

    // create a stations object for each submitted set of values
    for await (i of counter) {
        const stationName = `station${i}`;
        const valveID = `valve${i}`;
        const flowControlID = `flowControl${i}`;
        const checkValveID = `checkValve${i}`;

        const valve = document.getElementById(valveID);
        const flowControl = document.getElementById(flowControlID);
        const checkValve = document.getElementById(checkValveID);

        // Assign value of 0 to null (disabled) flow control and check valve options
        let flowControlValue = flowControl.value;
        if (!flowControl.value) {
            flowControlValue = 0;
        }

        let checkValveValue = checkValve.value;
        if (!checkValve.value) {
            checkValveValue = 0;
        }

        let promise = valveAssem.updateStation(
            stationName,
            valve.value,
            flowControlValue,
            checkValveValue
        );

        promises.push(promise);
    }

    await Promise.all(promises);

    // Update voltage attribute based on the solenoid voltage selection
    valveAssem.voltage = valveInputs.solVolt;

    // Update number of L valves (for hpu calc)
    valveAssem.countLValves();

    // Update number of flow controls (for hpu calc)
    valveAssem.countFlowControl();
}

// Update valve and hpu display when edits are made from the display page, including updating the heat exchanger if necessary
async function updateValvesAndHPU() {
    await addValveInputsToValveAssembly();

    if (partNumDiv.style.display == "block") {
        if (currentUser.userType === "admin") {
            displayErrorMsg(
                `The HPU part number has been recalculated <br>based on valve inputs.`
            );
        }

        await updateHpuDiv();
    }
}
