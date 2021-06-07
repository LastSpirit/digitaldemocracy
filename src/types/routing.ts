import {
  IncomeStatistics,
  PoliticianActivity,
  PoliticianNews,
  PositionDescription,
  PositionHistory,
  Promises,
  Quiz,
  RatingStatistics,
  Reception,
} from '../pages/PoliticianPage/tabs';
import { Subscriptions, BrowsingHistory, DonationHistory, VotingStatistics } from '../pages/ProfilePage/tabs';

import { NewsBlock, MassMediaInfluenceStatistic } from '../pages/MassMediaPage/tabs';
import { AuthorNewsBlock, InfluenceStatistic } from '../pages/AuthorPage/tabs';

export enum ModalParams {
  Auth = 'auth_modal',
  YandexRegister = 'yandex_user_data',
}

export enum AuthParam {
  login = 'login',
  register = 'register',
  reset_password = 'reset_password',
}

export const PoliticianTabs = [
  {
    id: 'politician_news',
    title: 'Новости политика',
    component: PoliticianNews,
  },
  {
    id: 'politician_activity',
    title: 'Законодательная деятельность',
    component: PoliticianActivity,
  },
  {
    id: 'position_history',
    title: 'История должностей',
    component: PositionHistory,
  },
  {
    id: 'promises',
    title: 'Обещания и цитаты',
    component: Promises,
  },
  {
    id: 'income_statistics',
    title: 'Статистика дохода',
    component: IncomeStatistics,
  },
  {
    id: 'rating_statistics',
    title: 'Статистика рейтинга',
    component: RatingStatistics,
  },
  {
    id: 'position_description',
    title: 'Описание должности',
    component: PositionDescription,
  },
  {
    id: 'reception',
    title: 'Виртуальная приёмная',
    component: Reception,
  },
  {
    id: 'quiz',
    title: 'Опросы',
    component: Quiz,
  },
];

export const ProfileTabs = [
  {
    id: 'subscriptions',
    title: 'Подписки',
    component: Subscriptions,
  },
  {
    id: 'voting_statistics',
    title: 'Статистика голосований',
    component: VotingStatistics,
  },
  {
    id: 'browsing_history',
    title: 'История просмотров',
    component: BrowsingHistory,
  },
  {
    id: 'donation_history',
    title: 'История донатов',
    component: DonationHistory,
  },
];

export const MassMediaTabs = [
  {
    id: 'news',
    title: 'Новости',
    component: NewsBlock,
  },
  {
    id: 'statistic',
    title: 'Статистика влияния',
    component: MassMediaInfluenceStatistic,
  },
];

export const AuthorTabs = [
  {
    id: 'news',
    title: 'Новости',
    component: AuthorNewsBlock,
  },
  {
    id: 'statistic',
    title: 'Статистика влияния',
    component: InfluenceStatistic,
  },
];
