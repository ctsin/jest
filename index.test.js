const fn = (bool = true) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      bool ? resolve("peanut!") : reject("Error Happened!");
    }, 100);
  });

describe("Asynchronous in Jest", () => {
  it("Promise with 'done'", (done) => {
    fn().then((data) => {
      expect(data).toBe("peanut!");
      done();
    });
  });

  it("Promise resolved with return promise", () => {
    return fn().then((data) => {
      expect(data).toBe("peanut!");
    });
  });

  it("Promise rejected with return promise", () => {
    return fn(false).catch((err) => {
      expect(err).toBe("Error Happened!");
    });
  });

  it("Async/Await", async () => {
    const data = await fn();
    expect(data).toBe("peanut!");
  });

  it("Async/Await with an error", async () => {
    try {
      await fn(false);
    } catch (error) {
      expect(error).toBe("Error Happened!");
    }
  });

  it("Async/Await combined with '.resolves'", async () => {
    await expect(fn()).resolves.toBe("peanut!");
  });

  it("Async/Await with an error combined with '.rejects", async () => {
    await expect(fn(false)).rejects.toBe("Error Happened!");
  });
});
