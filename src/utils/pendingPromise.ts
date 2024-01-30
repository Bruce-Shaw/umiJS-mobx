export type PendingPromise<T> = Promise<T> & {
  resolve: (T?: any) => void;
  reject: (e: Error) => void;
};

export const pendingResolve = <T>() => {
  const container = {} as any;
  container.p = new Promise((r, j) => ([container.r, container.j] = [r, j]));
  return container.p as PendingPromise<T>;
};

export type Task = {
  pending: PendingPromise<any>; // 立刻返回的pending promise
  excutor: (param: any) => Promise<any>; // 等待执行的函数
  param: any; // 等待执行的函数入参
  taskType?: string;
};
