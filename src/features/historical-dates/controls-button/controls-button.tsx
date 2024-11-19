import s from './controls-button.module.css';
import { Button } from '../../../shared/ui/button/ui/button';
interface NavigationControlsProps {
  totalHistoricDates: number;
  currentEvent: number;
  loadPrev: () => void;
  loadNext: () => void;
  formatEventIndex: (totalCount: number, currentIndex: number) => string;
}
export const ControlsButton = ({
  totalHistoricDates,
  currentEvent,
  loadPrev,
  loadNext,
  formatEventIndex,
}: NavigationControlsProps) => (
  <div className={`${s.navigation} ${s.navigation__controls}`}>
    <p className={s.navigation__total}>{formatEventIndex(totalHistoricDates, currentEvent)}</p>
    <div className={`${s.control_buttons}`}>
      <Button
        className={`${s.control_buttons} ${s.prev}`}
        onClick={loadPrev}
        disabled={currentEvent === 0}
      />
      <Button
        className={`${s.control_buttons} ${s.next}`}
        onClick={loadNext}
        disabled={currentEvent === totalHistoricDates - 1}
      />
    </div>
  </div>
);
