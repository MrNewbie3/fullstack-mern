import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkout";

import axios from "axios";
const WorkoutForm = () => {
  const { dispatch } = useWorkoutContext();
  const [title, settitle] = useState("");
  const [load, setload] = useState("");
  const [reps, setreps] = useState("");
  const [error, seterror] = useState(null);
  const [emptyFields, setEmptyFields] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = { title, load, reps };
    await axios
      .post("http://localhost:4000/api/workouts", workout, { headers: { "Content-Type": "application/json" } })
      .then((result) => {
        dispatch({ type: "CREATE_WORKOUT", payload: result.data });
        setEmptyFields("");
      })
      .catch((err) => {
        seterror(err.response.data.error);
        setEmptyFields(err.response.data.emptyFields);
      })
      .finally(() => {
        setload("");
        setreps("");
        settitle("");
      });
  };
  return (
    <form class="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>
      <label for="">Exercise title</label>
      <input
        type="text"
        value={title}
        onChange={(e) => {
          settitle(e.target.value);
        }}
        className={emptyFields.includes("title") ? "error" : ""}
      />
      <label for="">Load in kg</label>
      <input
        type="number"
        value={load}
        onChange={(e) => {
          setload(e.target.value);
        }}
        className={emptyFields.includes("load") ? "error" : ""}
      />
      <label for="">Reps</label>
      <input
        type="number"
        value={reps}
        onChange={(e) => {
          setreps(e.target.value);
        }}
        className={emptyFields.includes("reps") ? "error" : ""}
      />
      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;