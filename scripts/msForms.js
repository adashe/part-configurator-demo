const msVoltageForm = document.querySelector('#ms-voltage-form');
const msStartersForm = document.querySelector('#ms-starters-form');

const msVoltageBtn = document.querySelector('.ms-voltage-btn');

const msNumStarters = document.querySelector('#msNumStarters');
const starterSelectorDivs = document.querySelectorAll('.starterSelectorDiv');
const starterSelectors = document.querySelectorAll('.starterSelector');

// DISPLAY AND HIDE FORM ELEMENTS
const displayMsVoltageForm = () => {
    mspDiv.style.display = 'block';
    partNumDiv.style.display = 'none';

    msVoltageForm.style.display = 'block';
    msStartersForm.style.display = 'none';
};

const displayMsStartersForm = () => {
    msVoltageForm.style.display = 'none';
    msStartersForm.style.display = 'block';
};


// BUTTONS
msVoltageBtn.addEventListener('click', e=> {
    e.preventDefault();

    displayMsVoltageForm();
});

// FORMS
// Initiate null vlaues for MS inputs
let msInputs = {
    voltage: null,
    numStarters: null,
    starter1: null,
    starter2: null,
    starter3: null,
    starter4: null
};

const resetMsInputs = () => {
    msInputs = {
        voltage: null,
        numStarters: null,
        starter1: null,
        starter2: null,
        starter3: null,
        starter4: null
    };
};

msVoltageForm.addEventListener('submit', e => {
    e.preventDefault();

    msInputs.voltage = msVoltageForm.msVoltage.value;
    msInputs.numStarters = msVoltageForm.msNumStarters.value;

    displayMsStartersForm();    
});

msStartersForm.addEventListener('submit', e => {
    e.preventDefault();

    starterSelectors.forEach(selector => {
        const starterID = selector.id;

        msInputs[starterID] = selector.value;
    });

    console.log(msInputs);

    displayPartNumDiv();
});


// Display and hide starter selector divs based on number of starters selected
msNumStarters.addEventListener('change', e => {
    e.preventDefault();

    const numStart = msNumStarters.value;

    let divArray = [];

    // Hide all starter dropdowns
    starterSelectorDivs.forEach(div => {
        div.style.display = 'none';
        divArray.push(div);
    });

    // Enable starter dropdowns based on number of starters selected
    for(i = 0; i < numStart; i++){
        divArray[i].style.display = 'inline-block';
    }

});