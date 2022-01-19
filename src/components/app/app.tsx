import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import './app.css';
import { AppRoute } from '../../const'
import Header from '../header/header';
import MainPage from '../main-page/main-page'
import NewMeetingPage from '../new-meeting-page/new-meeting-page';
import MeetingPage from '../meeting-page/meeting-page';
import ParticipantPage from '../participant-page/participant-page';
import { useDispatch } from 'react-redux';
import { getMeetingsAsync } from '../../store/meetings';
import { getParticipantsAsync } from '../../store/participants';



function App(): JSX.Element {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMeetingsAsync())
    dispatch(getParticipantsAsync())
  }, [dispatch]);
  return (
    <>
      <Header />
      <Routes>
        <Route path={AppRoute.Root} element={<MainPage />} ></Route>
        <Route path={AppRoute.NewMeeting} element={<NewMeetingPage />} ></Route>
        <Route path={AppRoute.Meeting} element={<MeetingPage />} ></Route>
        <Route path={AppRoute.Participant} element={<ParticipantPage />} ></Route>
      </Routes >
    </>
  );
}

export default App;
