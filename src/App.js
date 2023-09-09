/** @format */

import React, { lazy,Suspense,useContext} from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import Loader from './components/loader';
import {AuthContext} from './context/authcontext'

const Dashboard = lazy(() => import('./pages/dashboard'));
const SignUp = lazy(() => import('./pages/sign-up'));
const SignIn = lazy(() => import('./pages/login'));
const Profile = lazy(() => import('./pages/profile'));
const NotFound = lazy(() => import('./pages/not-found'));
const Explore = lazy(()=> import('./pages/explore'))
const Post = lazy(()=> import('./pages/post'))



function App() {

  const RequirePath = ({children}) => {
    const {user} = useContext(AuthContext)
    return user ? children : <Navigate to={'/login'} replace/>

  }
  return (
    <BrowserRouter>
    <Suspense fallback = {<Loader />}>

      <Routes>
        <Route path={ROUTES.DASHBOARD} element={<RequirePath> <Dashboard /> </RequirePath>} />
        <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
        <Route path={ROUTES.LOGIN} element={<SignIn />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
        <Route path={ROUTES.EXPLORE} element={<RequirePath>
          <Explore />
        </RequirePath>} />
        <Route path={ROUTES.POST} element={<Post />} />




        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </Suspense>
    </BrowserRouter>
  );
}

export default App;
