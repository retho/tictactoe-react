import React, {FC} from 'react';
import bem from 'utils/bem';
import logo from './assets/logo.svg';
import './styles.scss';

const root = bem('App');
const App: FC = () => {
  return (
    <div className={root()}>
      <header className={root('header')}>
        <img src={logo} className={root('logo')} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className={root('link')}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
