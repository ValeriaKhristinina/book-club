import { Routes, Route } from 'react-router-dom';

import './app.css';
import { AppRoute } from '../../const'

import Header from '../header/header';
import MainPage from '../main-page/main-page'
import NewMeetingPage from '../new-meeting-page/new-meeting-page';
import NextMeetingPage from '../next-meeting-page/next-meeting-page';

function App(): JSX.Element {
  return (
    <>
      <Header />
      <Routes>
        <Route path={AppRoute.Root} element={<MainPage />} ></Route>
        <Route path={AppRoute.NewMeeting} element={<NewMeetingPage />} ></Route>
        <Route path={AppRoute.NextMeeting} element={<NextMeetingPage />} ></Route>
      </Routes >
    </>
  );
}

export default App;
