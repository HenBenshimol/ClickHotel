import Guest from '../models/guest';
import BaseCtrl from './base';
import {forEach} from '@angular/router/src/utils/collection';

export default class GuestCtrl extends BaseCtrl {
  model = Guest;

  // Get by user id
  getGuestByUserId = async (req, res) => {
    try {
      const obj = await this.model.find({ userId: req.params.userId });
      console.log(obj);
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Get active guest by user id
  getActiveGuest = async (req, res) => {
    try {
      const obj = await this.model.findOne({ userId: req.params.userId, activeGuest: true });
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Get all guest ages
  getAllGuestAge = async (req, res) => {
    try {
      var arrAges= [];
      const obj = await this.model.find({},{age:1, _id:0});
      obj.forEach(element => {
        arrAges.push(element.age);
      });
      res.status(200).json(arrAges);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Get all guest purpose
  getAllGuestPurpose = async (req, res) => {
    try {
      var arrPurpose= [];
      const obj = await this.model.find({},{guestPurpose:1, _id:0});
      obj.forEach(element => {
        arrPurpose.push(element.guestPurpose);
      });
      res.status(200).json(arrPurpose);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Get all guest family status
  getAllGuestStatus = async (req, res) => {
    try {
      var arrGuestStatus= [];
      const obj = await this.model.find({},{guestStatus:1, _id:0});
      obj.forEach(element => {
        arrGuestStatus.push(element.guestStatus);
      });
      res.status(200).json(arrGuestStatus);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Get all guest vacation length
  getAllVacationLength = async (req, res) => {
    try {
      var dateIn= [];
      var dateOut= [];

      const checkinDate = await this.model.find({},{checkinDate:1, _id:0});
      const checkoutDate = await this.model.find({},{checkoutDate:1, _id:0});
      
      checkinDate.forEach(element => {
        dateIn.push(element.checkinDate.Day());
      });

      checkoutDate.forEach(element => {
        dateOut.push(element.checkoutDate.Day());
      });

      const dayDiff = [];
      const timeDiff = [];

      for (let i = 0 ; i < dateIn.length; i++) {
        timeDiff[i] = Math.abs(dateOut[i].getTime() - dateIn[i].getTime());
        dayDiff[i] = Math.ceil(timeDiff[i] / (1000 * 3600 * 24));
      }
      res.status(200).json(dayDiff);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

}
