type Timer = {
  id: string;
  description: string;
  duration: number;
  isRunning: boolean;
};
type TimerForm = {
    description: string;
}

export { Timer,TimerForm };
