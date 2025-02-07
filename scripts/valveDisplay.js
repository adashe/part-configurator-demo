const valveDets = document.querySelector('#valve-dets');


const displayValveDets = (valveAssem) => {

    console.log(valveAssem.station0.valve);

    let valvePrice = 0;

    for(i = 0; i < hpuInputs.numStat; i++){
        let station = `station${i}`;
        let valve = valveAssem[station].valve;
        let flowControl = valveAssem[station].valve;
        let checkValve = valveAssem[station].valve;

        console.log(station, valve, flowControl, checkValve);

        valvePrice += valve.cost + flowControl.cost + checkValve.cost;

        const valveHTML = `
            <div class="dropdown">
                <div class="trigger">STATION ${i}</div>
                <div class="content">
                    <ul>
                        <li>Valve: ${valve.code} Price: $${valve.cost}</li>
                        <li>Flow Control: ${flowControl.code} Price: ${flowControl.cost}</li>
                        <li>Check Valve: ${checkValve.code} Price: ${checkValve.cost}</li>
                    </ul>        
                    
                </div>
            </div>
        `;

        valveDets.innerHTML += valveHTML;
    };

    const valveEditBtn = `<button class="button gray edit" id="edit-valves">VIEW AND EDIT VALVES</button>`
    const valveCostHTML = `<h4>ESTIMATED VALVE PRICE: $${valvePrice.toFixed(2)}</h4>`

    valveDets.innerHTML += valveEditBtn + valveCostHTML;

    // Add event handler to valve edit button to open valve popup
    const editValveButton = document.querySelector('#edit-valves');

    editValveButton.addEventListener('click', e => {
        e.preventDefault();
    
        displayValvePopup();

    });

};