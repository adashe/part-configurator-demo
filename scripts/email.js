const defaultEmail = 'configurator@suncoastcontrols.com';

const generateEmailButtons = document.querySelectorAll('.generate-email');

generateEmailButtons.forEach(button => {
    button.addEventListener('click', e => {
        e.preventDefault();
    
        if(currConfigurator == 'hpu'){
            generateHpuEmail();
        } else if(currConfigurator == 'ms'){
            generateMsEmail();
        } else if(currConfigurator == 'hmi'){
            console.log('hmi email not currently available');
        };

    });
});

const createMailtoLink = (email, subject, bodyText) => {
    const subjectEncoded = encodeURIComponent(subject);
    const bodyEncoded = encodeURIComponent(bodyText);
    const mailtoLink = `mailto:${email}?subject=${subjectEncoded}&body=${bodyEncoded}`;
    return mailtoLink;
};