import * as _ from 'radashi';

describe("waterfall", () => {
  test("returns successful value when pass multiple functions", async () => {
    const fn1 = async (num: number) => num;
    const fn2 = async (num: number) => num + 1;
    const fn3 = async (num: number) => num + 2;

    const result = await _.waterfall([fn1, fn2, fn3], 2);    
    expect(result).toBe(5);
  });


  test("returning initial input when no functions are given", async () => {
    const result = await _.waterfall([], 3);
    expect(result).toBe(3);
  });


  test("single function successful return", async () => {
    const str = "Hello_Func";
    const fn = async () => str;

    const result = await _.waterfall([fn]);
    expect(result).toBe(str);
  });

  test("preserves the order of execution", async () => {
    const order: Array<number> = [];
    const orderResult = [1,2,3];

    const fn1 = async (n: number) => { order.push(1); return n + 1 };
    const fn2 = async (n: number) => { order.push(2); return n + 2 };
    const fn3 = async (n: number) => { order.push(3); return n + 3 };

    const result = await _.waterfall([fn1, fn2, fn3], 5);

    expect(order).toEqual(orderResult);
    expect(result).toBe(11);
  });

  test("propages errors immediately", async () => {
    const errMsg: string = "middle_failed";
    try {
      const fn1 = async (n: number) => n + 1;
      const errorFn = async (n: number) => { throw new Error(errMsg) };
      const initialVal: number = 8;

      await _.waterfall([fn1, errorFn, fn1], initialVal);
      expect.fail("should have thrown");
    } catch(err) {
      expect((err as Error).message).toBe(errMsg)
    }
  });

  /** 
  test("works with async sleep operations", async () => {
    vi.useFakeTimers();

    const fn1 = async (n: number) => { await _.sleep(10); return n + 1 };
    const fn2 = async (n: number) => { await _.sleep(10); return n + 2 };

    await vi.advanceTimersByTimeAsync(200);
    const result = await _.waterfall([fn1, fn2], 5);

    expect(result).toBe(8);
  });
  **/
});
