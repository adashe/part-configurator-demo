const contactForm = document.querySelector('#contact-form');

let contactInputs = {
    contactName: null,
    companyName: null,
    email: null,
    phone: null
};

contactForm.addEventListener('submit', e => {
    e.preventDefault();

    contactInputs = {
        contactName: contactForm.contactName.value,
        companyName: contactForm.companyName.value,
        email: contactForm.email.value,
        phone: contactForm.phone.value
    };

    generatePDF();
    displayPdfContainer();

})