"use client";
import { useState, useCallback } from "react";
import { ContactModalContext } from "./useContactModal";
import { ContactModal } from "./ContactModal";

export function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState("");

  const openContact = useCallback((slug = "") => {
    setService(slug);
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);

  return (
    <ContactModalContext.Provider value={{ open, service, openContact, close }}>
      {children}
      <ContactModal />
    </ContactModalContext.Provider>
  );
}
