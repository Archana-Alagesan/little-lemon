import './TimePicker.css';

const TimePicker = ({ availableTimes, allTimes, value, onChange }) => {
    if (availableTimes.length === 0) {
        return (
            <div className="time-picker">
                <label className="form-label">Select Time</label>
                <p className="time-closed">
                    We are closed on this day. Please select another date.
                </p>
            </div>
        )
    }
    return (
        <div className="time-picker">
            <label className="form-label">Select Time</label>
            <div className="time-pills">
                {allTimes.map(time => {
                    const isAvailable = availableTimes.includes(time);
                    return (
                        <button
                            key={time}
                            type="button"
                            disabled={!isAvailable}
                            className={`time-pill ${value === time ? 'active' : ''} ${!isAvailable ? 'disabled' : ''}`}
                            onClick={() => isAvailable && onChange(time)}
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