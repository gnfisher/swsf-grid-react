import { canMove } from './Moves';

const board_array = [
  'TRANSIT',
  'A', 'B', 'C', 'D',' E',
  'F', 'G', 'H', 'I', 'J',
  'K', 'L', 'M', 'N', 'O',
  'P', 'Q', 'R', 'S', 'U',
  'T', 'V', 'W', 'X', 'Y',
  'Z'
];

const unit_1x1 = {
  heading: 'E',
  location: 'A',
  speed: 1,
  maneuverability: 1,
};

describe('makemoves', () => {
  it('returns an accurate array of possible moves', () => {
    const valid_moves = ['B', 'F'];
    const moves = board_array.filter(
      (space) => canMove(space, unit_1x1, {}));

    expect(moves.sort()).toEqual(valid_moves.sort());
  });
});
