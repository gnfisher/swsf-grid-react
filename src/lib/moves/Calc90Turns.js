import { notOnBoard, findGridFromCoords, createNewUnit } from './Moves';

// Returns an array of unit objects
export const calcTurns90 = (unit, locationCoords) => {
  let adjustedStats, nextLocation, nextHeading, x, y;

  const units = [1, -1].map((turn) => {
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

    return createNewUnit(unit, adjustedStats);
  });

  return units.filter(el => el !== undefined);
};

// Returns an array of Unit objects
export const calcTransit90 = (unit, locationCoords) => {
  let adjustedStats, nextLocations, nextHeading, x, y;

  if (unit.heading === 'N' || unit.heading === 'S') {
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
      maneuverability: unit.maneuverability - 1
    };

    return createNewUnit(unit, adjustedStats);
  });
};

// Returns an array of Unit objects
export const calcZ90 = (unit, locationCoords) => {
  let adjustedStats, nextLocations, nextHeading, x, y;

  if (unit.heading === 'N' || unit.heading === 'S') {
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
      maneuverability: unit.maneuverability - 1
    };

    return createNewUnit(unit, adjustedStats);
  });
};
