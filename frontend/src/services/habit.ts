import api from "./api";
import type { Habit } from "../types/habit";

export const getHabits = async (): Promise<Habit[]> => {
  const response = await api.get("/habits");
  return response.data;
};

export const createHabit = async (
  habit: Omit<Habit, "id" | "completed">
) => {
  const response = await api.post("/habits", habit);
  return response.data;
};

export const updateHabit = async (
  id: number,
  habit: Omit<Habit, "id" | "completed">
) => {
  const response = await api.put(`/habits/${id}`, habit);
  return response.data;
};

export const deleteHabit = async (id: number) => {
  return api.delete(`/habits/${id}`);
};

export const completeHabit = async (id: number) => {
  return api.patch(`/habits/${id}/complete`);
};