import { pendingResolve } from "./pendingPromise";
import type { PendingPromise, Task } from "./pendingPromise";

type TaskWithPath = Task & {
  path: string;
  asyncParam: (data: any) => {};
  formatter?: (data: any) => {};
};

const taskMap = new Map<string, PendingPromise<any>>();

let bigSearchinstance: SearchTask | null = null;
let smallSearchinstance: SearchTask | null = null;

// 是否需要异步回调
export const checkAsyncSearch = (data: any) => {
  return false;
};

class SearchTask {
  constructor(maxTaskCount: number = 2, expireTimeForce: boolean = false) {
    this.maxTaskCount = maxTaskCount;
    this.expireTimeForce = expireTimeForce;
  }
  // 是否覆盖过期时间
  private expireTimeForce: boolean;
  // 同时进行任务最大数量
  private maxTaskCount: number;
  // 当前进行任务的数量
  private curTaskCount: number = 0;
  // 等待队列
  private waittingTaskList: TaskWithPath[] = [];
  private runningTaskList: TaskWithPath[] = [];

  public addTask = (
    task: Omit<Task, "pending">,
    asyncParam: (data: any) => {},
    formatter?: (data: any) => {}
  ) => {
    const { excutor, param, taskType = "" } = task;
    const pending = pendingResolve<any>();
    // 加入等待队列，并记录当前页面地址
    this.waittingTaskList.push({
      pending,
      excutor,
      param,
      path: `${location.href}`,
      asyncParam,
      formatter,
      taskType,
    });

    if (taskType) {
      taskMap.set(taskType, pending);
    }
    this.dispatchTask();
    // 返回一个pending的promise
    return pending;
  };

  private dispatchTask = () => {
    // 执行队列不满，增加一些
    while (
      this.curTaskCount < this.maxTaskCount &&
      this.waittingTaskList.length > 0
    ) {
      const waitTask = this.waittingTaskList.shift();
      this.runningTaskList.push(waitTask as TaskWithPath);
      this.curTaskCount++;
    }
    // 把执行队列里面的全部执行
    while (this.runningTaskList.length > 0) {
      const nextTask = this.runningTaskList.shift();
      this.excuteTask(nextTask as TaskWithPath);
    }
  };

  private excuteTask = (nextTask: TaskWithPath) => {
    const {
      pending,
      excutor,
      path,
      asyncParam,
      formatter,
      taskType = "",
    } = nextTask as TaskWithPath;
    let { param } = nextTask as TaskWithPath;
    if (
      path !== `${location.href}` ||
      (taskMap.has(taskType) && taskMap.get(taskType) !== pending)
    ) {
      // 已经离开这个任务所在页面，不再执行
      // 有新的任务覆盖
      this.curTaskCount--;
      this.dispatchTask();
      return;
    }
    excutor(param).then(
      (data: any) => {
        if (data.state === 6 || data.state === 5 || !data.state) {
          let result: any;
          if (formatter && typeof formatter === "function") {
            result = formatter(data);
          } else {
            result = data;
          }
          if (path === `${location.href}`) {
            // 还在当前页面，同时没有新的相同任务，数据可以返回，否则忽略
            if (taskType) {
              if (taskMap.has(taskType) && taskMap.get(taskType) === pending) {
                pending.resolve(result);
                taskMap.delete(taskType);
              }
            } else {
              pending.resolve(result);
            }
          }
          this.curTaskCount--;
          this.dispatchTask();
        } else {
          setTimeout(() => {
            const asyncParamFinal = asyncParam(data);
            this.runningTaskList.push({
              pending,
              excutor,
              param: asyncParamFinal,
              path,
              asyncParam,
              formatter,
              taskType,
            });
            this.dispatchTask();
          }, 3000);
        }
      },
      (error: Error) => {
        pending.reject(error);
        this.curTaskCount--;
        this.dispatchTask();
      }
    );
  };
}

export const getSearchTaskInstance = (count: number = 2): SearchTask => {
  if (bigSearchinstance === null) {
    bigSearchinstance = new SearchTask(count, true);
  }
  return bigSearchinstance;
};

export const getSmallSearchTaskInstance = (): SearchTask => {
  if (smallSearchinstance === null) {
    smallSearchinstance = new SearchTask(Number.MAX_SAFE_INTEGER, true);
  }
  return smallSearchinstance;
};
