import * as React from "react";

interface IErrorProps {
  children: React.ReactNode;
}

interface IErrorState {
  hasError: boolean;
  errorObj: Error|null;
  errorMsg: string;
}
/**
* @description if webpart encounters error that can lead to crash, display this screen, class component cause componentDidCatch is a class comp method
* @abstract https://stackoverflow.com/questions/48482619/how-can-i-make-use-of-error-boundaries-in-functional-react-components
* @param React.ReactNode - children?
*/
class ErrorBoundary extends React.Component<IErrorProps, IErrorState> {

  public state: IErrorState = {
    hasError: false,
    errorObj: null,
    errorMsg: ""
  };

  public static getDerivedStateFromError(error: Error): IErrorState {
    // Update state so the next render will show the fallback UI.
    return {
      hasError: true,
      errorObj: error,
      errorMsg: error.message
    };
  }

  public componentDidCatch(error: Error, info: React.ErrorInfo): void {

    console.error("Uncaught error:", error, info);
    // Display fallback UI
    this.setState({ hasError: true, errorMsg: error.message });
    // You can also log the error to an error reporting service
  }

  public render(): React.ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div>
          <h4 style={{color: "blueviolet"}}> Something went wrong </h4>
          <details style={{ whiteSpace: "pre-wrap" }}>
            <summary style={{ cursor: "pointer", fontSize: "18px" }}> View error details </summary>
            <pre style={{whiteSpace: "break-spaces"}}>
              {this.state.hasError && this.state.errorObj?.toString()}
              <br />
              {this.state.errorMsg}
              <br/>
              {this.state.errorObj?.stack}
            </pre>
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
