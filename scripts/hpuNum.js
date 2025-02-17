const partNumDisplay = document.querySelectorAll('.part-num-disp');
const partNumDets = document.querySelector('#part-num-dets');

const tableWrapper = document.querySelector('.table-wrapper');
const tableCloseButton = document.querySelector('.table-close');

const tableH2 = document.querySelector('#table-h2');
const tableHead = document.querySelector('thead');
const tableBody = document.querySelector('tbody');


// Build configured HPU part number and details
const buildHpuNumberDisplay = (data) => {
    const reservoir = data.reservoir;
    const pump = data.pump;
    const motor = data.motor;
    const manifold = data.manifold;
    const heatExchanger = data.heatExchanger;
    const totalCost = data.totalCost;

    // Determine individual item cost based on V or H reservoir
    let reservoirCost = null;
    let pumpCost = null;
    let motorCost = null;
    let manifoldCost = null;
    let heatExchangerCost = null;

    const filterCost = () => {
        if(reservoir.code.includes('H')){
            reservoirCost = reservoir.hCost.toFixed(2);
            pumpCost = pump.hCost.toFixed(2);
            motorCost = motor.hCost.toFixed(2);
            manifoldCost = manifold.hCost.toFixed(2);
            heatExchangerCost = heatExchanger.hCost.toFixed(2);
        } else if (reservoir.code.includes('V')){
            reservoirCost = reservoir.vCost.toFixed(2);
            pumpCost = pump.vCost.toFixed(2);
            motorCost = motor.vCost.toFixed(2);
            manifoldCost = manifold.vCost.toFixed(2);
            heatExchangerCost = heatExchanger.vCost.toFixed(2);
        };
    };

    filterCost();

    // Display part number at top of part number, edit, and email pages
    partNumDisplay.forEach((element) => {
        element.innerHTML = `N-${reservoir.code}-${pump.code}-${motor.code}-${manifold.code}-${heatExchanger.code}`;
    });

    // Display inputs on part number page
    const inputsHTML = `
        <div class="dropdown">
            <div class="trigger">CONFIGURATOR INPUTS</div>
            <div class="content">        
                <ul>
                    <li>Max Pressure: ${hpuInputs.maxPres} psi</li>
                    <li>Max Flow: ${hpuInputs.maxFlow} gpm</li>
                    <li>Application Type: ${hpuInputs.appType}</li>
                    <li>Heat Exchanger Type: ${hpuInputs.heatExchType}</li>
                    <li>Number of Stations: ${hpuInputs.numStat}</li>
                    <li>Port Size: ${hpuInputs.portSize}</li>
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
                    <li>Price: $${reservoirCost}</li>
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
                    <li>Displacement: ${pump.dispCID} in^3/r</li>
                    <li>Mount Type: ${pump.mountType}</li> 
                    <li>Price: $${pumpCost}</li>
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
                    <li>Price: $${motorCost}</li>
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
                    <li>Price: $${manifoldCost}</li>
                    <li class="li-edit" id="edit-manifold">Edit manifold</li>
                </ul>
            </div>
        </div>
    `;

    // Logic to display user-friendly null heat exchanger results
    let heatExchangerHTML = '';

    if(heatExchanger.code == 0){
         heatExchangerHTML = `
            <div class="dropdown">
                <div class="trigger">HEAT EXCHANGER: ${heatExchanger.code}</div>
                <div class="content">        
                    <ul>
                        <li>Description: No heat exchanger</li>
                        <li>Price: $${heatExchangerCost}</li>
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
                        <li>Price: $${heatExchangerCost}</li>
                        <li class="li-edit" id="edit-heat-exchanger">Edit heat exchanger</li>
                    </ul>
                </div>
            </div>
        `;
    };

    let advancedHTML = `<p id="advanced-opts">Advanced Options</p>`;

    const hpuCostHTML = `<h4>HPU LIST PRICE: $${totalCost}</h4>`;

    partNumDets.innerHTML = advancedHTML + inputsHTML + reservoirHTML + pumpHTML + motorHTML + manifoldHTML + heatExchangerHTML + hpuCostHTML;

    addEventHandlerToAdvancedOptionsBtn();
    addEventHandlersToDropdowns();
    addEventHandlerstoEditBtns();

};

