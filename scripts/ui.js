const componentDiv = document.getElementById('component-div');
const hpuDiv = document.getElementById('hpu-div');
const mspDiv = document.getElementById('msp-div');
const hmiDiv = document.getElementById('hmi-div');
// const valveDiv = document.getElementById('valve-div');
const partNumDiv = document.getElementById('part-num-div');
const emailDiv = document.getElementById('email-div');
const emailConfDiv = document.getElementById('email-conf-div');

const componentForm = document.querySelector('#component-form');
const componentType = document.querySelector('#component-type');

// Display selected form div
componentForm.addEventListener('submit', e => {
    e.preventDefault();
    if (componentType.value === 'hpu'){
        componentDiv.style.display = 'none';
        hpuDiv.style.display = 'block';
        mspDiv.style.display = 'none';
        hmiDiv.style.display = 'none';
        // valveDiv.style.display = 'none';
        partNumDiv.style.display = 'none';
        emailDiv.style.display = 'none';
        emailConfDiv.style.display = 'none';
    } else if (componentType.value === 'msp'){
        componentDiv.style.display = 'none';
        hpuDiv.style.display = 'none';
        mspDiv.style.display = 'block';
        hmiDiv.style.display = 'none';
        // valveDiv.style.display = 'none';
        partNumDiv.style.display = 'none';
        emailDiv.style.display = 'none';
        emailConfDiv.style.display = 'none';
    } else if (componentType.value === 'hmi'){
        componentDiv.style.display = 'none';
        hpuDiv.style.display = 'none';
        mspDiv.style.display = 'none';
        hmiDiv.style.display = 'block';
        // valveDiv.style.display = 'none';
        partNumDiv.style.display = 'none';
        emailDiv.style.display = 'none';
        emailConfDiv.style.display = 'none';
    }
});

// Display component div
const displayComponentDiv = () => {
    componentDiv.style.display = 'block';
    hpuDiv.style.display = 'none';
    mspDiv.style.display = 'none';
    hmiDiv.style.display = 'none';
    // valveDiv.style.display = 'none';
    partNumDiv.style.display = 'none';
    emailDiv.style.display = 'none';
    emailConfDiv.style.display = 'none';
};

// Display valve div
// const displayValveDiv = () => {
//     componentDiv.style.display = 'none';
//     hpuDiv.style.display = 'none';
//     mspDiv.style.display = 'none';
//     hmiDiv.style.display = 'none';
//     valveDiv.style.display = 'block';
//     partNumDiv.style.display = 'none';
//     emailDiv.style.display = 'none';
//     emailConfDiv.style.display = 'none';
// };

// Display part number div
const displayPartNumDiv = () => {
    componentDiv.style.display = 'none';
    hpuDiv.style.display = 'none';
    mspDiv.style.display = 'none';
    hmiDiv.style.display = 'none';
    // valveDiv.style.display = 'none';
    partNumDiv.style.display = 'block';
    emailDiv.style.display = 'none';
    emailConfDiv.style.display = 'none';
};

// Display email div
const displayEmailDiv = () => {
    componentDiv.style.display = 'none';
    hpuDiv.style.display = 'none';
    mspDiv.style.display = 'none';
    hmiDiv.style.display = 'none';
    // valveDiv.style.display = 'none';
    partNumDiv.style.display = 'none';
    emailDiv.style.display = 'block';
    emailConfDiv.style.display = 'none';
};

// Display email confirmation div
const displayEmailConfDiv = () => {
    componentDiv.style.display = 'none';
    hpuDiv.style.display = 'none';
    mspDiv.style.display = 'none';
    hmiDiv.style.display = 'none';
    // valveDiv.style.display = 'none';
    partNumDiv.style.display = 'none';
    emailDiv.style.display = 'none';
    emailConfDiv.style.display = 'block';
};