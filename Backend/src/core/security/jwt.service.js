import jwt from "jsonwebtoken";

export const signToken = ({
  userId,
  workspaceId,
  email,
  role,
  firstName,
  lastName,
}) => {
  return jwt.sign(
    {
      sub: userId,            // 👈 user identity
      workspaceId,            // 👈 shared workspace
      email,
      role,
      firstName,
      lastName,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

export const verifyJwt = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

/**
 * Express middleware for protected routes
 */
export const verifyAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Authorization header missing",
    });
  }

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(401).json({
      message: "Authorization format must be Bearer <token>",
    });
  }

  try {
    const decoded = verifyJwt(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};
