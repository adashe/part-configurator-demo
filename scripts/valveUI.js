const numberStations = document.querySelector('#numberStations');
const solenoidVoltage = document.querySelector('#solenoidVoltage');
const solenoidVoltageDiv = document.querySelector('#solenoid-voltage-div');
const valveSelection = document.querySelector('#valve-selection');
const valveSelectionDiv = document.querySelector('#valve-selection-div');

const valveForm = document.querySelector('#valve-form');

numberStations.addEventListener('change', e => {
    e.preventDefault();

    if(numberStations.value == 0){
        solenoidVoltageDiv.style.display = 'none';
        solenoidVoltage.selectedIndex = 0;
        valveSelectionDiv.innerHTML = '';
        valveSelectionDiv.style.display = 'none';
    } else if(numberStations.value > 0){
        solenoidVoltageDiv.style.display = 'block';
    }
});


solenoidVoltage.addEventListener('change', e => {
    e.preventDefault();

    valveSelectionDiv.innerHTML = '';

    let numValves = numberStations.value;

    if(solenoidVoltage.value == 'null'){
        valveSelectionDiv.style.display = 'none';
    } else if (solenoidVoltage.value == '110VAC'){

        for(let i = 0; i < numValves; i++){

            hpuNum.get110VACValveData()
                .then(data => generateValveDropdown(data, i))
                .catch(err => console.log(err.message));
        };
    } else if(solenoidVoltage.value == '24VDC'){

        for(let i = 0; i < numValves; i++){
            hpuNum.get24VDCValveData()
                .then(data => generateValveDropdown(data, i))
                .catch(err => console.log(err.message));
        };
    };
});

// Generate valve dropdown based on voltage and number of stations
const generateValveDropdown = (data, i) => {

    let html = `<label for="valveSelection${i}">Valve ${i}:</label>
                <select name="valveSelection${i}" id="valveSelection${i}" class="valveSelection">
                    <option value="none">None Selected</option>`

    data.forEach((valve, index) => {
        html += `<option value=${index}>${valve.description}</option>`;
    });

    html += `</select>`;

    valveSelectionDiv.innerHTML += html;

    valveSelectionDiv.style.display = 'inline-block';
};

// Process valve form input and update HPU number with selected valves
valveForm.addEventListener('submit', e => {
    e.preventDefault();

    hpuNum.updateValves(valveSelection.value)
        .then(data => displayHpuNumber(data))
        .catch(err => console.log(err.message));

    displayPartNumDiv();
})

// Process valve inputs from HPU input form
const addValvesFromHpuForm = () => {
    let vlvIndices = [];

    if(hpuForm.valveSelection0 && hpuForm.valveSelection0.value != 'none'){
        vlvIndices.push(hpuForm.valveSelection0.value);
    };
    if(hpuForm.valveSelection1 && hpuForm.valveSelection0.value != 'none'){
        vlvIndices.push(hpuForm.valveSelection1.value);
    };
    if(hpuForm.valveSelection2 && hpuForm.valveSelection0.value != 'none'){
        vlvIndices.push(hpuForm.valveSelection2.value);
    };
    if(hpuForm.valveSelection3 && hpuForm.valveSelection0.value != 'none'){
        vlvIndices.push(hpuForm.valveSelection3.value);
    };
    if(hpuForm.valveSelection4 && hpuForm.valveSelection0.value != 'none'){
        vlvIndices.push(hpuForm.valveSelection4.value);
    };
    if(hpuForm.valveSelection5 && hpuForm.valveSelection0.value != 'none'){
        vlvIndices.push(hpuForm.valveSelection5.value);
    };

    vlvIndices.forEach(idx => {
        hpuNum.updateValves(idx);
    });

}