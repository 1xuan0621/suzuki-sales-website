"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { getCar, type Car } from "@/data/site";

const STORAGE_KEY = "suzuki:comparison:ids:v1";

interface CompareContextType {
  selected: Car[];
  ready: boolean;
  toggleCar: (car: Car) => void;
  removeCar: (id: string) => void;
  clearAll: () => void;
  isSelected: (id: string) => boolean;
}

const CompareContext = createContext<CompareContextType | null>(null);

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be inside CompareProvider");
  return ctx;
}

export default function CompareProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<Car[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const restored: Car[] = [];
    try {
      const stored: unknown = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) ?? "[]");
      if (Array.isArray(stored)) {
        for (const id of stored) {
          if (typeof id !== "string" || restored.some((car) => car.id === id)) continue;
          const car = getCar(id);
          if (car) restored.push(car);
          if (restored.length === 3) break;
        }
      }
    } catch {
      // Comparison remains usable when storage is blocked or contains invalid data.
    }
    setSelected(restored);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(selected.map((car) => car.id)));
    } catch {
      // Keep the current in-memory selection if session storage is unavailable.
    }
  }, [ready, selected]);

  const toggleCar = useCallback((car: Car) => {
    setSelected((prev) => {
      const exists = prev.find((c) => c.id === car.id);
      if (exists) return prev.filter((c) => c.id !== car.id);
      if (prev.length >= 3) return prev;
      return [...prev, car];
    });
  }, []);

  const removeCar = useCallback((id: string) => {
    setSelected((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const clearAll = useCallback(() => setSelected([]), []);

  const isSelected = useCallback(
    (id: string) => selected.some((c) => c.id === id),
    [selected]
  );

  return (
    <CompareContext.Provider value={{ selected, ready, toggleCar, removeCar, clearAll, isSelected }}>
      {children}
    </CompareContext.Provider>
  );
}
