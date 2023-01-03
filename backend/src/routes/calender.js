import {EventModel, CalendarModel} from "../models/calender"

exports.createCalendarEvent = async (req, res) => {
    const body = req.body;
    const newEvent = await new EventModel({name: body.name, interval: body.interval,time: body.time, type: body.type, status: body.status, color: body.color, stdEventStart: body.stdEventStart, stdEventEnd: body.stdEventEnd}).save()
    let calendarUser = await CalendarModel.findOne({id: body.id})
    if(!calendarUser)
       await new CalendarModel({id: body.id}).save()
       await CalendarModel.updateOne(
        {id: body.id},
        {$push: {events: newEvent}}
    )
    await res.send({msg: "done"})
  };

exports.deleteCalendarEvent = async (req, res)=>{
    const body = req.body;
    console.log(body)
    let event = await EventModel.findOne({$and :[{name: body.name}, {stdEventEnd: body.stdEventEnd}, {stdEventStart: body.stdEventStart}]})
    let eventID = event._id.toString()
    var ObjectId = require('mongodb').ObjectId;    
    var o_id = new ObjectId(eventID);
    const eventInCalendar = await CalendarModel.findOneAndUpdate(
        {id: body.id},
        {$pull: {events: o_id}}
    )
    await EventModel.deleteOne(event);
    await res.send({msg: "deleted"})
}



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

exports.checkEventCounted = async (req, res) => {
    const id = req.body.params.id
    let calendarUser = await CalendarModel.findOne({id: id})
    if(!calendarUser){
        await new CalendarModel({id: id}).save();
        await res.send({msg: "new User", eventTotalTime: 0})
    }
    else{
        let eventArr = calendarUser.events
        let eventTotalTime = 0
        for (let i = 0; i<eventArr.length; i++){
            let event = await EventModel.findOne({_id: eventArr[i]})
            let now = new Date()
            let end = new Date(event.stdEventEnd)
            if(end < now && event.status === false){
                console.log("happened")
                await EventModel.findOneAndUpdate({_id: eventArr[i]}, {status: true})
                eventTotalTime += event.interval
            }
        }
        await res.send({msg: "event Checked", eventTotalTime: eventTotalTime})
    }

}