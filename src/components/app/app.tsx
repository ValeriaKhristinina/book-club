import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './app.scss';
import { getMeetingsAsync } from '../../store/meetings';
import { getMembersAsync } from '../../store/members';
import { AppRoute } from '../../const'
import PrivateRoute from '../private-route/private-route';
import MainPage from '../main-page/main-page';
import LoginPage from '../login-page/login-page';
import FormPage from '../form-page/form-page';
import NextMeetingPage from '../next-meeting-page/next-meeting-page';
import MeetingsPage from '../meetings-page/meetings-page';
import MemberPage from '../member-page/member-page';
import MembersPage from '../members-page/members-page';
import LoadingPage from '../loading-page/loading-page';
import ErrorPage from '../error-page/error-page';
import { getMeetingDataLoaded, getMembersDataLoaded } from '../../store/selectors';
import { checkAuthAsync } from '../../store/user';

function App(): JSX.Element {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMeetingsAsync())
    dispatch(getMembersAsync())
    dispatch(checkAuthAsync())
  }, [dispatch]);

  const isMeetingDataLoaded = useSelector(getMeetingDataLoaded)
  const isMembersDataLoaded = useSelector(getMembersDataLoaded)

  if (!isMeetingDataLoaded || !isMembersDataLoaded) {
    return (
      <LoadingPage />
    );
  }
  return (
    <section className="app">
      <Routes>
        <Route path={AppRoute.Root} element={<MainPage />} ></Route>
        <Route path={AppRoute.NewForm} element={
          <PrivateRoute>
            <FormPage />
          </PrivateRoute>
        } >
        </Route>
        <Route path={AppRoute.NextMeeting} element={<NextMeetingPage />} ></Route>
        <Route path={AppRoute.Member} element={<MemberPage />} ></Route>
        <Route path={AppRoute.Members} element={<MembersPage />} ></Route>
        <Route path={AppRoute.AllMeetings} element={<MeetingsPage />}></Route>
        <Route path={AppRoute.Login} element={<LoginPage />} ></Route>

        <Route path='*' element={<ErrorPage />}></Route>
      </Routes >
    </section>
  );
}

export default App;
