const pdfMsDiv = document.querySelector('#pdf-ms-div');

// Generate all components for MS pdf
const generateMsPdf = () => {
    fillMsPdfDets();
    fillMsTotalCostPdfDets();
};

const fillMsPdfDets = () => {
    const motorArray = [msAssem.motor1, msAssem.motor2, msAssem.motor3, msAssem.motor4];
    const partNum = msAssem.buildPartNum();

    pdfMsDiv.innerHTML = '';

    const msHeaderHTML = `<h2>MS SELECTION: ${partNum}</h2>`;

    // Build dets for automatically-included parts
    const defaultsHTML = `
        <h3>INCLUDED FEATURES: </h3>    
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

    pdfMsDiv.innerHTML = msHeaderHTML + motorsDetsHtml;
};

const fillMsTotalCostPdfDets = () => {

    const total = msAssem.calcCost();

    pdfTotalListPriceDiv.innerHTML = `<div class="pdf-total-list"><h4>TOTAL LIST PRICE: ${total.toFixed(2)}</h4></div>`;
};
