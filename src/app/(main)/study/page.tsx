"use client";

import { StudyPlan } from "@/components/StudyPlan";
import { GPAPrediction } from "@/components/GPAPrediction";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function StudyPage() {
  return (
    <div className="container mx-auto py-6">
      <Tabs defaultValue="plan" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="plan">Study Plan</TabsTrigger>
          <TabsTrigger value="gpa">GPA Prediction</TabsTrigger>
        </TabsList>
        <TabsContent value="plan">
          <StudyPlan />
        </TabsContent>
        <TabsContent value="gpa">
          <GPAPrediction />
        </TabsContent>
      </Tabs>
    </div>
  );
}
