import db from "../../core/db/database.js";

export const createFeedback = ({
  workspaceId,
  authorEmail,
  title,
  description,
}) => {
  db.prepare(`
    INSERT INTO feedback (
      workspace_id,
      author_email,
      title,
      description
    )
    VALUES (?, ?, ?, ?)
  `).run(workspaceId, authorEmail, title, description);
};

export const getAllFeedbackByWorkspace = (workspaceId) => {
  return db.prepare(`
    SELECT
      id,
      title,
      description,
      status,
      created_at,
      author_email
    FROM feedback
    WHERE workspace_id = ?
    ORDER BY created_at DESC
  `).all(workspaceId);
};
