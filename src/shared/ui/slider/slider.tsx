import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { HistoricalDates } from '@/shared/constants/types';
import styles from './slider.module.css';
import 'swiper/css';
import 'swiper/css/navigation';

interface SliderProps {
  historicDates: HistoricalDates[];
  currentEvent: number;
  sliderContainerRef: React.RefObject<HTMLDivElement>;
}

export const Slider: React.FC<SliderProps> = ({
  historicDates,
  currentEvent,
  sliderContainerRef,
}) => (
  <div
    ref={sliderContainerRef}
    className={`${styles.history_slider} ${styles.slider} ${styles.slider_show}`}
  >
    <p className={styles.slider__mobileTitle}>{historicDates[currentEvent].title}</p>
    <button className={`${styles.slider__btn} ${styles.slider__btn_prev}`} />
    <Swiper
      className={`${styles.swiper}`}
      wrapperClass={`${styles.swiperWrapper}`}
      modules={[Navigation]}
      spaceBetween={150}
      slidesPerView={4}
      breakpoints={{
        320: { slidesPerView: 1.5, spaceBetween: 25 },
        769: { slidesPerView: 3, spaceBetween: 80 },
        1025: { slidesPerView: 4, spaceBetween: 80 },
      }}
      navigation={{
        prevEl: `.${styles.slider__btn_prev}`,
        nextEl: `.${styles.slider__btn_next}`,
      }}
    >
      {historicDates[currentEvent].episodes.map((item, index) => (
        <SwiperSlide key={index} className={styles.slider__slide}>
          <p className={styles.slider__year}>{item.date}</p>
          <p className={styles.slider__description}>{item.description}</p>
        </SwiperSlide>
      ))}
    </Swiper>
    <button className={`${styles.slider__btn} ${styles.slider__btn_next}`} />
  </div>
);
