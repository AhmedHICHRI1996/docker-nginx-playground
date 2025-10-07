import { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import { TaskInput } from "@/components/TaskInput";
import { TaskCard } from "@/components/TaskCard";
import { TaskFilter, FilterType } from "@/components/TaskFilter";
import { toast } from "@/hooks/use-toast";

interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");

  // Load tasks from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) {
      try {
        setTasks(JSON.parse(stored));
      } catch (error) {
        console.error("Failed to load tasks:", error);
      }
    }
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prev) => [newTask, ...prev]);
    toast({
      title: "Task added",
      description: "Your task has been added successfully.",
    });
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    toast({
      title: "Task deleted",
      description: "Your task has been removed.",
      variant: "destructive",
    });
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const counts = {
    all: tasks.length,
    active: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="rounded-2xl bg-[image:var(--gradient-primary)] p-3 shadow-[var(--shadow-glow)]">
              <CheckCircle2 className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="mb-2 bg-[image:var(--gradient-primary)] bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Task Manager
          </h1>
          <p className="text-muted-foreground">
            A simple, functional app perfect for Docker & Nginx testing
          </p>
        </div>

        {/* Input */}
        <div className="mb-6">
          <TaskInput onAdd={addTask} />
        </div>

        {/* Filter */}
        <div className="mb-6">
          <TaskFilter
            currentFilter={filter}
            onFilterChange={setFilter}
            counts={counts}
          />
        </div>

        {/* Tasks List */}
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                {filter === "all"
                  ? "No tasks yet. Add one to get started!"
                  : filter === "active"
                  ? "No active tasks. Great job!"
                  : "No completed tasks yet."}
              </p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
