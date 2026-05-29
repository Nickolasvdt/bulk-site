"use client";
import { createContext, useContext } from "react";

export type ContactModalCtx = {
  open: boolean;
  service: string;
  openContact: (serviceSlug?: string) => void;
  close: () => void;
};

export const ContactModalContext = createContext<ContactModalCtx | null>(null);

export function useContactModal() {
  const ctx = useContext(ContactModalContext);
  if (!ctx) throw new Error("useContactModal precisa do ContactModalProvider");
  return ctx;
}
