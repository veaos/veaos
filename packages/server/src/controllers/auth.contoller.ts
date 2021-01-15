export const me = (req, res) => {
  res.formatter.ok(req.user);
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(process.env.PORTAL_URL);
};
