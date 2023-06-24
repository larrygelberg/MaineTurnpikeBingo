/**
 * MAINE TURNPIKE BINGO!
 * 
 * Copyright 2023 - Larry Gelberg
 */

const vehicles = [
  "Hampton Tolls Backup",
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
  "Pick-Up Truck with Bed Ledge Camper",
  "WalMart Truck",
  "Ski Resort Sticker",
  "Grateful Dead Sticker",
  "A Hannaford's Truck",
  "A Lumber Truck",
  "Florida License Plate",
  "New York License Plate",
  "Connecticut License Plate",
  "Rhode Island License Plate",
  "New Hampshire License Plate",
  "Vermont License Plate",
  "A Masshole",
  "State Trooper - Lights Off",
  "State Trooper - Lights On",
  "Road Kill",
  "Horse Trailer",
  "U-Haul",
  "Thule Topper",
  "3 or More Motorcycles in a Pack",
];

const summerOnly = [
  "Jet Skis Being Towed",
  "A Boat Being Towed",
  "A Pontoon Boat Being Towed",
  "Car with Kayaks/Canoes on Top", 
  "A Car with Bikes on the Back",
  "A Car with Bikes on the Top",
  "Dirt Bikes being Towed",
  "ATVs being Towed",
  "Pickup Truck with Flapping Flags",
  "Surf/Paddle Boards",
  "A Chopper",
  "A Tricycle",
  "Quebec License Plate",
  "Convertible, Top-down"
];

const winterOnly = [
  "Ski Rack w/ Skis or Snowboards",
  "Ski-Mobiles being Towed",
  "A Christmas Tree Truck",
  "A Plow Gang",
  "Car with XMas Tree on top",
  "Car with Rudolph Anters/Nose",
  "Sheets of Snow Flying off a Roof"
];

var statusTable = [];
var usedIndexes = [];
var consolidatedTable = [];

function getRandIndex() {
  var count = 0;
  var rand = -1;
  do {
    if (count++ > 1000)
      break;
    rand = Math.floor(Math.random() * consolidatedTable.length);
  } while (usedIndexes.includes(rand));
  usedIndexes.push(rand);
  return rand;
};

function getMessage() {
  return consolidatedTable[getRandIndex()];
};

function refreshGrid() {
  usedIndexes = [];
  statusTable = [];

  // Date Stuff
  var today = new Date();
  var thisYear = today.getFullYear();
  var springDate = new Date("April 1," + thisYear);
  var summerDate = new Date("May 15," + thisYear);
  var fallDate = new Date("September 15," + thisYear);
  var winterDate = new Date("November 1," + thisYear);

  consolidatedTable = [...vehicles];
  if (today < summerDate || today >= fallDate) {
    // Winter-only phenomena
    for (var i=0; i<winterOnly.length; i++) {
      consolidatedTable.push(winterOnly[i]);
    }
  } else if (today >= springDate && today < winterDate) {
    // Summer-only Phenomena
    for (var i=0; i<summerOnly.length; i++) {
      consolidatedTable.push(summerOnly[i]);
    }  
  }

  for (var i=0; i<5; i++) { 
    for (var j=0; j<5; j++) {
      if (i == 2 && j == 2) {
        document.getElementById("c22").style.backgroundColor = "lightgreen";
      } else {
        cell = i.toString().concat(j.toString());
        msg = getMessage();
        document.getElementById(cell).innerHTML = msg;
        outerDiv = "c".concat(cell);
        document.getElementById(outerDiv).style.backgroundColor = null;
    }
    }
    statusTable.push([false, false, false, false, false]);
  }
  statusTable[2][2] = true;
}

function toggleCell(id) { 
  var i = id[1];
  var j = id[2];
  if (statusTable[i][j]) {
    // toggle sqaure off
    document.getElementById(id).style.backgroundColor = null;
    statusTable[i][j] = false;
    // reset any bingos
    for (var i=0; i<5; i++) { 
      for (var j=0; j<5; j++) {
        if (i == 2 && j == 2) {
          document.getElementById("c22").style.backgroundColor = "lightgreen";
        }
        var cell_name = "c".concat(i.toString().concat(j.toString()));
        if (statusTable[i][j]) {
          document.getElementById(cell_name).style.backgroundColor = "lightgreen";
        } else {
          document.getElementById(cell_name).style.backgroundColor = null;
        }
      }
    }
  } else {
    document.getElementById(id).style.backgroundColor = "lightgreen";
    statusTable[i][j] = true;
  }

  test_rows();
  test_columns();
  test_ul_to_lr();
  test_ur_to_ll();
}

function test_rows() {
  for (var index_i=0; index_i<=4; index_i++) {
    var winner = true;
    for (var index_j=0; index_j<=4; index_j++) {
      winner = winner && statusTable[index_i][index_j];
    }
    if (winner) {
      for (var i=0; i<5; i++) {
        var id = "c".concat(index_i,i);
        document.getElementById(id).style.backgroundColor = "blue";
      }
      break;
    } 
  }
}

function test_columns() {
  for (var index_i=0; index_i<=4; index_i++) {
    var winner = true;
    for (var index_j=0; index_j<=4; index_j++) {
      winner = winner && statusTable[index_j][index_i];
    }
    if (winner) {
      for (var i=0; i<5; i++) {
        var id = "c".concat(i,index_i);
        document.getElementById(id).style.backgroundColor = "blue";
      }
      break;
    } 
  }
}

function test_ul_to_lr () {
  var winner = true;
  for (var index_i=0; index_i<=4; index_i++) {
    winner = winner && statusTable[index_i][index_i];
  }
  if (winner) {
    for (i=0; i<5; i++) {
      var id = "c".concat(i,i);
      document.getElementById(id).style.backgroundColor = "blue";
    }
  }
}

function test_ur_to_ll() {
  var winner = true;
  for (var index_i=0; index_i<=4; index_i++) {
    winner = winner && statusTable[4-index_i][index_i];
  }
  if (winner) {
    for (i=0; i<5; i++) {
      var id = "c".concat(4-i,i);
      document.getElementById(id).style.backgroundColor = "blue";
    }
  } 
}
