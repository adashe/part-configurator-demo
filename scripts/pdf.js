const appContainer = document.querySelector('#container');
const pdfContainer = document.querySelector('#container-pdf');

const pdfContactDiv = document.querySelector('#pdf-contact-div');
const pdfCustMsgDiv = document.querySelector('#pdf-cust-msg-div');

const pdfPrintButton = document.querySelector('.pdf-print');


const displayPdfContainer = () => {
    pdfContainer.style.display = 'block';
    appContainer.style.display = 'none';
};

const displayAppContainer = () => {
    pdfContainer.style.display = 'none';
    appContainer.style.display = 'flex';
};

pdfPrintButton.addEventListener('click', e => {
    e.preventDefault();

    window.print();
});

const generatePDF = () => {
    fillContactPdfDets();
    addCustomerMsg();

    if(currConfigurator == 'hpu'){
        generateHpuPdf();
    } else if(currConfigurator == 'ms'){
        generateMsPdf();
    } else if(currConfigurator == 'hmi'){
        console.log('hmi pdf not currently available');
    };
};

const fillContactPdfDets = () => {
    const date = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];

    let day = date.getDate();
    let monthIndex = date.getMonth();
    let monthName = monthNames[monthIndex];
    let year = date.getFullYear();

    html = `            
            <h3 class="contact" id="pdf-contact-name">CONTACT NAME: ${contactInputs.contactName}</h3>
            <h3 class="contact" id="pdf-company-name">COMPANY NAME: ${contactInputs.companyName}</h3>
            <h3 class="contact" id="pdf-email">EMAIL: ${contactInputs.email}</h3>
            <h3 class="contact" id="pdf-phone">PHONE: ${contactInputs.phone}</h3>
            <h3 class="contact" id="pdf-date">DATE: ${monthName} ${day}, ${year}</h3>
    `;

    pdfContactDiv.innerHTML = html;
};

const addCustomerMsg = () => {
    pdfCustMsgDiv.innerHTML = `<p>Print or save this page for your own records.</p>`;
    pdfCustMsgDiv.innerHTML += `\n<p>If you wish to proceed with your order, <br>select "Submit As Email" to send this part number to Sun Coast.</p>`
};