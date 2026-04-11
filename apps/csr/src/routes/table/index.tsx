import { createFileRoute } from "@tanstack/react-router";

import { TableGrid } from "@/domains/table/components";

export const Route = createFileRoute("/table/")({
  component: TableGrid,
});
