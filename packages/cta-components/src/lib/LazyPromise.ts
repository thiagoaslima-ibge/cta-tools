export class LazyPromise<T> {
    #promiseExecutor: (resolve: (value: T) => void, reject: (reason?: unknown) => void) => void;
    #promise?: Promise<T>;

    constructor(
        executor: (resolve: (value: T) => void, reject: (reason?: unknown) => void) => void
    ) {
        if (typeof executor !== 'function') {
            throw new TypeError(`LazyPromise executor is not a function`);
        }
        this.#promiseExecutor = executor;
    }

	static resolve<T>(value: T) {
		return new LazyPromise<T>(resolve => {
			resolve(value);
		});
	}

	static reject<T>(error: T) {
		return new LazyPromise<T>((_resolve, reject) => {
			reject(error);
		});
	}

	then<Response, Reject = unknown>(
        onfulfilled: ((value: T) => Response | PromiseLike<Response>) | undefined | null, 
        onrejected?: ((reason: unknown) => Reject)
    ): Promise<Response | Reject> {
		this.#promise = this.#promise || new Promise<T>(this.#promiseExecutor);
		return this.#promise.then(onfulfilled, onrejected);
	}

	catch<Reject = unknown>(onrejected?: ((reason: unknown) => Reject)): Promise<T | Reject> {
		this.#promise = this.#promise || new Promise(this.#promiseExecutor);
		return this.#promise.catch(onrejected);
	}
}
