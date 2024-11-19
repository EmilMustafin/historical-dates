import './events-controls-button.css';
interface EventControlButtonsProps {
  historicDates: { title: string }[];
  currentEvent: number;
  navigateToEvent: (index: number) => void;
}

export const EventControlButtons = ({
  historicDates,
  currentEvent,
  navigateToEvent,
}: EventControlButtonsProps) => (
  <div className='events control-buttons'>
    {historicDates.map((item, index) => (
      <button
        className={`events button ${currentEvent === index ? 'events button active' : ''}`}
        key={index}
        onClick={() => navigateToEvent(index)}
      />
    ))}
  </div>
);
