import crypto from "crypto";

export class User {
  constructor({ email, passwordHash, role = "user" }) {
    this.id = crypto.randomUUID();
    this.email = email;
    this.passwordHash = passwordHash;
    this.role = role;
    this.createdAt = new Date();
  }

  toSafeJSON() {
    return {
      id: this.id,
      email: this.email,
      role: this.role,
      createdAt: this.createdAt
    };
  }
}
