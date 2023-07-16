import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { userContext } from './userContext';

export default function Header() {
  const { setUserInfo, userInfo } = useContext(userContext);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, [setUserInfo]);

  useEffect(() => {
    if (userInfo) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } else {
      localStorage.removeItem('userInfo');
    }
  }, [userInfo]);

  function logout() {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    })
    .then(() => {
      setUserInfo(null);
    })
    .catch(error => {
      console.log('Logout failed:', error);
    });
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to='/' className='logo'>Blog</Link>

      <nav>
        {username && (
          <>
            <Link to='/create'>Create new post</Link>
            <a onClick={logout}>Logout({username})</a>
          </>
        )}

        {!username && (
          <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </>
        )}
      </nav>
    </header>
  )
}
