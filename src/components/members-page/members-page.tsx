

import './members-page.scss';
import Page from '../page/page';
import { useSelector } from 'react-redux';
import { getMembers } from '../../store/selectors';



function MembersPage(): JSX.Element {
  const members = useSelector(getMembers)

  return (
    <Page>
      <section className="members container">
        <h1 className="members__title title">BookClub's members</h1>
        <ul>
          {members.map((member) => (
            <li key={member.id}>{member.firstName} {member.lastName}</li>
          ))}
        </ul>
      </section>
    </Page>
  )
}

export default MembersPage;