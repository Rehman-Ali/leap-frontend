import DashboardScreen from "@/pages/Dashboard/home-page";

export const metadata = {
    title: "Leap",
    description: "",
    keywords: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    other: {
      "google-site-verification": "KtTMBV0PsMKme0FfaQTOlUYnMc4y7jTfcKHDXF_4CzU",
    },
  };
  

const DashboardPage = () => {
    return (
         <div>
            <DashboardScreen/>
         </div>   
    )
}
           
export default DashboardPage;