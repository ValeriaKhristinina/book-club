import { useState } from 'react';
import './form-page.scss';

import Page from '../page/page';
import NewMeetingForm from '../new-meeting-form/new-meeting-form';
import NewMemberForm from '../new-member-form/new-member-form';

function NewFormPage(): JSX.Element {
  const [isActiveMeetingForm, setActiveMeetingForm] = useState(false);
  const [isActivememberForm, setActivememberForm] = useState(false);

  const clickActiveMeetingHandler = () => {
    if (isActiveMeetingForm) {
      setActiveMeetingForm(false)
      setActivememberForm(false)
    } else {
      setActiveMeetingForm(true)
      setActivememberForm(false)
    }
  }

  const clickActivememberHandler = () => {
    if (isActivememberForm) {
      setActivememberForm(false)
      setActiveMeetingForm(false)
    } else {
      setActivememberForm(true)
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
        <section className="new-member">
          {isActivememberForm && (
            <NewMemberForm />
          )
          }
          <button onClick={clickActivememberHandler} className={`btn ${isActivememberForm ? 'visually-hidden' : ''}`}>+ Create new member</button>
        </section>
      </section>
    </Page>
  )
}

export default NewFormPage;