const UserServices = require("../services/user_services");
const userServices = new UserServices();

const loginClientMySql = (req, res) => {
  try {
    userServices.loginClientService(req, res);
  } catch (error) {
    res.json({
      status: false,
      msg: error.message,
    });
  }
};

const registerClientInMySql = async (req, res) => {
  await userServices.findOneUser(req, res, async () => {
    try {
      await userServices.registerClientService(req, res);
    } catch (error) {
      res.json({
        status: false,
        msg: error.message,
      });
    }
  });
};

module.exports = {
  registerClientInMySql,
  loginClientMySql,
};
