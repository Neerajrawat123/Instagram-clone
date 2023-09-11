/** @format */

import React, { lazy,Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes';
import Loader from './components/loader';

const Dashboard = lazy(() => import('./pages/dashboard'));
const SignUp = lazy(() => import('./pages/sign-up'));
const SignIn = lazy(() => import('./pages/sign-in'));
const Profile = lazy(() => import('./pages/profile'));
const NotFound = lazy(() => import('./pages/not-found'));
const Reels = lazy(()=> import('./pages/reels'))
const Explore = lazy(()=> import('./pages/explore'))
const Post = lazy(()=> import('./pages/post'))



function App() {
  return (
    <BrowserRouter>
    <Suspense fallback = {<Loader />}>

      <Routes>
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
        <Route path={ROUTES.LOGIN} element={<SignIn />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
        <Route path={ROUTES.EXPLORE} element={<Explore />} />
        <Route path={ROUTES.REELS} element={<Reels />} />
        <Route path={ROUTES.POST} element={<Post />} />




        <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </Suspense>
    </BrowserRouter>
  );
}

export default App;
