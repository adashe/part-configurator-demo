// Build configured MS number and details
const buildMsNumberDisplay = (msAssem) => {
    const starter1 = msAssem.starter1;
    const starter2 = msAssem.starter2;
    const starter3 = msAssem.starter3;
    const starter4 = msAssem.starter4;

    // Display part number at top of part number and contact pages
    partNumDisplay.forEach((element) => {
        element.innerHTML = `MS-NUMBER`;
    });

    // Build and add editing and cost elements to display
    const editMsInputsHtml = `<p class="edit-inputs" id="edit-ms-inputs">Edit MS inputs</p>`;
    const msCostHTML = `<p class="assem-price">MS LIST PRICE: $1 MILLION DOLLAS</p>`;

    partNumDets.innerHTML = editMsInputsHtml;

    // Build dropdowns for each starter
    const starterArray = [starter1, starter2, starter3, starter4];

    starterArray.forEach((starter, i) => {
        let starterHTML = `
                <div class="dropdown">
                    <div class="trigger">Starter ${i + 1}</div>
                    <div class="content">

                        <ul>
                            <li><h5>STARTER: 1672</h5></li>
                            <li>HP: Twelve</li>
                            <li>Price: $MONEY.00</li>
                            <li class="li-edit" id="edit-station${i + 1}">Edit station${i + 1}</li>
                        </ul>

                    </div>
                </div>
            `;

        partNumDets.innerHTML += starterHTML;
    });

    // Add price to bottom of display
    partNumDets.innerHTML += msCostHTML; 

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