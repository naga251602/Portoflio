"use client";
import React, { createContext, useContext, useState, useCallback } from "react";

type ModalId = "about" | "projects" | "publications" | "others" | null;

type ModalContextType = {
  openModal: ModalId;
  open: (id: ModalId) => void;
  close: () => void;
  closeAll: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [openModal, setOpenModal] = useState<ModalId>(null);

  const open = useCallback((id: ModalId) => setOpenModal(id), []);
  const close = useCallback(() => setOpenModal(null), []);
  const closeAll = useCallback(() => setOpenModal(null), []);

  return (
    <ModalContext.Provider value={{ openModal, open, close, closeAll }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
}
