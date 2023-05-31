import { Pagination } from './Pagination';

export default {
  title: 'Pagination',
  component: Pagination,
  current: {
    defaultValue: 6,
    control: {
      name: 'Current page',
      type: 'number',
    },
  },
  total: {
    defaultValue: 74,
    control: {
      name: 'Amount of content',
      type: 'number',
    },
  },
  perPage: {
    defaultValue: 10,
    control: {
      name: 'Items per page',
      type: 'number',
    },
  },
  onNavigate: {
    action: 'onNavigate',
  },
};

export const example = Pagination;
