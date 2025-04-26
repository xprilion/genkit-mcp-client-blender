import { NextResponse } from "next/server";
import {
  blenderFlow,
  ServerStatus,
  mcpClient,
  blenderTools,
} from "@/lib/mcp-client";
import { systemPrompt } from "./system-prompt";

export async function GET() {
  try {
    // Get the actual status with available tools
    const status: ServerStatus = {
      connected: true,
      tools: blenderTools.map((tool) => ({
        id: tool,
        name: tool,
        description: "Execute a Blender tool",
        parameters: {},
      })),
    };

    return NextResponse.json(status);
  } catch (error) {
    return NextResponse.json(
      {
        connected: false,
        error:
          error instanceof Error ? error.message : "Failed to get MCP status",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { action, parameters } = await request.json();

    switch (action) {
      case "executeTool":
        const { shape, color, texture, pattern, description, clearShapes } =
          parameters || {};
        if (!shape || !color || !texture || !pattern) {
          return NextResponse.json(
            { error: "All scene parameters are required" },
            { status: 400 }
          );
        }

        // Use the mcpService function with a prompt
        let prompt = `${systemPrompt} || User instruction here: Generate a ${shape} that is ${color} with a ${texture} texture and a ${pattern} pattern. ${description}`;
        if (clearShapes) {
          prompt +=
            "Clear all existing shapes before generating the new one but keep the camera and lighting.";
        }
        const response = await blenderFlow(prompt);

        return NextResponse.json({ result: response });

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "An error occurred" },
      { status: 500 }
    );
  }
}
