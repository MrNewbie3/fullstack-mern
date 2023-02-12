import axios from "axios";
import { useWorkoutContext } from "../hooks/useWorkout";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutContext();
  const handleClick = async () => {
    axios
      .delete("http://localhost:4000/api/workouts/" + workout._id)
      .then((result) => {
        console.log(result);
        dispatch({ type: "DELETE_WORKOUT", payload: result.data });
      })
      .catch((err) => {});
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps : </strong>
        {workout.reps}
      </p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
