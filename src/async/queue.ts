import { withResolvers } from "radashi";

export type QueueTask<T, TResult> = {
  task: T;
  resolve: (result: TResult) => void;
  reject: (error: Error) => void;
};

export type IQCallback<TResult> = (err: Error | undefined, result: TResult) => void;
export type IQListener<T> = (err: Error, task: T) => void;

export type IQParams<T, TResult> = {
  input: T | T[];
  callback?: IQCallback<TResult>;
}

export interface Queue<T, TResult> {
  push: (tasks: T | T[], callback?: IQCallback<TResult>) => void;
  unshift: (tasks: T | T[], callback?: IQCallback<TResult>) => void;
  drain: {
    () : Promise<void>,
    (listener: () => void): void,
  };
  error: (listener: IQListener<T>) => void;
};


export function queue<T, TResult>(
  worker: (task: T) => TResult | PromiseLike<TResult>,
  concurrency: number,
): Queue<T, TResult> {

  // internal state
  const tasks: Array<{ task: T, callback?: IQCallback<TResult> }> = []; // FIFO butter
  let running = 0;
  let errorListener: IQListener<T> | null = null;
  let drainListener: (() => void) | null = null;
  let drainPromise = withResolvers<void>();

  // core scheduler
  const schedule = () => {
    while (running < concurrency && tasks.length > 0) {
      const item = tasks.shift()!;
      running++;

      processTask(item);
    }
    checkDrain();
  }

  const processTask = async (item: { task: T, callback?: IQCallback<TResult> }) => {
    try {
      const result = await worker(item.task);
      item.callback?.(undefined, result);
    }catch(err) {
      errorListener?.(err as Error, item.task);
      item.callback?.(err as Error, undefined as never);
    } finally {
      running--;
      schedule();
    }
  }

  const checkDrain = () => {
    if(running === 0 && tasks.length === 0) {
      drainListener?.();
      drainPromise.resolve();
      drainPromise = withResolvers<void>();
    }
  }


  // insert the task or 's to the queue 
  const push = (
    input: IQParams<T, TResult>["input"], 
    callback?: IQParams<T, TResult>["callback"]
  ) => {
    const items = Array.isArray(input) ? input : [input]
    if(items.length === 0) return;

    for(const task of items) {
      tasks.push({ task, ...(callback ? { callback } : {}) });
    }
    schedule();
  }

  // moves the task iteratively to the front from the back of the queue.
  const unshift = (
    input: IQParams<T, TResult>["input"], 
    callback?: IQParams<T, TResult>["callback"]
  ) => {
    const items = Array.isArray(input) ? input : [input];
    if(items.length === 0) return;

    for(let i = items.length - 1; i >= 0; i--) {
      tasks.unshift({ task: items[i], ...(callback ? { callback } : {}) });
    }
    schedule();
  }

  const drain = ((listener?: () => void) => {
    if(listener) {
      drainListener = listener;
      return;
    }
    return drainPromise.promise;
  }) as Queue<T, TResult>["drain"];

  const error = (listener: IQListener<T>) => {
    errorListener = listener;
  }

  return { push, unshift, drain, error };
}
