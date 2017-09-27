import { canMove } from './Moves';

const board_array = [
  'TRANSIT',
  'A', 'B', 'C', 'D','E',
  'F', 'G', 'H', 'I', 'J',
  'K', 'L', 'M', 'N', 'O',
  'P', 'Q', 'R', 'S', 'U',
  'T', 'V', 'W', 'X', 'Y',
  'Z'
];

describe('makemoves', () => {
  describe('knows how to handle units in Transit', () => {
    it('can make 90-deg turns out of Transit', () => {
      const unit = {
        heading: 'N',
        location: 'TRANSIT',
        speed: 1,
        maneuverability: 1
      };
      const valid_moves = ['A', 'F', 'K', 'P', 'U'];

      const moves = board_array.filter(
        (space) => canMove(space, unit, {}));

      expect(moves.sort()).toEqual(valid_moves.sort());
    });

    it('can make 180-deg turns out of Transit', () => {
      const unit = {
        heading: 'N',
        location: 'TRANSIT',
        speed: 1,
        maneuverability: 2
      };
      const valid_moves = ['A', 'F', 'K', 'P', 'U'];
      const moves = board_array.filter(
        (space) => canMove(space, unit, {}));

      expect(moves.sort()).toEqual(valid_moves.sort());
    });
  });

  describe('knows how to handle units in Z', () => {
    it('can make 90-deg turns out of Z', () => {
      const unit = {
        heading: 'N',
        location: 'Z',
        speed: 1,
        maneuverability: 1
      };
      const valid_moves = ['E', 'J', 'O', 'T', 'Y'];
      const moves = board_array.filter(
        (space) => canMove(space, unit, {}));

      expect(moves.sort()).toEqual(valid_moves.sort());
    });

    it('can make 180-deg turns out of Z', () => {
      const unit = {
        heading: 'N',
        location: 'Z',
        speed: 1,
        maneuverability: 2
      };
      const valid_moves = ['E', 'J', 'O', 'T', 'Y'];
      const moves = board_array.filter(
        (space) => canMove(space, unit, {}));

      expect(moves.sort()).toEqual(valid_moves.sort());
    });
  });

  it('knows how to handle units with multiple moves and turns', () => {
    const unit = {
      heading: 'E',
      location: 'TRANSIT',
      speed: 3,
      maneuverability: 3
    };
    const valid_moves = [
      'TRANSIT',
      'A', 'F', 'K', 'P', 'U',
      'B', 'G', 'L', 'Q', 'V',
      'C', 'H', 'M', 'R', 'W'
    ];
    const moves = board_array.filter(
      (space) => canMove(space, unit, {}));

    expect(moves.sort()).toEqual(valid_moves.sort());
  });
});
