import db from "./database.js";

/* USERS = workspace owners */
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role TEXT DEFAULT 'owner',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();


/* FEEDBACK = many users → one workspace */
db.prepare(`
  CREATE TABLE IF NOT EXISTS feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    workspace_id TEXT NOT NULL,
    author_email TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    status TEXT DEFAULT 'open',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (workspace_id) REFERENCES users(id)
  )
`).run();

/* AI INSIGHTS = aggregated per workspace */
db.prepare(`
  CREATE TABLE IF NOT EXISTS insights (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    workspace_id TEXT NOT NULL,
    summary TEXT,
    themes TEXT,
    generated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (workspace_id) REFERENCES users(id)
  )
`).run();

/* ✅ SEED WORKSPACE OWNER (THIS FIXES EVERYTHING) */
const WORKSPACE_ID = "clueso-demo-workspace";

const workspaceExists = db
  .prepare("SELECT id FROM users WHERE id = ?")
  .get(WORKSPACE_ID);

if (!workspaceExists) {
  db.prepare(`
  INSERT INTO users (
    id,
    email,
    password_hash,
    first_name,
    last_name,
    role
  )
  VALUES (?, ?, ?, ?, ?, ?)
`).run(
  WORKSPACE_ID,
  "workspace@clueso.io",
  "workspace",        // dummy password
  "Workspace",        // first_name
  "Admin",            // last_name
  "owner"
);

}

console.log("✅ Database initialized (workspace model)");
