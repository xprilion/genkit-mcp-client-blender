"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tool } from "@/lib/mcp-client";

interface ToolsAccordionProps {
  tools: Tool[];
}

export function ToolsAccordion({ tools }: ToolsAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full" defaultValue="">
      <AccordionItem value="tools">
        <AccordionTrigger className="text-lg font-semibold">
          Available Tools ({tools.length})
        </AccordionTrigger>
        <AccordionContent>
          <div className="grid gap-4">
            {tools.map((tool) => (
              <Card key={tool.id} className="w-full">
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">{tool.name}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
