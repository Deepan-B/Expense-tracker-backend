import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET_KEY; // Replace with your own secret

export const authenticateToken = (req, res, next) => {
  // console.log(req.body);
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  // console.log(authHeader , token);

  if (!token)
    return res
      .sendStatus(401)
      .json({ message: "there is no token in the request" });

  try {
    const val = jwt.decode(token, JWT_SECRET);
    req.body.userId = val.userId;
    next();
  } catch (error) {
    return res
      .sendStatus(401)
      .json({ message: "invalid token", success: "false" });
  }
};
