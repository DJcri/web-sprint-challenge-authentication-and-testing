// Write your tests here
const request = require("supertest");
const db = require("../data/dbConfig.js");
const server = require("./server.js");
const jokes = require("../api/jokes/jokes-data");

const fakeUser = { username: "user001", password: "1234" };

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

beforeEach(async () => {
  await db("users").truncate();
});

afterAll(async () => {
  await db.destroy();
});

it("correct env", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

describe("server", () => {
  describe("[POST] /api/auth/login", () => {
    it("responds with 200", async () => {
      await request(server).post("/api/auth/register").send(fakeUser);
      let res;
      res = await request(server).post("/api/auth/login").send(fakeUser);
      expect(res.status).toBe(200);
    });
    it("resopnds with token", async () => {
      await request(server).post("/api/auth/register").send(fakeUser);
      let res;
      res = await request(server).post("/api/auth/login").send(fakeUser);
      expect(res.body.token).toBeTruthy();
    });
  });
  describe("[POST] /api/auth/register", () => {
    it("responds with newly created user", async () => {
      let res;
      res = await request(server).post("/api/auth/register").send(fakeUser);
      expect(res.body.username).toEqual(fakeUser.username);
    });
    it("password isn't exposed in db", async () => {
      let res;
      res = await request(server).post("/api/auth/register").send(fakeUser);
      expect(res.body.password).not.toEqual(fakeUser.password);
    });
  });
});
