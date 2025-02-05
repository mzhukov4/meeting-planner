import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import { fetchAPI } from './services';
import { convertDateToTimezone, getTimezoneOffset } from './utils';

const possibleTimeZones = ['UTC-3', 'UTC-2', 'UTC-1', 'UTC', 'UTC+1', 'UTC+2', 'UTC+3'];

const SchedulePage = () => {
  const [possibleTimeSlots, setPossibleTimeSlots] = React.useState([]);
  const [timezone, setTimezone] = React.useState(getTimezoneOffset(new Date()));
  const [timeslot, setTimeslot] = React.useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetchAPI.getTimeslots()
      .then((timeslots) => setPossibleTimeSlots(timeslots))
      .catch((error) => console.error(error));
  }, []);

  const handleChangeTimezone = (event) => {
    setTimezone(event.target.value);
  };

  const handleChangetTimeslot = (event) => {
    setTimeslot(event.target.value);
  };

  const handleScheduleMeeting = () => {
    fetchAPI.updateScheduledMeeting({
      datetime: timeslot,
      timezone
    })
    navigate('/details')
  }

  return (
    <>
      <Link to="/details" style={{ padding: 5 }}>
        Review Meeting details
      </Link>
      <div>
        <h2>Schedule a meeting</h2>
        <h3>Choose a prefered time zone</h3>
        <FormControl sx={{ m: 1, minWidth: 150 }}>
          <InputLabel id="timezone-label">Timezone</InputLabel>
          <Select
            labelId="timezone-label"
            id="timezone-select"
            value={timezone}
            onChange={handleChangeTimezone}
            label="Timezone"
          >
            {possibleTimeZones.map((timezone, index) => (
              <MenuItem key={index} value={timezone}>{timezone}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <h3>Choose an appropriate time slot</h3>
        <FormControl sx={{ m: 1, minWidth: 250 }}>
          <InputLabel id="timeslot-label">Timeslot</InputLabel>
          <Select
            labelId="timeslot-label"
            id="timeslot-select"
            value={timeslot}
            onChange={handleChangetTimeslot}
            label="Timeslot"
          >
            {possibleTimeSlots.map(({ datetime, id }) => (
              <MenuItem key={id} value={datetime}>{convertDateToTimezone(datetime, timezone)}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <Button className='schedule-btn' variant="contained" onClick={handleScheduleMeeting}>Schedule</Button>
      </div>
    </>
  )
}

export default SchedulePage
