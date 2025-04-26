import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { apiClient } from "@/lib/api-client";
import { Shape, Color, Texture, Pattern } from "@/components/types";
import { Button } from "./ui/button";

interface SceneDescriptionProps {
  onDescriptionChange: (description: string) => void;
  onSubmit: () => void;
  description: string;
  isSubmitting?: boolean;
  selectedShape?: Shape;
  selectedColor?: Color;
  selectedTexture?: Texture;
  selectedPattern?: Pattern;
}

export function SceneDescription({
  onDescriptionChange,
  onSubmit,
  description,
  isSubmitting = false,
  selectedShape,
  selectedColor,
  selectedTexture,
  selectedPattern,
}: SceneDescriptionProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Scene Description</h3>
        <div className="space-y-4">
          <textarea
            className="w-full h-32 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground placeholder:text-muted-foreground"
            placeholder="Describe your scene in detail..."
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            disabled={isSubmitting || isGenerating}
          />
          <div className="flex space-x-4">
            <Button
              className="flex-1"
              onClick={onSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Scene"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