// Add event handlers to dropdowns
const addEventHandlersToDropdowns = () => {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.trigger');
        const content = dropdown.querySelector('.content');
    
        trigger.addEventListener('click', e => {
            e.preventDefault();

            trigger.classList.toggle('active');
            content.classList.toggle('active');
        });
    });
};

const addEventHandlerToAdvancedOptionsBtn = () => {
    const advancedOptsButton = document.querySelector('#advanced-opts');
    const liEdits = document.querySelectorAll('.li-edit');

    advancedOptsButton.addEventListener('click', e => {

        liEdits.forEach(li => {
            li.classList.toggle('active');
        });
    });

}

// Add event handlers to edit buttons
const addEventHandlerstoEditBtns = () => {
    const editReservoirButton = document.querySelector('#edit-reservoir');
    const editPumpButton = document.querySelector('#edit-pump');
    const editMotorButton = document.querySelector('#edit-motor');
    const editManifoldButton = document.querySelector('#edit-manifold');
    const editHeatExchangerButton = document.querySelector('#edit-heat-exchanger');
    
    editReservoirButton.addEventListener('click', e => {
        e.preventDefault();
    
        hpuAssem.getReservoirData()
            .then(data => displayReservoirTable(data))
            .catch(err => console.log(err.message));
    
        tableWrapper.style.display = 'block';
    });
    
    editPumpButton.addEventListener('click', e => {
        e.preventDefault();
    
        hpuAssem.getPumpData()
            .then(data => displayPumpTable(data))
            .catch(err => console.log(err.message));
    
        tableWrapper.style.display = 'block';
    });
    
    editMotorButton.addEventListener('click', e => {
        e.preventDefault();
    
        hpuAssem.getMotorData()
            .then(data => displayMotorTable(data))
            .catch(err => console.log(err.message));
    
        tableWrapper.style.display = 'block';
    });
    
    editManifoldButton.addEventListener('click', e => {
        e.preventDefault();
    
        hpuAssem.getManifoldData()
            .then(data => displayManifoldTable(data))
            .catch(err => console.log(err.message));
    
        tableWrapper.style.display = 'block';
    });
    
    editHeatExchangerButton.addEventListener('click', e => {
        e.preventDefault();
    
        hpuAssem.getHeatExchangerData()
            .then(data => displayHeatExchangerTable(data))
            .catch(err => console.log(err.message));
    
        tableWrapper.style.display = 'block';
    });
    
};


// Display table with reservoir data and update HPU number with selected reservoir
const displayReservoirTable = (data) => {
    tableHead.innerHTML = '';
    tableBody.innerHTML = '';
    tableH2.innerHTML = '';

    tableH2.innerHTML += `RESERVOIR OPTIONS`;

    tableHead.innerHTML += `
        <tr>
            <th>CODE</th>
            <th>CAPACITY</th>
            <th>HEAT DIS</th>
        </tr>
    `;

    data.forEach((element, index) => {
        let rowHTML = `<tr id=${index}><td>${element.code}</td><td>${element.capacity}</td><td>${element.heatDis}</td></tr>`;
        tableBody.innerHTML += rowHTML;
    });

    const tableRows = document.querySelectorAll('tr');

    tableRows.forEach(tableRow => {
        tableRow.addEventListener('click', e => {
            e.preventDefault();

            hpuAssem.updateReservoir(tableRow.id)
                .then(data => buildHpuNumberDisplay(data))
                .catch(err => console.log(err.message));

            tableWrapper.style.display = 'none';
        });
    });

};

