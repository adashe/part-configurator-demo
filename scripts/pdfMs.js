// Generate all components for MS pdf
const generateMsPdf = () => {
    fillMsPdfDets();
    fillMsTotalCostPdfDets();
};

// Build msAssem details html for MS pdf
const fillMsPdfDets = () => {
    const motorArray = [msAssem.motor1, msAssem.motor2, msAssem.motor3, msAssem.motor4];
    const partNum = msAssem.buildPartNum();

    pdfDetsDiv.innerHTML = '';

    const msHeaderHTML = `<h2>MS SELECTION: ${partNum}</h2>`;

    // Calculate base cost
    const totalBaseCost = msAssem.enclosure.cost + msAssem.base.cost + msAssem.disconnect.cost;

    // Build dets for base assembly
    const baseHTML = `
        <h3>BASE ASSEMBLY</h3>
        <ul>
            <li>Enclosure Material: Polycarbonate</li>
            <li>Enclosure Dimensions: ${msAssem.enclosure.dimensions} in</li>
            <li>Disconnect Size: ${msAssem.disconnect.FLA}</li>
            <li>Base Price: $${totalBaseCost.toFixed(2)}</li>
        </ul>
    `;

    // Build dets for automatically-included parts
    const defaultsHTML = `
        <h3>INCLUDED FEATURES</h3>    
        <ul>
            <li>Local E-stop</li>
            <li>Remote E-stop Ready</li>
            <li>Overload Alarm Ready</li>
            <li>Auxiliary Terminals</li>
            <li>Standard 120VAC Control</li>
        </ul>
    `;

    // Build dets for each starter
    let motorsDetsHtml = '';

    motorArray.forEach((motor, i) => {

        if(motor.starter){
            if(motor.starter.voltage){
                const motorHTML = `
                    <h3>MOTOR ${i + 1}</h3>
                    <ul>
                        <li>Voltage: ${motor.starter.voltage}</li>
                        <li>HP: ${motor.starter.HP}</li>
                        <li>FLA: ${motor.starter.FLA}</li>
                        <li>Price: $${motor.starter.cost.toFixed(2)}</li>
                    </ul>
                `;

                motorsDetsHtml += motorHTML;
            };
        };
    });

    pdfDetsDiv.innerHTML = msHeaderHTML + motorsDetsHtml + baseHTML + defaultsHTML;
};

// Build msAssem total cost html for ms pdf
const fillMsTotalCostPdfDets = () => {

    const total = msAssem.calcCost();

    pdfTotalListPriceDiv.innerHTML = `<div class="pdf-total-list"><h4>TOTAL LIST PRICE: ${total.toFixed(2)}</h4></div>`;
};
