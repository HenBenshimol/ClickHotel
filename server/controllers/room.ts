import Room from '../models/room';
import BaseCtrl from './base';

export default class RoomsCtrl extends BaseCtrl {
  model = Room;

  // Get room by id
  getRoomById = async (req, res) => {
    try {
      const obj = await this.model.findOne({ _id: req.params.roomId });
      console.log(obj);
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  getRandomRoom = async (req, res) => {
    try {
      const obj = await this.model.findOne({ hotelName: req.params.hotelName, availability: true });
      console.log('random ' + obj);
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  getRoomByUserId = async (req, res) => {
    try {
      const obj = await this.model.findOne({ userId: req.params.userId });
      console.log(obj);
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  getAvailableRoomByHotel = async (req, res) => {
    try {
      const obj = await this.model.findOne({ hotelName: req.params.hotelName });
      console.log(obj);
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

}
