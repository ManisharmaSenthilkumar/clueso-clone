import { createUser, authenticateUser } from "./auth.service.js";
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


export const signup = async (req, res) => {
  try {
    const { password } = req.body;

    if (!PASSWORD_REGEX.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters with uppercase, lowercase, number, and special character",
      });
    }

    await createUser(req.body);
    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


export const login = async (req, res) => {
  try {
    const result = await authenticateUser(req.body);
    return res.status(200).json(result);

  } catch (err) {
    console.error("LOGIN ERROR:", err);

    // 🔥 VERY IMPORTANT: always return a response
    if (err.message === "USER_NOT_FOUND") {
      return res.status(404).json({
        message: "No account found with this email",
      });
    }

    if (err.message === "WRONG_PASSWORD") {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
