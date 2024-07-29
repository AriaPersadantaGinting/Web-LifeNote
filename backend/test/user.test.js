import supertest from "supertest";
import { app } from "../src/app/app.js";
import testUttils from "./test-uttils.js";
import { prismaClient } from "../src/app/database.js";
import userUtiils from "../src/utility/user-utiils.js";

describe("POST /api/lifenote/users", () => {
  afterEach(async () => {
    await testUttils.removeUserTest();
  });
  const url = "/api/lifenote/users";
  it("trying to register user", async () => {
    const result = await supertest(app)
      .post(url)
      .send({
        username: "example",
        email: `example ${Math.random() * 2}1@gmail.com`,
        password: "example",
      });
    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("example");
    expect(result.body.data.email).toBeDefined();
    expect(result.body.data.password).toBeUndefined();
  });
  it("reject if username register user is already exists", async () => {
    let result = await supertest(app)
      .post(url)
      .send({
        username: "example",
        email: `example ${Math.random() * 2}1@gmail.com`,
        password: "example",
      });
    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("example");
    expect(result.body.data.email).toBeDefined();
    expect(result.body.data.password).toBeUndefined();

    result = await supertest(app)
      .post(url)
      .send({
        username: "example",
        email: `example ${Math.random() * 5}1@gmail.com`,
        password: "example",
      });
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  }, 15000);
});

describe("POST /api/lifenote/users/login", () => {
  beforeEach(async () => {
    await testUttils.createUserTest();
  });
  afterEach(async () => {
    await testUttils.removeUserTest();
  });
  const url = "/api/lifenote/users/login";
  const userData = (username, password) => {
    const data = {
      username,
      password,
    };
    return data;
  };
  it("trying to login user", async () => {
    const result = await supertest(app)
      .post(url)
      .send(userData("example", "example"));
    expect(result.status).toBe(200);
    expect(result.body.data.token).toBeDefined();
    expect(result.body.data.token).not.toBe("token");
  });
  it("reject if username is wrong", async () => {
    const result = await supertest(app).post(url).send({
      username: "false",
      password: "example",
    });
    console.info(result.body);
    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
  it("reject if password is wrong", async () => {
    const result = await supertest(app).post(url).send({
      username: "example",
      password: "false",
    });
    console.info(result.body);
    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
  it("reject if login is invalid", async () => {
    const result = await supertest(app).post(url).send({
      username: "",
      password: "",
    });
    console.info(result.body);
    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/lifenote/users/current", () => {
  beforeEach(async () => {
    await testUttils.createUserTest();
  });
  afterEach(async () => {
    await testUttils.removeUserTest();
  });
  const url = "/api/lifenote/users/current";
  it("trying to get user", async () => {
    const result = await supertest(app).get(url).set("Authorization", "token");
    console.info(result.body);
    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("example");
    expect(result.body.data.email).toBeDefined();
    expect(result.body.data.password).toBeUndefined();
  });
  it("reject if get user invalid", async () => {
    const result = await supertest(app).get(url).set("Authorization", "false");

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("PATCH /api/lifenote/users/current", () => {
  beforeEach(async () => {
    await testUttils.createUserTest();
  });
  let user;
  afterEach(async () => {
    await prismaClient.user.delete({
      where: {
        username: user,
      },
    });
  });
  const url = "/api/lifenote/users/current";
  it("try to update user", async () => {
    const result = await supertest(app)
      .patch(url)
      .set("Authorization", "token")
      .send({
        username: "example11",
        password: "example134",
      });
    let as = await testUttils.getUserTest(result.body.data.username);
    user = as.username;
    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("example11");
    expect(result.body.data.password).toBeUndefined();
    expect(result.body.data.email).toBeDefined();
  });

  it("reject if update user invalid", async () => {
    const result = await supertest(app)
      .patch("/api/lifenote/users/current")
      .set("Authorization", "false")
      .send({
        username: "example11",
        password: "example13",
      });
    let as = await testUttils.getUserTest("example");
    user = as.username;
    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe("DELETE /api/lifenote/users/current", () => {
  beforeEach(async () => {
    await testUttils.createUserTest();
  });
  afterEach(async () => {
    await testUttils.removeUserTest();
  });
  const url = "/api/lifenote/users/current";
  it("try to logout", async () => {
    const result = await supertest(app)
      .delete(url)
      .set("Authorization", "token");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("logout user is successfully!.");
  });

  it("reject if try to logout invalid", async () => {
    const result = await supertest(app)
      .delete(url)
      .set("Authorization", "false");

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});
