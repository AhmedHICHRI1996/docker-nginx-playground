import { Button } from "@/components/ui/button";

export type FilterType = "all" | "active" | "completed";

interface TaskFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
}

export const TaskFilter = ({ currentFilter, onFilterChange, counts }: TaskFilterProps) => {
  const filters: { value: FilterType; label: string }[] = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "completed", label: "Completed" },
  ];

  return (
    <div className="flex gap-2 flex-wrap">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={currentFilter === filter.value ? "default" : "outline"}
          onClick={() => onFilterChange(filter.value)}
          className="transition-all"
        >
          {filter.label}
          <span className={`ml-2 rounded-full px-2 py-0.5 text-xs ${
            currentFilter === filter.value 
              ? "bg-primary-foreground/20" 
              : "bg-muted"
          }`}>
            {counts[filter.value]}
          </span>
        </Button>
      ))}
    </div>
  );
};
