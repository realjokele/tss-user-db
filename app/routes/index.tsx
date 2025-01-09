import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="p-2">
      <h3 className="text-blue-500">Welcome Home!!!</h3>
    </div>
  );
}
