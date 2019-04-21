import * as mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  hotelName: String,
  roomNum: Number,
  location: String,
  details: String,
  availability: Boolean
});

const Room = mongoose.model('Room', roomSchema);

export default Room;
