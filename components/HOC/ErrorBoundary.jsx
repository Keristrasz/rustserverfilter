import React from "react";

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex justify-center items-center">
          <p className="text-center text-2xl m-8">
            Something went wrong. Try refreshing the page
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
