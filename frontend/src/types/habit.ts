export interface Habit {
  id: number;
  title: string;
  description: string | null;
  frequency: string;
  completed: boolean;
}