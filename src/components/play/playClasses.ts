import type { IAnsweredQuestion } from "../compTypes";

// creating a class for objects that repeat alot
export class AnsQuestion implements IAnsweredQuestion {

  constructor (
    public questionId: string, public playerAnswer: string,
    public elapsedTime: number, public isCorrect: boolean
  ) { }
}