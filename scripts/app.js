const hpuForm = document.querySelector('#hpu-form');
const mspForm = document.querySelector('#msp-form');
const hmiForm = document.querySelector('#hmi-form');

const restartButtons = document.querySelectorAll('.restart');
const detailsButtons = document.querySelectorAll('.details');
const emailButton = document.querySelector('#email');
const sendEmailButton = document.querySelector('#send-email');

const tableWrapper = document.querySelector('.table-wrapper');
const tableCloseButton = document.querySelector('.table-close');

const hpuNum = new HPUNumber();

// Process HPU form input
hpuForm.addEventListener('submit', e => {
    e.preventDefault();

    const maxPres = hpuForm.maxPressure.value;
    const maxFl = hpuForm.maxFlow.value;
    const hydrType = hpuForm.hydraulicType.value;
    const numSt = hpuForm.numberStations.value;
    const portSz = hpuForm.portSize.value;
    const numFlwCtrl = hpuForm.numFlowControls.value;
    const htExType = hpuForm.heatExchType.value;

    // Add valves in HPU form inputs to hpuNum for use in htExType calculation
    addValvesFromHpuForm();

    // Calculate hpuNum using form input values
    hpuNum.calcHpuNum(maxPres, maxFl, hydrType, numSt, portSz, numFlwCtrl, htExType)
        .then(data => displayHpuNumber(data))
        .catch(err => console.log(err.message));

    hpuForm.reset();
});

// Process MSP form input
mspForm.addEventListener('submit', e => {
    e.preventDefault();

    mspForm.reset();
});

// Process HMI form input
hmiForm.addEventListener('submit', e => {
    e.preventDefault();

    hmiForm.reset();
});

// Restart buttons
restartButtons.forEach((button) => {
    button.addEventListener('click', e => {
        e.preventDefault();
        displayComponentDiv();
    })
});

// Details buttons
detailsButtons.forEach((button) => {
    button.addEventListener('click', e => {
        e.preventDefault();
        displayPartNumDiv();
    })
});

// Table close button
tableCloseButton.addEventListener('click', e => {
    e.preventDefault();
    tableWrapper.style.display = 'none';
})

// Close table when table wrapper is clicked
// TODO: fix so that this does not trigger when the table is clicked
// tableWrapper.addEventListener('click', e => {
//     e.preventDefault();
//     tableWrapper.style.display = 'none';
// })

// Email page button 
emailButton.addEventListener('click', e => {
    e.preventDefault();
    displayEmailDiv();
});

// Submit email and show submission confirmation
sendEmailButton.addEventListener('click', e => {
    e.preventDefault();
    displayEmailConfDiv();
});
