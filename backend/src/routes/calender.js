import {EventModel, CalendarModel} from "../models/calender"

exports.createCalendarEvent = async (req, res) => {
    const body = req.body;
    const newEvent = await new EventModel({name: body.name, time: body.time, type: body.type, color: body.color, stdEventStart: body.stdEventStart, stdEventEnd: body.stdEventEnd}).save()
    let calendarUser = await CalendarModel.findOne({id: body.id})
    if(!calendarUser)
       await new CalendarModel({id: body.id}).save()
       await CalendarModel.updateOne(
        {id: body.id},
        {$push: {events: newEvent}}
    )
    await res.send({msg: "done"})
  };

exports.getCalendarEvent = async (req, res) => {
    const id = req.query.id;
    let calendarUser = await CalendarModel.findOne({id: id})
    console.log(!calendarUser)
    console.log("hello")
    if(!calendarUser){
        await new CalendarModel({id: id}).save();
        await res.send({msg: "new User", events: calendarUser})
    }
    else{
        await res.send({events: await calendarUser.populate('events'), msg: "get Event"})
    }
}