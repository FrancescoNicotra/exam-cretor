export interface ITopic {
  id: number;
  topic: string;
}

export interface IQuestion {
  id: number;
  question: string;
  topic: number;
  created_at: string;
}
