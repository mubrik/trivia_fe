// utils for game over screen
// classes
import type { IAnsweredQuestion } from "../../compTypes";

export const getFastestQuestion = (ansQuestions: IAnsweredQuestion[]) => {
  // get the answer with least time spent
  const _question = ansQuestions.reduce((acc, currQuestion) => {

    if (currQuestion.elapsedTime <= acc.elapsedTime) {
      return currQuestion;
    }

    return acc;
  });

  return _question;
};

export const getSlowestQuestion = (ansQuestions: IAnsweredQuestion[]) => {
  // get the answer with most time spent
  const _question = ansQuestions.reduce((acc, currQuestion) => {

    if (currQuestion.elapsedTime >= acc.elapsedTime) {
      return currQuestion;
    }

    return acc;
  });

  return _question;
};