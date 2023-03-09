/**
 * MAINE TURNPIKE BINGO!
 * 
 * Copyright 2023 - Larry Gelberg
 */

const vehicles = [
  "Crossing the Bridge into Maine",
  "Crossing the Bridge into New Hampshire",
  "Airstream",
  "Generic Tow-Behind Camper",
  "Tow-Behind Pop-up Camper",
  "Tow-Behind Mini Camper",
  "Super Cute Mini Camper",
  "Ride-In RV Not Towing Anything",
  "Ride-In RV Towing a Car",
  "Ride-In RV with Bikes on the Back",
  "Ride-In RV Towing a Trailer",
  "Ride-In Mini Camper",
  "An 'Oxford Casino' Sign",
  "Pick-Up Truck with Camper on Top",
  "Pick-Up Truck Towing a Camper with Bed Ledge",
  "WalMart Truck",
  "Car with 1 Kayak on Top",
  "Car with 2 Kayaks on Top",
  "Dirt Bikes being Towed",
  "ATVs being Towed",
  "Ski-Mobiles being Towed",
  "Jet Skis Being Towed",
  "A Boat Being Towed",
  "A Pontoon Boat Being Towed",
  "'Sunday River' sticker",
  "A Stupid Tesla",
  "A Hanaford's Truck",
  "Florida License Plate",
  "New York License Plate",
  "Connecticut License Plate",
  "Rhode Island License Plate",
  "Quebec License Plate",
  "A Masshole",
  "New Hampshire Plates Tailgating You",
  "State Trooper - Lights Off",
  "State Trooper - Lights On",
  "Road Kill",
  "A Car with Bikes on the Back",
  "Horse Trailer",
  "U-Haul",
  "Thule Topper",
  "Ski Rack w/ Skis or Snowboards"
];

var statusTable = [
  [false, false, false, false, false],
  [false, false, false, false, false],
  [false, false, true, false, false],
  [false, false, false, false, false],
  [false, false, false, false, false]
];

var usedIndexes = [];

function getRandIndex() {
  var count = 0;
  var rand = -1;
  do {
    if (count++ > 1000)
      break;
    rand = Math.floor(Math.random() * vehicles.length);
  } while (usedIndexes.includes(rand));
  usedIndexes.push(rand);
  return rand;
};

function getMessage() {
  return vehicles[getRandIndex()];
};

function refreshPatterns() {
  usedIndexes = [];

  for (var i=0; i<5; i++) { 
    for (var j=0; j<5; j++) {
      if (i == 2 && j == 2)
        continue;

      cell = i.toString().concat(j.toString());
      msg = getMessage();
      document.getElementById(cell).innerHTML = msg;
    }
  }
}

function myFunction(id) { 
  document.getElementById(id).style.backgroundColor = "lightgreen";
  var i = id[1];
  var j = id[2];
  statusTable[i][j] = true;

  /* test rows */
  for (index_i=0; index_i<5; index_i++) {
    var winner = true;
    for (index_j=0; index_j<5; index_j++) {
      statusTable[index_i][index_j] = winner && statusTable[index_i][index_j];
    }
    if (winner) {
      paint_row(index_i);
      break;
    } 
  }
  /* test columns */
  /*
  for (index_i=0; index_i<5; index_i++) {
    var winner = true;
    for (index_j=0; index_j<5; index_j++) {
      statusTable[index_j][index_i] = winner && statusTable[index_j][index_i];
    }
    if (winner) {
      paint_col(index_j);
      break;
    } 
  }
  */
}

function paint_row(idx) {
  for (i=0; i<5; i++) {
    var id = "c".concat(idx,i);
    document.getElementById(id).style.backgroundColor = "blue";
  }
}

function paint_col(idx) {
  for (i=0; i<5; i++) {
    var id = "c".concat(i,idx);
    document.getElementById(id).style.backgroundColor = "blue";
  }
}