import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../store/store';
import { loginAsync } from '../../store/user';
import './login-page.scss';

function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  let navigate = useNavigate();

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    try {
      await dispatch(loginAsync({
        userEmail: email,
        userPassword: password
      })).unwrap()
      navigate(AppRoute.Root)
    } catch (rejectedValueOrSerializedError) {
      alert('Please, login')
    }
  }

  return (
    <section className="login-page container">
      <form onSubmit={handleSubmit} className='login-form' action="">
        <legend className='login-form__title'>Please, sign in</legend>
        <fieldset className='login-form-group'>
          <input onChange={(e) => { setEmail(e.currentTarget.value) }} id="login-email" type="email" placeholder="Email" required />
          <input onChange={(e) => { setPassword(e.currentTarget.value) }} id="login-password" type="password" placeholder="Password" required />
        </fieldset>
        <button className='btn' type='submit'>Submit</button>
      </form>

      <p>or go to <Link to={AppRoute.Root}>Home page</Link></p>
    </section>
  )
}

export default LoginPage
