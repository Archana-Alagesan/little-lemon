import './TimePicker.css';

const TimePicker = ({ availableTimes, allTimes, value, onChange, bookedTimes = [] }) => {

    const isBooked = (time) => bookedTimes.includes(time);

    // All times are booked
    const allBooked = availableTimes.length > 0 && availableTimes.every(time => isBooked(time));

    const isDisabled = (time) => {
        const isAvailable = availableTimes.includes(time);
        if (!isAvailable) return true;
        else if (isBooked(time)) return true;
        return false;
    }

    if (availableTimes.length === 0 && !allBooked) {
        return (
            <div className="time-picker">
                <label className="form-label">Select Time</label>
                <p className="time-closed">
                    We are closed on this day. Please select another date.
                </p>
            </div>
        )
    }

    // Fully booked
    if (allBooked) {
        return (
            <div className="time-picker">
                <label className="form-label">Select Time</label>
                <p className="time-closed">
                    We are fully booked for this day. Please select another date.
                </p>
            </div>
        )
    }

    return (
        <div className="time-picker">
            <label className="form-label">Select Time</label>
            <div className="time-pills">
                {allTimes.map(time => {
                    const isSelectable = isDisabled(time);
                    return (
                        <button
                            key={time}
                            type="button"
                            disabled={isSelectable}
                            className={`time-pill
                            ${value === time ? 'active' : ''}
                            ${isSelectable ? 'disabled' : ''}
                            ${isBooked(time) ? 'booked' : ''}
                            `}
                            onClick={() => !isSelectable && onChange(time)}
                        >
                            {time}
                        </button>
                    );
                })}
            </div>
        </div>
    )
}

export default TimePicker;