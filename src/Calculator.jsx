/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { memo, useEffect, useState } from "react";

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
};

function Calculator({ workouts }) {
  const [number, setNumber] = useState(workouts.at(0).numExercises);
  const [sets, setSets] = useState(3);
  const [speed, setSpeed] = useState(90);
  const [breakDuration, setBreakDuration] = useState(5);
  const [duration, setDuration] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [isRunning, setIsRunning] = useState(false);

  const mins = Math.floor(duration);
  const seconds = (duration - mins) * 60;

  const handleIncrement = () => {
    setDuration((duration) => Math.floor(duration) + 1);
  };

  const handleDecrement = () => {
    setDuration((duration) => (duration > 1 ? Math.ceil(duration) - 1 : 0));
  };

  useEffect(() => {
    setDuration((number * sets * speed) / 60 + (sets - 1) * breakDuration);
  }, [number, sets, speed, breakDuration]);

  useEffect(() => {
    document.title = `Fit Tick | ${number} exercises workout`;
  }, [number]);

  useEffect(() => {
    let timerId;

    if (isRunning && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      clearInterval(timerId);
    } else {
      clearInterval(timerId);
    }

    return () => clearInterval(timerId);
  }, [isRunning, timeLeft]);

  const handleStartReset = () => {
    setIsRunning(!isRunning);
    setTimeLeft(duration * 60);
  };

  return (
    <>
      <form>
        <div>
          <label htmlFor="workout">Type of workout</label>
          <select
            name="workout"
            id="workout"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          >
            {workouts.map((workout) => (
              <option value={workout.numExercises} key={workout.name}>
                {workout.name} ({workout.numExercises} exercises)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="sets">How many sets?</label>
          <input
            type="range"
            min="1"
            max="5"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
            name="sets"
          />
          <span>{sets}</span>
        </div>
        <div>
          <label htmlFor="speed">How fast are you?</label>
          <input
            type="range"
            min="30"
            max="180"
            step="30"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />
          <span>{speed} sec/exercise</span>
        </div>
        <div>
          <label htmlFor="break">Break duration</label>
          <input
            type="range"
            min="1"
            max="10"
            value={breakDuration}
            onChange={(e) => setBreakDuration(e.target.value)}
          />
          <span>{breakDuration} minutes/break</span>
        </div>
      </form>
      <section>
        <button onClick={handleDecrement}>-</button>
        {!isRunning && (
          <p>
            {mins < 10 && "0"}
            {mins}:{seconds < 10 && "0"}
            {seconds}
          </p>
        )}
        {isRunning && <p>{formatTime(timeLeft)}</p>}
        <button onClick={handleIncrement}>+</button>
      </section>
      <div className="start">
        <button className="btn-start" onClick={handleStartReset}>
          {isRunning ? "Reset workout" : "Start workout"}
        </button>
      </div>
    </>
  );
}

export default memo(Calculator);
