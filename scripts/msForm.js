const numberStarters = document.querySelector('#numberStarters');
const starterDropdowns = document.querySelectorAll('.starterDropdown');

// Enable and disable starter dropdowns based on number of starters selected
numberStarters.addEventListener('change', e => {
    e.preventDefault();

    numStart = numberStarters.value;

    starterArray = []

    // Reset all starter dropdowns to disabled
    starterDropdowns.forEach(dropdown => {
        dropdown.value = '';
        dropdown.setAttribute("disabled", true);
        starterArray.push(dropdown);
    })

    // Enable starter dropdowns based on number of starters selected
    for(i = 0; i < numStart; i++){
        starterArray[i].removeAttribute('disabled');
    }

});