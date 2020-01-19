import React, { useState } from 'react';
import { Button, Modal, Image, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const ModalWindow = ({ open, setModalValue, addNewEvent }) => {
  const [textInput, setTextInput] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [fromTime, setFromTime] = useState('');
  const [toDate, setToDate] = useState('');
  const [toTime, setToTime] = useState('');
  const handleForm = (event) => {
    event.preventDefault();
    setModalValue(false);
    const dayFrom = fromDate.split('-');
    const timeFrom = fromTime.split(':');
    const dayTo = toDate.split('-');
    const timeTo = toTime.split(':');
    const ev = {
      id: new Date().getTime(),
      title: textInput,
      startAt: new Date(
        +dayFrom[0],
        +dayFrom[1],
        +dayFrom[2],
        +timeFrom[0],
        +timeFrom[1],
      ).getTime(),
      endAt: new Date(
        +dayTo[0],
        +dayTo[1],
        +dayTo[2],
        +timeTo[0],
        +timeTo[1],
      ).getTime(),
    };

    addNewEvent(ev);
    setTextInput('');
  };

  return (
    <Modal
      trigger={<Button onClick={() => setModalValue(true)}>Add event</Button>}
      onClose={() => setModalValue(false)}
      open={open}
    >
      <Modal.Header>Add event</Modal.Header>
      <Modal.Content image>
        <Image
          wrapped
          size="medium"
          // eslint-disable-next-line max-len
          src="https://cdn1.iconfinder.com/data/icons/christmas-icostory-black-and-white/64/calendar-time-scheduler-schedule-512.png"
        />
        <form onSubmit={event => handleForm(event)}>
          <label>
            Event title:
            {' '}
            <Input
              value={textInput}
              type="text"
              onChange={e => setTextInput(e.target.value)}
              class="ui input"
            />
          </label>
          <br />
          <label>
            From:
            {' '}
            <Input
              className="input"
              type="date"
              onChange={e => setFromDate(e.target.value)}
            />
          </label>
          {' '}
          <Input
            className="input"
            type="time"
            onChange={e => setFromTime(e.target.value)}
          />
          <br />
          <label>
            To:
            {' '}
            <Input
              className="input"
              type="date"
              onChange={e => setToDate(e.target.value)}
            />
          </label>
          {' '}
          <Input
            className="input"
            type="time"
            onChange={e => setToTime(e.target.value)}
          />
          <br />
          <button type="submit" className="ui button form">
            Add event
          </button>
        </form>
      </Modal.Content>
    </Modal>
  );
};

ModalWindow.propTypes = {
  open: PropTypes.bool.isRequired,
  setModalValue: PropTypes.bool.isRequired,
  addNewEvent: PropTypes.func.isRequired,
};

export default ModalWindow;
