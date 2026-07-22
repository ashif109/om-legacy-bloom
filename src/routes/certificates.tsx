import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/certificates")({
  beforeLoad: () => {
    throw redirect({
      to: "/achievements",
    });
  },
});
