/** @format */

/** @format */
import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { auth, firestore } from '../lib/firebase';
import { isValidEmail } from '../helper/utility';
import { AuthContext } from '../context/authcontext';
import { AiFillEye as EyeIcon } from 'react-icons/ai';
import { AiFillEyeInvisible as EyeInvisibleIcon } from 'react-icons/ai';
import { ImSpinner3 as SpinnerIcon } from 'react-icons/im';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(true);

  const { user, signUp } = useContext(AuthContext);
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
      const userQuery = query(
        collection(firestore, 'users'),
        where('username', '==', username),
      );

      const user = await getDocs(userQuery);
      if (!user.empty) {
        setErrorMsg('this username is already taken');
        setFormLoading(false);
      }
      if (user.empty) {
        const user = await signUp(email, password, username, fullname);
       if ( user ) {
          setEmail('');
          setPassword('');
          setFullname('')
          setUsername('')
          setFormLoading(false);
          navigate('/');
        }
        else{
          setEmail('');
          setPassword('');
          setFullname('')
          setUsername('')
          setFormLoading(false);
          setErrorMsg('email is already register')


        }
      }
     
    }
  };

  useEffect(() => {
    setDisabled(!(email.length > 0 && password.length > 0));
  }, [email, password]);

  return (
    <div className='container flex mx-auto max-w-screen-md items-center h-screen'>
      <div className='flex w-3/5'>
        <img
          src='/images/iphone-with-profile.jpg'
          alt='iPhone with Instagram app'
        />
      </div>
      <div className='flex flex-col w-2/5'>
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
              className='text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border bg-gray-primary mb-2'
              onChange={({ target }) => setEmail(target.value)}
              value={email}
            />
            <div className=''>
              <div className='relative'>
                <input
                  type={showPassword ? 'password' : 'text'}
                  className='text-xs p-2 border-[1px] rounded bg-gray-200/10 w-full border-gray-300 mb-2'
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
            <input
              aria-label='Enter your fullname'
              type='text'
              placeholder='fullname'
              className='text-xs p-2 border-[1px] rounded  w-full border-gray-300 mb-2'
              onChange={({ target }) => setFullname(target.value)}
              value={fullname}
              required
            />

            <input
              aria-label='Enter your username'
              type='text'
              placeholder='username'
              className='text-xs p-2 border-[1px] rounded  w-full border-gray-300 mb-2'
              onChange={({ target }) => setUsername(target.value)}
              value={username}
              required
            />

            <button
              disabled={isInvalid}
              type='submit'
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold
          ${isInvalid && 'opacity-50'}`}
            >
              {formLoading ? (
                <SpinnerIcon className='w-3 h-3 animate-spin my-1 mx-auto' />
              ) : (
                'Create account'
              )}
            </button>
          </form>
        </div>
        <div className='flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary'>
          <p className='text-sm'>
            Do have an account?{' '}
            <Link to={ROUTES.LOGIN} className='font-bold text-blue-medium'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
