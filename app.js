/**
 * Created by shengyunzhou on 15/11/15.
 */

'use strict';
var fs = require('fs');
var rawData;
var BOUND;
var peaks = [], allRoutes = [];

function isHigherThanEast(x, y) {
    return rawData[x][y] > rawData[x][y + 1];
}

function isHigherThanSouth(x, y) {
    return rawData[x][y] > rawData[x + 1][y];
}

function isHigherThanWest(x, y) {
    return rawData[x][y] > rawData[x][y - 1];
}

function isHigherThanNorth(x, y) {
    return rawData[x][y] > rawData[x - 1][y];
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

function tryEast(x, y, steps) {
    if (isHigherThanEast(x, y)) {
        steps.push([x, y + 1]);
    }
}
function trySouth(x, y, steps) {
    if (isHigherThanSouth(x, y)) {
        steps.push([x + 1, y]);
    }
}

function tryWest(x, y, steps) {
    if (isHigherThanWest(x, y)) {
        steps.push([x, y - 1]);
    }
}
function tryNorth(x, y, steps) {
    if (isHigherThanNorth(x, y)) {
        steps.push([x - 1, y]);
    }
}

function getPossibleSteps (point) {
    var steps = [], x = point[0], y = point[1];
    if (x === 0 && y === 0) {
        tryEast(x, y, steps);
        trySouth(x, y, steps);
    } else if (x === 0 && y === BOUND) {
        tryWest(x, y, steps);
        trySouth(x, y, steps);
    } else if (x === BOUND && y === 0){
        tryNorth(x, y, steps);
        tryEast(x, y, steps);
    } else if (x === 0) {
        tryWest(x, y, steps);
        tryEast(x, y, steps);
        trySouth(x, y, steps);
    } else if (y === 0) {
        tryNorth(x, y, steps);
        tryEast(x, y, steps);
        trySouth(x, y, steps);
    } else if (x === BOUND) {
        tryNorth(x, y, steps);
        tryEast(x, y, steps);
        tryWest(x, y, steps);
    } else if (y === BOUND) {
        tryNorth(x, y, steps);
        tryWest(x, y, steps);
        trySouth(x, y, steps);
    } else {
        tryNorth(x, y, steps);
        tryWest(x, y, steps);
        trySouth(x, y, steps);
        tryEast(x, y, steps);
    }
    return steps
}


function findPeaks() {
    for (var x = 0; x <= BOUND; x++) {
        for (var y = 0; y <= BOUND; y++) {
            if (isPeak(x, y)) {
                peaks.push([x, y]);
            }
        }
    }
}

function findNext(point, route) {
    route.push(point);
    var possibleNextPoints = getPossibleSteps(point);

    possibleNextPoints.forEach(function (nextPoint) {

        var currentRoute = route.slice(0); // take a copy of the route so far

        if (getPossibleSteps(nextPoint).length === 0) {
            currentRoute.push(nextPoint);
            allRoutes.push(currentRoute);
        } else {
            findNext(nextPoint, currentRoute);
        }
    });
}

function generateRoutes() {
    peaks.forEach(function (peak) {
        var currentRoute = [];
        findNext(peak, currentRoute);
    });
}

function getLongestChild(routes) {
    var longest = 0;
    routes.forEach(function (child) {
        if (child.length > longest) {
            longest = child.length;
        }
    });

    return longest;
}

function getBiggestDrop(routes, length) {
    var drop = 0;
    routes.forEach(function (child) {
        if (child.length === length) {
            var startingPoint = child[0],
                endingPoint = child[length - 1],
                diff = rawData[startingPoint[0]][startingPoint[1]] - rawData[endingPoint[0]][endingPoint[1]];
            if (drop < diff) {
                drop = diff;
            }
        }
    });

    return drop;
}

fs.readFile('data.txt', 'utf-8', function (err, data) {
    if (err) throw err;
    console.log('reading data');
    var mockData = data.split(/\n/);
    mockData.shift();
    rawData = mockData.map(function (row) {
        return row.split(/\s/).map(function (number) {
            return parseInt(number);
        });
    });

    BOUND = rawData[0].length - 1;

    findPeaks();
    generateRoutes();

    console.log("The longest distance is " + getLongestChild(allRoutes));
    console.log("The drop for " + getLongestChild(allRoutes) + " steps is " + getBiggestDrop(allRoutes, getLongestChild(allRoutes)));

});



