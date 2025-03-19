import BurnTokenToolScreen from "@/app/_components/tools-components/burn-token-tool";
import BurnTokenToolScreen2 from "../_components/tools-components/burn-token-tool-2";

export const metadata = {
  title: "Leap",
  description: "",
  keywords: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  other: {
    "google-site-verification": "KtTMBV0PsMKme0FfaQTOlUYnMc4y7jTfcKHDXF_4CzU"
  }
};

const BurnTokenPage = () => {
  return (
    <div>
      <BurnTokenToolScreen2 />
    </div>
  );
};

export default BurnTokenPage;
