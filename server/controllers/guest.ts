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

  // Get all guest family status
  getAllGuestStatus = async (req, res) => {
    try {
      const arrGuestStatus = [];
      const obj = await this.model.find({},{guestStatus:1, _id:0});
      obj.forEach(element => {
        // convert Single to '0'
        if (element.guestStatus === 'Single') {
          arrGuestStatus.push(0);
        }
        // convert Married to '1'
        else if (element.guestStatus === 'Married') {
          arrGuestStatus.push(1);
        }
        // convert Family to '2'
        else if (element.guestStatus === 'Family') {
          arrGuestStatus.push(2);
        }
      });
      res.status(200).json(arrGuestStatus);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Get all guest purpose
  getAllGuestPurpose = async (req, res) => {
    try {
      const arrPurpose = [];
      const obj = await this.model.find({},{guestPurpose:1, _id:0});
      obj.forEach(element => {
        // convert Buisness to '3'
        if (element.guestPurpose === 'Buisness') {
          arrPurpose.push(3);
        }
        // convert Pleasure to '4'
        if (element.guestPurpose === 'Pleasure') {
          arrPurpose.push(4);
        }
      });
      res.status(200).json(arrPurpose);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }


  // Get all guest vacation length
  getAllVacationLength = async (req, res) => {
    try {
      const oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
      const vacationLength = [];

      const dates = await this.model.find({},{checkinDate:1, checkoutDate:1, _id:0});

      dates.forEach(element => {
        vacationLength.push( Math.round(
                              Math.abs((element.checkinDate.getTime() - element.checkoutDate.getTime())/(oneDay))));
      });
      res.status(200).json(vacationLength);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

}
