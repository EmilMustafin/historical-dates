import { HistoricalDates } from '@/shared/constants/types';
import s from './dates-spinner.module.css';
interface HistoricalDatesSpinnerProps {
  historicDates: HistoricalDates[];
  currentEvent: number;
  navigateToEvent: (index: number) => void;
  totalHistoricDates: number;
  angle: number;
  timeOfRotation: number;
  eventsCircleRef: React.RefObject<HTMLDivElement>;
}
export const DatesSpinner: React.FC<HistoricalDatesSpinnerProps> = ({
  historicDates,
  currentEvent,
  navigateToEvent,
  totalHistoricDates,
  angle,
  timeOfRotation,
  eventsCircleRef,
}) => (
  <div className={`${s.event_spinner} ${s.spinner}`}>
    <div
      ref={eventsCircleRef}
      className={s.spinner__mainCircle}
      style={
        {
          '--count': totalHistoricDates,
          '--angle': `${angle}deg`,
          '--time': `${timeOfRotation}ms`,
          '--delay': `${timeOfRotation + 300}ms`,
        } as React.CSSProperties
      }
    >
      {historicDates.map((item, index) => {
        const { title } = item;
        const idx = index + 1;
        return (
          <div
            key={index}
            className={`${s.spinner__shoulder} ${currentEvent === index ? s.spinner__shoulder_active : ''}`}
            style={{ '--i': idx } as React.CSSProperties}
            onClick={() => navigateToEvent(index)}
          >
            <div className={s.spinner__circleArea}>
              <p className={s.spinner__circle}>
                {idx}
                <span className={s.spinner__title}>{title}</span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
