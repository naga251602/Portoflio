"use client";
import React, { createContext, useContext, useState, useCallback } from "react";

type DrawerEntry =
  | { type: "skill"; skill: string }
  | { type: "details"; dataType: string; id: string };

type DrawerContextType = {
  isOpen: boolean;
  history: DrawerEntry[];
  openDetails: (dataType: string, id: string) => void;
  openSkillDrawer: (skill: string) => void;
  goBack: () => void;
  close: () => void;
  slideDir: "forward" | "back" | "none";
};

const DrawerContext = createContext<DrawerContextType | null>(null);

export function DrawerProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<DrawerEntry[]>([]);
  const [slideDir, setSlideDir] = useState<"forward" | "back" | "none">("none");

  const openDetails = useCallback((dataType: string, id: string) => {
    setSlideDir(isOpen ? "forward" : "none");
    setHistory((h) => [...h, { type: "details", dataType, id }]);
    setIsOpen(true);
  }, [isOpen]);

  const openSkillDrawer = useCallback((skill: string) => {
    setSlideDir(isOpen ? "forward" : "none");
    setHistory((h) => [...h, { type: "skill", skill }]);
    setIsOpen(true);
  }, [isOpen]);

  const goBack = useCallback(() => {
    setSlideDir("back");
    setHistory((h) => h.slice(0, -1));
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setHistory([]);
    setSlideDir("none");
  }, []);

  return (
    <DrawerContext.Provider value={{ isOpen, history, openDetails, openSkillDrawer, goBack, close, slideDir }}>
      {children}
    </DrawerContext.Provider>
  );
}

export function useDrawer() {
  const ctx = useContext(DrawerContext);
  if (!ctx) throw new Error("useDrawer must be used within DrawerProvider");
  return ctx;
}
