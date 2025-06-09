const pdfDetsDiv = document.querySelector("#pdf-dets-div");
const pdfValveDiv = document.querySelector("#pdf-valve-div");
const pdfTotalListPriceDiv = document.querySelector(
  "#pdf-total-list-price-div"
);

// Generate all components for HPU pdf
const generateHpuPdf = () => {
  fillHpuPdfDets();
  fillValvePdfDets();
  fillHpuTotalCostPdfDets();
};

// Build HPU pdf page
const fillHpuPdfDets = () => {
  const { reservoir, pump, motor, manifold, heatExchanger } = hpuAssem;
  const hpuCost = hpuAssem.calcCost();

  // Determine individual item cost based on V or H reservoir
  let reservoirCost = null;
  let pumpCost = null;
  let protoMotorCost = null;
  let manifoldCost = null;
  let heatExchangerCost = null;

  const filterCost = () => {
    if (reservoir.code.includes("H")) {
      reservoirCost = reservoir.hCost.toFixed(2);
      pumpCost = pump.hCost.toFixed(2);
      protoMotorCost = motor.hCost.toFixed(2);
      manifoldCost = manifold.hCost.toFixed(2);
      heatExchangerCost = heatExchanger.hCost.toFixed(2);
    } else if (reservoir.code.includes("V")) {
      reservoirCost = reservoir.vCost.toFixed(2);
      pumpCost = pump.vCost.toFixed(2);
      protoMotorCost = motor.vCost.toFixed(2);
      manifoldCost = manifold.vCost.toFixed(2);
      heatExchangerCost = heatExchanger.vCost.toFixed(2);
    }
  };

  filterCost();

  // Add adapter cost to SAE B motor types
  let motorCost = null;

  if (pump.mountType == "SAE A" && motor.type == "MF") {
    motorCost = protoMotorCost;
  } else if (pump.mountType == "SAE A" && motor.type == "MTC") {
    motorCost = (parseFloat(protoMotorCost) + motor.SAEAadapterCost).toFixed(2);
  } else if (pump.mountType == "SAE B") {
    motorCost = (parseFloat(protoMotorCost) + motor.SAEBadapterCost).toFixed(2);
  }

  pdfDetsDiv.innerHTML = "";

  // Build part number HTML
  const partNum = hpuAssem.buildPartNum();
  const hpuHeaderHTML = `<h2>HPU SELECTION: ${partNum}</h2>`;

  // Build included features HTML
  const defaultsHTML = `
        <h3>INCLUDED FEATURES</h3>
        <ul>
            <li>Return Filter</li>
            <li>Pressure Gauge</li>
            <li>Level Sight Gauge</li>
            <li>Drain Plug</li>
            <li>Cleanout Covers</li>
        </ul>
    `;

  // Build part dets HTML
  const reservoirHTML = `
        <h3>RESERVOIR: ${reservoir.code}</h3>
        <ul>
            <li>Capacity: ${reservoir.capacity}</li>
            <li>Heat Dissipation: ${reservoir.heatDis}</li>
            <li>Price: $${reservoirCost}</li>
        </ul>
    `;

  const pumpHTML = `
        <h3>PUMP: ${pump.code}</h3>
        <ul>
            <li>Part Number: ${pump.partNum}</li>
            <li>Description: ${pump.description}</li>
            <li>Dissipation: ${pump.dispCID}</li>
            <li>Mount Type: ${pump.mountType}</li> 
            <li>Price: $${pumpCost}</li>
        </ul> 
    `;

  const motorHTML = `
        <h3>MOTOR: ${motor.code}</h3>
        <ul>
            <li>Part Number: ${motor.partNum}</li>
            <li>Description: ${motor.description}</li>
            <li>Output HP: ${motor.outputHP}</li>
            <li>Price: $${motorCost}</li>
        </ul>
    `;

  const manifoldHTML = `
        <h3>MANIFOLD: ${manifold.code}</h3>
        <ul>
            <li>Description: ${manifold.description}</li>
            <li>Valve Pattern: ${manifold.valvePattern}</li>
            <li>Number of Stations: ${manifold.numStations}</li>
            <li>P&T: ${manifold.PT}</li>
            <li>A&B: ${manifold.AB}</li>
            <li>Price: $${manifoldCost}</li>
        </ul>
    `;

  let heatExchangerHTML = "";

  if (heatExchanger.code == 0) {
    heatExchangerHTML = `
            <h3>HEAT EXCHANGER: ${heatExchanger.code}</h3>
            <ul>
                <li>Description: No heat exchanger</li>
                <li>Price: $${heatExchangerCost}</li>
            </ul> 
        `;
  } else {
    heatExchangerHTML = `
            <h3>HEAT EXCHANGER: ${heatExchanger.code}</h3>     
            <ul>
                <li>Description: ${heatExchanger.description}</li>
                <li>Type: ${heatExchanger.type}</li>
                <li>Max Flow: ${heatExchanger.maxFlow}</li>
                <li>Heat Dissipation: ${heatExchanger.heatDis}</li>
                <li>Price: $${heatExchangerCost}</li>
            </ul>
        `;
  }

  const hpuCostHTML = `<div class="pdf-cost"><h4>HPU LIST PRICE: $${hpuCost}</h4></div>`;

  pdfDetsDiv.innerHTML =
    hpuHeaderHTML +
    reservoirHTML +
    pumpHTML +
    motorHTML +
    manifoldHTML +
    heatExchangerHTML +
    defaultsHTML +
    hpuCostHTML;
};

