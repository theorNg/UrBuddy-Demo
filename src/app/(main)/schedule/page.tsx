"use client";

import { Schedule } from "@/components/Schedule";
import { NotificationCenter } from "@/components/notifications/NotificationCenter";

export default function SchedulePage() {
  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Schedule />
        </div>
        <div>
          <NotificationCenter />
        </div>
      </div>
    </div>
  );
}
