// Generate hpu email
const generateHpuEmail = () => {
    const hpuNum = hpuAssem.buildPartNum();
    const hpuBody = genHpuEmailBody();
    const valveBody = genValveEmailBody();
    const totalCostBody = genHpuTotalCostEmailBody();

    const emailAddress = defaultEmail;
    const emailSubject = `Sun Coast Part Number Configurator: ${hpuNum}`;
    const bodyText = `Sun Coast Part Configurator ${hpuBody}${valveBody}${totalCostBody}`;

    const mailtoLink = createMailtoLink(emailAddress, emailSubject, bodyText);

    window.location.href = mailtoLink;
};

// Generate hpu email body text
const genHpuEmailBody = () => {

    // Build part num html
    const partNum = hpuAssem.buildPartNum();
    let html = `\n\nHPU NUMBER: ${partNum}`;

    // Build hpu cost html
    const cost = parseFloat(hpuAssem.calcCost());
    costHtml = `\nHPU Assembly List Price: $${cost.toFixed(2)}`;

    html += costHtml;

    return html;
};

// Generate valve email body text
const genValveEmailBody = () => {
    let html = '';

    if(valveAssem.station0.valve == null){
        return html;
    }else{
        html += `\n\nVALVE STATIONS:`
        for(i = 0; i < hpuInputs.numStat; i++){
            let station = `station${i}`;
            let valve = valveAssem[station].valve;
            let flowControl = valveAssem[station].flowControl;
            let checkValve = valveAssem[station].checkValve;
    
            html += `\nStation ${i + 1}: ${valve.code}-${flowControl.code}-${checkValve.code}`;
        };
    };

    // Build valve cost html
    const cost = parseFloat(valveAssem.calcCost());
    costHtml = `\nValve Assembly List Price: $${cost.toFixed(2)}`;

    html += costHtml;

    return html;
};

// Generate HPU total cost email body text
const genHpuTotalCostEmailBody = () => {

    const total = calcTotalHpuCost();

    html = `\n\nTOTAL LIST PRICE: $${total.toFixed(2)}`;

    return html;
};