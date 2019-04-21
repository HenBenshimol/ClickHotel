import * as mongoose from 'mongoose';

const guestSchema = new mongoose.Schema({
  userId: String,
  hotelName: String,
  checkinDate: Date,
  checkoutDate: Date,
  roomNum: Number,
  activeGuest: Boolean
});

const Guest = mongoose.model('Guest', guestSchema);

export default Guest;
