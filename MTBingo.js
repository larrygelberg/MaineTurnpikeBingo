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
  "A Hannaford Truck",
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
  "Kayaks / Canoes",
  "A Car with Bikes on the Back",
  "A Car with Bikes on the Top",
  "Dirt Bikes being Towed",
  "ATVs being Towed",
  "Surf / Paddle Boards",
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
  "Car with Rudolph Antlers / Nose",
  "Ski Resort Sticker"
];

const postXMasWinter = [
  "Ski Rack w/ Skis or Snowboards",
  "Ski-Mobiles being Towed",
  "A Plow Gang",
  "Sheets of Snow Flying off a Roof",
  "Ski Resort Sticker"
];

// The 12 ways to win: each line is a list of [row, column] squares
const LINES = [];
for (let k=0; k<5; k++) {
  LINES.push([0,1,2,3,4].map(x => [k, x]));    // row k
  LINES.push([0,1,2,3,4].map(x => [x, k]));    // column k
}
LINES.push([0,1,2,3,4].map(x => [x, x]));      // top-left to bottom-right
LINES.push([0,1,2,3,4].map(x => [4 - x, x]));  // bottom-left to top-right

let statusTable = [];
let consolidatedTable = [];
let numBingos;

const STORAGE_KEY = "MTBingoState";
const STATE_MAX_AGE_MS = 12 * 60 * 60 * 1000;  // Saved boards expire after 12 hours idle

// Create the 25 squares. Each square is <div id="cIJ"> holding a heading
// with id "IJ" for the label (I = row, J = column).
function buildBoard() {
  let board = document.getElementById("board");
  for (let i=0; i<5; i++) {
    let row = document.createElement("div");
    row.className = "containing-table";
    for (let j=0; j<5; j++) {
      let cell = document.createElement("div");
      cell.id = "c" + i + j;
      cell.className = "centre-align border-cell";

      let content = document.createElement("div");
      content.className = "content";
      let label = document.createElement(i == 2 && j == 2 ? "h2" : "h3");
      label.id = "" + i + j;
      content.appendChild(label);
      cell.appendChild(content);

      if (i == 2 && j == 2) {
        label.textContent = "FREE SPACE!";
      } else {
        cell.addEventListener("click", () => toggleCell(cell.id));
      }
      row.appendChild(cell);
    }
    board.appendChild(row);
  }
}

function initialize () {
  buildBoard();
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
      let el = document.getElementById(cell_name);
      el.classList.toggle("marked", statusTable[i][j]);
      el.classList.remove("bingo");
    }
  }
  numBingos = 0;
  for (let line of LINES) {
    if (line.every(([i, j]) => statusTable[i][j])) {
      numBingos++;
      for (let [i, j] of line) {
        document.getElementById("c" + i + j).classList.add("bingo");
      }
    }
  }
  document.getElementById("winText").innerText = `You now have ${numBingos} Bingos!`;
}

function refreshGrid() {
  statusTable = [];
  numBingos = 0;

  // Pick the season from the month (0 = January ... 11 = December)
  let today = new Date();
  if (debug) today = new Date(today.getFullYear(), 10, 5);  // November 5
  if (debug) console.log("Today is " + today);
  let month = today.getMonth();

  let season, extras;
  if (month <= 1) {          // January - February
    season = "Winter";
    extras = postXMasWinter;
  } else if (month == 2) {   // March
    season = "Spring";
    extras = [...postXMasWinter, ...summerOnly];
  } else if (month <= 9) {   // April - October
    season = "Summer";
    extras = summerOnly;
  } else {                   // November - December
    season = "Autumn";
    extras = autumn;
  }
  consolidatedTable = [...vehicles, ...extras];
  document.getElementById("modeText").innerText = season;

  // Shuffle the season's list and deal 24 different squares from it
  let picks = shuffled(consolidatedTable).slice(0, 24);
  if (picks.length < 24) console.error("Not enough squares for this season!");

  for (let i=0; i<5; i++) { 
    for (let j=0; j<5; j++) {
      if (!(i == 2 && j == 2)) {
        document.getElementById("" + i + j).innerHTML = picks.pop();
      }
    }
    statusTable.push([false, false, false, false, false]);
  }
  statusTable[2][2] = true;  // Set the Free Space

  renderBoard();
  saveState();
}

// Return a shuffled copy of arr (Fisher-Yates shuffle)
function shuffled(arr) {
  let a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function toggleCell(id) {
  let i = id[1];
  let j = id[2];
  statusTable[i][j] = !statusTable[i][j];
  renderBoard();
  saveState();
}

initialize();
