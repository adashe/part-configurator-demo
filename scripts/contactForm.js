const contactForm = document.querySelector('#contact-form');

let contactInputs = {
    contactName: null,
    companyName: null,
    email: null,
    phone: null
};

const addContactInfoToContactInputs = () => {

    contactInputs = {
        contactName: contactForm.contactName.value,
        companyName: contactForm.companyName.value,
        email: contactForm.email.value,
        phone: contactForm.phone.value
    };

};

contactForm.addEventListener('submit', e => {
    e.preventDefault();

    addContactInfoToContactInputs();
    generatePDF();
    displayPdfContainer();

})