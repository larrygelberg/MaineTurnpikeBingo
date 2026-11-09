/**
 * MAINE TURNPIKE BINGO!
 * 
 * Copyright 2023 - Larry Gelberg
 */
"use strict";

const debug = false;

const vehicles = [
  "Hampton Tolls Backup",
  "An 'Oxford Casino' Sign",
  "Airstream",
  "Generic Tow-Behind Camper",
  "Tow-Behind Pop-up Camper",
  "Tow-Behind Mini Camper",
  "Super Cute Mini Camper",
  "Ride-In RV Not Towing Anything",
  "Ride-In RV Towing a Car",
  "RV Carrying Bikes",
  "Ride-In RV Towing a Trailer",
  "Ride-In Mini Camper",
  "Pick-Up Truck with Camper on Top",
  "Fifth Wheel RV",
  "WalMart Truck",
  "A Hannaford's Truck",
  "A Lumber Truck",
  "Florida License Plate",
  "New York License Plate",
  "Connecticut License Plate",
  "Rhode Island License Plate",
  "New Jersey License Plate",
  "Vermont License Plate",
  "Canadian License Plate",
  "A Masshole",
  "Statie - Lights Off",
  "Statie - Lights On",
  "Road Kill",
  "Horse Trailer",
  "U-Haul",
  "Thule Topper",
  "3 or More Motorcycles in a Pack"
];

const summerOnly = [
  "Jet Skis Being Towed",
  "A Boat Being Towed",
  "A Pontoon Boat Being Towed",
  "Kayaks/Canoes", 
  "A Car with Bikes on the Back",
  "A Car with Bikes on the Top",
  "Dirt Bikes being Towed",
  "ATVs being Towed",
  "Surf/Paddle Boards",
  "A Chopper",
  "A Tricycle",
  "Convertible, Top-down",
  "Golf-Cart being Towed"
];

const autumn = [
  "Ski Rack w/ Skis or Snowboards",
  "Ski-Mobiles being Towed",
  "A Christmas Tree Truck",
  "Car with X-Mas Tree on top",
  "Car with Rudolph Anters/Nose",
  "Ski Resort Sticker"
];

const postXMasWinter = [
  "Ski Rack w/ Skis or Snowboards",
  "Ski-Mobiles being Towed",
  "A Plow Gang",
  "Sheets of Snow Flying off a Roof",
  "Ski Resort Sticker"
];

let statusTable = [];
let usedIndexes = [];
let consolidatedTable = [];
let numBingos;

const STORAGE_KEY = "MTBingoState";
const STATE_MAX_AGE_MS = 12 * 60 * 60 * 1000;  // Saved boards expire after 12 hours idle

function initialize () {
  // iOS (and other mobile browsers) may discard the page while the device
  // sleeps and reload it on wake, so restore the saved board if there is one.
  if (!loadState()) {
    refreshGrid();
  }
}

function saveState() {
  try {
    let labels = [];
    for (let i=0; i<5; i++) {
      let row = [];
      for (let j=0; j<5; j++) {
        row.push(document.getElementById("" + i + j).innerHTML);
      }
      labels.push(row);
    }
    let state = {
      labels: labels,
      statusTable: statusTable,
      mode: document.getElementById("modeText").innerText,
      savedAt: Date.now()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    // Storage unavailable (e.g. some private-browsing modes) - just don't persist.
  }
}

function loadState() {
  try {
    let state = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!state || !Array.isArray(state.labels) || !Array.isArray(state.statusTable) ||
        state.labels.length != 5 || state.statusTable.length != 5) {
      return false;
    }
    if (typeof state.savedAt != "number" || Date.now() - state.savedAt > STATE_MAX_AGE_MS) {
      localStorage.removeItem(STORAGE_KEY);
      return false;
    }
    for (let i=0; i<5; i++) {
      for (let j=0; j<5; j++) {
        if (i == 2 && j == 2) continue;  // Free Space label lives in the HTML
        document.getElementById("" + i + j).innerHTML = state.labels[i][j];
      }
    }
    statusTable = state.statusTable;
    statusTable[2][2] = true;
    document.getElementById("modeText").innerText = state.mode;
    renderBoard();
    return true;
  } catch (e) {
    return false;
  }
}

// Color every cell from statusTable, then highlight and count any bingos.
function renderBoard() {
  for (let i=0; i<5; i++) {
    for (let j=0; j<5; j++) {
      let cell_name = "c" + i + j;
      document.getElementById(cell_name).style.backgroundColor =
        statusTable[i][j] ? "lightgreen" : null;
    }
  }
  numBingos = 0;
  test_rows();
  test_columns();
  test_ul_to_lr();
  test_ur_to_ll();
  document.getElementById("winText").innerText = `You now have ${numBingos} Bingos!`;
}

