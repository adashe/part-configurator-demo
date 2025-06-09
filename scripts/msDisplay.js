// Build configured MS number and details
const buildMsNumberDisplay = (data) => {
    const {
        motor1,
        motor2,
        motor3,
        motor4,
        enclosureType,
        enclosure,
        base,
        disconnect,
    } = msAssem;

    const motorArray = [motor1, motor2, motor3, motor4];

    // Build and display part number at top of part number and contact pages
    partNumDisplay.forEach((element) => {
        element.innerHTML = msAssem.buildPartNum();
    });

    // Build and add editing and cost elements to display
    const editMsInputsHtml = `<p class="edit-inputs" id="edit-ms-inputs">Edit MS inputs</p>`;

    partNumDets.innerHTML = editMsInputsHtml;

    // Calculate base cost
    const totalBaseCost = enclosure.cost + base.cost + disconnect.cost;

    // Build dropdown for assembly components
    const baseHTML = `
        <div class="dropdown">
            <div class="trigger">BASE ASSEMBLY</div>
            <div class="content">       
                <ul>
                    <li>Enclosure Material: ${enclosure.material.toUpperCase()}</li>
                    <li>Enclosure Dimensions: ${enclosure.dimensions} in</li>
                    <li>Disconnect Size: ${disconnect.FLA}</li>
                    <li>Base Price: $${totalBaseCost.toFixed(2)}</li>
                </ul>
            </div>
        </div>
    `;

    // Build dropdown for automatically-included parts
    const defaultsHTML = `
        <div class="dropdown">
            <div class="trigger">INCLUDED FEATURES</div>
            <div class="content">       
                <ul>
                    <li>Local E-stop</li>
                    <li>Remote E-stop Ready</li>
                    <li>Overload Alarm Ready</li>
                    <li>Auxiliary Terminals</li>
                    <li>Standard 120VAC Control</li>
                </ul>
            </div>
        </div>
    `;

    // Display dropdown for ms form inputs
    let hpHTML = "";

    msInputs.hpArr.forEach((hp, i) => {
        hpHTML += `<li>Motor ${i + 1}: ${hp} hp</li>`;
    });

    const inputsHTML = `
        <div class="dropdown">
            <div class="trigger">MS INPUTS</div>
            <div class="content">        
                <ul>
                    <li>Voltage: ${msInputs.voltage}</li>
                    <li>Number of Motors: ${msInputs.numStarters}</li>
                    ${hpHTML}
                </ul>
            </div>
        </div>
    `;

    // Build dropdowns for each starter
    motorArray.forEach((motor, i) => {
        if (motor.starter) {
            if (motor.starter.voltage) {
                const motorHTML = `
                    <div class="dropdown">
                        <div class="trigger">MOTOR ${i + 1}</div>
                        <div class="content">
    
                            <ul>
                                <li>Voltage: ${motor.starter.voltage}</li>
                                <li>Rated HP: ${motor.starter.HP}</li>
                                <li>Rated FLA: ${motor.starter.FLA}</li>
                                <li>Price: $${motor.starter.cost.toFixed(
                                    2
                                )}</li>
                            </ul>
    
                        </div>
                    </div>
                `;

                partNumDets.innerHTML += motorHTML;
            }
        }
    });

    // Add default features and ms form inputs to bottom of display
    partNumDets.innerHTML += baseHTML + defaultsHTML + inputsHTML;

    addEventHandlersToDropdowns();
    addEventHandlerToEditMsInputs();

    buildTotalMsCostDisplay();
};

// Add event handler to the edit ms inputs button
const addEventHandlerToEditMsInputs = () => {
    const editMsInputs = document.querySelector("#edit-ms-inputs");

    editMsInputs.addEventListener("click", (e) => {
        e.preventDefault();

        displayMsVoltageForm();
    });
};

// Build msAssem total list price html
const buildTotalMsCostDisplay = () => {
    const total = msAssem.calcCost();

    totalCostDisplay.innerHTML = `<h4 class="total-price">TOTAL LIST PRICE: 
            $${total.toFixed(2)}</h4>
        `;
};
