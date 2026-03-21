// constants.js
const OPENING_HOURS = {
  0: { open: '11:00', close: '22:00' },  // Sunday  11AM - 10PM
  1: { open: '12:00', close: '22:00' },  // Monday  12PM - 10PM
  2: { open: '12:00', close: '22:00' },  // Tuesday
  3: { open: '12:00', close: '22:00' },  // Wednesday
  4: { open: '12:00', close: '22:00' },  // Thursday
  5: { open: '12:00', close: '22:00' },  // Friday
  6: { open: '11:00', close: '23:00' },  // Saturday 11AM - 11PM
};

const ALL_TIMES = [
  '11:00', '12:00', '13:00', '14:00',
  '15:00', '16:00', '17:00', '18:00',
  '19:00', '20:00', '21:00', '22:00'
];

export { OPENING_HOURS, ALL_TIMES };