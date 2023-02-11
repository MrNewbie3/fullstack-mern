import { useEffect } from "react";
import axios from "axios";
import WorkoutDetails from "../components/Workout_Details";
import WorkoutForm from "../components/Workouts_Form";
import { useWorkoutContext } from "../hooks/useWorkout";

const Home = () => {
  const { workouts, dispatch } = useWorkoutContext();
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await axios.get("http://localhost:4000/api/workouts");
      dispatch({ type: "SET_WORKOUTS", payload: response.data });
    };
    fetchWorkouts();
  }, []);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workouts) => {
            return <WorkoutDetails key={workouts._id} workout={workouts} />;
          })}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
