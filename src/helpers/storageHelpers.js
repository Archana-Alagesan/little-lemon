// storageHelpers.js

// Save booked time for a date
const saveBookedTime = (date, time) => {
  const booked = getBookedTimes();

  // Get existing times for this date or empty array
  const timesForDate = booked[date] || [];

  // Add new time if not already booked
  if (!timesForDate.includes(time)) {
    booked[date] = [...timesForDate, time];
  }

  localStorage.setItem('bookedTimes', JSON.stringify(booked));
}

// Get all booked times
const getBookedTimes = () => {
  const stored = localStorage.getItem('bookedTimes');
  return stored ? JSON.parse(stored) : {};
}

// Get booked times for a specific date
const getBookedTimesForDate = (date) => {
  const booked = getBookedTimes();
  return booked[date] || [];
}

// Check if a time is booked for a date
const isTimeBooked = (date, time) => {
  const timesForDate = getBookedTimesForDate(date);
  return timesForDate.includes(time);
}

export {
  saveBookedTime,
  getBookedTimes,
  getBookedTimesForDate,
  isTimeBooked
};