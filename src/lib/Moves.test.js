import { makeMoves } from './Moves';

describe('makemoves', () => {
  board_array = [
    'TRANSIT',
    'A', 'B', 'C', 'D',' E',
    'F', 'G', 'H', 'I', 'J',
    'K', 'L', 'M', 'N', 'O',
    'P', 'Q', 'R', 'S', 'U',
    'T', 'V', 'W', 'X', 'Y',
    'Z'
  ];

  unit_1x1 = {
    heading: 'E',
    location: 'A',
    speed: 1,
    maneuverability: 1,
  };

  it('returns an accurate array of possible moves', () => {
    valid_moves = ['B', 'F', 'TRANSIT'];

    moves = board_array.filter(
      (space) => canMove(space, unit_1x1));

    expect(moves.sort()).toEqual(valid_moves.sort());
  });
});
