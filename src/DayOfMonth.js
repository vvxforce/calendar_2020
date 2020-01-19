import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

const DayOfMonth = ({ month, setModalValue, events, currentYearAndMonth }) => {
  const handleDayClick = () => {
    setModalValue(true);
  };

  return month.map((day, i) => {
    const dayNow
      = new Date().toLocaleDateString()
      === new Date(
        currentYearAndMonth.year,
        currentYearAndMonth.month,
        day,
      ).toLocaleDateString();

    return (
      // eslint-disable-next-line max-len
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
      <div
        onClick={handleDayClick}
        className={cn({
          'day-cell': true,
          today: dayNow,
        })}
      >
        <div className="day-cell__number">{day}</div>
        <div>
          <ul className="event-list">
            {events
              .filter((item) => {
                const today = new Date(
                  currentYearAndMonth.year,
                  currentYearAndMonth.month + 1,
                  day,
                ).getTime();
                const tomorrow = new Date(
                  currentYearAndMonth.year,
                  currentYearAndMonth.month + 1,
                  day + 1,
                ).getTime();

                return (
                  (item.startAt >= today && item.startAt < tomorrow)
                  || (item.endAt >= today && item.endAt < tomorrow)
                );
              })
              .map(item => (
                <li className="event-item">{item.title}</li>
              ))}
          </ul>
        </div>
      </div>
    );
  });
};

DayOfMonth.propTypes = {
  month: PropTypes.number.isRequired,
  setModalValue: PropTypes.bool.isRequired,
  events: PropTypes.string.isRequired,
  currentYearAndMonth: PropTypes.number.isRequired,
};

export default DayOfMonth;
