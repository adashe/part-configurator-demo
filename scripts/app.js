const hpuForm = document.querySelector('#hpu-form');
const mspForm = document.querySelector('#msp-form');
const hmiForm = document.querySelector('#hmi-form');


const detailsButtons = document.querySelectorAll('.details');
const emailButton = document.querySelector('#email');
const sendEmailButton = document.querySelector('#send-email');

const tableWrapper = document.querySelector('.table-wrapper');
const tableCloseButton = document.querySelector('.table-close');


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