// Build valve pdf page
const fillValvePdfDets = () => {
  pdfValveDiv.innerHTML = "";
  const valveHeaderHTML = `<h2>VALVE SELECTIONS</h2>`;
  let valvePrice = 0;

  if (valveAssem.voltage == null) {
    return;
  } else if (valveAssem.station0.valve == null) {
    pdfValveDiv.innerHTML += valveHeaderHTML;

    for (i = 0; i < hpuInputs.numStat; i++) {
      let valveHTML = `
                <h3>STATION ${i + 1}: None Selected</h3>
                <ul>
                    <li>Valve: None Selected</li>
                    <li>Flow Control: None Selected</li>
                    <li>Check Valve: None Selected</li>
                </ul>
            `;

      pdfValveDets.innerHTML += valveHTML;
    }
  } else {
    pdfValveDiv.innerHTML += valveHeaderHTML;

    for (i = 0; i < hpuInputs.numStat; i++) {
      const station = `station${i}`;
      const { valve, flowControl, checkValve } = valveAssem[station];

      // Update price with the cost of each stations' components
      valvePrice += valve.cost + flowControl.cost + checkValve.cost;

      let valveHTML = `
                <h3>STATION ${i + 1}: ${valve.code}-${flowControl.code}-${
        checkValve.code
      }</h3>

                <ul>
                    <li><h5>VALVE: ${valve.code}</h5></li>
                    <li>Description: ${valve.description}</li>
                    <li>Price: $${valve.cost.toFixed(2)}</li>
                </ul>
            
                <ul>
                    <li><h5>FLOW CONTROL: ${flowControl.code}</h5></li>
                    <li>Description: ${flowControl.description}</li>
                    <li>Price: $${flowControl.cost.toFixed(2)}</li>
                </ul>
            
                <ul>
                    <li><h5>CHECK VALVE: ${checkValve.code}</h5></li>
                    <li>Description: ${checkValve.description}</li>
                    <li>Price: $${checkValve.cost.toFixed(2)}</li>
                </ul>

            `;

      pdfValveDiv.innerHTML += valveHTML;
    }

    const valveCostHTML = `<div class="pdf-cost"><h4>VALVES LIST PRICE: $${valvePrice.toFixed(
      2
    )}</h4></div>`;

    pdfValveDiv.innerHTML += valveCostHTML;
  }
};

const fillHpuTotalCostPdfDets = () => {
  const total = calcTotalHpuCost();
  pdfTotalListPriceDiv.innerHTML = `<div class="pdf-total-list"><h4>TOTAL LIST PRICE: ${total.toFixed(
    2
  )}</h4></div>`;
};
