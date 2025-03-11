// Build configured MS number and details
const buildMsNumberDisplay = (data) => {
    const motor1 = data.motor1;
    const motor2 = data.motor2;
    const motor3 = data.motor3;
    const motor4 = data.motor4;
    const enclosure = data.enclosure;

    const motorArray = [motor1, motor2, motor3, motor4];

    // Build and display part number at top of part number and contact pages
    partNumDisplay.forEach((element) => {

        element.innerHTML = msAssem.buildPartNum();
    });

    // Build and add editing and cost elements to display
    const editMsInputsHtml = `<p class="edit-inputs" id="edit-ms-inputs">Edit MS inputs</p>`;

    partNumDets.innerHTML = editMsInputsHtml;

    // Build dropdown for automatically-included parts
    const defaultsHTML = `
        <div class="dropdown">
            <div class="trigger">INCLUDED FEATURES</div>
            <div class="content">       
                <ul>
                    <li>Enclosure Material: Polycarbonate</li>
                    <li>Enclosure Dimensions: ${enclosure.dimensions} in</li>
                    <li>Disconnect Size: </li>
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
    let hpHTML = ''

    msInputs.hpArr.forEach((hp, i) => {
        hpHTML += `<li>Motor ${i + 1}: ${hp} hp</li>`;
    });

    const inputsHTML = `
        <div class="dropdown">
            <div class="trigger">MS INPUTS</div>
            <div class="content">        
                <ul>
                    ${hpHTML}
                </ul>
            </div>
        </div>
    `;

    // Build dropdowns for each starter
    motorArray.forEach((motor, i) => {

        if(motor.starter){
            if(motor.starter.voltage){
                const motorHTML = `
                    <div class="dropdown">
                        <div class="trigger">MOTOR ${i + 1}</div>
                        <div class="content">
    
                            <ul>
                                <li>Voltage: ${motor.starter.voltage}</li>
                                <li>Rated HP: ${motor.starter.HP}</li>
                                <li>Rated FLA: ${motor.starter.FLA}</li>
                                <li>Price: $${motor.starter.cost.toFixed(2)}</li>
                            </ul>
    
                        </div>
                    </div>
                `;
    
                partNumDets.innerHTML += motorHTML;
            };
        };
    });

    // Add default features and ms form inputs to bottom of display
    partNumDets.innerHTML += defaultsHTML + inputsHTML; 
    
    addEventHandlersToDropdowns();
    addEventHandlerToEditMsInputs();
    // toggleAdminSettings();

    buildTotalMsCostDisplay();
};

// Add event handler to the edit ms inputs button
const addEventHandlerToEditMsInputs = () => {
    const editMsInputs = document.querySelector('#edit-ms-inputs');

    editMsInputs.addEventListener('click', e => {
        e.preventDefault();

        displayMsVoltageForm();
    });
};

// Build msAssem total list price html
const buildTotalMsCostDisplay = () => {
    const total = msAssem.calcCost();

    totalCostDisplay.innerHTML = `<h4 class="total-price">TOTAL LIST PRICE: $${total.toFixed(2)}</h4>`
};