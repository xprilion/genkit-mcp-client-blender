import { Card, CardContent } from "@/components/ui/card";
import { ServerStatus, Tool } from "@/lib/mcp-client";
import { ToolsAccordion } from "./tools-accordion";

interface ServerStatusIndicatorProps {
  status: ServerStatus;
}

export function ServerStatusIndicator({ status }: ServerStatusIndicatorProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div
              className={`w-3 h-3 rounded-full ${
                status.connected ? "bg-green-500" : "bg-destructive"
              }`}
            />
            <span className="text-sm text-foreground">
              {status.connected
                ? "Connected to MCP server"
                : "Failed to connect to MCP server"}
            </span>
          </div>

          {status.error && (
            <div className="text-sm text-destructive">{status.error}</div>
          )}

          {status.tools && status.tools.length > 0 && (
            <ToolsAccordion tools={status.tools || []} />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
