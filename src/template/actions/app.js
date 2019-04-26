module.exports = app => {
  return {
    read
  };

  /**
   * [Some action]
   * @param  {object}   req  Expresss request
   * @param  {object}   res  Expresss response
   * @param  {Function} next Next middleware
   * @return {Promise}       returned Promise
   */

  function read(req, res, next) {
    return res.success({});
  }
};