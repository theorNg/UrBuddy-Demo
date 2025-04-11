"use client";

import { useState } from "react";
import { Schedule } from "@/components/Schedule";
import { StudyPlan } from "@/components/StudyPlan";
import { GPAPrediction } from "@/components/GPAPrediction";
import { CustomPackage } from "@/components/CustomPackage";
import { ChatInterface } from "@/components/ChatInterface";
import { AdminDashboard } from "@/components/AdminDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardPage() {
  const [userRole] = useState<"student" | "admin">("student"); // This would come from auth context in a real app

  if (userRole === "admin") {
    return <AdminDashboard />;
  }

  return (
    <div className="container mx-auto py-6">
      <Tabs defaultValue="schedule" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="study-plan">Study Plan</TabsTrigger>
          <TabsTrigger value="gpa">GPA Prediction</TabsTrigger>
          <TabsTrigger value="chat">AI Chat</TabsTrigger>
          <TabsTrigger value="package">Custom Package</TabsTrigger>
        </TabsList>
        <TabsContent value="schedule">
          <Schedule />
        </TabsContent>
        <TabsContent value="study-plan">
          <StudyPlan />
        </TabsContent>
        <TabsContent value="gpa">
          <GPAPrediction />
        </TabsContent>
        <TabsContent value="chat">
          <ChatInterface />
        </TabsContent>
        <TabsContent value="package">
          <CustomPackage />
        </TabsContent>
      </Tabs>
    </div>
  );
}
