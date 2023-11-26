import { useEffect, useMemo, useState } from "react";
import Calculator from "./Calculator";

function formatTime(time) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(time);
}

function App() {
  const [time, setTime] = useState(formatTime(new Date()));

  // Will be AM or PM
  const partOfDay = time.slice(-2);

  const workouts = useMemo(() => {
    return [
      {
        name: "Full-body workout",
        numExercises: partOfDay === "AM" ? 14 : 11,
      },
      {
        name: "Arms + Legs",
        numExercises: 10,
      },
      {
        name: "Arms only",
        numExercises: 8,
      },
      {
        name: "Legs only",
        numExercises: partOfDay === "AM" ? 11 : 8,
      },
    ];
  }, [partOfDay]);

  useEffect(() => {
    const id = setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <main>
      <h1>Fit Tick</h1>
      <time>For your workout on {time}</time>
      <Calculator workouts={workouts} />
    </main>
  );
}

export default App;
