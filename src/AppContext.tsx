// router
import { BrowserRouter as Router } from "react-router-dom";
// error bundary
import ErrorBoundary from "./components/error/ErrorBoundary";
// material theme
import CustomThemeContext from "./components/themeprovider/ThemeProviderContext";
// query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// notification
import { SnackbarProvider, SnackbarOrigin } from "notistack";
// store
import StoreContext from "./components/store/StoreContext";

// Create a client
const queryClient = new QueryClient();

interface IAppProps {
  children: React.ReactNode;
}

const ANCHOR_ORIGIN: SnackbarOrigin = {
  vertical: "bottom",
  horizontal: "center",
};

const ICON_VARIANT = {
  success: "✅",
  error: "✖️",
  warning: "⚠️",
  info: "ℹ️",
};

export default function App({ children }: IAppProps) {
  return (
    <ErrorBoundary>
      <CustomThemeContext>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={ANCHOR_ORIGIN}
            iconVariant={ICON_VARIANT}
          >
            <StoreContext>
              <Router>{children}</Router>
            </StoreContext>
          </SnackbarProvider>
        </QueryClientProvider>
      </CustomThemeContext>
    </ErrorBoundary>
  );
}
