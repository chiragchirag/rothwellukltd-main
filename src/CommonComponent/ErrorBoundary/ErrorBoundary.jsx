/* eslint-disable */
/* eslint-disable react/jsx-no-bind */
import React from "react";
import TechnicalError from "./TechnicalError";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errorInfo: null, error: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.error) {
      return (
        <TechnicalError
          error={this.state.error}
          errorInfo={this.state.errorInfo}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
