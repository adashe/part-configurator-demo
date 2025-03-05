// Build configured MS number and details
const buildMsNumberDisplay = (data) => {
    const motor1 = data.motor1;
    const motor2 = data.motor2;
    const motor3 = data.motor3;
    const motor4 = data.motor4;

    const motorArray = [motor1, motor2, motor3, motor4];

    // Build and display part number at top of part number and contact pages
    partNumDisplay.forEach((element) => {
        element.innerHTML = `MS-${motor1.starter.voltage}`;

        motorArray.forEach(motor => {
            if(motor.starter){
                element.innerHTML += `-${motor.starter.HP}`
            };

            if(motor.leader){
                element.innerHTML += `M${motor.leader}`
            };

        });
    });

    // Build and add editing and cost elements to display
    const editMsInputsHtml = `<p class="edit-inputs" id="edit-ms-inputs">Edit MS inputs</p>`;
    const msCostHTML = `<p class="assem-price">MS LIST PRICE: $1 MILLION DOLLAS</p>`;

    partNumDets.innerHTML = editMsInputsHtml;

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

    // Build dropdowns for each starter
    motorArray.forEach((motor, i) => {
        let motorHTML = `
                <div class="dropdown">
                    <div class="trigger">MOTOR ${i + 1}</div>
                    <div class="content">

                        <ul>
                            <li><h5>Motor: 1672</h5></li>
                            <li>HP: Twelve</li>
                            <li>Price: $MONEY.00</li>
                        </ul>

                    </div>
                </div>
            `;

        partNumDets.innerHTML += motorHTML;
    });

    // Add default features and price to bottom of display
    partNumDets.innerHTML += defaultsHTML + msCostHTML; 

    addEventHandlersToDropdowns();
    addEventHandlerToEditMsInputs();
    toggleAdminSettings();

};

const addEventHandlerToEditMsInputs = () => {
    const editMsInputs = document.querySelector('#edit-ms-inputs');

    editMsInputs.addEventListener('click', e => {
        e.preventDefault();

        displayMsVoltageForm();
    })

};