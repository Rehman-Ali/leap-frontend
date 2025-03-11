import AdminDashboardScreen from "@/pages/Dashboard/admin-dashboard";

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
      <AdminDashboardScreen />
    </div>
  );
};

export default AdminDashboardPage;
