const { checkToken } = require("../../middleware/authentication");
const ArchiveService = require("../services/archive_service");
const archiveService = new ArchiveService();

const getArchive = (req, res) => {
  try {
    checkToken(req, res, () => archiveService.getArchiveService(req, res));
  } catch (error) { 
    res.json({
      status: false,
      msg: "Token is invalid",
    });
  }
};

const deleteArchiveItem = (req, res) => {
  try {
    checkToken(req, res, () =>
      archiveService.deleteArchiveItemService(req, res)
    );
  } catch (error) {
    res.json({
      status: false,
      msg: "Token is invalid",
    });
  }
};

const purgeArchive = (req, res) => {
  try {
    checkToken(req, res, () => archiveService.purgeArchive(req, res));
  } catch (error) {
    res.json({
      status: false,
      msg: "Token is invalid",
    });
  }
};

module.exports = {
  getArchive,
  deleteArchiveItem,
  purgeArchive,
};
