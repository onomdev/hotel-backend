const ArchiveJobs = require("../jobs/archive_jobs");
const archiveJobs = new ArchiveJobs();
class ArchiveService {
  getArchiveService(req, res) {
    archiveJobs.getArchiveJobs(req, res);
  }

  deleteArchiveItemService(req, res) {
    archiveJobs.deleteArchiveItemJobs(req, res);
  }

  purgeArchive(req, res) {
    archiveJobs.purgeArchiveJobs(req, res);
  }
}

module.exports = ArchiveService;
