// Generate MS email
const generateMsEmail = () => {
    const msNum = msAssem.buildPartNum();
    const msBody = genMsEmailBody();
    const totalCostBody = genMsTotalCostEmailBody();

    const emailAddress = 'test@example.com';
    const emailSubject = `Sun Coast Part Number Configurator: ${msNum}`;
    const bodyText = `Sun Coast Part Configurator ${msBody}${totalCostBody}`; 

    const mailtoLink = createMailtoLink(emailAddress, emailSubject, bodyText);

    window.location.href = mailtoLink;
};

// Generate ms email body text
const genMsEmailBody = () => {
    const partNum = msAssem.buildPartNum();

    let html = `\n\nMS NUMBER: ${partNum}`;

    return html;
};

// Generate ms total cost body text
const genMsTotalCostEmailBody = () => {

    const total = parseFloat(msAssem.calcCost());

    const html = `\n\nTOTAL LIST PRICE: $${total.toFixed(2)}`;

    return html;
};