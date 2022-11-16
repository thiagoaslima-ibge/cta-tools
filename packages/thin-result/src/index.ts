export type SuccessResponse<T> = {
  success: true;
  data: T
};

export type FailResponse<E> = {
  success: false;
  error: E;
};

export type Result<TData, TError = never> = SuccessResponse<TData> | FailResponse<TError>;

export function fail<T extends Error>(error: T): FailResponse<T> {
  return { success: false, error };
}

export function ok<T>(value: T): SuccessResponse<T>
export function ok(value?: undefined): SuccessResponse<undefined>
export function ok<T>(value?: T): SuccessResponse<T> | SuccessResponse<undefined> {
  if (isUndefined(value)) {
    return { success: true, data: value };
  }

  return { success: true, data: value };
}


export const asThrowable = <TData, TError>(result: Result<TData, TError>): TData => {
  if (result.success) {
    return result.data;
  }

  throw result.error;
};

function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}
