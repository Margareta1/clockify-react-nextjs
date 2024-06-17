export type Timer = {
  id?: string;
  description: string;
  duration: number;
  date:string;
  isRunning: boolean;
  userId:string;
  localId:string;
};

export type TimerForm = {
    description: string;
}

export enum TimerActionsType {
  TRACKER,
  HISTORY
}
