const partNumDisplay = document.querySelectorAll(".part-num-disp");
const partNumDets = document.querySelector("#part-num-dets");

const totalCostDisplay = document.querySelector("#total-cost-disp");

// Build configured HPU part number and details
const buildHpuNumberDisplay = (data) => {
    const { reservoir, pump, motor, manifold, heatExchanger } = hpuAssem;

    // Set status of horizontal or vertical reservoir for cost selection
    let horizontal = null;

    if (reservoir.code.includes("H")) {
        horizontal = true;
    } else if (reservoir.code.includes("V")) {
        horizontal = false;
    }

    // Add adapter cost to SAE B motor types
    let motorCost = horizontal ? motor.hCost : motor.vCost;

    if (pump.mountType == "SAE A" && motor.type == "MF") {
        // pass
    } else if (pump.mountType == "SAE A" && motor.type == "MTC") {
        motorCost = parseFloat(motorCost) + motor.SAEAadapterCost;
    } else if (pump.mountType == "SAE B") {
        motorCost = parseFloat(motorCost) + motor.SAEBadapterCost;
    }

    // Display part number at top of part number and contact pages
    const partNum = hpuAssem.buildPartNum();
    partNumDisplay.forEach((element) => {
        element.innerHTML = `${partNum}`;
    });

    // Build dropdown for automatically-included parts
    const defaultsHTML = `
        <div class="dropdown">
            <div class="trigger">INCLUDED FEATURES</div>
            <div class="content">        
                <ul>
                    <li>Return Filter</li>
                    <li>Pressure Gauge</li>
                    <li>Level Sight Gauge</li>
                    <li>Drain Plug</li>
                    <li>Cleanout Covers</li>
                    <li>Relief Valve</li>
                </ul>
            </div>
        </div>
    `;

    // Display inputs on part number page
    const inputsHTML = `
        <div class="dropdown">
            <div class="trigger">HPU INPUTS</div>
            <div class="content">        
                <ul>
                    <li>Max Pressure: ${hpuInputs.maxPres} psi</li>
                    <li>Max Flow: ${hpuInputs.maxFlow} gpm</li>
                    <li>Application Type: ${hpuInputs.appType}</li>
                    <li>Heat Exchanger Type: ${hpuInputs.heatExchType}</li>
                    <li>Number of Stations: ${hpuInputs.numStat}</li>
                    <li>Valve Size: ${hpuInputs.portSize}</li>
                </ul>
            </div>
        </div>
    `;

    // Display part number details on part number page
    const reservoirHTML = `
        <div class="dropdown">
            <div class="trigger">RESERVOIR: ${reservoir.code}</div>
            <div class="content">        
                <ul>
                    <li>Capacity: ${reservoir.capacity} gal.</li>
                    <li>Heat Dissipation: ${reservoir.heatDis} HP</li>
                    <li>Price: $${
                        horizontal
                            ? reservoir.hCost.toFixed(2)
                            : reservoir.vCost.toFixed(2)
                    }</li>
                    <li class="li-edit" id="edit-reservoir">Edit reservoir</li>
                </ul>
            </div>
        </div>
    `;

    const pumpHTML = `        
        <div class="dropdown">
            <div class="trigger">PUMP: ${pump.code}</div>
            <div class="content">        
                <ul>
                    <li>Part Number: ${pump.partNum}</li>
                    <li>Description: ${pump.description}</li>
                    <li>Displacement: ${pump.dispCID} in<sup>3</sup>/r</li>
                    <li>Mount Type: ${pump.mountType}</li> 
                    <li>Price: $${
                        horizontal
                            ? pump.hCost.toFixed(2)
                            : pump.vCost.toFixed(2)
                    }</li>
                    <li class="li-edit" id="edit-pump">Edit pump</li>
                </ul>
            </div>
        </div>
    `;

    const motorHTML = `
        <div class="dropdown">
            <div class="trigger">MOTOR: ${motor.code}</div>
            <div class="content">        
                <ul>
                    <li>Part Number: ${motor.partNum}</li>
                    <li>Description: ${motor.description}</li>
                    <li>Output: ${motor.outputHP} HP</li>
                    <li>Price: $${motorCost.toFixed(2)}</li>
                    <li class="li-edit" id="edit-motor">Edit motor</li>
                </ul>
            </div>
        </div>
    `;

    const manifoldHTML = `
        <div class="dropdown">
            <div class="trigger">MANIFOLD: ${manifold.code}</div>
            <div class="content">        
                <ul>
                    <li>Description: ${manifold.description}</li>
                    <li>Valve Pattern: ${manifold.valvePattern}</li>
                    <li>Number of Stations: ${manifold.numStations}</li>
                    <li>P&T: ${manifold.PT}</li>
                    <li>A&B: ${manifold.AB}</li>
                    <li>Price: $${
                        horizontal
                            ? manifold.hCost.toFixed(2)
                            : manifold.vCost.toFixed(2)
                    }</li>
                    <li class="li-edit" id="edit-manifold">Edit manifold</li>
                </ul>
            </div>
        </div>
    `;

    // Logic to display user-friendly null heat exchanger results
    let heatExchangerHTML = "";

    if (heatExchanger.code == 0) {
        heatExchangerHTML = `
            <div class="dropdown">
                <div class="trigger">HEAT EXCHANGER: ${heatExchanger.code}</div>
                <div class="content">        
                    <ul>
                        <li>Description: No heat exchanger</li>
                        <li class="li-edit" id="edit-heat-exchanger">Edit heat exchanger</li>
                    </ul> 
                </div>
            </div>
        `;
    } else {
        heatExchangerHTML = `
            <div class="dropdown">
                <div class="trigger">HEAT EXCHANGER: ${heatExchanger.code}</div>
                <div class="content">        
                    <ul>
                        <li>Description: ${heatExchanger.description}</li>
                        <li>Type: ${heatExchanger.type}</li>
                        <li>Max Flow: ${heatExchanger.maxFlow} gpm</li>
                        <li>Heat Dissipation: ${heatExchanger.heatDis} HP</li>
                        <li>Price: $${
                            horizontal
                                ? heatExchanger.hCost.toFixed(2)
                                : heatExchanger.vCost.toFixed(2)
                        }</li>
                        <li class="li-edit" id="edit-heat-exchanger">Edit heat exchanger</li>
                    </ul>
                </div>
            </div>
        `;
    }

    const editHpuInputsHTML = `<p class="edit-inputs" id="edit-hpu-inputs">Edit HPU inputs</p>`;

    const hpuCost = hpuAssem.calcCost();
    const hpuCostHTML = `<p class="assem-price">HPU LIST PRICE: $${hpuCost}</p>`;

    partNumDets.innerHTML =
        editHpuInputsHTML +
        reservoirHTML +
        pumpHTML +
        motorHTML +
        manifoldHTML +
        heatExchangerHTML +
        defaultsHTML +
        inputsHTML +
        hpuCostHTML;

    toggleAdminSettings();
    addEventHandlersToDropdowns();
    addEventHandlerToEditHpuInputs();
    addEventHandlerstoEditBtns();

    buildTotalCostDisplay();
};

// Add event handlers to dropdowns
const addEventHandlersToDropdowns = () => {
    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach((dropdown) => {
        const trigger = dropdown.querySelector(".trigger");
        const content = dropdown.querySelector(".content");

        trigger.addEventListener("click", (e) => {
            e.preventDefault();

            trigger.classList.toggle("active");
            content.classList.toggle("active");
        });
    });
};

// Add event handler to the edit hpu inputs button
const addEventHandlerToEditHpuInputs = () => {
    const editHpuInputs = document.querySelector("#edit-hpu-inputs");

    editHpuInputs.addEventListener("click", (e) => {
        e.preventDefault();

        displayHpuSysParamsForm();
    });
};

// Build html to display total cost of HPU and valves on part number display
const buildTotalCostDisplay = () => {
    const total = calcTotalHpuCost();

    totalCostDisplay.innerHTML = `
        <h4 class="total-price">TOTAL LIST PRICE: $${total.toFixed(2)}</h4>
    `;
};

// Calculate total cost of HPU and valves
const calcTotalHpuCost = () => {
    const hpuCost = parseFloat(hpuAssem.calcCost());
    const valveCost = parseFloat(valveAssem.calcCost());

    return hpuCost + valveCost;
};
