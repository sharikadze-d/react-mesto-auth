import { authorize, getUserData } from '../utils/auth.js';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login ({ handleLogIn }) {
  const emailRef = useRef(),
        passwordRef = useRef(),
        navigate = useNavigate();

  //Обработчик отправки формы
  function handleSubmit(evt) {
    evt.preventDefault();
    const email = emailRef.current.value,
          password = passwordRef.current.value;

    authorize(email, password)
      .then((res) => { 
        localStorage.setItem('jwt', res.token);
        getUserData(res.token)
          .then((res) => {
            handleLogIn(res.data.email);
            navigate('/');
          })
       })
      .catch(err => { new Error(err) })
  }

  return (
      <form className="auth-form" onSubmit={handleSubmit}>
        <h3 className="auth-form__title">Вход</h3>
        <input required id="email" placeholder="Email" type="email" name="email" className="auth-form__input" ref={emailRef} />
        <input required id="password" placeholder="Пароль" type="password" name="password" className="auth-form__input" ref={passwordRef} />
        <button type="submit" className="auth-form__submit-btn button-opacity">Войти</button>
      </form>
  );
}