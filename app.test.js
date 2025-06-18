const request = require("supertest");
//const express = require("express");
const mongoose = require("mongoose");
//const authRoutes = require("./routes/auth");
const app = require("./index");
require("dotenv").config();

//const app = express();
//app.use(express.json());
//app.use("/api/auth", authRoutes);

// Add this line here to debug Mongo URI
//console.log("Connecting to MongoDB:", process.env.MONGO_URI);

// Connect to your existing DB before tests
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

//TEST CASE: User Registration
describe("POST /api/auth/register", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      username: `testuser`,
      email: `testuser@example.com`,
      password: "testpass123",
      role: "manager",
    });

    // Log response for debugging
    console.log("TEST RESPONSE:", res.body);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User registered successfully");
  });
});
