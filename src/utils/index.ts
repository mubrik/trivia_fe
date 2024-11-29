import * as React from 'react';
/**
 * @description A helper to create a Context and Provider with no upfront default value, and
 * without having to check for undefined all the time.
 * @param contextName - Making this compulsory, easier to debug
 */
export function createTypeContext<ContextType extends unknown | null>(
  contextName: string,
): readonly [() => ContextType, React.Provider<ContextType | undefined>] {
  // create a context using undefined, since no upfront value
  const Context = React.createContext<ContextType | undefined>(undefined);
  // name for context
  Context.displayName = contextName || '';

  // hook that returns the value of the context
  // type checking for undefined is done here so TS can infer the type without checking in components!

  const useContext = (): ContextType => {
    const contextValue = React.useContext(Context);

    if (contextValue === undefined) {
      // throw
      throw new Error(`useContext for ${Context.displayName} must be used in a provider with a value`);
    }

    return contextValue;
  };

  return [useContext, Context.Provider];
}

export function buildUrlQuery({
  limit,
  difficulty,
  tags,
  categories,
}: {
  limit?: number;
  difficulty?: 'hard' | 'easy' | 'medium';
  tags?: string[];
  categories?: string[];
}) {
  let _catgry = categories && categories.length > 0 ? `categories=${categories.join(',')}` : '';
  let _tags = tags && tags.length > 0 ? `tags=${tags.join(',')}` : '';
  let _difficulty = difficulty ? `difficulty=${difficulty}` : 'difficulty=easy';
  let _limit = limit ? `limit=${limit}` : 'limit=20';

  let baseQueryString = `${_difficulty}&${_limit}`;
  if (_catgry) {
    baseQueryString += `&${_catgry}`;
  }
  if (_tags) {
    baseQueryString += `&${_tags}`;
  }

  return `questions?${baseQueryString}`;
}
