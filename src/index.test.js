import { unstable_dev } from "wrangler";
import { describe, expect, it, beforeAll, afterAll } from "vitest";

describe("Worker", () => {
  let worker;

  beforeAll(async () => {
    worker = await unstable_dev("src/index.js", {
      experimental: { disableExperimentalWarning: true },
    });
  });

  afterAll(async () => {
    await worker.stop();
  });

  it("should redirect to another site", async () => {
    const res = await worker.fetch("", { redirect: "manual" });
    expect(res.status).toEqual(302);
  });
});
