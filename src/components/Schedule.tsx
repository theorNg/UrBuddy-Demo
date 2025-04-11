import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Event {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  type: "class" | "study" | "exam";
}

export function Schedule() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState<Partial<Event>>({
    title: "",
    startTime: "",
    endTime: "",
    type: "class",
  });

  const handleAddEvent = () => {
    if (date && newEvent.title && newEvent.startTime && newEvent.endTime) {
      const event: Event = {
        id: Math.random().toString(36).substr(2, 9),
        date: date,
        ...(newEvent as Omit<Event, "id" | "date">),
      };
      setEvents([...events, event]);
      setNewEvent({
        title: "",
        startTime: "",
        endTime: "",
        type: "class",
      });
    }
  };

  const getDayEvents = (day: Date) => {
    return events.filter(
      (event) => event.date.toDateString() === day.toDateString()
    );
  };

  return (
    <div className="flex gap-4 p-4">
      <div className="flex-1">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </div>

      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4">Events</h2>
        {date && (
          <>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">
                {date.toLocaleDateString()}
              </h3>
              {getDayEvents(date).map((event) => (
                <div
                  key={event.id}
                  className="p-2 mb-2 border rounded-md bg-gray-50"
                >
                  <h4 className="font-medium">{event.title}</h4>
                  <p className="text-sm text-gray-600">
                    {event.startTime} - {event.endTime}
                  </p>
                  <span className="text-xs bg-blue-100 px-2 py-1 rounded">
                    {event.type}
                  </span>
                </div>
              ))}
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button>Add Event</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Event</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newEvent.title}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, title: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={newEvent.startTime}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, startTime: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={newEvent.endTime}
                      onChange={(e) =>
                        setNewEvent({ ...newEvent, endTime: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select
                      value={newEvent.type}
                      onValueChange={(value: "class" | "study" | "exam") =>
                        setNewEvent({ ...newEvent, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="class">Class</SelectItem>
                        <SelectItem value="study">Study</SelectItem>
                        <SelectItem value="exam">Exam</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={handleAddEvent}>Save Event</Button>
                </div>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
    </div>
  );
}
