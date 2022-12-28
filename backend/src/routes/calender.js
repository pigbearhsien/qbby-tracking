import {EventModel, CalendarModel} from "../models/calender"

exports.createCalendarEvent = async (req, res) => {
    const body = req.body;
    const newEvent = new EventModel({name: body.name, time: body.time, type: body.type}).save()
    new CalendarModel({id: body.id, events: [...events, newEvent]}).save()
  };