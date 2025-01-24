// Display configured HPU part number and details
const partNumDisplay = document.querySelectorAll('.part-num-disp');
const partNumDets = document.querySelector('#part-num-dets');

const tableH2 = document.querySelector('#table-h2');
const tableHead = document.querySelector('thead');
const tableBody = document.querySelector('tbody');

const displayHpuNumber = (data) => {
    const reservoir = data.reservoir;
    const pump = data.pump;
    const motor = data.motor;
    const manifold = data.manifold;
    const heatExchanger = data.heatExchanger;
    const valves = data.valves;

    // Display part number at top of part number, edit, and email pages
    partNumDisplay.forEach((element) => {
        element.innerHTML = `N-${reservoir.code}-${pump.code}-${motor.code}-${manifold.code}-${heatExchanger.code}`;
    });

    // Display part number details on part number page
    const detsHTML = `
        <div class="dropdown">
            <div class="trigger">RESERVOIR ${reservoir.code}</div>
            <div class="content">        
                <ul>
                    <li>Capacity: ${reservoir.capacity}</li>
                    <li>Heat Dis: ${reservoir.heatDis}</li>
                </ul>
                <button class="button gray edit" id="edit-reservoir">EDIT RESERVOIR</button>
            </div>
        </div>

        <div class="dropdown">
            <div class="trigger">PUMP ${pump.code}</div>
            <div class="content">        
                <ul>
                    <li>${pump.partNum}</li>
                    <li>${pump.description}</li>
                    <li>${pump.dispCID}</li> 
                </ul>
                <button class="button gray edit" id="edit-pump">EDIT PUMP</button>
            </div>
        </div>

        <div class="dropdown">
            <div class="trigger">MOTOR ${motor.code}</div>
            <div class="content">        
                <ul>
                    <li>${motor.partNum}</li>
                    <li>${motor.description}</li>
                    <li>${motor.output}</li>
                </ul>
                <button class="button gray edit" id="edit-motor">EDIT MOTOR</button>
            </div>
        </div>

        <div class="dropdown">
            <div class="trigger">MANIFOLD ${manifold.code}</div>
            <div class="content">        
                <ul>
                    <li>${manifold.p21Model}</li>
                    <li>${manifold.description}</li>
                    <li>${manifold.valvePattern}</li>
                </ul>
                <button class="button gray edit" id="edit-manifold">EDIT MANIFOLD</button>
            </div>
        </div>

        <div class="dropdown">
            <div class="trigger">HEAT EXCHANGER ${heatExchanger.code}</div>
            <div class="content">        
                <ul>
                    <li>${heatExchanger.description}</li>
                    <li>${heatExchanger.maxFlow}</li>
                    <li>${heatExchanger.heatDis}</li>
                </ul>
                <button class="button gray edit" id="edit-heat-exchanger">EDIT HEAT EXCHANGER</button>
            </div>
        </div>

        <div class="dropdown">
            <div class="trigger">VALVES</div>
            <div class="content">        
                <ul>
                    <li>${valves[0]}</li>
                </ul>
                <button class="button gray edit" id="edit-valves">EDIT VALVES</button>
            </div>
        </div>

        <h4>ESTIMATED COST: $${reservoir.cost + pump.cost + motor.cost + manifold.hCost + manifold.vCost+ heatExchanger.hCost + heatExchanger.vCost}</h4>
    `

    partNumDets.innerHTML = detsHTML;

    // Add event handlers for dropdown functionality
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

    // Add event handlers to edit buttons
    const editReservoirButton = document.querySelector('#edit-reservoir');
    const editPumpButton = document.querySelector('#edit-pump');
    const editMotorButton = document.querySelector('#edit-motor');
    const editManifoldButton = document.querySelector('#edit-manifold');
    const editHeatExchangerButton = document.querySelector('#edit-heat-exchanger');
    const editValveButton = document.querySelector('#edit-valves');

    editReservoirButton.addEventListener('click', e => {
        e.preventDefault();
    
        hpuNum.getReservoirData()
            .then(data => displayReservoirTable(data))
            .catch(err => console.log(err.message));
    
        tableWrapper.style.display = 'block';
    });

    editPumpButton.addEventListener('click', e => {
        e.preventDefault();
    
        hpuNum.getPumpData()
            .then(data => displayPumpTable(data))
            .catch(err => console.log(err.message));
    
        tableWrapper.style.display = 'block';
    });

    editMotorButton.addEventListener('click', e => {
        e.preventDefault();
    
        hpuNum.getMotorData()
            .then(data => displayMotorTable(data))
            .catch(err => console.log(err.message));
    
        tableWrapper.style.display = 'block';
    });

    editManifoldButton.addEventListener('click', e => {
        e.preventDefault();
    
        hpuNum.getManifoldData()
            .then(data => displayManifoldTable(data))
            .catch(err => console.log(err.message));
    
        tableWrapper.style.display = 'block';
    });

    editHeatExchangerButton.addEventListener('click', e => {
        e.preventDefault();
    
        hpuNum.getHeatExchangerData()
            .then(data => displayHeatExchangerTable(data))
            .catch(err => console.log(err.message));
    
        tableWrapper.style.display = 'block';
    });

    editValveButton.addEventListener('click', e => {
        e.preventDefault();

        displayValveDiv();
    });

    // Display part number div
    displayPartNumDiv();

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
            <th>COST</th>
        </tr>
    `;

    data.forEach((element, index) => {
        let rowHTML = `<tr id=${index}><td>${element.code}</td><td>${element.capacity}</td><td>${element.heatDis}</td><td>$${element.cost}</td></tr>`;
        tableBody.innerHTML += rowHTML;
    });

    const tableRows = document.querySelectorAll('tr');

    tableRows.forEach(tableRow => {
        tableRow.addEventListener('click', e => {
            e.preventDefault();

            hpuNum.updateReservoir(tableRow.id)
                .then(data => displayHpuNumber(data))
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
            <th>H3</th>
            <th>COST</th>
        </tr>
    `;

    data.forEach((element, index) => {
        let rowHTML = `<tr id=${index}><td>${element.code}</td><td>${element.description}</td><td>$${element.code}</td><td>$${element.cost}</td></tr>`;
        tableBody.innerHTML += rowHTML;
    });

    const tableRows = document.querySelectorAll('tr');

    tableRows.forEach(tableRow => {
        tableRow.addEventListener('click', e => {
            e.preventDefault();

            hpuNum.updatePump(tableRow.id)
                .then(data => displayHpuNumber(data))
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
            <th>H2</th>
            <th>H3</th>
            <th>COST</th>
        </tr>
    `;

    data.forEach((element, index) => {
        let rowHTML = `<tr id=${index}><td>${element.code}</td><td>${element.code}</td><td>${element.code}</td><td>$${element.cost}</td></tr>`;
        tableBody.innerHTML += rowHTML;
    });

    const tableRows = document.querySelectorAll('tr');

    tableRows.forEach(tableRow => {
        tableRow.addEventListener('click', e => {
            e.preventDefault();

            hpuNum.updateMotor(tableRow.id)
                .then(data => displayHpuNumber(data))
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
            <th>H COST</th>
            <th>V COST</th>
        </tr>
    `;

    data.forEach((element, index) => {
        let rowHTML = `<tr id=${index}><td>${element.code}</td><td>${element.description}</td><td>$${element.hCost}</td><td>$${element.vCost}</td></tr>`;
        tableBody.innerHTML += rowHTML;
    });

    const tableRows = document.querySelectorAll('tr');

    tableRows.forEach(tableRow => {
        tableRow.addEventListener('click', e => {
            e.preventDefault();

            hpuNum.updateManifold(tableRow.id)
                .then(data => displayHpuNumber(data))
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
            <th>H2</th>
            <th>H COST</th>
            <th>V COST</th>
        </tr>
    `;

    data.forEach((element, index) => {
        let rowHTML = `<tr id=${index}><td>${element.code}</td><td>${element.code}</td><td>${element.hCost}</td><td>$${element.vCost}</td></tr>`;
        tableBody.innerHTML += rowHTML;
    });

    const tableRows = document.querySelectorAll('tr');

    tableRows.forEach(tableRow => {
        tableRow.addEventListener('click', e => {
            e.preventDefault();

            hpuNum.updateHeatExchanger(tableRow.id)
                .then(data => displayHpuNumber(data))
                .catch(err => console.log(err.message));
                
            tableWrapper.style.display = 'none';
        });
    });
};