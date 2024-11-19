import { RefObject } from 'react';

import './date-range.css';

interface DateRangeProps {
  startEventDate: number;
  endEventDate: number;
  startDateRef: RefObject<HTMLParagraphElement>;
  endDateRef: RefObject<HTMLParagraphElement>;
}

export const DateRange = ({
  startEventDate,
  endEventDate,
  startDateRef,
  endDateRef,
}: DateRangeProps) => (
  <div className='historic-dates date-range range'>
    <p className='range start' ref={startDateRef}>
      {startEventDate}
    </p>
    <p className='range end' ref={endDateRef}>
      {endEventDate}
    </p>
  </div>
);
