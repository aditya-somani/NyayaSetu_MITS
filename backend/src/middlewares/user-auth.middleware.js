import jwt from "jsonwebtoken";

export const userMiddleware = (req, res, next) => {
  try {
    // Token extractor
    const getTokenFromRequest = (req) => {
      const cookieToken = req.cookies?.accessToken;
      const authHeader = req.headers?.authorization;
      const bearerToken = authHeader?.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null;

      return cookieToken || bearerToken || null;
    };

    const token = getTokenFromRequest(req); // ✅ assign the token

    console.log("Access Token:", token);
    console.log("Cookies:", req.cookies);

    if (!token) {
      return res.status(401).json({ message: "Access token missing" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_USER);

    if (!decoded || !decoded._id) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.userId = decoded._id;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
      error: error.message,
    });
  }
};
