import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface StudyTask {
  id: string;
  subject: string;
  duration: number;
  priority: "high" | "medium" | "low";
  completed: boolean;
}

export function StudyPlan() {
  const [tasks, setTasks] = useState<StudyTask[]>([]);
  const [newTask, setNewTask] = useState<Partial<StudyTask>>({
    subject: "",
    duration: 30,
    priority: "medium",
  });

  const handleAddTask = () => {
    if (newTask.subject && newTask.duration) {
      const task: StudyTask = {
        id: Math.random().toString(36).substr(2, 9),
        subject: newTask.subject,
        duration: newTask.duration,
        priority: newTask.priority || "medium",
        completed: false,
      };
      setTasks([...tasks, task]);
      setNewTask({ subject: "", duration: 30, priority: "medium" });
    }
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const calculateTotalDuration = () => {
    return tasks.reduce((total, task) => total + task.duration, 0);
  };

  return (
    <div className="space-y-6 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Study Plan</CardTitle>
          <CardDescription>
            Create and manage your personalized study plan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={newTask.subject}
                  onChange={(e) =>
                    setNewTask({ ...newTask, subject: e.target.value })
                  }
                  placeholder="Enter subject name"
                />
              </div>
              <div>
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  min="5"
                  step="5"
                  value={newTask.duration}
                  onChange={(e) =>
                    setNewTask({ ...newTask, duration: Number(e.target.value) })
                  }
                />
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={newTask.priority}
                  onValueChange={(value: "high" | "medium" | "low") =>
                    setNewTask({ ...newTask, priority: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleAddTask}>Add Task</Button>
          </div>

          {tasks.length > 0 && (
            <div className="mt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Study Tasks</h3>
                <span className="text-sm text-muted-foreground">
                  Total Duration: {calculateTotalDuration()} minutes
                </span>
              </div>
              <div className="space-y-2">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 bg-muted rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTaskCompletion(task.id)}
                        className="h-4 w-4"
                      />
                      <span
                        className={
                          task.completed ? "line-through text-gray-500" : ""
                        }
                      >
                        {task.subject}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground">
                        {task.duration} min
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-xs ${getPriorityColor(
                          task.priority
                        )}`}
                      >
                        {task.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
