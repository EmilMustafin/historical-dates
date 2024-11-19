import { HistoryDates } from '@/features';
import { historicDates } from '@/shared/constants';
import s from './home-page.module.css';

export const HomePage = () => {
  return (
    <section className={s.historical_dates}>
      <h1 className={s.main_title}>Исторические даты</h1>
      <HistoryDates data={historicDates} />
    </section>
  );
};
