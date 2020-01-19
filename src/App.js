import React, { useState, useEffect } from 'react';
import ModalWindow from './ModalWindow';
import DayOfMonth from './DayOfMonth';
import './App.css';

const months = {
  0: 'January',
  1: 'February',
  2: 'March',
  3: 'April',
  4: 'May',
  5: 'June',
  6: 'July',
  7: 'August',
  8: 'September',
  9: 'October',
  10: 'November',
  11: 'December',
};

const App = () => {
  const [currentYearAndMonth, setCurrentYearAndMonth] = useState({
    year: 2020,
    month: 0,
  });
  const [modalValue, setModalValue] = useState(false);
  const [events, setEvents] = useState(
    JSON.parse(localStorage.getItem('events')) || [],
  );
  const addNewEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const getMonthTable = () => {
    const daysInMonth = new Date(
      currentYearAndMonth.year,
      currentYearAndMonth.month + 1,
      0,
    ).getDate();
    const firstDayOfMonth = new Date(
      currentYearAndMonth.year,
      currentYearAndMonth.month,
    ).getDay();
    const curMonth = Array.from(Array(daysInMonth), (it, i) => i + 1);

    curMonth.unshift(...Array.from(Array(firstDayOfMonth)));

    return curMonth;
  };

  const changeCurrentMonth = (n) => {
    const current = new Date(
      currentYearAndMonth.year,
      currentYearAndMonth.month + n,
    );

    setCurrentYearAndMonth({
      year: current.getFullYear(),
      month: current.getMonth(),
    });
  };

  const returnToCurrentDay = () => {
    const current = new Date();

    setCurrentYearAndMonth({
      year: current.getFullYear(),
      month: current.getMonth(),
    });
  };

  useEffect(() => {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();

    setCurrentYearAndMonth({
      year,
      month,
    });
  }, []);
  useEffect(() => localStorage.setItem('events', JSON.stringify(events)));

  return (
    <div className="container">
      <section className="current-day">
        <h1>
          {months[currentYearAndMonth.month]}
,
          {currentYearAndMonth.year}
        </h1>
        <button
          className="ui button"
          type="button"
          onClick={() => changeCurrentMonth(-1)}
        >
          Prev
        </button>
        <button
          className="ui button"
          type="button"
          onClick={() => changeCurrentMonth(1)}
        >
          Next
        </button>
      </section>
      <section className="options">
        <button
          className="ui button"
          type="button"
          onClick={returnToCurrentDay}
        >
          Today
        </button>
        <ModalWindow
          open={modalValue}
          setModalValue={setModalValue}
          addNewEvent={addNewEvent}
        />
      </section>
      <table>
        <tr className="box">
          <th className="box__title">Su</th>
          <th className="box__title">Mo</th>
          <th className="box__title">Tu</th>
          <th className="box__title">We</th>
          <th className="box__title">Th</th>
          <th className="box__title">Fr</th>
          <th className="box__title">Sa</th>
          <DayOfMonth
            month={getMonthTable()}
            setModalValue={setModalValue}
            events={events}
            currentYearAndMonth={currentYearAndMonth}
          />
        </tr>
      </table>
    </div>
  );
};

export default App;
