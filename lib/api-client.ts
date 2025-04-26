import { ServerStatus } from "./mcp-client";

const API_BASE_URL = "/api/mcp";

export class APIClient {
  async getStatus(): Promise<ServerStatus> {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error("Failed to get MCP status");
    }
    return response.json();
  }

  async executeTool(parameters: Record<string, any> = {}): Promise<any> {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "executeTool",
        parameters,
      }),
    });
    if (!response.ok) {
      throw new Error("Failed to execute tool");
    }
    return response.json();
  }
}

export const apiClient = new APIClient();
