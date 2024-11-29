import {useQuery, UseQueryOptions} from '@tanstack/react-query';
import {baseAxios} from '@service/axios';
// types
import type {IQuestion} from '@components/compTypes';

const TRIVIA_QUERY_KEY = {
  BASE: ['trivia'],
  TIMED: ['trivia', 'timed'],
  FREE: ['trivia', 'free'],
  TAGS: ['trivia', 'tags'],
  CATEGORIES: ['trivia', 'categories'],
};

function useInternalFetch<T>(url = '', opts?: UseQueryOptions<T>) {
  return useQuery({
    queryKey: opts?.queryKey || ['root'],
    queryFn: async ({signal}) => {
      const result = await baseAxios.get<[]>(url, {signal: signal});
      return result.data as T;
    },
    ...opts,
  });
}

export function useFetchFreeTriviaQuestions(url = '') {
  return useInternalFetch<IQuestion[]>(url, {queryKey: [...TRIVIA_QUERY_KEY.FREE, url]});
}

export function useFetchTimedTriviaQuestions(url = '') {
  return useInternalFetch<IQuestion[]>(url, {queryKey: [...TRIVIA_QUERY_KEY.TIMED, url]});
}

export function useFetchTriviaCategories(url = 'categories') {
  return useInternalFetch<string[]>(url, {
    queryKey: [...TRIVIA_QUERY_KEY.CATEGORIES, url],
    placeholderData: ['general_knowledge', 'history'],
    select(data) {
      return Object.values(data).reduce((acc, curr) => {
        return [...acc, ...curr];
      }, [] as string[]);
    },
  });
}

export function useFetchTriviaTags(url = 'tags') {
  return useInternalFetch<string[]>(url, {
    queryKey: [...TRIVIA_QUERY_KEY.TAGS, url],
    placeholderData: ['arts_and_literature', 'biology', 'business', 'chemistry'],
  });
}
