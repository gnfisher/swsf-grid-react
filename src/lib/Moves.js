// Returns true if the unit can move into the grid space passed in as
// `desiredMove` and false if not.
export const canMove = (desiredMove, unit, state) => {
  const unavailableSpaces = occupiedSpaces(state);
  const potentialMoves    = makeMoves([], unit);
  const validMoves        = difference(potentialMoves, unavailableSpaces);

  // return true if desiredMove is in result of above
  const index = validMoves.indexOf(desiredMove);
  return (index != -1 ? true : false);
};

// Removes duplicate elements in an array, NOT DEEP
const difference = (arr, elementsToRemove) => {
  elementsToRemove.forEach(el => {
    const index = arr.indexOf(el);
    if (index != -1) {
      arr.splice(index, 1);
    }
  });

  return arr;
};

// Returns an array of grid spaces that are possible legal moves without
// checking if the moves are valid (ie there is no other unit already
// present within the gridspace).
const makeMoves = (possibleMoves, unit) => {
  // Unit has no more speed left, so return.
  if (unit.speed < 1) {
    return possibleMoves;
  }

  // Only two max turns made per move, left, right, or 180-deg.
  const possibleTurns = (unit.maneuverability > 2 ? 2 : unit.maneuverability);

  for (let i = 0; i <= possibleTurns; i++) {
    const nextUnits = calcNextLocation(i, unit);
    const spaces    = nextUnits.map(move => move.location); // array of grid spaces moved into
    possibleMoves   = possibleMoves.concat(spaces); // add new spaces into possibleMoves

    nextUnits.forEach(unit =>
      makeMoves(possibleMoves, unit));
  }

  return possibleMoves;
};

// Returns an array of Unit objects with their state updated to reflect
// the possible move they have made.
// * returns Array => [{currentLocation, currentHeading, currentTurns, currentSpeed}]
const calcNextLocation = (turns, unit) => {
  const locationCoords = gridCoords[unit.location];
  const nextLocations  = [];

  let adjustedStats, nextLocation, nextHeading, x, y;

  // check grid 180-deg
  if (turns === 2) {
    switch (unit.heading) {
      case 'N':
        y = locationCoords[1] - 1;
        x = locationCoords[0];
        nextLocation = [x,y];
        nextHeading = 'S';
        break;
      case 'E':
        y = locationCoords[1];
        x = locationCoords[0] - 1;
        nextLocation = [x,y];
        nextHeading = 'W';
        break;
      case 'S':
        y = locationCoords[1] + 1;
        x = locationCoords[0];
        nextLocation = [x,y];
        nextHeading = 'N';
        break;
      case 'W':
        y = locationCoords[1];
        x = locationCoords[0] + 1;
        nextLocation = [x,y];
        nextHeading = 'E';
        break;
    }

    if (notOnBoard(nextLocation)) {
      return;
    }


    let nextSpeed = unit.speed - 2;
    // create new unit with speed -1 and turns -2 and new location and save to nextLocations
    adjustedStats = {
      location:        findGridFromCoords(nextLocation),
      heading:         nextHeading,
      speed:           nextSpeed,
      maneuverability: unit.maneuverability - 2
    };

    nextLocations.push(createNewUnit(unit, adjustedStats));
  } else if (turns === 1) {
    // in each case, check R (1) and L (-1) turns
    [1, -1].forEach((turn) => {
      switch (unit.heading) {
        case 'N':
          y = locationCoords[1];
          x = locationCoords[0] + turn;
          nextLocation = [x,y];
          nextHeading = (turn === 1 ? 'E' : 'W');
          break;
        case 'E':
          y = locationCoords[1] + turn;
          x = locationCoords[0];
          nextLocation = [x,y];
          nextHeading = (turn === 1 ? 'S' : 'N');
          break;
        case 'S':
          y = locationCoords[1] + 1;
          x = locationCoords[0];
          nextLocation = [x,y];
          nextHeading = (turn === 1 ? 'W' : 'E');
          break;
        case 'W':
          y = locationCoords[1];
          x = locationCoords[0] + 1;
          nextLocation = [x,y];
          nextHeading = (turn === 1 ? 'N' : 'S');
          break;
      }

      if (notOnBoard(nextLocation)) {
        return; // not a valid grid location, not on board.
      }

      let nextSpeed = unit.speed - 1;
      adjustedStats = {
        location:        findGridFromCoords(nextLocation),
        heading:         nextHeading,
        speed:           nextSpeed,
        maneuverability: unit.maneuverability - 1
      };

      nextLocations.push(createNewUnit(unit, adjustedStats));
    });
  } else {
    switch (unit.heading) {
      case 'N':
        y = locationCoords[1] + 1;
        x = locationCoords[0];
        nextLocation = [x,y];
        break;
      case 'E':
        y = locationCoords[1];
        x = locationCoords[0] + 1;
        nextLocation = [x,y];
        break;
      case 'S':
        y = locationCoords[1] - 1;
        x = locationCoords[0];
        nextLocation = [x,y];
        break;
      case 'W':
        y = locationCoords[1];
        x = locationCoords[0] - 1;
        nextLocation = [x,y];
        break;
    }

    if (notOnBoard(nextLocation)) {
      return; // not a valid grid location, not on board.
    }

    let nextSpeed = unit.speed - 1;
    adjustedStats = {
      location:        findGridFromCoords(nextLocation),
      speed:           nextSpeed,
    };

    nextLocations.push(createNewUnit(unit, adjustedStats));
  }

  return nextLocations;
};

const occupiedSpaces = (units) => {
  return Object.keys(units).map(key => {
    const space = units[`${key}`].location;
    if (space !== 'TRANSIT' && space !== 'Z') {
      return space
    };
  });
};

export const notOnBoard = (loc) => {
  // if grid not found will return undefined
  const grid = findGridFromCoords(loc);
  return (grid === undefined ? true : false);
};

const gridCoords = {
  // [-1, ANY] = TRANSIT
  TRANSIT: [-1,0],
  TRANSIT: [-1,-1],
  TRANSIT: [-1,-2],
  TRANSIT: [-1,-3],
  TRANSIT: [-1,-4],

  A: [0,0],
  B: [1,0],
  C: [2,0],
  D: [3,0],
  E: [4,0],

  F: [0,-1],
  G: [1,-1],
  H: [2,-1],
  I: [3,-1],
  J: [4,-1],

  K: [0,-2],
  L: [1,-2],
  M: [2,-2],
  N: [3,-2],
  O: [4,-2],

  P: [0,-3],
  Q: [1,-3],
  R: [2,-3],
  S: [3,-3],
  T: [4,-3],

  U: [0,-4],
  V: [1,-4],
  W: [2,-4],
  X: [3,-4],
  Y: [4,-4],

  // [5, ANY] = Z
  Z: [5,0],
  Z: [5,-1],
  Z: [5,-2],
  Z: [5,-3],
  Z: [5,-4],
};

export const findGridFromCoords = (coords) => {
  const gridKeys = Object.keys(gridCoords);
  return gridKeys.find(key =>
    matchingCoords(gridCoords[key], coords));
};

// Returns clone with updated
const createNewUnit = (unit, adjustedStats) => {
  return Object.assign({}, {...unit}, adjustedStats);
};

// Return true if coords arrays are the same.
const matchingCoords = (coords1, coords2) => {
  if (coords1[0] == coords2[0] && coords1[1] == coords2[1]) {
    return true;
  }

  return false;
};

export default canMove;
