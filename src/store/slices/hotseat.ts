import {createSliceName, createSlice, PayloadAction} from 'utils/redux';
import {checkWinner, WinningSeq} from './hotseat.utils';

const sliceName = createSliceName('hotseat');

type GameStatusTurn = {
  kind: 'turn';
  player: 'x' | 'o';
};
type GameStatusWinner = {
  kind: 'winner';
  winner: 'x' | 'o';
  seq: WinningSeq;
};
type GameStatusDraw = {
  kind: 'draw';
};
type GameStatus = GameStatusTurn | GameStatusWinner | GameStatusDraw;

type State = {
  cells: Record<number, null | 'x' | 'o'>;
  status: GameStatus;
};
const defaultState: State = {
  cells: {},
  status: {kind: 'turn', player: 'x'},
};
const slice = createSlice({
  name: sliceName,
  initialState: defaultState,
  reducers: {
    reset: () => defaultState,
    move: (state, {payload: moveTo}: PayloadAction<number>) => {
      const {cells, status} = state;
      if (status.kind !== 'turn') {
        return state;
      }
      if (cells[moveTo]) {
        return state;
      }
      const nextCells = {...cells, [moveTo]: status.player};
      const checkedWinner = checkWinner(nextCells);
      const nextStatus = ((): GameStatus => {
        if (checkedWinner) {
          const [winner, seq] = checkedWinner;
          return {
            kind: 'winner',
            winner,
            seq,
          };
        }
        if (Object.keys(nextCells).length >= 9) return {kind: 'draw'};
        return {
          kind: 'turn',
          player: status.player === 'x' ? 'o' : 'x',
        };
      })();
      return {...state, cells: nextCells, status: nextStatus};
    },
  },
});

export const {reducer} = slice;
export const {reset, move} = slice.actions;