function refreshGrid() {
  usedIndexes = [];
  statusTable = [];
  numBingos = 0;

  // Date Stuff
  let today = new Date();
  let thisYear = today.getFullYear();
  if (debug) today = new Date("November 5,"+ thisYear);
  if (debug) console.log("Today is "+today);
  let postXmasDate = new Date("January 1," + thisYear);
  let springDate = new Date("March 1," + thisYear);
  let summerDate = new Date("April 1," + thisYear);
  let autumnDate = new Date("November 1," + thisYear);

  consolidatedTable = [...vehicles];
  if (today <= springDate) {
    // Winter
    for (let i=0; i<postXMasWinter.length; i++) {
      consolidatedTable.push(postXMasWinter[i]);
    } 
    document.getElementById("modeText").innerText = `Winter`;

  } else  if (today > springDate && today <= summerDate) {
    // Spring
    for (let i=0; i<postXMasWinter.length; i++) {
      consolidatedTable.push(postXMasWinter[i]);
    } 
    for (let i=0; i<summerOnly.length; i++) {
      consolidatedTable.push(summerOnly[i]);
    } 
    document.getElementById("modeText").innerText = `Spring`;

  } else if (today >= autumnDate) {
    // Autumn
    for (let i=0; i<autumn.length; i++) {
      consolidatedTable.push(autumn[i]);
    }
    document.getElementById("modeText").innerText = `Autumn`;

  } else if (today > springDate && today <= autumnDate) {
    // Summer-only Phenomena
    for (let i=0; i<summerOnly.length; i++) {
      consolidatedTable.push(summerOnly[i]);
    }
    document.getElementById("modeText").innerText = `Summer`;
    
  } else {
    document.getElementById("modeText").innerText = `Found a bug!`;
  }

  for (let i=0; i<5; i++) { 
    for (let j=0; j<5; j++) {
      if (i == 2 && j == 2) {
        document.getElementById("c22").style.backgroundColor = "lightgreen";
      } else {
        let cell = i.toString().concat(j.toString());
        let msg = getMessage();
        document.getElementById(cell).innerHTML = msg;
        let outerDiv = "c".concat(cell);
        document.getElementById(outerDiv).style.backgroundColor = null;
    }
    }
    statusTable.push([false, false, false, false, false]);
  }
  statusTable[2][2] = true;  // Set the Free Space

  numBingos = 0;
  document.getElementById("winText").innerText = `You now have ${numBingos} Bingos!`;

  saveState();
}

function getRandIndex() {
  let count = 0;
  let rand = -1;
  do {
    if (count++ > 1000)
      break;
    rand = Math.floor(Math.random() * consolidatedTable.length);
  } while (usedIndexes.includes(rand));
  usedIndexes.push(rand);
  return rand;
};

function getMessage() {
  return consolidatedTable[getRandIndex()];;
};

function toggleCell(id) {
  let i = id[1];
  let j = id[2];
  statusTable[i][j] = !statusTable[i][j];
  renderBoard();
  saveState();
}

function test_rows() {
  for (let index_i=0; index_i<=4; index_i++) {
    let winner = true;
    for (let index_j=0; index_j<=4; index_j++) {
      winner = winner && statusTable[index_i][index_j];
    }
    if (winner) {
      incrementWins();
      for (let i=0; i<5; i++) {
        let id = "c".concat(index_i,i);
        document.getElementById(id).style.backgroundColor = "blue";
      }
    } 
  }
}

function test_columns() {
  for (let index_i=0; index_i<=4; index_i++) {
    let winner = true;
    for (let index_j=0; index_j<=4; index_j++) {
      winner = winner && statusTable[index_j][index_i];
    }
    if (winner) {
      incrementWins();
      for (let i=0; i<5; i++) {
        let id = "c".concat(i,index_i);
        document.getElementById(id).style.backgroundColor = "blue";
      }
    } 
  }
}

function test_ul_to_lr () {
  let winner = true;
  for (let index_i=0; index_i<=4; index_i++) {
    winner = winner && statusTable[index_i][index_i];
  }
  if (winner) {
    incrementWins();
    for (let i=0; i<5; i++) {
      let id = "c".concat(i,i);
      document.getElementById(id).style.backgroundColor = "blue";
    }
  }
}

function test_ur_to_ll() {
  let winner = true;
  for (let index_i=0; index_i<=4; index_i++) {
    winner = winner && statusTable[4-index_i][index_i];
  }
  if (winner) {
    incrementWins();
    for (let i=0; i<5; i++) {
      let id = "c".concat(4-i,i);
      document.getElementById(id).style.backgroundColor = "blue";
    }
  } 
}

function incrementWins() {
  numBingos++;
  document.getElementById("winText").innerText = `You now have ${numBingos} Bingos!`;
}
