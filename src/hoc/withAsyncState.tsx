import React, { useEffect } from 'react';
import { SerializedError } from '@reduxjs/toolkit';
import { Skeleton } from 'antd';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { ERequestStatus } from '../common/request';

type StateProps = {
  status: ERequestStatus;
  error: SerializedError | null;
};

type ActionCreatorFunction = any;

type SelectorFunction = (state: any) => StateProps;

type FallbackProps = {
  error?: string;
};

const DefaultLoadingComponent = () => <Skeleton active />;
const DefaultErrorComponent = ({ error = 'Ooops, an error occured!' }: FallbackProps) => (
  <div>Error: {error}</div>
);

export function withAsyncState<T extends { id?: string }>(
  WrappedComponent: React.ComponentType<any>,
  actionCreator: ActionCreatorFunction,
  selectAsyncState: SelectorFunction,
  LoadingComponent: React.ComponentType = DefaultLoadingComponent,
  ErrorComponent: React.ComponentType<FallbackProps> = DefaultErrorComponent,
): React.FC<T> {
  const WithAsyncState = (props: T) => {
    const dispatch = useAppDispatch();
    const { status, error } = useAppSelector(selectAsyncState);

    const { id } = props;

    useEffect(() => {
      dispatch(id ? actionCreator(id) : actionCreator());
    }, [id, dispatch, actionCreator]);

    if (status === ERequestStatus.LOADING) {
      return <LoadingComponent />;
    }

    if (status === ERequestStatus.FAILED) {
      return <ErrorComponent error={error?.message} />;
    }

    return <WrappedComponent {...props} />;
  };

  return WithAsyncState;
}
