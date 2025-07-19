"use client";
import { useEffect, useState } from "react";
import { vapi, isVapiMock } from "@/lib/vapi.sdk";

export function VapiDebugger() {
  const [events, setEvents] = useState<string[]>([]);

  useEffect(() => {
    if (isVapiMock) return;

    vapi.on("speech-start", () => setEvents(prev => ["[speech-start]", ...prev]));
    vapi.on("speech-end", () => setEvents(prev => ["[speech-end]", ...prev]));
    vapi.on("message", () => setEvents(prev => ["[message]", ...prev]));
    vapi.on("error", () => setEvents(prev => ["[error]", ...prev]));
    vapi.on("call-start", () => setEvents(prev => ["[call-start]", ...prev]));
    vapi.on("call-end", () => setEvents(prev => ["[call-end]", ...prev]));
  }, []);

  return (
    <div className="fixed bottom-4 right-4 p-3 w-[400px] max-h-[300px] overflow-auto bg-black text-white text-xs rounded-xl shadow-xl z-50">
      <strong className="block mb-2">🎙 Vapi Debugger</strong>
      <ul className="space-y-1">{events.map((e, i) => <li key={i}>{e}</li>)}</ul>
    </div>
  );
} 