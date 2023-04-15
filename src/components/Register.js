import { Link, useNavigate } from 'react-router-dom';
import { register } from '../utils/auth.js'
import { useState, useRef} from 'react';
import InfoTooltip from './InfoTooltip.js'

export default function Register () {
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false),
        [isRegistred, setIsRegistred] = useState(false),
        emailRef = useRef(),
        passwordRef = useRef(),
        navigate = useNavigate();

  //Открыть уведомление
  function openInfoTooltip() {
    setIsInfoPopupOpen(true);
  }

  //Закрыть уведомление
  function closeInfoTooltip() {
    setIsInfoPopupOpen(false);
    isRegistred && navigate('/sign-in', {replace: true});
  }

  //Обработчик отправки формы
  function handleSubmit (evt) {
    evt.preventDefault();
    const email = emailRef.current.value,
          password = passwordRef.current.value;

    register(email, password)
      .then(() => { setIsRegistred(true) })
      .catch(() => { setIsRegistred(false) })
      .finally(() => { openInfoTooltip() })
  }

  return (
    <>
      <form className="auth-form" onSubmit={handleSubmit}>
        <h3 className="auth-form__title">Регистрация</h3>
        <input required id="email" placeholder="Email" type="email" name="email" className="auth-form__input" ref={emailRef} />
        <input required id="password" placeholder="Пароль" type="password" name="password" className="auth-form__input" ref={passwordRef} />
        <button type="submit" className="auth-form__submit-btn button-opacity">Зарегистрироваться</button>
        <Link to="/sign-in" className="auth-form__link opacity">Уже зарегистрированы? Войти</Link>
      </form>

      <InfoTooltip 
          isRegistred={isRegistred}
          isOpen={isInfoPopupOpen}
          onClose={closeInfoTooltip} />
    </> 
  );
}