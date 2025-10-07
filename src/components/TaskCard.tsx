import { Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

interface TaskCardProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskCard = ({ task, onToggle, onDelete }: TaskCardProps) => {
  return (
    <Card className="group p-4 transition-all duration-300 hover:shadow-[var(--shadow-elevated)] border-border bg-[image:var(--gradient-card)]">
      <div className="flex items-center gap-3">
        <button
          onClick={() => onToggle(task.id)}
          className={`flex h-6 w-6 items-center justify-center rounded-md border-2 transition-all duration-300 ${
            task.completed
              ? "border-primary bg-primary shadow-[var(--shadow-glow)]"
              : "border-muted-foreground/30 hover:border-primary"
          }`}
        >
          {task.completed && <Check className="h-4 w-4 text-primary-foreground" />}
        </button>
        
        <span
          className={`flex-1 transition-all duration-300 ${
            task.completed
              ? "text-muted-foreground line-through"
              : "text-foreground"
          }`}
        >
          {task.text}
        </span>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(task.id)}
          className="opacity-0 transition-opacity group-hover:opacity-100 hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};
