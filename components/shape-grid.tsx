import { Card, CardContent } from "@/components/ui/card";
import { Shape } from "@/components/types";

const shapes: Shape[] = [
  { id: "cube", name: "Cube", icon: "📦" },
  { id: "sphere", name: "Sphere", icon: "⚪" },
  { id: "cylinder", name: "Cylinder", icon: "🔵" },
  { id: "cone", name: "Cone", icon: "🔺" },
  { id: "torus", name: "Torus", icon: "⭕" },
  { id: "plane", name: "Plane", icon: "⬜" },
];

interface ShapeGridProps {
  onShapeSelect: (shape: Shape) => void;
  selectedShape?: Shape;
}

export function ShapeGrid({ onShapeSelect, selectedShape }: ShapeGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {shapes.map((shape) => (
        <Card
          key={shape.id}
          className={`cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg dark:hover:shadow-gray-800/50 ${
            selectedShape?.id === shape.id
              ? "ring-2 ring-primary dark:ring-primary/80"
              : "hover:ring-1 hover:ring-primary/50 dark:hover:ring-primary/30"
          }`}
          onClick={() => onShapeSelect(shape)}
        >
          <CardContent className="flex flex-col items-center justify-center p-6">
            <span className="text-5xl mb-3">{shape.icon}</span>
            <span className="text-sm font-medium text-center">
              {shape.name}
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
