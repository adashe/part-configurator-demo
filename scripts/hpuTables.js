const tableWrapper = document.querySelector(".table-wrapper");
const tableCloseButtonX = document.querySelector(".table-close-x");

const tableH2 = document.querySelector("#table-h2");
const tableHead = document.querySelector("thead");
const tableBody = document.querySelector("tbody");

// Table close button
tableCloseButtonX.addEventListener("click", (e) => {
    e.preventDefault();
    tableWrapper.style.display = "none";
});

// Toggle admin edit abilities when admin is logged in or out
const toggleAdminSettings = () => {
    const liEdits = document.querySelectorAll(".li-edit");

    if (currentUser.userType === "admin") {
        liEdits.forEach((li) => {
            li.classList.toggle("active");
        });
    }
};

// Add event handlers to edit buttons to open tables with parts data
const addEventHandlerstoEditBtns = () => {
    const editReservoirButton = document.querySelector("#edit-reservoir");
    const editPumpButton = document.querySelector("#edit-pump");
    const editMotorButton = document.querySelector("#edit-motor");
    const editManifoldButton = document.querySelector("#edit-manifold");
    const editHeatExchangerButton = document.querySelector(
        "#edit-heat-exchanger"
    );

    editReservoirButton.addEventListener("click", (e) => {
        e.preventDefault();

        hpuAssem
            .getReservoirData()
            .then((data) => displayReservoirTable(data))
            .catch((err) => console.log(err.message));

        tableWrapper.style.display = "block";
    });

    editPumpButton.addEventListener("click", (e) => {
        e.preventDefault();

        hpuAssem
            .getPumpData()
            .then((data) => displayPumpTable(data))
            .catch((err) => console.log(err.message));

        tableWrapper.style.display = "block";
    });

    editMotorButton.addEventListener("click", (e) => {
        e.preventDefault();

        hpuAssem
            .getMotorData()
            .then((data) => displayMotorTable(data))
            .catch((err) => console.log(err.message));

        tableWrapper.style.display = "block";
    });

    editManifoldButton.addEventListener("click", (e) => {
        e.preventDefault();

        hpuAssem
            .getManifoldData()
            .then((data) => displayManifoldTable(data))
            .catch((err) => console.log(err.message));

        tableWrapper.style.display = "block";
    });

    editHeatExchangerButton.addEventListener("click", (e) => {
        e.preventDefault();

        hpuAssem
            .getHeatExchangerData()
            .then((data) => displayHeatExchangerTable(data))
            .catch((err) => console.log(err.message));

        tableWrapper.style.display = "block";
    });
};

// Display table with reservoir data and update HPU number with selected reservoir
const displayReservoirTable = (data) => {
    tableHead.innerHTML = "";
    tableBody.innerHTML = "";
    tableH2.innerHTML = "";

    tableH2.innerHTML += `RESERVOIR OPTIONS`;

    tableHead.innerHTML += `
        <tr>
            <th>CODE</th>
            <th>CAPACITY</th>
            <th>HEAT DIS</th>
        </tr>
    `;

    data.forEach((element, index) => {
        let rowHTML = `<tr id=${index}><td>${element.code}</td><td>${element.capacity}</td><td>${element.heatDis}</td></tr>`;
        tableBody.innerHTML += rowHTML;
    });

    const tableRows = document.querySelectorAll("tr");

    tableRows.forEach((tableRow) => {
        tableRow.addEventListener("click", (e) => {
            e.preventDefault();

            hpuAssem
                .updateReservoir(tableRow.id)
                .then((data) => buildHpuNumberDisplay(data))
                .catch((err) => console.log(err.message));

            tableWrapper.style.display = "none";
        });
    });
};

