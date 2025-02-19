const hpuForm = document.querySelector('#hpu-form');
const mspForm = document.querySelector('#msp-form');
const hmiForm = document.querySelector('#hmi-form');

const restartButtons = document.querySelectorAll('.restart');
const detailsButtons = document.querySelectorAll('.details');
const contactButtons = document.querySelectorAll('.contact');
const pdfButtons = document.querySelectorAll('.pdf');

const errorPopupWrapper = document.querySelector('.error-popup-wrapper');
const errorPopupCloseX = document.querySelector('.error-popup-close-x');
const errorPopupCloseButton = document.querySelector('.error-popup-close-btn');
const errorPopupContent = document.querySelector('.error-popup-content');


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

// Details buttons
detailsButtons.forEach((button) => {
    button.addEventListener('click', e => {
        e.preventDefault();
        displayAppContainer();
        displayPartNumDiv();
    });
});

// Reset page to component form buttons
restartButtons.forEach((button) => {
    button.addEventListener('click', e => {
        e.preventDefault();

        if(!currentUser.username){
            window.location.reload();
        } else if (currentUser.username){

            resetHpuInputs();
            hpuAssem.reset();

            resetValveInputs();
            valveAssem.reset();

            hpuSysParamsForm.reset();
            hpuManifoldForm.reset();
            hpuValveForm.reset();
            valvePopupForm.reset();

            displayComponentDiv();
        }

    });
});

// Error popup close button
errorPopupCloseX.addEventListener('click', e => {
    e.preventDefault();
    errorPopupWrapper.style.display = 'none';
});

errorPopupCloseButton.addEventListener('click', e => {
    e.preventDefault();
    errorPopupWrapper.style.display = 'none';
});

// Display error message in error popup
const displayErrorMsg = (msg) => {
    errorPopupContent.innerHTML = `<p>${msg}</p>`;
    errorPopupWrapper.style.display = 'block';
};

// Display contact form
contactButtons.forEach(button => {
    button.addEventListener('click', e => {
        e.preventDefault();

        displayContactDiv();
    });
});
