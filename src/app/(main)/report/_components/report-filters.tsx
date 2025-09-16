"use client";

import { useState } from "react";
import { Filter, Download, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

export type FilterState = {
  dateRange: {
    from: string;
    to: string;
  };
  status: string;
  category: string;
  search: string;
};

type ReportFiltersProps = {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onExport: () => void;
  statusOptions?: { value: string; label: string }[];
  categoryOptions?: { value: string; label: string }[];
  showCategoryFilter?: boolean;
};

export default function ReportFilters({
  filters,
  onFiltersChange,
  onExport,
  statusOptions = [
    { value: "all", label: "Todos os Status" },
    { value: "active", label: "Ativo" },
    { value: "inactive", label: "Inativo" },
    { value: "pending", label: "Pendente" },
  ],
  categoryOptions = [
    { value: "all", label: "Todas as Categorias" },
    { value: "revenue", label: "Receita" },
    { value: "users", label: "Usuários" },
    { value: "engagement", label: "Engajamento" },
  ],
  showCategoryFilter = true,
}: ReportFiltersProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const updateFilters = (
    key: keyof FilterState,
    value: string | { from: string; to: string }
  ) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      dateRange: { from: "", to: "" },
      status: "all",
      category: "all",
      search: "",
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.dateRange.from || filters.dateRange.to) count++;
    if (filters.status && filters.status !== "all") count++;
    if (filters.category && filters.category !== "all") count++;
    if (filters.search) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="space-y-4">
      {/* Barra de busca e ações principais */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar..."
            value={filters.search}
            onChange={(e) => updateFilters("search", e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex gap-2">
          <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="relative">
                <Filter className="mr-2 h-4 w-4" />
                Filtros
                {activeFiltersCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="ml-2 h-5 w-5 rounded-full p-0 text-xs"
                  >
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Filtros</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground"
                  >
                    Limpar tudo
                  </Button>
                </div>

                {/* Filtro de Data */}
                <div className="space-y-2">
                  <Label>Período</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Input
                        type="date"
                        value={filters.dateRange.from}
                        onChange={(e) =>
                          updateFilters("dateRange", {
                            ...filters.dateRange,
                            from: e.target.value,
                          })
                        }
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <Input
                        type="date"
                        value={filters.dateRange.to}
                        onChange={(e) =>
                          updateFilters("dateRange", {
                            ...filters.dateRange,
                            to: e.target.value,
                          })
                        }
                        className="text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Filtro de Status */}
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={filters.status}
                    onValueChange={(value: string) =>
                      updateFilters("status", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Filtro de Categoria */}
                {showCategoryFilter && (
                  <div className="space-y-2">
                    <Label>Categoria</Label>
                    <Select
                      value={filters.category}
                      onValueChange={(value: string) =>
                        updateFilters("category", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <Button
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full"
                >
                  Aplicar Filtros
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Button onClick={onExport} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Tags de filtros ativos */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.search && (
            <Badge variant="secondary" className="gap-1">
              Busca: {filters.search}
              <button
                onClick={() => updateFilters("search", "")}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          )}

          {filters.status && filters.status !== "all" && (
            <Badge variant="secondary" className="gap-1">
              Status:{" "}
              {statusOptions.find((opt) => opt.value === filters.status)?.label}
              <button
                onClick={() => updateFilters("status", "all")}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          )}

          {filters.category && filters.category !== "all" && (
            <Badge variant="secondary" className="gap-1">
              Categoria:{" "}
              {
                categoryOptions.find((opt) => opt.value === filters.category)
                  ?.label
              }
              <button
                onClick={() => updateFilters("category", "all")}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          )}

          {(filters.dateRange.from || filters.dateRange.to) && (
            <Badge variant="secondary" className="gap-1">
              Período: {filters.dateRange.from || "..."} até{" "}
              {filters.dateRange.to || "..."}
              <button
                onClick={() => updateFilters("dateRange", { from: "", to: "" })}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}
