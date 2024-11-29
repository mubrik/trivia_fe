import {useQuery} from '@tanstack/react-query';
// requests
import {getTriviaQuestions, getTriviaTags, getTriviaCategories} from '../../../service/axios';
// type
import {IQueryObj, Concrete} from '../../compTypes';

const transformCategoriesData = (data: Record<string, string[]>) => {
  return Object.values(data).reduce((acc, curr) => {
    return [...acc, ...curr];
  }, [] as string[]);
};

export const useFreeTriviaQuestions = ({limit, categories, difficulty, tags}: Concrete<IQueryObj>) => {
  return useQuery(['trivia-free', limit, categories, difficulty, tags], getTriviaQuestions, {
    refetchOnWindowFocus: false,
  });
};

export const useTimedTriviaQuestions = ({limit, categories, difficulty, tags}: Concrete<IQueryObj>) => {
  return useQuery(['trivia-timed', limit, categories, difficulty, tags], getTriviaQuestions, {
    refetchOnWindowFocus: false,
  });
};

export const useGetTriviaCategories = () => {
  return useQuery(['trivia-categories'], getTriviaCategories, {
    refetchOnWindowFocus: false,
    staleTime: 86400000,
    placeholderData: {'General Knowledge': ['general_knowledge'], 'History': ['history']},
    select: transformCategoriesData,
  });
};

export const useGetTriviaTags = () => {
  return useQuery(['trivia-tags'], getTriviaTags, {
    refetchOnWindowFocus: false,
    staleTime: 86400000,
    placeholderData: ['arts_and_literature', 'biology', 'business', 'chemistry'],
  });
};
