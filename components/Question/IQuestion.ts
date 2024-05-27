export interface IAnswer {
  id: number;
  answer: string;
  question_id: number;
  is_correct: boolean;
  topic: number;
}
export interface IQuestion {
  question: string;
  answers: IAnswer[];
  index: number;
}
