const partNumDisplay = document.querySelectorAll('.part-num-disp');
const partNumDets = document.querySelector('#part-num-dets');

const tableWrapper = document.querySelector('.table-wrapper');
const tableCloseButton = document.querySelector('.table-close');


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

    // Display part number details on part number page
    const reservoirHTML = `
        <div class="dropdown">
            <div class="trigger">RESERVOIR: ${reservoir.code}</div>
            <div class="content">        
                <ul>
                    <li>Capacity: ${reservoir.capacity} gal.</li>
                    <li>Heat Dissipation: ${reservoir.heatDis} HP</li>
                    <li>Price: $${reservoirCost}</li>
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
                    </ul>
                </div>
            </div>
        `;
    };

    const hpuCostHTML = `<h4>HPU LIST PRICE: $${totalCost}</h4>`;

    partNumDets.innerHTML = reservoirHTML + pumpHTML + motorHTML + manifoldHTML + heatExchangerHTML + hpuCostHTML;

    addEventHandlersToDropdowns();

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