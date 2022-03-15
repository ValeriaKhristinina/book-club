import { useDispatch, useSelector } from 'react-redux';
import { FormEvent, useState } from 'react';

import './next-meeting-page.scss';
import Page from '../page/page';
import { getChoosingMember, getNextMeeting, getMembers } from '../../store/selectors';
import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/utils';
import { completeMeeting } from '../../services/api';

function NextMeetingPage(): JSX.Element {
  const dispatch = useDispatch();
  const [isActive, setActive] = useState(false)
  const [checkedUser, setCheckedUsers] = useState<{ [key: string]: boolean }>({})
  const members = useSelector(getMembers)
  const nextMeeting = useSelector(getNextMeeting)
  const choosingPerson = useSelector(getChoosingMember)

  if (!nextMeeting) return <div>No next meeting</div>;

  const clickPlusHandler = () => {
    if (isActive) {
      setActive(false);
    } else {
      setActive(true)
    }
  }

  const checkedHandler = (evt: FormEvent<HTMLInputElement>, id: number) => {
    setCheckedUsers({
      ...checkedUser,
      [id]: evt.currentTarget.checked
    })
  }

  const onSave = () => {
    const meeting = {
      ...nextMeeting,
      persons: Object.keys(checkedUser).map(key => ({
        id: Number(key),
        rating: 1,
        isVisited: true
      })),
      isComplete: true,
    }
    dispatch(completeMeeting(meeting))
  }


  return (
    <Page>
      <section className="next-meeting container">
        <section className="next-meeting-block">
          <h3 className="next-meeting-block__title">Book</h3>
          <div className="next-meeting__book-title">{nextMeeting.title}</div>
          <span>by</span>
          <div className="next-meeting__book-author">{nextMeeting.author}</div>
        </section>

        <section className="next-meeting-block">
          <h3 className="next-meeting-block__title">Choosen By:</h3>
          <div className="next-meeting__member">
            <Link to={`/member/${choosingPerson?.id}`}>
              {`${choosingPerson?.firstName} ${choosingPerson?.lastName}`}
            </Link>
          </div>
        </section>

        <section className="next-meeting-block">
          <h3 className="next-meeting-block__title">Meeting Date:</h3>
          <div className="next-meeting__date">{formatDate(nextMeeting.date)}</div>
        </section>

        <section className="next-meeting-block">
          <h3 className="next-meeting-block__title">Add members:</h3>
          <div onClick={() => clickPlusHandler()} className="plus">+</div>
          {isActive && (
            <>
              <form className="members-form" action="">
                {members.map(member => (
                  <fieldset className="members-form__member" key={member.id}>
                    <div>
                      <input onChange={(evt) => { checkedHandler(evt, member.id) }} id={`${member.id}+${member.lastName}`} type="checkbox" />
                      <label htmlFor={`${member.id}+${member.lastName}`}>{member.firstName} {member.lastName}</label>
                    </div>
                    {/* {checkedUser[member.id] && (
                    <Rating />
                  )} */}
                  </fieldset>
                ))
                }
              </form>
              <button onClick={onSave} className="btn" type="submit">Submit and close meeting</button>
            </>
          )}
        </section>

      </section >
    </Page>
  )
}

export default NextMeetingPage;