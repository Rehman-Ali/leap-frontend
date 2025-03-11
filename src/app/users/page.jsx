
import UserScreen from "@/pages/Dashboard/users";

export const metadata = {
  title: "Leap",
  description: "",
  keywords: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
  other: {
    "google-site-verification": "KtTMBV0PsMKme0FfaQTOlUYnMc4y7jTfcKHDXF_4CzU",
  },
};


const AdminDashboardPage = () => {
  return (
    <div>
      <UserScreen/>
    </div>
  );
};

export default AdminDashboardPage;
