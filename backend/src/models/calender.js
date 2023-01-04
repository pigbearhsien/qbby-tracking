import mongoose from 'mongoose'
const Schema = mongoose.Schema;

/******* Event Schema *******/
const EventSchema = new Schema({
  name: {type: String, required: [true, 'Name field is required.'] },
  interval: {type: Number, required: [true, 'Interval field is required']}, // minutes
  status: {type: Boolean, required: [true, 'Status field is required']},
  type: {type: String, required: [true, 'Type field is required.'] },
  time: {type: String, required: [true, 'Time field is required.'] },
  color: {type: String, required: [true, 'Time field is required.'] },
  stdEventStart: {type: String, required: [true, 'Time field is required.'] },
  stdEventEnd: {type: String, required: [true, 'Time field is required.'] },
});

const EventModel = mongoose.model('Event', EventSchema);

/******* Calendar Schema *******/
const CalendarSchema = new Schema({
  id: { type: String, required: [true, 'id field is required.'] },
  events: [{ type: mongoose.Types.ObjectId, ref: 'Event' }],
});

const CalendarModel = mongoose.model('Calendar', CalendarSchema);

export {EventModel, CalendarModel};