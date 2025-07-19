import Vapi from "@vapi-ai/web";

export const isVapiMock = process.env.IS_VAPI_MOCK_ENABLED === "true";

export const vapi = isVapiMock
  ? {
      start: (config: any) => {
        console.log("[Mock Vapi] Started with config:", config);
        return { name: "Mock AI Interviewer" };
      },
      stop: () => console.log("[Mock Vapi] Stopped"),
      on: () => {},
      off: () => {},
    }
  : new Vapi(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN!);
