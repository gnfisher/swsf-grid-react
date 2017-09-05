import units from './units';

// TODO: Rethink and refactor this stuff... 
export const UnitImporter = {
  getUnitsFromText: (text) => {
    const unitStrings = ParseUtility.parseByLine(text);
    return UnitImporter.unitObjectsFromStrings(unitStrings);
  },
  unitObjectsFromStrings: (unitStrings) => {
    const errors = [];
    const unitsObject = {};

    unitStrings.forEach(string => {
      if (string === '') {
        return;
      }

      try {
        const location   = ParseUtility.parseLocation(string);
        const heading    = ParseUtility.parseHeading(string);
        const unitType   = ParseUtility.parseUnitType(string);
        const name       = ParseUtility.parseName(string);
        const timestamp  = Math.floor(Math.random() * Date.now());
        const { speed, maneuverability } = units[`${unitType}`];
        
        unitsObject[`unit-${timestamp}`] = { 
          location,
          heading,
          unitType,
          name,
          speed,
          maneuverability
        };
      } catch (e) {
        // Catch the 'cannot match against undefined error that is raised when
        // the unit type is not found in the units object, and write a custom
        // error message. Probably a better way to do this?
        if (e.message.indexOf('Cannot match against') !== -1) {
          e.message = 'The unit type was not found, check to make sure it is correct.';
        }

        errors.push({message: e.message, line: string});
      }
    });

    // Check for duplicates
    const spaces = Object.keys(unitsObject).map(key => unitsObject[key].location);
    const count = spaces =>
      spaces.reduce((a, b) =>
        Object.assign(a, {[b]: (a[b] || 0) + 1}), {});
    const duplicates = (dict) =>
      Object.keys(dict).filter((a) => dict[a] > 1);
    if (duplicates(count(spaces)).length > 0) {
      const msg = `You cannot have more than one unit in grid spaces A through Y. You have multiple units in spaces: ${duplicates(count(spaces))}`;
      errors.push({message: msg, line: 'Verify spaces listed please.'});
    }

    // return with errors if errors
    if (errors.length > 0) {
      return {errors: errors};
    }

    // return units if all is good
    return unitsObject;
  }
}

export const ParseUtility = {
  parseByLine: (text) => {
    return text.split("\n");
  },
  parseLocation: (string) => {
    const regex = /^[A-Za-z]*/;
    try {
      const result = string.match(regex)[0].toUpperCase();
      if (result === '') {
        throw new Error('Not a valid grid space location!');
      }
      return result;
    } catch(e) {
        throw new Error('No valid grid space location!');
    }
  },
  parseHeading: (string) => {
    const regex = />([A-Za-z]*)/;
    try {
      const result = string.match(regex)[1].toUpperCase();
      if (result === '') {
        throw new Error('Not a valid heading!');
      }
      return result;
    } catch(e) {
      throw new Error('No valid heading!');
    }
  },
  parseUnitType: (string) => {
    const regex = /:\s([a-zA-Z\d]*)\s/;
    try {
      const result = string.match(regex)[1];
      if (result === '') {
        throw new Error('No valid unit type present! Check that the line is formatted properly.');
      }
      return result;
    } catch(e) {
      throw new Error('No valid unit type present! Check that the line is formatted properly.');
    }
  },
  parseName: (string) => {
    const regex= /:\s[a-zA-Z\d]*\s([\w\W]*)$/;
    const result = string.match(regex)[1];
    return result;
  }
};

export default UnitImporter;
