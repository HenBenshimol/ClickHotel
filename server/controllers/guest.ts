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
      const obj = await this.model.find().map( function(item) { return item.age; } );
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Get all guest purpose
  getAllGuestPurpose = async (req, res) => {
    try {
      const obj = await this.model.find().map( function(item) { return item.guestPurpose; } );
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Get all guest family status
  getAllGuestStatus = async (req, res) => {
    try {
      const obj = await this.model.find().map( function(item) { return item.guestStatus; } );
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Get all guest vacation length
  getAllVacationLength = async (req, res) => {
    try {
      const obj = await this.model.find().map( function(item) {
         return item.checkoutDate.Day(); 
        } );
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

}
