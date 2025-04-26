import { Card, CardContent } from "@/components/ui/card";
import { Color, Texture, Pattern } from "@/components/types";

const colors: Color[] = [
  { id: "red", name: "Red", value: "#FF0000" },
  { id: "blue", name: "Blue", value: "#0000FF" },
  { id: "green", name: "Green", value: "#00FF00" },
  { id: "yellow", name: "Yellow", value: "#FFFF00" },
  { id: "purple", name: "Purple", value: "#800080" },
  { id: "orange", name: "Orange", value: "#FFA500" },
];

const textures: Texture[] = [
  { id: "smooth", name: "Smooth", value: "smooth" },
  { id: "rough", name: "Rough", value: "rough" },
  { id: "metallic", name: "Metallic", value: "metallic" },
  { id: "matte", name: "Matte", value: "matte" },
];

const patterns: Pattern[] = [
  { id: "solid", name: "Solid", value: "solid" },
  { id: "striped", name: "Striped", value: "striped" },
  { id: "checkered", name: "Checkered", value: "checkered" },
  { id: "gradient", name: "Gradient", value: "gradient" },
];

interface PropertiesPanelProps {
  onColorSelect: (color: Color) => void;
  onTextureSelect: (texture: Texture) => void;
  onPatternSelect: (pattern: Pattern) => void;
  selectedColor?: Color;
  selectedTexture?: Texture;
  selectedPattern?: Pattern;
}

export function PropertiesPanel({
  onColorSelect,
  onTextureSelect,
  onPatternSelect,
  selectedColor,
  selectedTexture,
  selectedPattern,
}: PropertiesPanelProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Properties</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium mb-2">Color</h3>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {colors.map((color) => (
                <button
                  key={color.id}
                  className={`w-full aspect-square rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg dark:hover:shadow-gray-800/50 ${
                    selectedColor?.id === color.id
                      ? "ring-2 ring-primary dark:ring-primary/80"
                      : "hover:ring-1 hover:ring-primary/50 dark:hover:ring-primary/30"
                  }`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => onColorSelect(color)}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Texture</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {textures.map((texture) => (
                <button
                  key={texture.id}
                  className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg dark:hover:shadow-gray-800/50 ${
                    selectedTexture?.id === texture.id
                      ? "ring-2 ring-primary dark:ring-primary/80 bg-secondary"
                      : "hover:ring-1 hover:ring-primary/50 dark:hover:ring-primary/30"
                  }`}
                  onClick={() => onTextureSelect(texture)}
                >
                  {texture.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-2">Pattern</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {patterns.map((pattern) => (
                <button
                  key={pattern.id}
                  className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg dark:hover:shadow-gray-800/50 ${
                    selectedPattern?.id === pattern.id
                      ? "ring-2 ring-primary dark:ring-primary/80 bg-secondary"
                      : "hover:ring-1 hover:ring-primary/50 dark:hover:ring-primary/30"
                  }`}
                  onClick={() => onPatternSelect(pattern)}
                >
                  {pattern.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
