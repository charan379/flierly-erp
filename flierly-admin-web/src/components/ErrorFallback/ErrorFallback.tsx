import { Button, Result } from "antd";
import React from "react";

// Define the types for the props
interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <Result
      status="500"
      title="Sorry, something went wrong."
      subTitle={error.message}
      extra={
        <Button type="primary" onClick={resetErrorBoundary}>
          Try Again
        </Button>
      }
    />
  );
};

export default ErrorFallback;
