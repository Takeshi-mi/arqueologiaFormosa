"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";

interface FilterProps {
  sitios: { title: string; _id: string }[];
  tipos: { title: string; _id: string }[];
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  search: string;
  sitios: string[];
  tipos: string[];
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
}

export function TrabalhosFilter({ sitios, tipos, onFilterChange }: FilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    sitios: [],
    tipos: [],
    dateRange: {
      from: undefined,
      to: undefined,
    },
  });

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="w-64 p-4 space-y-6">
      {/* Barra de pesquisa */}
      <div className="space-y-2">
        <Label>Pesquisar</Label>
        <Input
          type="search"
          placeholder="Pesquisar trabalhos..."
          value={filters.search}
          onChange={(e) => handleFilterChange({ search: e.target.value })}
        />
      </div>

      {/* Filtro de Sítios */}
      <div className="space-y-2">
        <Label>Sítios</Label>
        <div className="space-y-2">
          {sitios.map((sitio) => (
            <div key={sitio._id} className="flex items-center space-x-2">
              <Checkbox
                id={`sitio-${sitio._id}`}
                checked={filters.sitios.includes(sitio._id)}
                onCheckedChange={(checked: boolean) => {
                  const newSitios = checked
                    ? [...filters.sitios, sitio._id]
                    : filters.sitios.filter((id) => id !== sitio._id);
                  handleFilterChange({ sitios: newSitios });
                }}
              />
              <Label htmlFor={`sitio-${sitio._id}`}>{sitio.title}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Filtro de Tipos */}
      <div className="space-y-2">
        <Label>Tipos de Trabalho</Label>
        <div className="space-y-2">
          {tipos.map((tipo) => (
            <div key={tipo._id} className="flex items-center space-x-2">
              <Checkbox
                id={`tipo-${tipo._id}`}
                checked={filters.tipos.includes(tipo._id)}
                onCheckedChange={(checked: boolean) => {
                  const newTipos = checked
                    ? [...filters.tipos, tipo._id]
                    : filters.tipos.filter((id) => id !== tipo._id);
                  handleFilterChange({ tipos: newTipos });
                }}
              />
              <Label htmlFor={`tipo-${tipo._id}`}>{tipo.title}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* Filtro de Data */}
      <div className="space-y-2">
        <Label>Período</Label>
        <div className="space-y-2">
          <div>
            <Label>De</Label>
            <DatePicker
              date={filters.dateRange.from}
              onSelect={(date: Date | undefined) =>
                handleFilterChange({
                  dateRange: { ...filters.dateRange, from: date },
                })
              }
            />
          </div>
          <div>
            <Label>Até</Label>
            <DatePicker
              date={filters.dateRange.to}
              onSelect={(date: Date | undefined) =>
                handleFilterChange({
                  dateRange: { ...filters.dateRange, to: date },
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
} 