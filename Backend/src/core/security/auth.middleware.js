import { verifyJwt } from "./jwt.service.js";

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(401).json({
      message: "Authorization format must be Bearer <token>",
    });
  }

  try {
    const decoded = verifyJwt(token);

    // 🔍 TEMP DEBUG (keep for now)
    console.log("🧠 JWT payload:", decoded);

 req.user = {
  userId: decoded.sub,
  workspaceId: decoded.workspaceId,
  email: decoded.email,
  role: decoded.role,
  firstName: decoded.firstName,
  lastName: decoded.lastName,
};


    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
