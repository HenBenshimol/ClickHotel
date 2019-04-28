import * as mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: String,
  hotelName: String,
  type: String,
  openHour: String,
  closeHour: String,
  needDetails: Boolean,
  details: String
});

const Service = mongoose.model('service', serviceSchema);

export default Service;