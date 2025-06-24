export const validateWithJoi = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: true });
  if (error) {
    return res.status(400).json({
      status: false,
      message: "Validation error",
      errors: error?.details?.map((err) => ({
        field: err.path[0],
        message: err.message,
      })),
    });
  }
  next();
};
