import React, {FC, useState} from 'react';
import {useDispatch} from 'utils/redux';
import {bem} from 'utils/bem';
import './styles.scss';
import {login} from 'store/slices/auth';

const root = bem(module.id, 'AuthPage');
const AuthPage: FC = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      dispatch(login(username));
    }
  };
  return (
    <div className={root()}>
      <section>
        <label>Login as:&nbsp;</label>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </section>
    </div>
  );
};

export default AuthPage;
