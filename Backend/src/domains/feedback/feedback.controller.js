import * as service from "./feedback.service.js";

export const addFeedback = (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Title and description required" });
  }

 service.createFeedback({
  workspaceId: req.user.workspaceId,
  authorEmail: req.user.email,
  title,
  description,
});



  res.status(201).json({ message: "Feedback created" });
};

export const listFeedback = (req, res) => {
  const feedback = service.getAllFeedbackByWorkspace(req.user.workspaceId);
  res.json(feedback);
};
