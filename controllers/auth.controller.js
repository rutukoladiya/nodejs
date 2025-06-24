import { verifyRefreshToken, generateAccessToken } from "../utils/token.util.js";

export const refershAccessToken = (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      const err = new Error("Refresh Token Missing!");
      err.status(401);
      return next(err);
    }

    const decoded = verifyRefreshToken(refreshToken);
    const newAccessToken = generateAccessToken({
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    });

    res.status(200).json({
      status: true,
      message: "Access token refreshed successfully",
      token: newAccessToken,
    });
  } catch (err) {
    err.status = 403;
    return next(err);
  }
};
