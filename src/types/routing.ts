import {
  IncomeStatistics,
  PoliticianBills,
  PoliticianNews,
  PositionDescription,
  PositionHistory,
  Promises,
  Quiz,
  RatingStatistics,
  Reception,
  AdditionalInformation,
} from '../pages/PoliticianPage/tabs';
import { Subscriptions, BrowsingHistory, DonationHistory, VotingStatistics } from '../pages/ProfilePage/tabs';

import { NewsBlock, MassMediaInfluenceStatistic } from '../pages/MassMediaPage/tabs';
import { AuthorNewsBlock, InfluenceStatistic } from '../pages/AuthorPage/tabs';
import SuggestionPage from '../pages/SuggestionPage/SuggestionPage';

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
    component: PoliticianBills,
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
    id: 'additional_information',
    title: 'Дополнительная информация',
    component: AdditionalInformation,
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
    title: 'Ваше досье на политиков',
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
  {
    id: 'additional_information',
    title: 'Дополнительная информация',
    component: AdditionalInformation,
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
  {
    id: 'additional_information',
    title: 'Дополнительная информация',
    component: AdditionalInformation,
  },
];

export const RatingTabs = [
  {
    id: 'politicians',
    link: '/rating/politicians',
    title: 'Политики',
  },
  {
    id: 'massMedia',
    link: '/rating/massMedia',
    title: 'СМИ',
  },
  {
    id: 'authors',
    link: '/rating/authors',
    title: 'Эксперты',
  },
  {
    id: 'news',
    link: '/rating/parties',
    title: 'Партии',
  },
];
