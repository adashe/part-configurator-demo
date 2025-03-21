const contactForm = document.querySelector('#contact-form');

let contactInputs = {
    contactName: null,
    companyName: null,
    email: null,
    phone: null,
    distributor: null
};

const updateContactInputs = () => {

    contactInputs = {
        contactName: contactForm.contactName.value,
        companyName: contactForm.companyName.value,
        email: contactForm.email.value,
        phone: contactForm.phone.value,
        distributor: contactForm.distributor.value
    };

};

contactForm.addEventListener('submit', e => {
    e.preventDefault();

    updateContactInputs();

    generatePDF();
    displayPdfContainer();

})

// Toggle customer settings when customer is logged in or out
const toggleCustSettings = () => {
    const distSelectDiv = document.querySelector('#dist-select-div');

    if(currentUser.userType == 'cust'){
        distSelectDiv.style.display = 'block';
    } else {
        distSelectDiv.style.display = 'none';
    };
};