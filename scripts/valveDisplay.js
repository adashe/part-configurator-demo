const valveDets = document.querySelector('#valve-dets');


const buildValveDisplay = (valveAssem) => {

    let valvePrice = 0;
    const valveH3 = `<h2>YOUR VALVE SELECTIONS</h2>`;
    const valveEditBtnHTML = `<button class="button gray edit" id="edit-valves">EDIT VALVES</button>`


    // End function if no stations are available
    if(hpuInputs.numStat == 0){

            return;

    // Create placeholder dropdowns if no valves were selected during HPU configuration
    }else if(valveAssem.station0.valve == null){

        valveDets.innerHTML = valveH3 + valveEditBtnHTML;

        for(i = 0; i < hpuInputs.numStat; i++){
            let valveHTML = `
                <div class="valve-dropdown">
                    <div class="trigger">STATION ${i}</div>
                    <div class="content">
                        <ul>
                            <li>Valve Code: None Selected</li>
                            <li>Flow Control Code: None Selected</li>
                            <li>Check Valve Code: None Selected</li>
                        </ul>
                    </div>
                </div>
            `;

            valveDets.innerHTML += valveHTML;
        };

    // Create dropdowns for completed valve assemblies
    }else{

        valveDets.innerHTML = valveH3 + valveEditBtnHTML;

        for(i = 0; i < hpuInputs.numStat; i++){
            let station = `station${i}`;
            let valve = valveAssem[station].valve;
            let flowControl = valveAssem[station].flowControl;
            let checkValve = valveAssem[station].checkValve;
    
            // Update price with the cost of each stations' components
            valvePrice += valve.cost + flowControl.cost + checkValve.cost;
    
            let valveHTML = `
                <div class="valve-dropdown">
                    <div class="trigger">STATION ${i}</div>
                    <div class="content">
                        <ul>
                            <li>Valve Code: ${valve.code} Price: $${valve.cost}</li>
                            <li>Flow Control Code: ${flowControl.code} Price: $${flowControl.cost}</li>
                            <li>Check Valve Code: ${checkValve.code} Price: $${checkValve.cost}</li>
                        </ul>
                    </div>
                </div>
            `;
    
            valveDets.innerHTML += valveHTML;
        };
    };

    
    const valveCostHTML = `<h4>ESTIMATED VALVE PRICE: $${valvePrice.toFixed(2)}</h4>`
    
    valveDets.innerHTML += valveCostHTML;
    
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