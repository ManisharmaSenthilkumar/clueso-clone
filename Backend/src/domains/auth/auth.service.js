import bcrypt from "bcrypt";
import crypto from "crypto";
import db from "../../core/db/database.js";
import { signToken } from "../../core/security/jwt.service.js";

/**
 * Signup
 */
export const createUser = async ({ firstName, lastName, email, password }) => {
  const exists = db
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(email);

  if (exists) throw new Error("User already exists");

  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    id: crypto.randomUUID(),
    firstName,
    lastName,
    email,
    passwordHash,
    role: "user",
  };

  db.prepare(`
    INSERT INTO users (id, first_name, last_name, email, password_hash, role)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(
    user.id,
    user.firstName,
    user.lastName,
    user.email,
    user.passwordHash,
    user.role
  );

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
  };
};


/**
 * Login
 */
export const authenticateUser = async ({ email, password }) => {
  const user = db
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(email);

  if (!user) throw new Error("USER_NOT_FOUND");

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) throw new Error("WRONG_PASSWORD");

 const token = signToken({
  userId: user.id,
  workspaceId: "clueso-demo-workspace",
  email: user.email,
  role: user.role,
  firstName: user.first_name,
  lastName: user.last_name,
});

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
       firstName: user.first_name,
  lastName: user.last_name,
    },
  };
};
