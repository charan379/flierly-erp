import { Button, Result } from "antd";
import React from "react";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
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
