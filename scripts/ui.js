const hpuStart = document.querySelector('.hpu-start');
const msStart = document.querySelector('.ms-start');
const hmiStart = document.querySelector('.gw-start');

const componentDiv = document.querySelector('#component-div');
const hpuDiv = document.querySelector('#hpu-div');
const mspDiv = document.querySelector('#msp-div');
const hmiDiv = document.querySelector('#hmi-div');
const partNumDiv = document.querySelector('#part-num-div');
const contactDiv = document.querySelector('#contact-div');
const emailConfDiv = document.querySelector('#email-conf-div');

let currConfigurator = null;

hpuStart.addEventListener('click', e => {
    e.preventDefault();

    currConfigurator = 'hpu';

    componentDiv.style.display = 'none';
    hpuDiv.style.display = 'block';
    mspDiv.style.display = 'none';
    hmiDiv.style.display = 'none';
    partNumDiv.style.display = 'none';
    contactDiv.style.display = 'none';
    emailConfDiv.style.display = 'none';
});

msStart.addEventListener('click', e => {
    e.preventDefault();

    currConfigurator = 'ms';

    componentDiv.style.display = 'none';
    hpuDiv.style.display = 'none';
    mspDiv.style.display = 'block';
    hmiDiv.style.display = 'none';
    partNumDiv.style.display = 'none';
    contactDiv.style.display = 'none';
    emailConfDiv.style.display = 'none';
});

hmiStart.addEventListener('click', e => {
    e.preventDefault();

    currConfigurator = 'hmi';

    componentDiv.style.display = 'none';
    hpuDiv.style.display = 'none';
    mspDiv.style.display = 'none';
    hmiDiv.style.display = 'block';
    partNumDiv.style.display = 'none';
    contactDiv.style.display = 'none';
    emailConfDiv.style.display = 'none';
});

// Display component div
const displayComponentDiv = () => {
    componentDiv.style.display = 'block';
    hpuDiv.style.display = 'none';
    mspDiv.style.display = 'none';
    hmiDiv.style.display = 'none';
    partNumDiv.style.display = 'none';
    contactDiv.style.display = 'none';
    emailConfDiv.style.display = 'none';
};

// Display part number div
const displayPartNumDiv = () => {
    componentDiv.style.display = 'none';
    hpuDiv.style.display = 'none';
    mspDiv.style.display = 'none';
    hmiDiv.style.display = 'none';
    partNumDiv.style.display = 'block';
    contactDiv.style.display = 'none';
    emailConfDiv.style.display = 'none';
};

// Display email div
const displayContactDiv = () => {
    componentDiv.style.display = 'none';
    hpuDiv.style.display = 'none';
    mspDiv.style.display = 'none';
    hmiDiv.style.display = 'none';
    partNumDiv.style.display = 'none';
    contactDiv.style.display = 'block';
    emailConfDiv.style.display = 'none';

    // Show / hide distributor select when a customer is logged in
    toggleCustSettings();
};

// Display email confirmation div
const displayEmailConfDiv = () => {
    componentDiv.style.display = 'none';
    hpuDiv.style.display = 'none';
    mspDiv.style.display = 'none';
    hmiDiv.style.display = 'none';
    partNumDiv.style.display = 'none';
    contactDiv.style.display = 'none';
    emailConfDiv.style.display = 'block';
};