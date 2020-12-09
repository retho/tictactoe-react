import React, {FC} from 'react';
import {range} from 'lodash-es';
import {bem} from 'utils/bem';
import './styles.scss';
import {useSelector, useDispatch} from 'utils/redux';
import {move, reset} from 'store/slices/hotseat';

const root = bem(module.id, 'HotseatPage');
const HotseatPage: FC = () => {
  const dispatch = useDispatch();
  const {cells, status} = useSelector(state => state.hotseat);
  return (
    <div className={root()}>
      <div>
        <div className={root('cells')}>
          {range(0, 9).map(c => (
            <div
              key={c}
              className={root('cell', {
                border:
                  c % 3 && Math.floor(c / 3) ? 'tl' : c % 3 ? 'l' : Math.floor(c / 3) ? 't' : false,
                highlighted: status.kind === 'winner' && status.seq.includes(c),
              })}
              onClick={() => dispatch(move(c))}
            >
              {cells[c]}
            </div>
          ))}
        </div>
        <div
          className={root('status', {
            active: status.kind !== 'turn',
          })}
          onClick={status.kind !== 'turn' ? () => dispatch(reset()) : undefined}
        >
          {status.kind === 'winner'
            ? `Winner: ${status.winner.toUpperCase()}`
            : status.kind === 'draw'
            ? 'Draw'
            : `Turn: ${status.player.toUpperCase()}`}
        </div>
      </div>
    </div>
  );
};

export default HotseatPage;
