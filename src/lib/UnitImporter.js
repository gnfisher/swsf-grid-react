export const UnitImporter = {
  getUnitsFromText: (text) => {
    const unitStrings = ParseUtility.parseByLine(text);
    return UnitImporter.unitObjectsFromStrings(unitStrings);
  },
  unitObjectsFromStrings: (unitStrings) => {
    // check for blank line, return if so
    // parse lines that are present

    const unitsObject = {};
    unitStrings.forEach(string => {
      if (string === '') {
        return;
      }

      const location   = ParseUtility.parseLocation(string);
      const heading    = ParseUtility.parseHeading(string);
      const unitType   = ParseUtility.parseUnitType(string);
      const name        = ParseUtility.parseName(string);
      const timestamp = Math.floor(Math.random() * Date.now());

      unitsObject[`unit-${timestamp}`] = { location, heading, unitType, name };
    });

    return unitsObject;
  }
}

export const ParseUtility = {
  parseByLine: (text) => {
    return text.split("\n");
  },
  parseLocation: (string) => {
    const regex = /^\w*/
    return string.match(regex)[0].toUpperCase();
  },
  parseHeading: (string) => {
    const regex = />(\w*)/;
    return string.match(regex)[1].toUpperCase();
  },
  parseUnitType: (string) => {
    const regex = /:\s([a-zA-Z\d]*)\s/;
    return string.match(regex)[1];
  },
  parseName: (string) => {
    const regex= /:\s[a-zA-Z\d]*\s([\w\W]*)$/;
    return string.match(regex)[1];
  }
};

export default UnitImporter;