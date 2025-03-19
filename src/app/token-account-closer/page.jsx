import VaporToolScreen from "@/app/_components/tools-components/token-account-closer";
import CreateTestTokenAccounts from "../_components/tools-components/leap tool file/test-token-create";

export const metadata = {
  title: "Leap",
  description: "",
  keywords: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  other: {
    "google-site-verification": "KtTMBV0PsMKme0FfaQTOlUYnMc4y7jTfcKHDXF_4CzU"
  }
};

const VaporToolPage = () => {
  return (
    <div>
      <VaporToolScreen />
      {/* <CreateTestTokenAccounts/> */}
    </div>
  );
};

export default VaporToolPage;
