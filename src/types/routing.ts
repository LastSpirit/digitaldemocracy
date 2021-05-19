import {
  IncomeStatistics,
  PoliticianActivity,
  PoliticianNews, PositionDescription,
  PositionHistory,
  Promises, Quiz, RatingStatistics, Reception
} from '../pages/PoliticianPage/tabs';

export enum ModalParams {
  Auth = 'auth_modal',
  YandexRegister = 'yandex_user_data',
}

export enum AuthParam {
  login = 'login',
  register = 'register',
  reset_password = 'reset_password'
}

export const PoliticianTabs = [
  {
    id: 'politician_news',
    title: 'Новости политика',
    component: PoliticianNews
  },
  {
    id: 'politician_activity',
    title: 'Законодательная деятельность',
    component: PoliticianActivity
  },
  {
    id: 'position_history',
    title: 'История должностей',
    component: PositionHistory
  },
  {
    id: 'promises',
    title: 'Обещания и цитаты',
    component: Promises
  },
  {
    id: 'income_statistics',
    title: 'Статистика дохода',
    component: IncomeStatistics
  },
  {
    id: 'rating_statistics',
    title: 'Статистика рейтинга',
    component: RatingStatistics
  },
  {
    id: 'position_description',
    title: 'Описание должности',
    component: PositionDescription
  },
  {
    id: 'reception',
    title: 'Виртуальная приёмная',
    component: Reception
  },
  {
    id: 'quiz',
    title: 'Опросы',
    component: Quiz
  },
];
