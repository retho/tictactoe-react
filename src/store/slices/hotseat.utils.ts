export type WinningSeq = [number, number, number];
const winningSeqs: WinningSeq[] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const checkWinner = (
  cells: Record<number, null | 'x' | 'o'>
): null | ['x' | 'o', WinningSeq] => {
  const seq =
    winningSeqs.find(s => {
      const [n1, n2, n3] = s;
      return cells[n1] && cells[n1] === cells[n2] && cells[n1] === cells[n3];
    }) || null;
  const winner = seq && cells[seq[0]];
  return winner && seq && [winner, seq];
};
