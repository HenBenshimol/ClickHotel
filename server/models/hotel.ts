import * as mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  name: String,
  location: String,
  lat: Number,
  lng: Number,
  description: String,
  phone: String,
  gymOpen: String,
  gymClose: String,
  poolOpen: String,
  poolClose: String,
  resturantOpen: String,
  resturantClose: String,
  spaOpen: String,
  spaClose: String,
  attractionBoardImage: String,
  hotelImage: String,
  hotelMap: String
});

const Hotel = mongoose.model('Hotel', hotelSchema);

export default Hotel;
