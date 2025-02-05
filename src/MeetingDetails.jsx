import React, { useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom';
import { convertDateToTimezone } from './utils';
import { fetchAPI } from './services';
import Button from '@mui/material/Button';

const initialScheduledMeetingDate = {
  datetime: '',
  timezone: ''
}

const MeetingDetails = () => {
  const [scheduledMeetingDate, setScheduledMeetingDate] = React.useState(initialScheduledMeetingDate);
  useEffect(() => {
    fetchAPI.getScheduledMeetingDate()
      .then((date) => setScheduledMeetingDate(date))
      .catch((error) => console.error(error));
  }, []);

  const presentedDate = useMemo(() => convertDateToTimezone(scheduledMeetingDate.datetime, scheduledMeetingDate.timezone), [scheduledMeetingDate])

  const handleCancelMeeting = () => {
    fetchAPI.cancelScheduledMeeting();
    setScheduledMeetingDate(initialScheduledMeetingDate);
  };

  return (
    <div>
      <Link to="/" style={{ padding: 5 }}>
        Reschedule a meeting
      </Link>
      <h2>You scheduled a meeting on: {presentedDate}</h2>
      <Button variant="contained" onClick={handleCancelMeeting}>Cancel meeting</Button>
    </div>
  )
}

export default MeetingDetails
