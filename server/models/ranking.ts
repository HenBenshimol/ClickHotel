import * as mongoose from 'mongoose';

const rankingSchema = new mongoose.Schema({
  userId: String,
  hotelName: String,
  roomId: String,
  checkinDate: Date,
  checkoutDate: Date,
  comment: String,
  rate: Number
});

const Ranking = mongoose.model('Ranking', rankingSchema);

export default Ranking;
