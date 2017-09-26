import { notOnBoard, findGridFromCoords, createNewUnit } from './Moves';

// Returns an array of Unit object
export const moveUnit = (unit, locationCoords) => {
  let adjustedStats, nextLocation, nextHeading, x, y;

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
    return []; // not a valid grid location, not on board.
  }

  let nextSpeed = unit.speed - 1;
  adjustedStats = {
    location: findGridFromCoords(nextLocation),
    speed:    nextSpeed,
  };

  return [createNewUnit(unit, adjustedStats)];
};

// Returns an array of Unit object
export const moveUnitTransit = (unit, locationCoords) => {
  let adjustedStats, nextLocations, nextHeading, x, y;

  if (unit.heading === 'E') {
    nextLocations = ['A', 'F', 'K', 'P', 'U'];
    nextHeading = 'E';
  } else {
    return [];
  }

  let nextSpeed = unit.speed - 1;

  return nextLocations.map((location) => {
    adjustedStats = {
      location: location,
      speed:    nextSpeed,
    };

    return createNewUnit(unit, adjustedStats);
  });
};

// Returns an array of Unit object
export const moveUnitZ = (unit, locationCoords) => {
  let adjustedStats, nextLocations, nextHeading, x, y;

  if (unit.heading === 'W') {
    nextLocations = ['E', 'J', 'O', 'T', 'Y'];
    nextHeading = 'W';
  } else {
    return [];
  }

  let nextSpeed = unit.speed - 1;

  return nextLocations.map((location) => {
    adjustedStats = {
      location: location,
      speed:    nextSpeed,
    };

    return createNewUnit(unit, adjustedStats);
  });
};

