import { Routes, Route } from 'react-router-dom';

import './app.css';
import { AppRoute } from '../../const'

import Header from '../header/header';
import MainPage from '../main-page/main-page'
import NewMeetingPage from '../new-meeting-page/new-meeting-page';
import MeetingPage from '../meeting-page/meeting-page';

function App(): JSX.Element {
  return (
    <>
      <Header />
      <Routes>
        <Route path={AppRoute.Root} element={<MainPage />} ></Route>
        <Route path={AppRoute.NewMeeting} element={<NewMeetingPage />} ></Route>
        <Route path={AppRoute.Meeting} element={<MeetingPage />} ></Route>
      </Routes >
    </>
  );
}

export default App;
