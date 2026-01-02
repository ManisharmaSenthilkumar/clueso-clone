import Database from "better-sqlite3";
import path from "path";

const db = new Database(path.resolve("data.sqlite"));
db.pragma("foreign_keys = ON");

export default db;
