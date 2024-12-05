import React from "react";
import dummyData from "../service/dummy-json.json";
import type { Query, QueryFunctionContext, QueryKey } from '@tanstack/react-query';

// generics
// make keys required
export type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};
// remove key requiremnets
type Relaxed<Type> = {
  [Property in keyof Type]?: Type[Property];
};

// routes
export type ValidRoutes = "timed_setup"|"free_setup"|"free"|"timed"|"home"|"play"|"mode";

// store types
export interface IStoreState {
  mode: "timed" | "free";
  timedPlaySettings: Concrete<ITimedGameSettings>;
  freePlaySettings: Concrete<IFreeGameSettings>;
  // generalSettings: IGeneralSettings;
}

export interface ITimedGameSettings extends IQueryObj {
  minutes: number;
  seconds: number;
  displayAnswer: boolean;
}

export interface IFreeGameSettings extends IQueryObj {
  displayAnswer: boolean;
}

// export interface IGeneralSettings extends IQueryObj {
//   displayAnswer: boolean;
// }

export type StoreAction =
  { type: "UPDATE_MODE", mode: IStoreState["mode"]} |
  { type: "UPDATE_TIMED_SETTINGS", settings: Relaxed<ITimedGameSettings>} |
  { type: "UPDATE_FREE_SETTINGS", settings: Relaxed<IFreeGameSettings>} |
  { type: "UPDATE_FREE_GENERAL_SETTINGS", generalSettings: IQueryObj } |
  { type: "UPDATE_TIMED_GENERAL_SETTINGS", generalSettings: IQueryObj }

export interface IStoreContextValue extends IStoreState{
  dispatchToStore: React.Dispatch<StoreAction>;
}

export interface IQuestion {
  id: string;
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  category: string;
  tags: string[];
  type: "Multiple Choice" | "boolean";
  difficulty: "hard" | "easy" | "medium";
  regions: string[];
}

export interface IAnsweredQuestion {
  questionId: string;
  playerAnswer: string;
  elapsedTime: number;
  isCorrect: boolean;
}

export interface IAskQuestionListProps {
  questions: IQuestion[];
  storeAnsQuestion(param: IAnsweredQuestion): void;
  gameState: timedGameState;
  setGameState: React.Dispatch<React.SetStateAction<timedGameState>>;
  displayAnswer: boolean;
}

export interface IAskQuestionProps {
  question: IQuestion;
  mode: "timed" | "free";
  displayAnswer: boolean;
  storeAnsQuestion(param: IAnsweredQuestion): void;
  onAnswer?(): void;
  onCorrect?(): void;
  onWrong?(): void;
}

export interface IGameOverProps {
  gamemode: "timed" | "free";
  queryKey: string;
  questionResults: IAnsweredQuestion[];
  completionTime?: number;
}

export interface IQueryObj {
  limit?: number;
  difficulty?: "hard" | "easy" | "medium";
  tags?: string[];
  categories?: string[];
}

export interface IGetQuestionsQueryFunction extends QueryFunctionContext {
  queryKey: [string, number, string[], string, string[]]
}

export type timedGameState = "idle" | "inPlay" | "endNext" |"end";

export interface IGameModesAccordionProps {
  timedSettings: Concrete<ITimedGameSettings>;
  freeSettings: Concrete<IFreeGameSettings>;
}