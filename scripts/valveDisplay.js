const valveDets = document.querySelector('#valve-dets');


const buildValveDisplay = (valveAssem) => {

    let valvePrice = 0;
    const valveH3 = `<h2>YOUR VALVE SELECTIONS</h2>`;
    const valveEditBtnHTML = `<button class="button edit" id="edit-valves">EDIT VALVES</button>`


    // End function if no stations are available
    if(hpuInputs.numStat == 0){

            return;

    // Create placeholder dropdowns if no valves were selected during HPU configuration
    }else if(valveAssem.station0.valve == null){

        valveDets.innerHTML = valveH3;

        for(i = 0; i < hpuInputs.numStat; i++){
            let valveHTML = `
                <div class="valve-dropdown">
                    <div class="trigger">STATION ${i + 1}: None Selected</div>
                    <div class="content">
                        <ul>
                            <li>Valve: None Selected</li>
                            <li>Flow Control: None Selected</li>
                            <li>Check Valve: None Selected</li>
                        </ul>
                    </div>
                </div>
            `;

            valveDets.innerHTML += valveHTML;
        };

    // Create dropdowns for completed valve assemblies
    }else{

        valveDets.innerHTML = valveH3;

        for(i = 0; i < hpuInputs.numStat; i++){
            let station = `station${i}`;
            let valve = valveAssem[station].valve;
            let flowControl = valveAssem[station].flowControl;
            let checkValve = valveAssem[station].checkValve;
    
            // Update price with the cost of each stations' components
            valvePrice += valve.cost + flowControl.cost + checkValve.cost;
    
            let valveHTML = `
                <div class="valve-dropdown">
                    <div class="trigger">STATION ${i + 1}: ${valve.code}-${flowControl.code}-${checkValve.code}</div>
                    <div class="content">

                        <ul>
                            <li><h5>VALVE: ${valve.code}</h5></li>
                            <li>Description: ${valve.description}</li>
                            <li>Price: $${valve.cost.toFixed(2)}</li>
                        </ul>
                    
                        <ul>
                            <li><h5>FLOW CONTROL: ${flowControl.code}</h5></li>
                            <li>Description: ${flowControl.description}</li>
                            <li>Price: $${flowControl.cost.toFixed(2)}</li>
                        </ul>
                    
                        <ul>
                            <li><h5>CHECK VALVE: ${checkValve.code}</h5></li>
                            <li>Description: ${checkValve.description}</li>
                            <li>Price: $${checkValve.cost.toFixed(2)}</li>
                        </ul>

                    </div>
                </div>
            `;
    
            valveDets.innerHTML += valveHTML;
        };
    };

    
    const valveCostHTML = `<h4>VALVES LIST PRICE: $${valvePrice.toFixed(2)}</h4>`
    
    valveDets.innerHTML += valveEditBtnHTML + valveCostHTML;
    
    // Add event handler to valve edit button to open valve popup
    const editValveButton = document.querySelector('#edit-valves');
    
    editValveButton.addEventListener('click', e => {
        e.preventDefault();
    
        displayValvePopup();

    });

    addEventHandlersToValveDropdowns();

};

 // Add event handlers to dropdowns
const addEventHandlersToValveDropdowns = () => {
    const dropdowns = document.querySelectorAll('.valve-dropdown');

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