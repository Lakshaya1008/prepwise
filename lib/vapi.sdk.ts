import Vapi from "@vapi-ai/web";

export const isVapiMock = process.env.IS_VAPI_MOCK_ENABLED === "true";

export const vapi = isVapiMock
  ? {
      createAssistant: () => ({ name: "Mock AI Interviewer" }),
      start: () => console.log("[Mock Vapi] Started"),
      stop: () => console.log("[Mock Vapi] Stopped"),
      on: () => {},
      off: () => {}, // Add this to match the real Vapi API
    }
  : new Vapi(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN!);
