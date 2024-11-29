import axios from 'axios';
// react query
import type { Query, QueryFunctionContext, QueryKey } from '@tanstack/react-query';
import { IQuestion, IQueryObj, IGetQuestionsQueryFunction } from '../components/compTypes';

export const baseAxios = axios.create({
  baseURL: 'https://the-trivia-api.com/api/',
  // timeout: 3000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
    // 'Access-Control-Allow-Credentials': true,
  },
  // withCredentials: true,
});

const getQueryFromObj = (
  limit: number, categories: string[],
  difficulty: string, tags: string[]
) => {

  let _catgry = categories.length > 0 ? `categories=${categories.join(",")}` : "";
  let _tags = tags.length > 0 ? `tags=${tags.join(",")}`: "";
  let _difficulty = difficulty ? `difficulty=${difficulty}`: "difficulty=easy";
  let _limit = limit ? `limit=${limit}` : "limit=20";

  let baseQueryString = `${_difficulty}&${_limit}`;
  if (_catgry) {
    baseQueryString += `&${_catgry}`;
  }

  if (_tags) {
    baseQueryString += `&${_tags}`;
  }

  return baseQueryString;
};

// react query function to get questions
export const getTriviaQuestions = async ({ queryKey, signal }: IGetQuestionsQueryFunction) => {

  const [_key, limit, categories, difficulty, tags ] = queryKey;

  const _uriQuery = getQueryFromObj(limit, categories, difficulty, tags);

  // request
  const response = await baseAxios.get<IQuestion[]>(`questions?${_uriQuery}`, {
    signal: signal,
  });
  return response.data;
};

// function to get categories
export const getTriviaCategories = async ({ queryKey, signal }: QueryFunctionContext) => {

  // request
  const response = await baseAxios.get<Record<string, string[]>>('categories', {
    signal: signal,
  });
  return response.data;
};

// function to get tags
export const getTriviaTags = async ({ queryKey, signal }: QueryFunctionContext) => {
  // request
  const response = await baseAxios.get<string[]>('tags', {
    signal: signal,
  });
  return response.data;
};

// react query function to verify session
export const getVerifySession = async ({ queryKey, signal }: QueryFunctionContext) => {
  // request
  const response = await baseAxios.get<Record<"status", string>>('auth/verify_session', {
    signal: signal,
  });
  return response.data;
};

// react query function to login session
export const postSessionLogin = async (bodyData: Record<string, any>) => {
  // request
  return baseAxios.post<Record<"status", string>>('auth/sessionLogin', bodyData);
};

// react query function to logout session
export const postSessionLogout = async () => {
  // request
  return baseAxios.post<Record<"status", string>>('auth/sessionLogout');
};

// react query function to register user
export const postRegisterUser = async (bodyData: Record<string, any>) => {
  // request
  return baseAxios.post<Record<"status", string>>('auth/register', bodyData);
};