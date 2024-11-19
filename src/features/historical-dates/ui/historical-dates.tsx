import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ControlsButton } from '@/features/historical-dates/controls-button/controls-button';
import { HistoricalDates } from '@/shared/constants/types';
import { DatesSpinner } from '@/shared/ui/dates-spinner/ui/dates-spinner';
import { Slider } from '@/shared/ui/slider/slider';
import { DateRange } from '../date-range/date-range';
import { EventControlButtons } from '../events-controls-button/events-controls-button';

interface HistoricalDatesProps {
  data: HistoricalDates[];
}

export const HistoryDates = ({ data: historicDates }: HistoricalDatesProps) => {
  const [startEventDate, setStartDate] = useState<number>(
    Number(historicDates[0].episodes[0].date),
  );
  const [endEventDate, setEndEventDate] = useState<number>(
    Number(historicDates[0].episodes[historicDates.length - 1].date),
  );

  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const eventsCircleRef = useRef<HTMLDivElement>(null);
  const startDateRef = useRef<HTMLDivElement>(null);
  const endDateRef = useRef<HTMLDivElement>(null);

  const totalHistoricDates = historicDates.length;
  const angleSpacingBetweenDates = 360 / totalHistoricDates;
  const initialRotationTime = 300;

  const [angle, setAngle] = useState<number>(angleSpacingBetweenDates);
  const [currentEvent, setCurrentEvent] = useState<number>(0);
  const [timeOfRotation, setTimeOfRotation] = useState<number>(initialRotationTime);

  useEffect(() => {
    const timer = setTimeout(() => {
      sliderContainerRef.current?.classList.add('slider_show');
    }, 300);
    return () => clearTimeout(timer);
  }, [currentEvent]);

  function fadeOutAndExecute(callback: () => void): void {
    sliderContainerRef.current?.classList.remove('slider_show');
    if (typeof callback === 'function') {
      setTimeout(callback, 300);
    }
  }

  function formatEventIndex(totalCount: number, currentIndex: number): string {
    const formattedIndex = String(currentIndex + 1).padStart(2, '0');
    const formattedTotal = String(totalCount).padStart(2, '0');
    return `${formattedIndex}/${formattedTotal}`;
  }

  function loadPrev(): void {
    if (currentEvent > 0) {
      navigateToEvent(currentEvent - 1);
    }
  }

  function loadNext(): void {
    const totalEvents = historicDates.length;
    if (currentEvent < totalEvents - 1) {
      navigateToEvent(currentEvent + 1);
    }
  }

  function updateDateRangeAnimation(index: number): void {
    if (index < 0 || index >= historicDates.length) {
      // eslint-disable-next-line no-console
      console.warn('Index out of bounds for historicDates');
      return;
    }

    const { episodes } = historicDates[index];
    const newStartDate = Number(episodes[0].date);
    const newEndDate = Number(episodes[episodes.length - 1].date);

    const startDateDelta = newStartDate - startEventDate;
    const endDateDelta = newEndDate - endEventDate;
    const animationDuration = (timeOfRotation + 300) / 1000;

    animateDateChange(
      startDateRef.current,
      startDateDelta,
      setStartDate,
      newStartDate,
      animationDuration,
    );
    animateDateChange(
      endDateRef.current,
      endDateDelta,
      setEndEventDate,
      newEndDate,
      animationDuration,
    );
  }

  function animateDateChange(
    ref: HTMLDivElement | null,
    delta: number,
    setDate: React.Dispatch<React.SetStateAction<number>>,
    newDate: number,
    duration: number,
  ) {
    if (ref) {
      gsap.to(ref, {
        duration: duration,
        textContent: `+=${delta}`,
        roundProps: 'textContent',
        ease: 'none',
        onUpdate: () => setDate(newDate),
      });
    }
  }

  function navigateToEvent(index: number): void {
    updateDateRangeAnimation(index);
    highlightActiveEvent(index);
    const targetAngle = calculateTargetAngle(index);

    setRotationDuration(index);
    animateAngleChange(targetAngle);

    fadeOutAndExecute(() => setCurrentEvent(index));
  }

  function highlightActiveEvent(index: number): void {
    eventsCircleRef.current?.children[index].classList.add('spinner__shoulder_active');
  }

  function calculateTargetAngle(index: number): number {
    return angleSpacingBetweenDates - index * angleSpacingBetweenDates;
  }

  function setRotationDuration(index: number): void {
    const duration = Math.abs(currentEvent - index) * initialRotationTime;
    setTimeOfRotation(duration);
  }

  function animateAngleChange(targetAngle: number): void {
    const update = () => {
      setAngle(targetAngle);
    };
    requestAnimationFrame(update);
  }
  return (
    <>
      <DateRange
        startEventDate={startEventDate}
        endEventDate={endEventDate}
        startDateRef={startDateRef}
        endDateRef={endDateRef}
      />
      <DatesSpinner
        historicDates={historicDates}
        currentEvent={currentEvent}
        navigateToEvent={navigateToEvent}
        totalHistoricDates={totalHistoricDates}
        angle={angle}
        timeOfRotation={timeOfRotation}
        eventsCircleRef={eventsCircleRef}
      />
      <ControlsButton
        totalHistoricDates={totalHistoricDates}
        currentEvent={currentEvent}
        formatEventIndex={formatEventIndex}
        loadPrev={loadPrev}
        loadNext={loadNext}
      />
      <Slider
        historicDates={historicDates}
        currentEvent={currentEvent}
        sliderContainerRef={sliderContainerRef}
      />
      <EventControlButtons
        historicDates={historicDates}
        currentEvent={currentEvent}
        navigateToEvent={navigateToEvent}
      />
    </>
  );
};
