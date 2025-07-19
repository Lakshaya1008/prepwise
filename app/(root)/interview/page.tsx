import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { VapiDebugger } from "@/components/VapiDebugger";

const Page = async () => {
  const user = await getCurrentUser();

  return (
    <>
      <h3>Interview generation</h3>

      <Agent
        userName={user?.name!}
        userId={user?.id}
        type="generate"
      />
      <VapiDebugger />
    </>
  );
};

export default Page;
