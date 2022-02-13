import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './app.css';
import { getMeetingsAsync } from '../../store/meetings';
import { getParticipantsAsync } from '../../store/participants';
import { AppRoute } from '../../const'
import MainPage from '../main-page/main-page';
import LoginPage from '../login-page/login-page';
import FormPage from '../form-page/form-page';
import NextMeetingPage from '../next-meeting-page/next-meeting-page';
import MeetingsPage from '../meetings-page/meetings-page';
import ParticipantPage from '../participant-page/participant-page';
import LoadingPage from '../loading-page/loading-page';
import ErrorPage from '../error-page/error-page';
import { getMeetingDataLoaded, getParticipantsDataLoaded } from '../../store/selectors';

function App(): JSX.Element {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMeetingsAsync())
    dispatch(getParticipantsAsync())
  }, [dispatch]);

  const isMeetingDataLoaded = useSelector(getMeetingDataLoaded)
  const isParticipantsDataLoaded = useSelector(getParticipantsDataLoaded)

  if (!isMeetingDataLoaded || !isParticipantsDataLoaded) {
    return (
      <LoadingPage />
    );
  }
  return (
    <section className="app">
      <Routes>
        <Route path={AppRoute.Root} element={<MainPage />} ></Route>
        <Route path={AppRoute.NewForm} element={<FormPage />} ></Route>
        <Route path={AppRoute.NextMeeting} element={<NextMeetingPage />} ></Route>
        <Route path={AppRoute.Participant} element={<ParticipantPage />} ></Route>
        <Route path={AppRoute.AllMeetings} element={<MeetingsPage />}></Route>
        <Route path={AppRoute.Login} element={<LoginPage />} ></Route>
        <Route path='*' element={<ErrorPage />}></Route>
      </Routes >
    </section>
  );
}

export default App;
