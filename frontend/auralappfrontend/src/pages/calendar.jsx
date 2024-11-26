import React, { useEffect } from 'react';
import { InlineWidget } from "react-calendly";

const Calendar = () => {
  return (
    <div className="App">
      <InlineWidget url="https://calendly.com/aviiciii" />
    </div>
  );
};
export default Calendar;
