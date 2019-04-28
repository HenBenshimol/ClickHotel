import * as mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  serviceId: String,
  hotelName: String,
  roomId: String,
  userId: String,
  date: Date,
  startHour: String,
  details: String,
});

const Order = mongoose.model('Order', orderSchema);

export default Order;