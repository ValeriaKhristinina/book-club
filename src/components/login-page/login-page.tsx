import { FormEvent, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import './login-page.css';

function LoginPage(): JSX.Element {
  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    console.log(loginRef.current?.value, passwordRef.current?.value)

  }

  return (
    <section className="login-page container">
      <form onSubmit={handleSubmit} className='login-form' action="">
        <legend className='login-form__title'>Please, sign in</legend>
        <fieldset className='login-form-group'>
          <input ref={loginRef} id="login-email" type="email" placeholder="Email" required />
          <input ref={passwordRef} id="login-password" type="password" placeholder="Password" required />
        </fieldset>
        <button className='btn' type='submit'>Submit</button>
      </form>

      <p>or go to <Link to={AppRoute.Root}>Home page</Link></p>
    </section>
  )
}

export default LoginPage