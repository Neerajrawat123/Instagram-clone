/** @format */
import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { isValidEmail } from '../helper/utility';
import { AuthContext } from '../context/authcontext';
import { AiFillEye as EyeIcon } from 'react-icons/ai';
import { AiFillEyeInvisible as EyeInvisibleIcon } from 'react-icons/ai';
import { ImSpinner3 as SpinnerIcon } from 'react-icons/im';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(true);

  const {login } = useContext(AuthContext);
  const navigate = useNavigate();

  const isInvalid = email === '' || password === '';
  const showError = (error) => {
    setErrorMsg(error);
    setTimeout(() => {
      setErrorMsg('');
    }, 3000);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      showError('Invalid email address');
    } else if (password.length < 6) {
      showError('Password must be at least 6 characters');
    }
    if (isValidEmail(email) && password.length > 6) {
      setFormLoading(true);
      const user = await login(email, password);
      if (user) {
        setEmail('');
        setPassword('');
        setFormLoading(false);
        navigate('/');
      }
      if (!user) {
        showError(
          'Sorry, your password was incorrect. Please double-check your password.',
        );
      }
    }
  };

  useEffect(() => {
    setDisabled(!(email.length > 0 && password.length > 0));
  }, [email, password]);

  return (
    <div className='container flex mx-auto max-w-screen-md items-center h-screen'>
      <div className='flex w-3/5 hidden sm:block'>
        <img
          src='/images/iphone-with-profile.jpg'
          alt='iPhone with Instagram app'
        />
      </div>
      <div className='flex flex-col w-full sm:w-2/5 p-4'>
        <div className='flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded'>
          <h1 className='flex justify-center w-full'>
            <img
              src='/images/logo.png'
              alt='Instagram'
              className='mt-2 w-6/12 mb-4'
            />
          </h1>

          {errorMsg && (
            <p className='mb-4 text-xs text-red-primary'>{errorMsg}</p>
          )}

          <form onSubmit={submitForm} method='POST'>
            <input
              aria-label='Enter your email address'
              type='text'
              placeholder='Email address'
              className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2'
              onChange={({ target }) => setEmail(target.value)}
              value={email}
            />
            <div className=''>
              <div className='relative'>
                <input
                  type={showPassword ? 'password' : 'text'}
                  className='text-xs p-2  rounded border border-gray-primary bg-gray-200/10 w-full border-gray-300 mb-2'
                  placeholder='Password'
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                {password.length > 0 && (
                  <div className='absolute top-0 right-2 h-full flex items-center'>
                    <button
                      className='cursor-pointer text-slate-800'
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeIcon /> : <EyeInvisibleIcon />}
                    </button>
                  </div>
                )}
              </div>
            </div>

            <button
              disabled={isInvalid}
              type='submit'
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold
          ${isInvalid && 'opacity-50'}`}
            >
              {formLoading ? (
                <SpinnerIcon className='w-3 h-3 animate-spin my-1 mx-auto' />
              ) : (
                'login'
              )}
            </button>
          </form>
        </div>
        <div className='flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary'>
          <p className='text-sm'>
            Don't have an account?{' '}
            <Link to={ROUTES.SIGN_UP} className='font-bold text-blue-medium'>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
