import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TaskInputProps {
  onAdd: (text: string) => void;
}

export const TaskInput = ({ onAdd }: TaskInputProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAdd(input.trim());
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        placeholder="Add a new task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-1 bg-card border-border shadow-[var(--shadow-soft)] focus-visible:shadow-[var(--shadow-elevated)]"
      />
      <Button
        type="submit"
        variant="gradient"
        size="lg"
        disabled={!input.trim()}
      >
        <Plus className="h-5 w-5" />
        Add
      </Button>
    </form>
  );
};
