import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { userSelectors } from 'src/slices/userSlice';
import styles from '../ProfilePage.module.scss';

interface InfoBlockProps {
  fio?: string;
}

const InfoBlock: FC<InfoBlockProps> = ({ fio }) => {
  const data = useSelector(userSelectors.getUser());
  const county = data?.country_id?.title?.ru ? `${data?.country_id?.title?.ru}, ` : '';
  const region = data?.region_id?.title?.ru ? `${data?.region_id?.title?.ru}, ` : '';
  const city = data?.city_id?.title?.ru ? `${data?.city_id?.title?.ru}` : '';
  const gender = data?.gender_id?.title?.ru ? `${data?.gender_id?.title?.ru}` : '';
  return (
    <div className={styles.personBlock}>
      <div className={styles.fio}>
        <p>{fio}</p>
      </div>
      <div className={styles.hLine} />
      <p>
        {county}
        {region}
        {city}
      </p>
      <p>{data?.age ? `${data.age} лет` : null}</p>
      <p>{gender}</p>
    </div>
  );
};

export default InfoBlock;
