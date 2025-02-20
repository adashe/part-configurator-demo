const valveImageButton = document.querySelector('.valve-img-btn')
const valveImgWrapper = document.querySelector('.valve-img-wrapper');
const valveImgCloseButtonX = document.querySelector('.valve-img-close-x');
const valveImgContent = document.querySelector('.valve-img-content');
const valveImgForm = document.querySelector('#valve-img-form');

valveImageButton.addEventListener('click', e => {
    e.preventDefault();
    displayValveImg();
})

// Display popup with valve images
async function displayValveImg(){
    await generateValveImages();
    valveImgWrapper.style.display = 'block';
};

// Valve popup close button
valveImgCloseButtonX.addEventListener('click', e => {
    e.preventDefault();
    valveImgContent.innerHTML = '';
    valveImgWrapper.style.display = 'none';
});

async function generateValveImages(){

    if(!valveInputs.solVolt){
        html = `<p>Select voltage to view images</p>`
    } else {
        let valveData = await valveAssem.getFilteredValveData(valveInputs.portSize, valveInputs.solVolt);

        html = `<div>`;
    
        valveData.forEach(valve => {
            html += `
                <img src="${valve.img}" alt="${valve.code}" />
                <p>${valve.code}</p>
            `;
        });
    
        html += `</div>`;
    }

    valveImgContent.innerHTML = html;

};