// Display table with pump data and update HPU number with selected pump
const displayPumpTable = (data) => {
    tableHead.innerHTML = '';
    tableBody.innerHTML = '';
    tableH2.innerHTML = '';

    tableH2.innerHTML += `PUMP OPTIONS`;

    tableHead.innerHTML += `
        <tr>
            <th>CODE</th>
            <th>DESCRIPTION</th>
            <th>DISSIPATION</th>
            <th>MOUNT TYPE</th>
        </tr>
    `;

    data.forEach((element, index) => {
        let rowHTML = `<tr id=${index}><td>${element.code}</td><td>${element.description}</td><td>${element.dispCID}</td><td>${element.mountType}</td></tr>`;
        tableBody.innerHTML += rowHTML;
    });

    const tableRows = document.querySelectorAll('tr');

    tableRows.forEach(tableRow => {
        tableRow.addEventListener('click', e => {
            e.preventDefault();

            hpuAssem.updatePump(tableRow.id)
                .then(data => buildHpuNumberDisplay(data))
                .catch(err => console.log(err.message));

            tableWrapper.style.display = 'none';
        });
    });

};

// Display table with motor data and update HPU number with selected motor
const displayMotorTable = (data) => {
    tableHead.innerHTML = '';
    tableBody.innerHTML = '';
    tableH2.innerHTML = '';

    tableH2.innerHTML += `MOTOR OPTIONS`;

    tableHead.innerHTML += `
        <tr>
            <th>CODE</th>
            <th>PART NUMBER</th>
            <th>DESCRIPTION</th>
            <th>OUTPUT HP</th>
        </tr>
    `;

    data.forEach((element, index) => {
        let rowHTML = `<tr id=${index}><td>${element.code}</td><td>${element.partNum}</td><td>${element.description}</td><td>${element.outputHP}</td></tr>`;
        tableBody.innerHTML += rowHTML;
    });

    const tableRows = document.querySelectorAll('tr');

    tableRows.forEach(tableRow => {
        tableRow.addEventListener('click', e => {
            e.preventDefault();

            hpuAssem.updateMotor(tableRow.id)
                .then(data => buildHpuNumberDisplay(data))
                .catch(err => console.log(err.message));

            tableWrapper.style.display = 'none';
        });
    });

};

// Display table with manifold data and update HPU number with selected manifold
const displayManifoldTable = (data) => {
    tableHead.innerHTML = '';
    tableBody.innerHTML = '';
    tableH2.innerHTML = '';

    tableH2.innerHTML += `MANIFOLD OPTIONS`;

    tableHead.innerHTML += `
        <tr>
            <th>CODE</th>
            <th>DESCRIPTION</th>
            <th>VALVE PATTERN</th>
            <th>NUMBER OF STATIONS</th>
        </tr>
    `;

    data.forEach((element, index) => {
        let rowHTML = `<tr id=${index}><td>${element.code}</td><td>${element.description}</td><td>${element.valvePattern}</td><td>${element.numStations}</td></tr>`;
        tableBody.innerHTML += rowHTML;
    });

    const tableRows = document.querySelectorAll('tr');

    tableRows.forEach(tableRow => {
        tableRow.addEventListener('click', e => {
            e.preventDefault();

            hpuAssem.updateManifold(tableRow.id)
                .then(data => buildHpuNumberDisplay(data))
                .catch(err => console.log(err.message));

            tableWrapper.style.display = 'none';
        });
    });

};

// Display table with heat exchanger data and update HPU number with selected heat exchanger
const displayHeatExchangerTable = (data) => {
    tableHead.innerHTML = '';
    tableBody.innerHTML = '';
    tableH2.innerHTML = '';

    tableH2.innerHTML += `HEAT EXCHANGER OPTIONS`;

    tableHead.innerHTML += `
        <tr>
            <th>CODE</th>
            <th>DESCRIPTION</th>
            <th>MAX FLOW</th>
            <th>HEAT DIS</th>
        </tr>
    `;

    data.forEach((element, index) => {
        let rowHTML = `<tr id=${index}><td>${element.code}</td><td>${element.description}</td><td>${element.maxFlow}</td><td>${element.heatDis}</td></tr>`;
        tableBody.innerHTML += rowHTML;
    });

    const tableRows = document.querySelectorAll('tr');

    tableRows.forEach(tableRow => {
        tableRow.addEventListener('click', e => {
            e.preventDefault();

            hpuAssem.updateHeatExchanger(tableRow.id)
                .then(data => buildHpuNumberDisplay(data))
                .catch(err => console.log(err.message));

            tableWrapper.style.display = 'none';
        });
    });

};