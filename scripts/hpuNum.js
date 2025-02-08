const partNumDisplay = document.querySelectorAll('.part-num-disp');
const partNumDets = document.querySelector('#part-num-dets');

const tableWrapper = document.querySelector('.table-wrapper');
const tableCloseButton = document.querySelector('.table-close');


// Display configured HPU part number and details
const displayHpuNumber = (data) => {
    const reservoir = data.reservoir;
    const pump = data.pump;
    const motor = data.motor;
    const manifold = data.manifold;
    const heatExchanger = data.heatExchanger;
    const totalCost = hpuAssem.calcCost();

    // Determine individual item cost based on V or H reservoir
    let reservoirCost = null;
    let pumpCost = null;
    let motorCost = null;
    let manifoldCost = null;
    let heatExchangerCost = null;

    const filterCost = () => {
        if(reservoir.code.includes('H')){
            reservoirCost = reservoir.hCost;
            pumpCost = pump.hCost;
            motorCost = motor.hCost;
            manifoldCost = manifold.hCost;
            heatExchangerCost = heatExchanger.hCost;
        } else if (reservoir.code.includes('V')){
            reservoirCost = reservoir.vCost;
            pumpCost = pump.vCost;
            motorCost = motor.vCost;
            manifoldCost = manifold.vCost;
            heatExchangerCost = heatExchanger.vCost;
        };
    };

    filterCost();

    // Display part number at top of part number, edit, and email pages
    partNumDisplay.forEach((element) => {
        element.innerHTML = `N-${reservoir.code}-${pump.code}-${motor.code}-${manifold.code}-${heatExchanger.code}`;
    });

    // Display part number details on part number page
    const reservoirHTML = `
        <div class="dropdown">
            <div class="trigger">RESERVOIR ${reservoir.code}</div>
            <div class="content">        
                <ul>
                    <li>Capacity: ${reservoir.capacity}</li>
                    <li>Heat Dis: ${reservoir.heatDis}</li>
                    <li>Price: $${reservoirCost}</li>
                </ul>
            </div>
        </div>
    `;

    const pumpHTML = `        
        <div class="dropdown">
            <div class="trigger">PUMP ${pump.code}</div>
            <div class="content">        
                <ul>
                    <li>Part Number: ${pump.partNum}</li>
                    <li>Description: ${pump.description}</li>
                    <li>Dissipation: ${pump.dispCID}</li>
                    <li>Mount Type: ${pump.mountType}</li> 
                    <li>Price: $${pumpCost}</li>
                </ul>
                
            </div>
        </div>
        `;

    const motorHTML = `
        <div class="dropdown">
            <div class="trigger">MOTOR ${motor.code}</div>
            <div class="content">        
                <ul>
                    <li>Part Number: ${motor.partNum}</li>
                    <li>Description: ${motor.description}</li>
                    <li>Output HP: ${motor.outputHP}</li>
                    <li>Price: $${motorCost}</li>
                </ul>
                
            </div>
        </div>
    `;

    const manifoldHTML = `
        <div class="dropdown">
            <div class="trigger">MANIFOLD ${manifold.code}</div>
            <div class="content">        
                <ul>
                    <li>Description: ${manifold.description}</li>
                    <li>Valve Pattern: ${manifold.valvePattern}</li>
                    <li>Number of Stations: ${manifold.numStations}</li>
                    <li>Price: $${manifoldCost}</li>
                </ul>
                
            </div>
        </div>
    `;

    // Logic to display user-friendly null heat exchanger results
    let heatExchangerHTML = '';

    if(heatExchanger.code == 0){
         heatExchangerHTML = `
            <div class="dropdown">
                <div class="trigger">HEAT EXCHANGER ${heatExchanger.code}</div>
                <div class="content">        
                    <ul>
                        <li>Description: ${heatExchanger.description}</li>
                        <li>Price: $${heatExchangerCost}</li>
                    </ul>
                    
                </div>
            </div>
        `;
    } else {
        heatExchangerHTML = `
            <div class="dropdown">
                <div class="trigger">HEAT EXCHANGER ${heatExchanger.code}</div>
                <div class="content">        
                    <ul>
                        <li>Description: ${heatExchanger.description}</li>
                        <li>Type: ${heatExchanger.type}</li>
                        <li>Max Flow: ${heatExchanger.maxFlow}</li>
                        <li>Heat Dis: ${heatExchanger.heatDis}</li>
                        <li>Price: $${heatExchangerCost}</li>
                    </ul>
                    
                </div>
            </div>
        `;
    };

    const hpuCostHTML = `<h4>ESTIMATED HPU PRICE: $${totalCost}</h4>`;

    partNumDets.innerHTML = reservoirHTML + pumpHTML + motorHTML + manifoldHTML + heatExchangerHTML + hpuCostHTML;

    // Add valve subsection below the HPU section
    displayValveDets(valveAssem);

    addEventHandlersToDropdowns();
    displayPartNumDiv();

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