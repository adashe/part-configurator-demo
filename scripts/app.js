const hpuForm = document.querySelector('#hpu-form');
const mspForm = document.querySelector('#msp-form');
const hmiForm = document.querySelector('#hmi-form');

const restartButton = document.querySelectorAll('.restart');
const detailsButtons = document.querySelectorAll('.details');
const emailButton = document.querySelector('#email');
const sendEmailButton = document.querySelector('#send-email');

const tableWrapper = document.querySelector('.table-wrapper');
const tableCloseButton = document.querySelector('.table-close');

const errorPopupWrapper = document.querySelector('.error-popup-wrapper');
const errorPopupCloseButton = document.querySelector('.error-popup-close');
const errorPopupContent = document.querySelector('.error-popup-content');

const valvePopupCloseButton = document.querySelector('.valve-popup-close');


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
        displayPartNumDiv();
    })
});

// Reset page to component form buttons
restartButton.forEach((button) => {
    button.addEventListener('click', e => {
        e.preventDefault();
        window.location.reload();
    });
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

// Error popup close button
errorPopupCloseButton.addEventListener('click', e => {
    e.preventDefault();
    errorPopupWrapper.style.display = 'none';
});

// Valve popup close button
valvePopupCloseButton.addEventListener('click', e => {
    e.preventDefault();
    valvePopupWrapper.style.display = 'none';
});

// Display error message in error popup
const displayErrorMsg = (msg) => {
    errorPopupContent.innerHTML = `<p>${msg}</p>`;
    errorPopupWrapper.style.display = 'block';
};

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
