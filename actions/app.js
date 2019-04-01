
module.exports = app => {
  const Company = app.models.Company;
  const User = app.models.User;

  return {
    read
  };

  function read(req, res, next) {
    return res.success({});
  }
};