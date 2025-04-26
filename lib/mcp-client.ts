import { genkit, z } from "genkit";
import { mcpClient as mcpClientPlugin } from "genkitx-mcp";
import { gemini20Flash, googleAI } from "@genkit-ai/googleai";

export interface Tool {
  id: string;
  name: string;
  description: string;
  parameters: Record<string, any>;
}

export interface ServerStatus {
  connected: boolean;
  error?: string;
  tools?: Tool[];
}

// Initialize the MCP client for Blender
const mcpPlugin = mcpClientPlugin({
  name: "blender",
  serverProcess: {
    command: "/opt/miniconda3/bin/uvx",
    args: ["blender-mcp"],
  },
});

const ai = genkit({
  plugins: [googleAI(), mcpPlugin],
  model: gemini20Flash,
});

export const blenderTools = [
  "blender/execute_blender_code",
  "blender/get_hyper3d_status",
  "blender/get_object_info",
  "blender/get_polyhaven_status",
  "blender/get_scene_info",
  "blender/import_generated_asset",
  "blender/list_resource_templates",
  "blender/list_resources",
  "blender/poll_rodin_job_status",
  "blender/read_resource",
  "blender/set_texture",
];

export const blenderFlow = ai.defineFlow(
  {
    name: "blender-flow",
    inputSchema: z.string(),
  },
  async (prompt) => {
    const { text } = await ai.generate({
      prompt,
      tools: blenderTools,
    });
    return text;
  }
);

export class MCPClient {
  private ai: any;

  constructor() {
    this.ai = ai;
  }
}

export const mcpClient = new MCPClient();
