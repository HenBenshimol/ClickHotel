import * as mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  name: String,
  location: String,
  details: String,
  image: String
});

const Hotel = mongoose.model('Hotel', hotelSchema);

export default Hotel;
