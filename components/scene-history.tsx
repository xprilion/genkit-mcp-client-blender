import { Card, CardContent } from "@/components/ui/card";
import { SceneVersion } from "@/app/page";

interface SceneHistoryProps {
  versions: SceneVersion[];
  onVersionSelect: (version: SceneVersion) => void;
}

export function SceneHistory({ versions, onVersionSelect }: SceneHistoryProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Scene History</h3>
        <div className="space-y-4">
          {versions.map((version) => (
            <Card
              key={version.id}
              className="cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-md dark:hover:shadow-gray-800/50"
              onClick={() => onVersionSelect(version)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {version.timestamp}
                    </p>
                    <p className="mt-1 text-sm font-medium line-clamp-2">
                      {version.description}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    {version.shape && (
                      <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                        {version.shape}
                      </span>
                    )}
                    {version.color && (
                      <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                        {version.color}
                      </span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
