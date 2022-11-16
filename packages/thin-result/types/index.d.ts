export declare type SuccessResponse<T> = {
    success: true;
    data: T;
};
export declare type FailResponse<E> = {
    success: false;
    error: E;
};
export declare type Result<TData, TError = never> = SuccessResponse<TData> | FailResponse<TError>;
export declare function fail<T extends Error>(error: T): FailResponse<T>;
export declare function ok<T>(value: T): SuccessResponse<T>;
export declare function ok(value?: undefined): SuccessResponse<undefined>;
export declare const asThrowable: <TData, TError>(result: Result<TData, TError>) => TData;
//# sourceMappingURL=index.d.ts.map