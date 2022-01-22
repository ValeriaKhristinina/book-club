import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './app.css';
import { getMeetingsAsync } from '../../store/meetings';
import { getParticipantsAsync } from '../../store/participants';
import { AppRoute } from '../../const'
import Header from '../header/header';
import Footer from '../footer/footer';
import MainPage from '../main-page/main-page'
import NewMeetingPage from '../new-meeting-page/new-meeting-page';
import MeetingPage from '../meeting-page/meeting-page';
import MeetingsPage from '../meetings-page/meetings-page';
import ParticipantPage from '../participant-page/participant-page';
import LoadingPage from '../loading-page/loading-page';
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
      <Header />
      <Routes>
        <Route path={AppRoute.Root} element={<MainPage />} ></Route>
        <Route path={AppRoute.NewMeeting} element={<NewMeetingPage />} ></Route>
        <Route path={AppRoute.NextMeeting} element={<MeetingPage />} ></Route>
        <Route path={AppRoute.Participant} element={<ParticipantPage />} ></Route>
        <Route path={AppRoute.AllMeetings} element={<MeetingsPage />}></Route>
      </Routes >
      <Footer />
    </section>
  );
}

export default App;
