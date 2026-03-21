import { OPENING_HOURS, ALL_TIMES } from './constants';

const getTimesForDate = (date) => {
  if (!date) return [];

  const dayOfWeek = date.getDay();
  const hours = OPENING_HOURS[dayOfWeek];

  // if (!hours) return [];

  // Last slot = 1 hour before closing
  const closeHour = parseInt(hours.close.split(':')[0]);
  const openHour = parseInt(hours.open.split(':')[0]);
  const lastSlot = closeHour - 1;

  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const currentHour = now.getHours();

  return ALL_TIMES.filter(time => {
    const timeHour = parseInt(time.split(':')[0]);
    const withinHours = timeHour >= openHour && timeHour <= lastSlot;
    const notPast = isToday ? timeHour > currentHour : true;
    return withinHours && notPast;
  });
};

export { getTimesForDate };
