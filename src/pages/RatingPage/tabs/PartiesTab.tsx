// import React, { useEffect } from 'react';
// import { WrapperAsyncRequest } from 'src/components/Loading/WrapperAsyncRequest';
// import { useSelector } from 'react-redux';
// import { partySelectors } from '../../../slices/partySlice';
// import { useWindowSize } from '../../../hooks/useWindowSize';
// import { useFetchPartyPoliticians } from '../hooks/useFetchPoliticians';
// import { RootState } from '../../../store/index';
// import { SortBadge } from './SortBadge';
// import { sortParty } from '../../../static/static';
// import { userSelectors } from '../../../slices/userSlice';
// import PartyCard from '../../../components/PartyCard/PartyCard';
// import styles from './Tabs.module.scss';
// import { APIStatus } from '../../../lib/axiosAPI';

const PartiesTab = () => {
  // const { isMobile } = useWindowSize();
  // const data = useSelector(partySelectors.getPartyPoliticians());
  // const partyInfo = useSelector(partySelectors.getPartyInfo());
  // const { fetch, status } = useFetchPartyPoliticians();
  // const sortDirection = useSelector((s: RootState) => s.party.sort_direction);
  // const sortField = useSelector((s: RootState) => s.party.sort_field);
  // const isAuthenticated = useSelector(userSelectors.getIsAuthenticated());

  // useEffect(() => {
  //   fetch(partyInfo.id);
  // }, [sortDirection, sortField, isAuthenticated]);
  // return (
  //   <WrapperAsyncRequest status={APIStatus.Success}>
  //     <div className={styles.newsContainer}>
  //       <div className={styles.sortRow}>
  //         {sortParty.map(({ id, full_title, short_title, field }) => {
  //           return <SortBadge key={id} text={!isMobile ? full_title : short_title} field={field} />;
  //         })}
  //       </div>
  //       {data?.politicians && data?.politicians.length > 0 ? (
  //         <div className={styles.news}>
  //           {data?.politicians?.map((item, index) => (
  //             <PartyCard {...item} />
  //           ))}
  //         </div>
  //       ) : (
  //         <div className={styles.noNewsBlock}>
  //           <span>Здесь будут отображаться политики</span>
  //         </div>
  //       )}
  //     </div>
  //   </WrapperAsyncRequest>
  // );
  return null;
};

export default PartiesTab;
