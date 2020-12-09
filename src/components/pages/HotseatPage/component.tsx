import React, {FC} from 'react';
import {range} from 'lodash-es';
import {bem} from 'utils/bem';
import './styles.scss';

type Cell = null | 'x' | 'o';
const cells: Cell[] = range(0, 9).map(() => {
  const r = Math.random();
  return r < 0.33 ? 'x' : r < 0.66 ? 'o' : null;
});

const root = bem(module.id, 'HotseatPage');
const HotseatPage: FC = () => {
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
              })}
            >
              {cells[c]}
            </div>
          ))}
        </div>
        <div className={root('winner')}>Winner: X</div>
      </div>
    </div>
  );
};

export default HotseatPage;
