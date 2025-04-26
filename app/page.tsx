"use client";

import { useState, useEffect } from "react";
import { ShapeGrid } from "@/components/shape-grid";
import { PropertiesPanel } from "@/components/properties-panel";
import { SceneDescription } from "@/components/scene-description";
import { SceneHistory } from "@/components/scene-history";
import { ServerStatusIndicator } from "@/components/server-status";
import { Card, CardContent } from "@/components/ui/card";
import { apiClient } from "@/lib/api-client";
import { Shape, Color, Texture, Pattern } from "@/components/types";
import { Tool } from "@/lib/mcp-client";

export interface SceneVersion {
  id: string;
  timestamp: string;
  shape?: string;
  color?: string;
  texture?: string;
  pattern?: string;
  description: string;
}

interface ServerStatus {
  connected: boolean;
  error?: string;
}

export default function Home() {
  const [selectedShape, setSelectedShape] = useState<Shape | undefined>();
  const [selectedColor, setSelectedColor] = useState<Color | undefined>();
  const [selectedTexture, setSelectedTexture] = useState<Texture | undefined>();
  const [selectedPattern, setSelectedPattern] = useState<Pattern | undefined>();
  const [description, setDescription] = useState("");
  const [versions, setVersions] = useState<SceneVersion[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clearShapes, setClearShapes] = useState(false);
  const [tools, setTools] = useState<Tool[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [serverStatus, setServerStatus] = useState<ServerStatus>({
    connected: false,
  });

  useEffect(() => {
    // Check server status on component mount
    const checkServerStatus = async () => {
      try {
        const response = await fetch("/api/mcp");
        const status = await response.json();
        setServerStatus(status);
        if (status.tools) {
          setTools(status.tools);
        }
      } catch (err) {
        setServerStatus({
          connected: false,
          error:
            err instanceof Error
              ? err.message
              : "Failed to check server status",
        });
      }
    };

    checkServerStatus();
  }, []);

  const handleSubmit = async () => {
    if (!selectedShape) {
      setError("Please select a shape first");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Execute the Blender code directly with form data
      const res = await apiClient.executeTool({
        action: "create_shape",
        shape: selectedShape.name,
        color: selectedColor?.name || "default",
        texture: selectedTexture?.name || "default",
        pattern: selectedPattern?.name || "default",
        description: description || ``,
        clearShapes: clearShapes,
      });

      setResult(res.result);

      const newVersion: SceneVersion = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleString(),
        shape: selectedShape.name,
        color: selectedColor?.name,
        texture: selectedTexture?.name,
        pattern: selectedPattern?.name,
        description:
          description ||
          `A ${selectedShape.name} with ${
            selectedColor?.name || "default"
          } color, ${selectedTexture?.name || "default"} texture, and ${
            selectedPattern?.name || "default"
          } pattern`,
      };

      setVersions([newVersion, ...versions]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create scene");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVersionSelect = async (version: SceneVersion) => {
    console.log("Version selected:", version);
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Blender MCP Client</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <ServerStatusIndicator status={serverStatus} />

            {error && (
              <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded">
                {error}
              </div>
            )}

            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Shape Selection</h2>
                <ShapeGrid
                  onShapeSelect={setSelectedShape}
                  selectedShape={selectedShape}
                />
              </CardContent>
            </Card>

            <PropertiesPanel
              onColorSelect={setSelectedColor}
              onTextureSelect={setSelectedTexture}
              onPatternSelect={setSelectedPattern}
              selectedColor={selectedColor}
              selectedTexture={selectedTexture}
              selectedPattern={selectedPattern}
            />

            <div className="flex items-center space-x-2 mt-4">
              <input
                type="checkbox"
                id="clearShapes"
                checked={clearShapes}
                onChange={(e) => setClearShapes(e.target.checked)}
                className="h-4 w-4 rounded border-input bg-background text-primary focus:ring-primary"
              />
              <label htmlFor="clearShapes" className="text-sm text-foreground">
                Clear existing shapes before adding new one
              </label>
            </div>

            <SceneDescription
              description={description}
              onDescriptionChange={setDescription}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              selectedShape={selectedShape}
              selectedColor={selectedColor}
              selectedTexture={selectedTexture}
              selectedPattern={selectedPattern}
            />

            <div className="mt-8">
              <p>{result || ""}</p>
            </div>
          </div>

          <div className="lg:col-span-1">
            <SceneHistory
              versions={versions}
              onVersionSelect={handleVersionSelect}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
