import { useState } from "react";
import { Button } from "@/components/ui/button";
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

interface PackageFeature {
  id: string;
  name: string;
  description: string;
  price: number;
}

const availableFeatures: PackageFeature[] = [
  {
    id: "ai-chat",
    name: "AI Chat Assistant",
    description: "24/7 AI tutoring and homework help",
    price: 9.99,
  },
  {
    id: "study-analytics",
    name: "Study Analytics",
    description: "Detailed analysis of your study patterns",
    price: 4.99,
  },
  {
    id: "practice-tests",
    name: "Practice Tests",
    description: "Access to premium practice tests",
    price: 7.99,
  },
  {
    id: "flashcards",
    name: "Smart Flashcards",
    description: "AI-powered flashcard creation",
    price: 3.99,
  },
  {
    id: "notes",
    name: "Advanced Notes",
    description: "Rich text editing and cloud sync",
    price: 5.99,
  },
];

export function CustomPackage() {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [duration, setDuration] = useState<"monthly" | "yearly">("monthly");

  const toggleFeature = (featureId: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(featureId)
        ? prev.filter((id) => id !== featureId)
        : [...prev, featureId]
    );
  };

  const calculateTotal = () => {
    const monthlyTotal = selectedFeatures.reduce((total, featureId) => {
      const feature = availableFeatures.find((f) => f.id === featureId);
      return total + (feature?.price || 0);
    }, 0);

    return duration === "yearly"
      ? (monthlyTotal * 12 * 0.8).toFixed(2)
      : monthlyTotal.toFixed(2);
  };

  return (
    <div className="space-y-6 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Custom Package</CardTitle>
          <CardDescription>
            Create your own package by selecting the features you need
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium">Billing Period</label>
              <Select
                value={duration}
                onValueChange={(value: "monthly" | "yearly") =>
                  setDuration(value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly (20% discount)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium">Available Features</label>
              {availableFeatures.map((feature) => (
                <div
                  key={feature.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted transition-colors"
                >
                  <div>
                    <h3 className="font-medium">{feature.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium">
                      ${feature.price}/mo
                    </span>
                    <Button
                      variant={
                        selectedFeatures.includes(feature.id)
                          ? "default"
                          : "outline"
                      }
                      onClick={() => toggleFeature(feature.id)}
                    >
                      {selectedFeatures.includes(feature.id)
                        ? "Selected"
                        : "Select"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {selectedFeatures.length > 0 && (
              <div className="mt-6 space-y-4">
                <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                  <span className="font-medium">Total Price</span>
                  <span className="text-lg font-bold">
                    ${calculateTotal()}/
                    {duration === "yearly" ? "year" : "month"}
                  </span>
                </div>
                <Button className="w-full" size="lg">
                  Proceed to Payment
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
