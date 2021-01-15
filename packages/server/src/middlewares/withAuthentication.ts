export const withAuthentication = () => (req, res, next) => {
  if (!req.user) {
    return res.formatter.unauthorized('Unauthenticated');
  }

  return next();
};
