const valveDets = document.querySelector('#valve-dets');


const displayValveDets = (valveAssem) => {

    let valvePrice = 0;

    valveDets.innerHTML = `<h3>YOUR VALVE SELECTIONS</h3>`;

    // If num stat is 0, display No Valves message #FIX

    for(i = 0; i < hpuInputs.numStat; i++){
        let station = `station${i}`;
        let valve = valveAssem[station].valve;
        let flowControl = valveAssem[station].flowControl;
        let checkValve = valveAssem[station].checkValve;

        // Update price with the cost of each stations' components
        valvePrice += valve.cost + flowControl.cost + checkValve.cost;

        const valveHTML = `
            <div class="dropdown">
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

    const valveEditBtn = `<button class="button gray edit" id="edit-valves">EDIT VALVES</button>`
    const valveCostHTML = `<h4>ESTIMATED VALVE PRICE: $${valvePrice.toFixed(2)}</h4>`

    valveDets.innerHTML += valveEditBtn + valveCostHTML;

    // Add event handler to valve edit button to open valve popup
    const editValveButton = document.querySelector('#edit-valves');

    editValveButton.addEventListener('click', e => {
        e.preventDefault();
    
        displayValvePopup();

    });

};