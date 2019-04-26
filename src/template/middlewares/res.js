module.exports = (req, res, next) => {
  res.success = (data) => {
    if (!data) {
      return res.status(204).send()
    }
    return res.json(data);
  };

  res.error = (error) => {
    if (!error.code) {
      return res.status(500).send({ name: "error", message: error.toString() });
    }
    const {code, name, message} = error;
    return res.status(code).send({ name: name, message: message || "" });
  };

  next();
};