import React, { Component, ErrorInfo, ReactNode } from 'react';
import Error from 'components/Common/Error';

interface IProps {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<IProps, State> {
  constructor(props: IProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return <Error text="Что-то пошло не так" />;
    }

    return children;
  }
}

export default ErrorBoundary;
