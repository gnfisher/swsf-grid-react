// Returns true if the unit can move into the grid space passed in as
// `desiredMove` and false if not.
export const canMove = (desiredMove, unit, state) => {
  const unavailableSpaces = occupiedSpaces(state);
  const potentialMoves    = makeMoves([], unit);

  // exclude unavailableSpaces from possibleMoves
  // return true if desiredMove is in result of above
};

// Returns an array of grid spaces that are possible legal moves without
// checking if the moves are valid (ie there is no other unit already
// present within the gridspace).
const makeMoves = (possibleMoves, unit) => {
  if (speed < 1) {
    return possibleMoves;
  }

  // Only two max turns per move, left, right, or 180-deg.
  const possibleTurns = (turns > 2 ? 3 : turns);
  for (i = 1; i < possibleTurns; i++) {
    const nextUnits = calcNextLocation(i, unit);
    const spaces = moves.map(move => move.location); // array of grid spaces moved into

    possibleMoves = possibleMoves.concat(spaces);

    nextUnits.forEach(unit => {
      makeMoves(possibleMoves, unit.location, unit.heading, unit.turns, unit.speed);
    });
  }
};

// Returns an array of Unit objects with their state updated to reflect
// the possible move they have made.
// * returns Array => [{currentLocation, currentHeading, currentTurns, currentSpeed}]
const calcNextLocation = (turns, unit) => {
  const nextLocations = [];

  if (unit.location === 'TRANSIT') {
    const possibleLocations = ['A', 'F', 'K', 'P', 'U'];

    possibleLocations.forEach(location => {
      const adjustedStats = {location, heading: 'E', speed: unit.speed -1};
      const nextUnit      = Object.assign({}, {...unit}, adjustedStates);
      nextLocations.push(nextUnit);
    };
  } else if (locationCoords === 'Z');

  const locationCoords = gridCoords[unit.location];

  if (turns === 2) {
    // check grid 180-deg
    // create new unit with speed -1 and turns -2 and new location and save to nextLocations
  }

  // in each case, check L and R turns
  // create new unit with speed -1 and turns -1 and new location and save to nextLocations
  switch (heading) {
    case 'N':
      break;
    case 'E':
      break;
    case 'S':
      break;
    case 'W':
      break;
  }

  nextLocations.forEach(location => {
    if (locationOnBoard(nextLocation)) {
      // add valid move to array of potential moves
      // makeMoves with no lcation and unit - here or level up?
    }
  });
};

const locationOnBoard = (location) => {
  // location is on board
  // then true
};

const occupiedSpaces = (units) => {
  // Do i need this return?
  return Object.keys(units).map(key => {
    const space = units[`${key}`].location;
    if (space !== 'TRANSIT' && space !== 'Z') {
      return space
  });
    }
  });
});

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

const findGridFromCoords = (coords) => {
  const gridKeys = Object.keys(gridCoords);
  return gridKeys.find(key =>
    gridCoords[key] === coords);
};

export default canMove;
