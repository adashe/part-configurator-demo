const componentForm = document.querySelector('#component-form');
const componentType = document.querySelector('#component-type');

const componentDiv = document.querySelector('#component-div');
const hpuDiv = document.querySelector('#hpu-div');
const mspDiv = document.querySelector('#msp-div');
const hmiDiv = document.querySelector('#hmi-div');
const partNumDiv = document.querySelector('#part-num-div');
const emailDiv = document.querySelector('#email-div');
const emailConfDiv = document.querySelector('#email-conf-div');


// Display selected form div
componentForm.addEventListener('submit', e => {
    e.preventDefault();
    if (componentType.value === 'hpu'){
        componentDiv.style.display = 'none';
        hpuDiv.style.display = 'block';
        mspDiv.style.display = 'none';
        hmiDiv.style.display = 'none';
        partNumDiv.style.display = 'none';
        emailDiv.style.display = 'none';
        emailConfDiv.style.display = 'none';
    } else if (componentType.value === 'msp'){
        componentDiv.style.display = 'none';
        hpuDiv.style.display = 'none';
        mspDiv.style.display = 'block';
        hmiDiv.style.display = 'none';
        partNumDiv.style.display = 'none';
        emailDiv.style.display = 'none';
        emailConfDiv.style.display = 'none';
    } else if (componentType.value === 'hmi'){
        componentDiv.style.display = 'none';
        hpuDiv.style.display = 'none';
        mspDiv.style.display = 'none';
        hmiDiv.style.display = 'block';
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
    partNumDiv.style.display = 'none';
    emailDiv.style.display = 'none';
    emailConfDiv.style.display = 'none';
};

// Display part number div
const displayPartNumDiv = () => {
    componentDiv.style.display = 'none';
    hpuDiv.style.display = 'none';
    mspDiv.style.display = 'none';
    hmiDiv.style.display = 'none';
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
    partNumDiv.style.display = 'none';
    emailDiv.style.display = 'none';
    emailConfDiv.style.display = 'block';
};