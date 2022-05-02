

import './members-page.scss';
import Page from '../page/page';
import { useSelector } from 'react-redux';
import { getChoosingMember, getCompletedMeetings, getAllMembers } from '../../store/selectors';
import CardWrapper from '../card-wrapper/card-wrapper';
import { Link } from 'react-router-dom';
import { checkVisitingParticipants, formatDate } from '../../utils/utils';
import { Member } from '../../types/member';



function MembersPage(): JSX.Element {
  const members = useSelector(getAllMembers)
  const meetings = useSelector(getCompletedMeetings);
  const choosingPerson = useSelector(getChoosingMember)

  const lastFourMeetings = meetings.slice(-4);
  const visitingParticipants = checkVisitingParticipants(lastFourMeetings, members);

  const addedClasses = (visitingMembers: any, choosingMember: any, member: Member) => {
    if (!choosingMember) {
      return ''
    }
    let newClasses = ''
    if (choosingMember.id === member.id) {
      newClasses = newClasses + 'members__member--active'
    }
    // if (visitingMembers[member.id] < 2 || visitingMembers[member.id] === undefined) {
    //   newClasses = newClasses + 'members__member--fade'
    // }
    if (member.exitDate != null) {
      newClasses = `${newClasses} members__member--fade`
    }
    return newClasses
  }

  return (
    <Page>
      <section className="members container">
        <h1 className="members__title title">BookClub's members</h1>

        <section className="members-wrapper">

          {members.map((member) => (
            <Link to={`/member/${member.id}`}>
              <CardWrapper key={member.id} additionalClass={`members__member ${addedClasses(visitingParticipants, choosingPerson, member)}`}>
                <section className="members__member">
                  <div className="title">{member.firstName} {member.lastName}</div>
                  <h2 className='subtitle'>Joined club: {formatDate(member.joinDate)}</h2>
                  {member.exitDate && (
                    <h2 className='subtitle'>Exit club: {formatDate(member.exitDate)}</h2>
                  )}

                  {!member.exitDate && (
                    <h2 className='subtitle'>Last four months was: {visitingParticipants[member.id] ? visitingParticipants[member.id] : '0'} times</h2>
                  )}
                </section>
              </CardWrapper>
            </Link>
          ))}
        </section>
      </section>
    </Page>
  )
}

export default MembersPage;