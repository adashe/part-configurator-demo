// Generate MS email
const generateMsEmail = () => {
    const msNum = `MS-###`;
    const msBody = genMsEmailBody();
    const totalCostBody = genMsTotalCostEmailBody();

    const emailAddress = 'test@example.com';
    const emailSubject = `Sun Coast Part Number Configurator: ${msNum}`;
    const bodyText = `Sun Coast Part Configurator ${msBody}${totalCostBody}`; 

    const mailtoLink = createMailtoLink(emailAddress, emailSubject, bodyText);

    window.location.href = mailtoLink;
};

const genMsEmailBody = () => {
    let html = `\n\nMS NUMBER: MS-###`;

    return html;
};

const genMsTotalCostEmailBody = () => {

    const total = parseFloat(msAssem.calcCost());

    const html = `\n\nTOTAL LIST PRICE: $${total.toFixed(2)}`;

    return html;
};