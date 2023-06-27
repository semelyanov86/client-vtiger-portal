import { default as dayjs } from 'dayjs';

export const formatDate = (date: number) => dayjs(date).format('MMMM D, YYYY h:mm A');

export const clearRouteDelimeter = (route: string) =>
  route.startsWith('/') ? route.substring(1) : route;
