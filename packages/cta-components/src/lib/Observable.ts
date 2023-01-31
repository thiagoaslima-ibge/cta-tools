export class Observable<
  EventMap extends { [key: string]: (event: CustomEvent) => unknown }
> extends EventTarget {
  public dispatchEvent(
    event: Parameters<EventMap[keyof EventMap]>[0]
  ): boolean {
    return super.dispatchEvent(event);
  }

  // @ts-expect-error addEventListener doesn't expect CustomEvent
  public addEventListener<T extends keyof EventMap>(
    type: T,
    callback: EventMap[T],
    options?: boolean | AddEventListenerOptions | undefined
  ): VoidFunction {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    super.addEventListener(type as string, callback as any, options);

    return () => {
      this.removeEventListener(type, callback, options);
    };
  }

  // @ts-expect-error addEventListenerremoveEventListener doesn't expect CustomEvent
  public removeEventListener<T extends keyof EventMap>(
    type: T,
    callback: EventMap[T],
    options?: boolean | AddEventListenerOptions | undefined
  ): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    super.removeEventListener(type as string, callback as any, options);
  }
}
