import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

interface Props {
  children: React.ReactNode;
}

export const appQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 5 * 1000,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    },
  },
});

export function AppQueryClientProvider({children}: Props) {
  return <QueryClientProvider client={appQueryClient}>{children}</QueryClientProvider>;
}
