import * as mongoose from 'mongoose';

const guestSchema = new mongoose.Schema({
  userId: String,
  hotelName: String,
  checkinDate: Date,
  checkoutDate: Date,
  roomId: String,
  activeGuest: Boolean,
  ID: String,
  age: String,
  fullName: String,
  guestStatus: String,
  guestPurpose: String,
  guestNumber: Number
});

const Guest = mongoose.model('Guest', guestSchema);

export default Guest;
