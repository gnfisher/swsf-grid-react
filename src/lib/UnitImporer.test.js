import UnitImporter, { ParseUtility } from './UnitImporter';

describe('UnitImporter', () => {
  it('should create a unit object from each valid line of input', () => {
    const textInput = "A>B: ISD Headhunter\nA>B: TI Headhunter (36)";
    const units = UnitImporter.getUnitsFromText(textInput);
    expect(Object.keys(units).length).toBe(2);
  });

  it('should skip blank lines', () => {
    const textInput = "A>B: ISD Gummy\n\nA>B: TI Bears (36)";
    const units = UnitImporter.getUnitsFromText(textInput);
    expect(Object.keys(units).length).toBe(2);
  });

  it('should alert when there is badly formatted lines', () => {
    // pass in bad input
    // expect to get an alert
    expect(true).toBe(false);
  });
});

describe('ParseUtility', () => {
  it('#parseLocation', () => {
    let locationWithLetter = ParseUtility.parseLocation('A>B: ISD Headhunter');
    expect(locationWithLetter).toBe('A');

    let locationWithTransit = ParseUtility.parseLocation('Transit>B: ISD Headhunter');
    expect(locationWithTransit).toBe('TRANSIT');
  });

  it('#parseHeading', () => {
    let heading = ParseUtility.parseHeading('A>N: ISD Headhunter');
    expect(heading).toBe('N');
  });

  it('#parseUnitType', () => {
    let unitType = ParseUtility.parseUnitType('A>N: ISD Headhunter');
    expect(unitType).toBe('ISD');

    unitType = ParseUtility.parseUnitType('A>N: ISD1 Headhunter');
    expect(unitType).toBe('ISD1');

    unitType = ParseUtility.parseUnitType('A>N: MC80A Headhunter');
    expect(unitType).toBe('MC80A');
  });

  it('#parseName', () => {
    let name = ParseUtility.parseName('A>N: ISD Headhunter');
    expect(name).toBe('Headhunter');

    name = ParseUtility.parseName("A>N: ISD Death's Head");
    expect(name).toBe("Death's Head");

    name = ParseUtility.parseName("A>N: XW Fish (36)");
    expect(name).toBe("Fish (36)");
  });
});
