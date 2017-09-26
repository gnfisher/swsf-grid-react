import { notOnBoard, findGridFromCoords, createNewUnit } from './Moves';

export const calcTurns180 = (unit, locationCoords) => {
  let adjustedStats, nextLocation, nextHeading, x, y;

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
    return [];
  }

  let nextSpeed = unit.speed - 1;
  adjustedStats = {
    location:        findGridFromCoords(nextLocation),
    heading:         nextHeading,
    speed:           nextSpeed,
    maneuverability: unit.maneuverability - 2
  };

  return [createNewUnit(unit, adjustedStats)];
};

export const calcTransit180 = (unit, locationCoords) => {
  let adjustedStats, nextLocations, nextHeading, x, y;

  if (unit.heading === 'W') {
    nextLocations = ['A', 'F', 'K', 'P', 'U'];
    nextHeading = 'E';
  } else {
    return [];
  }

  let nextSpeed = unit.speed - 1;

  return nextLocations.map((location) => {
    adjustedStats = {
      location:        location,
      heading:         nextHeading,
      speed:           nextSpeed,
      maneuverability: unit.maneuverability - 2
    };

    return createNewUnit(unit, adjustedStats);
  });
};

export const calcZ180 = (unit, locationCoords) => {
  let adjustedStats, nextLocations, nextHeading, x, y;

  if (unit.heading === 'E') {
    nextLocations = ['E', 'J', 'O', 'T', 'Y'];
    nextHeading = 'W';
  } else {
    return [];
  }

  let nextSpeed = unit.speed - 1;

  return nextLocations.map((location) => {
    adjustedStats = {
      location:        location,
      heading:         nextHeading,
      speed:           nextSpeed,
      maneuverability: unit.maneuverability - 2
    };

    return createNewUnit(unit, adjustedStats);
  });
};
