const ReservationsService = require("../services/reservations_service");
const reservationsService = new ReservationsService();
const { checkToken } = require("../../middleware/authentication");

const createReservation = (req, res) => {
  try {
    checkToken(req, res, () => reservationsService.createReservation(req, res));
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

const getAllReservations = (req, res) => {
  try {
    checkToken(req, res, () =>
      reservationsService.getAllReservations(req, res)
    );
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

const getSingleRoomReservations = (req, res) => {
  try {
    checkToken(req, res, () =>
      reservationsService.getSingleRoomReservation(req, res)
    );
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

const deleteReservation = (req, res) => {
  try {
    checkToken(req, res, () => reservationsService.deleteReservation(req, res));
  } catch (error) {
    res.json({ status: false, message: error.message });
  }
};

module.exports = {
  getAllReservations,
  createReservation,
  getSingleRoomReservations,
  deleteReservation,
};
