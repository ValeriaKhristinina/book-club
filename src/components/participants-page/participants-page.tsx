

import './participants-page.scss';
import Page from '../page/page';
import { useSelector } from 'react-redux';
import { getParticipants } from '../../store/selectors';



function ParticipantsPage(): JSX.Element {
  const members = useSelector(getParticipants)

  return (
    <Page>
      <section className="participants container">
        <h1 className="participants__title title">BookClub's members</h1>
        <ul>
          {members.map((member) => (
            <li>{member.firstName} {member.lastName}</li>
          ))}
        </ul>
      </section>
    </Page>
  )
}

export default ParticipantsPage;