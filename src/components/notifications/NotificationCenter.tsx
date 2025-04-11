import { useState } from "react";
import { Bell } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "exam" | "assignment" | "reminder";
  date: string;
  read: boolean;
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Upcoming Exam",
      message: "Mathematics exam scheduled for next week",
      type: "exam",
      date: "2024-03-20",
      read: false,
    },
    {
      id: "2",
      title: "Assignment Due",
      message: "Physics assignment due tomorrow",
      type: "assignment",
      date: "2024-03-16",
      read: false,
    },
  ]);

  const markAsRead = (notificationId: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const getNotificationStyle = (type: string) => {
    switch (type) {
      case "exam":
        return "bg-red-100 text-red-800";
      case "assignment":
        return "bg-yellow-100 text-yellow-800";
      case "reminder":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 p-4">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Stay updated with your schedule</CardDescription>
            </div>
            <div className="relative">
              <Bell className="h-6 w-6" />
              {notifications.some((n) => !n.read) && (
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full" />
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg ${
                  notification.read ? "opacity-60" : ""
                } ${getNotificationStyle(notification.type)}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{notification.title}</h3>
                  <span className="text-sm">{notification.date}</span>
                </div>
                <p className="text-sm mb-2">{notification.message}</p>
                {!notification.read && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => markAsRead(notification.id)}
                  >
                    Mark as Read
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
