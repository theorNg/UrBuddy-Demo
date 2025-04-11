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

interface Course {
  name: string;
  credits: number;
  expectedGrade: number;
}

export function GPAPrediction() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [newCourse, setNewCourse] = useState<Course>({
    name: "",
    credits: 0,
    expectedGrade: 0,
  });
  const [predictedGPA, setPredictedGPA] = useState<number | null>(null);

  const handleAddCourse = () => {
    if (
      newCourse.name &&
      newCourse.credits > 0 &&
      newCourse.expectedGrade > 0
    ) {
      setCourses([...courses, newCourse]);
      setNewCourse({ name: "", credits: 0, expectedGrade: 0 });
    }
  };

  const calculateGPA = () => {
    if (courses.length === 0) return;

    const totalCredits = courses.reduce(
      (sum, course) => sum + course.credits,
      0
    );
    const weightedSum = courses.reduce(
      (sum, course) => sum + course.credits * course.expectedGrade,
      0
    );
    setPredictedGPA(Number((weightedSum / totalCredits).toFixed(2)));
  };

  return (
    <div className="space-y-6 p-4">
      <Card>
        <CardHeader>
          <CardTitle>GPA Prediction</CardTitle>
          <CardDescription>
            Add your courses and expected grades to predict your GPA
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="courseName">Course Name</Label>
                <Input
                  id="courseName"
                  value={newCourse.name}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="credits">Credits</Label>
                <Input
                  id="credits"
                  type="number"
                  min="0"
                  value={newCourse.credits || ""}
                  onChange={(e) =>
                    setNewCourse({
                      ...newCourse,
                      credits: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="grade">Expected Grade (0-4)</Label>
                <Input
                  id="grade"
                  type="number"
                  min="0"
                  max="4"
                  step="0.1"
                  value={newCourse.expectedGrade || ""}
                  onChange={(e) =>
                    setNewCourse({
                      ...newCourse,
                      expectedGrade: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>
            <Button onClick={handleAddCourse}>Add Course</Button>
          </div>

          {courses.length > 0 && (
            <div className="mt-6">
              <h3 className="font-medium mb-2">Added Courses:</h3>
              <div className="space-y-2">
                {courses.map((course, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 bg-muted rounded-lg"
                  >
                    <span>{course.name}</span>
                    <span>
                      {course.credits} credits - Grade: {course.expectedGrade}
                    </span>
                  </div>
                ))}
              </div>
              <Button onClick={calculateGPA} className="mt-4">
                Calculate Predicted GPA
              </Button>
              {predictedGPA !== null && (
                <div className="mt-4 text-center">
                  <h4 className="text-lg font-semibold">
                    Predicted GPA: {predictedGPA}
                  </h4>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
