import React, { useEffect } from 'react';
import { SerializedError } from '@reduxjs/toolkit';
import { Skeleton } from 'antd';
import { ERequestStatus } from '../common/request';

type StateProps = {
  status: ERequestStatus;
  error: SerializedError | null;
};

type FallbackProps = {
  error?: string;
};

const DefaultLoadingComponent = () => <Skeleton active />;
const DefaultErrorComponent = ({ error = 'Ooops, an error occured!' }: FallbackProps) => (
  <div>Error: {error}</div>
);

export function withAsyncState<T extends { id?: string }>(
  WrappedComponent: JSX.Element,
  isLoading: boolean,
  error: any,
  LoadingComponent: React.ComponentType = DefaultLoadingComponent,
  ErrorComponent: React.ComponentType<FallbackProps> = DefaultErrorComponent,
): React.FC<T> {
  const WithAsyncState = (props: T) => {
    if (isLoading) {
      return <LoadingComponent />;
    }

    if (error) {
      return <ErrorComponent error={error?.message} />;
    }

    return WrappedComponent;
  };

  return WithAsyncState;
}