// Display table with pump data and update HPU number with selected pump
const displayPumpTable = (data) => {
    tableHead.innerHTML = "";
    tableBody.innerHTML = "";
    tableH2.innerHTML = "";

    tableH2.innerHTML += `PUMP OPTIONS`;

    tableHead.innerHTML += `
        <tr>
            <th>CODE</th>
            <th>DESCRIPTION</th>
            <th>DISSIPATION</th>
            <th>MOUNT TYPE</th>
        </tr>
    `;

    data.forEach((element, index) => {
        let rowHTML = `<tr id=${index}><td>${element.code}</td><td>${element.description}</td><td>${element.dispCID}</td><td>${element.mountType}</td></tr>`;
        tableBody.innerHTML += rowHTML;
    });

    const tableRows = document.querySelectorAll("tr");

    tableRows.forEach((tableRow) => {
        tableRow.addEventListener("click", (e) => {
            e.preventDefault();

            hpuAssem
                .updatePump(tableRow.id)
                .then((data) => buildHpuNumberDisplay(data))
                .catch((err) => console.log(err.message));

            tableWrapper.style.display = "none";
        });
    });
};

// Display table with motor data and update HPU number with selected motor
const displayMotorTable = (data) => {
    tableHead.innerHTML = "";
    tableBody.innerHTML = "";
    tableH2.innerHTML = "";

    tableH2.innerHTML += `MOTOR OPTIONS`;

    tableHead.innerHTML += `
        <tr>
            <th>CODE</th>
            <th>PART NUMBER</th>
            <th>DESCRIPTION</th>
            <th>OUTPUT HP</th>
        </tr>
    `;

    data.forEach((element, index) => {
        let rowHTML = `<tr id=${index}><td>${element.code}</td><td>${element.partNum}</td><td>${element.description}</td><td>${element.outputHP}</td></tr>`;
        tableBody.innerHTML += rowHTML;
    });

    const tableRows = document.querySelectorAll("tr");

    tableRows.forEach((tableRow) => {
        tableRow.addEventListener("click", (e) => {
            e.preventDefault();

            hpuAssem
                .updateMotor(tableRow.id)
                .then((data) => buildHpuNumberDisplay(data))
                .catch((err) => console.log(err.message));

            tableWrapper.style.display = "none";
        });
    });
};

// Display table with manifold data and update HPU number with selected manifold
const displayManifoldTable = (data) => {
    tableHead.innerHTML = "";
    tableBody.innerHTML = "";
    tableH2.innerHTML = "";

    tableH2.innerHTML += `MANIFOLD OPTIONS`;

    tableHead.innerHTML += `
        <tr>
            <th>CODE</th>
            <th>DESCRIPTION</th>
            <th>VALVE PATTERN</th>
            <th>NUMBER OF STATIONS</th>
        </tr>
    `;

    data.forEach((element, index) => {
        let rowHTML = `<tr id=${index}><td>${element.code}</td><td>${element.description}</td><td>${element.valvePattern}</td><td>${element.numStations}</td></tr>`;
        tableBody.innerHTML += rowHTML;
    });

    const tableRows = document.querySelectorAll("tr");

    tableRows.forEach((tableRow) => {
        tableRow.addEventListener("click", (e) => {
            e.preventDefault();

            hpuAssem
                .updateManifold(tableRow.id)
                .then((data) => buildHpuNumberDisplay(data))
                .catch((err) => console.log(err.message));

            tableWrapper.style.display = "none";
        });
    });
};

// Display table with heat exchanger data and update HPU number with selected heat exchanger
const displayHeatExchangerTable = (data) => {
    tableHead.innerHTML = "";
    tableBody.innerHTML = "";
    tableH2.innerHTML = "";

    tableH2.innerHTML += `HEAT EXCHANGER OPTIONS`;

    tableHead.innerHTML += `
        <tr>
            <th>CODE</th>
            <th>DESCRIPTION</th>
            <th>MAX FLOW</th>
            <th>HEAT DIS</th>
        </tr>
    `;

    data.forEach((element, index) => {
        let rowHTML = `<tr id=${index}><td>${element.code}</td><td>${element.description}</td><td>${element.maxFlow}</td><td>${element.heatDis}</td></tr>`;
        tableBody.innerHTML += rowHTML;
    });

    const tableRows = document.querySelectorAll("tr");

    tableRows.forEach((tableRow) => {
        tableRow.addEventListener("click", (e) => {
            e.preventDefault();

            hpuAssem
                .updateHeatExchanger(tableRow.id)
                .then((data) => buildHpuNumberDisplay(data))
                .catch((err) => console.log(err.message));

            tableWrapper.style.display = "none";
        });
    });
};
