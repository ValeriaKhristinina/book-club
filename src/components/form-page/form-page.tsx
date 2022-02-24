import { useState } from 'react';
import './form-page.scss';

import Page from '../page/page';
import NewMeetingForm from '../new-meeting-form/new-meeting-form';
import NewParticipantForm from '../new-participant-form/new-participant-form';

function NewFormPage(): JSX.Element {
  const [isActiveMeetingForm, setActiveMeetingForm] = useState(false);
  const [isActiveParticipantForm, setActiveParticipantForm] = useState(false);

  const clickActiveMeetingHandler = () => {
    if (isActiveMeetingForm) {
      setActiveMeetingForm(false)
      setActiveParticipantForm(false)
    } else {
      setActiveMeetingForm(true)
      setActiveParticipantForm(false)
    }
  }

  const clickActivePArticipantHandler = () => {
    if (isActiveParticipantForm) {
      setActiveParticipantForm(false)
      setActiveMeetingForm(false)
    } else {
      setActiveParticipantForm(true)
      setActiveMeetingForm(false)
    }
  }

  return (
    <Page>
      <section className="forms container">
        <section className="new-meeting">
          {isActiveMeetingForm && (
            <NewMeetingForm />
          )}
          <button onClick={clickActiveMeetingHandler} className={`btn ${isActiveMeetingForm ? 'visually-hidden' : ''}`}>+ Create new meeting</button>

        </section>
        <section className="new-participant">
          {isActiveParticipantForm && (
            <NewParticipantForm />
          )
          }
          <button onClick={clickActivePArticipantHandler} className={`btn ${isActiveParticipantForm ? 'visually-hidden' : ''}`}>+ Create new participant</button>
        </section>
      </section>
    </Page>
  )
}

export default NewFormPage;