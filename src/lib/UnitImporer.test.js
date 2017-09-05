import UnitImporter, { ParseUtility } from './UnitImporter';

describe('UnitImporter', () => {
  // it('should create a unit object from each valid line of input', () => {
  //   const textInput = "B>N: ISD Headhunter\nA>N: ISD Avenger";
  //   const units = UnitImporter.getUnitsFromText(textInput);
  //   expect(Object.keys(units).length).toBe(2);
  // });

  // it('should skip blank lines', () => {
  //   const textInput = "A>B: ISD Gummy\n\nA>B: ISD Bears";
  //   const units = UnitImporter.getUnitsFromText(textInput);
  //   expect(Object.keys(units).length).toBe(2);
  // });

  // it('should return errors array when location malformatted', () => {
  //   const textInput = "32>B: ISD Gummy";
  //   const units = UnitImporter.getUnitsFromText(textInput);
  //   expect(units.errors.length).toBeGreaterThan(0);
  // });

  // it('should return errors array when heading malformatted', () => {
  //   const textInput = "A>32: ISD Gummy";
  //   const units = UnitImporter.getUnitsFromText(textInput);
  //   expect(units.errors.length).toBeGreaterThan(0);
  // });

  // it('should return errors array when unit type is not found', () => {
  //   const textInput = "A>N: isd something";
  //   const units = UnitImporter.getUnitsFromText(textInput);
  //   expect(units.errors.length).toBeGreaterThan(0);
  // });

  it('should throw an alert and reset if more than one unit in A-Y grids', () => {
    const textInput = "A>B: ISD Gummy\nA>B: ISD Bears";
    const units = UnitImporter.getUnitsFromText(textInput);
    console.log(units);
    expect(units.errors.length).toBeGreaterThan(0);
  });
});

// describe('ParseUtility', () => {
//   it('#parseLocation', () => {
//     let locationWithLetter = ParseUtility.parseLocation('A>B: ISD Headhunter');
//     expect(locationWithLetter).toBe('A');

//     let locationWithTransit = ParseUtility.parseLocation('Transit>B: ISD Headhunter');
//     expect(locationWithTransit).toBe('TRANSIT');
//   });

//   it('#parseHeading', () => {
//     let heading = ParseUtility.parseHeading('A>N: ISD Headhunter');
//     expect(heading).toBe('N');
//   });

//   it('#parseUnitType', () => {
//     let unitType = ParseUtility.parseUnitType('A>N: ISD Headhunter');
//     expect(unitType).toBe('ISD');

//     unitType = ParseUtility.parseUnitType('A>N: ISD1 Headhunter');
//     expect(unitType).toBe('ISD1');

//     unitType = ParseUtility.parseUnitType('A>N: MC80A Headhunter');
//     expect(unitType).toBe('MC80A');
//   });

//   it('#parseName', () => {
//     let name = ParseUtility.parseName('A>N: ISD Headhunter');
//     expect(name).toBe('Headhunter');

//     name = ParseUtility.parseName("A>N: ISD Death's Head");
//     expect(name).toBe("Death's Head");

//     name = ParseUtility.parseName("A>N: XW Fish (36)");
//     expect(name).toBe("Fish (36)");
//   });
// });
