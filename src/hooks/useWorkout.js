import { WorkoutContext } from "../context/Workout_Context";
import { useContext } from "react";

export const useWorkoutContext = () => {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw Error("Workout must be used inside provider");
  }

  return context;
};
