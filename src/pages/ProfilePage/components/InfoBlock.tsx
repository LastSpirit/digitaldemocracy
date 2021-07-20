import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { userSelectors } from 'src/slices/userSlice';
import styles from '../ProfilePage.module.scss';

interface InfoBlockProps {
  fio?: string;
}

const InfoBlock: FC<InfoBlockProps> = ({ fio }) => {
  const data = useSelector(userSelectors.getUser());
  const county = data?.country_id?.title ? `${data?.country_id?.title}, ` : '';
  const region = data?.region_id?.title ? `${data?.region_id?.title}, ` : '';
  const city = data?.city_id?.title ? `${data?.city_id?.title}` : '';
  const gender = data?.gender_id?.title ? `${data?.gender_id?.title}` : '';
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
