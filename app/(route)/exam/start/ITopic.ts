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

export interface IAnswer {
  id: number;
  answer: string;
  is_correct: boolean;
  question_id: number;
  topic: number;
}