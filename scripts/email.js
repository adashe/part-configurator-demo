const generateEmailButtons = document.querySelectorAll('.generate-email');

generateEmailButtons.forEach(button => {
    button.addEventListener('click', e => {
        e.preventDefault();
    
        generateHpuEmail();

    });
});

const createMailtoLink = (email, subject, bodyText) => {
    const subjectEncoded = encodeURIComponent(subject);
    const bodyEncoded = encodeURIComponent(bodyText);
    const mailtoLink = `mailto:${email}?subject=${subjectEncoded}&body=${bodyEncoded}`;
    return mailtoLink;
};