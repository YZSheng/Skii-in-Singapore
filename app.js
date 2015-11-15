/**
 * Created by shengyunzhou on 15/11/15.
 */

'use strict';

var _ = require('lodash');

var data = [[4, 8, 7, 3], [2, 5, 9, 3], [6, 3, 2, 5], [4, 4, 1, 6]];

var BOUND = 3;

var steps = [];
var alreadyTakenCoord = [];
var potentialStartingPoints = [];
var peaks = [], bottoms = [];

function findStartingPoints(cutoff) {
    for (var x = 0; x < BOUND; x++) {
        for (var y = 0; y < BOUND; y++) {
            if (data[x][y] > cutoff) {
                potentialStartingPoints.push([x, y]);
            }
        }
    }
}


function isHigherThanEast(x, y) {
    return data[x][y] > data[x][y + 1];
}

function isHigherThanSouth(x, y) {
    return data[x][y] > data[x + 1][y];
}

function isHigherThanWest(x, y) {
    return data[x][y] > data[x][y - 1];
}

function isHigherThanNorth(x, y) {
    return data[x][y] > data[x - 1][y];
}


function isLowerThanEast(x, y) {
    return data[x][y] < data[x][y + 1];
}

function isLowerThanSouth(x, y) {
    return data[x][y] < data[x + 1][y];
}

function isLowerThanWest(x, y) {
    return data[x][y] < data[x][y - 1];
}

function isLowerThanNorth(x, y) {
    return data[x][y] < data[x - 1][y];
}

function isPeak(x, y) {
    if (x === 0 && y === 0) {
        return isHigherThanEast(x, y) && isHigherThanSouth(x, y);
    } else if (x === 0 && y === BOUND) {
        return isHigherThanWest(x, y) && isHigherThanSouth(x, y);
    } else if (x === BOUND && y === 0){
        return isHigherThanEast(x, y) && isHigherThanEast(x, y);
    } else if (x === 0) {
        return isHigherThanEast(x, y) && isHigherThanSouth(x, y) && isHigherThanWest(x, y);
    } else if (y === 0) {
        return isHigherThanNorth(x, y) && isHigherThanEast(x, y) && isHigherThanSouth(x, y);
    } else if (x === BOUND) {
        return isHigherThanEast(x, y) && isHigherThanNorth(x, y) && isHigherThanWest(x, y);
    } else if (y === BOUND) {
        return isHigherThanNorth(x, y) && isHigherThanWest(x, y) && isHigherThanSouth(x, y);
    } else {
        return isHigherThanEast(x, y) && isHigherThanNorth(x, y) && isHigherThanWest(x, y) && isHigherThanSouth(x, y);
    }
}

function isBottom(x, y) {
    if (x === 0 && y === 0) {
        return isLowerThanEast(x, y) && isLowerThanSouth(x, y);
    } else if (x === 0 && y === BOUND) {
        return isLowerThanWest(x, y) && isLowerThanSouth(x, y);
    } else if (x === BOUND && y === 0){
        return isLowerThanEast(x, y) && isLowerThanEast(x, y);
    } else if (x === 0) {
        return isLowerThanEast(x, y) && isLowerThanSouth(x, y) && isLowerThanWest(x, y);
    } else if (y === 0) {
        return isLowerThanNorth(x, y) && isLowerThanEast(x, y) && isLowerThanSouth(x, y);
    } else if (x === BOUND) {
        return isLowerThanEast(x, y) && isLowerThanNorth(x, y) && isLowerThanWest(x, y);
    } else if (y === BOUND) {
        return isLowerThanNorth(x, y) && isLowerThanWest(x, y) && isLowerThanSouth(x, y);
    } else {
        return isLowerThanEast(x, y) && isLowerThanNorth(x, y) && isLowerThanWest(x, y) && isLowerThanSouth(x, y);
    }
}

function findPeaksAndBottoms() {
    for (var x = 0; x <= BOUND; x++) {
        for (var y = 0; y <= BOUND; y++) {
            console.log("testing for " + x + ", " + y);
            if (isPeak(x, y)) {
                peaks.push([x, y]);
            }

            if (isBottom(x, y)) {
                bottoms.push([x, y]);
            }
        }
    }

    console.log(peaks);
    console.log(bottoms);
}

findPeaksAndBottoms();