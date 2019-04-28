import Service from '../models/Service';
import BaseCtrl from './base';

export default class ServiceCtrl extends BaseCtrl {
  model = Service;

  // Get service type
  getServicesType = async (req, res) => {
    try {
      const obj = await this.model.distinct('type');
      console.log("type "+ obj);
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // Get by type
  getServicesByType = async (req, res) => {
    try {
      const obj = await this.model.find({ type: req.params.type });
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}
