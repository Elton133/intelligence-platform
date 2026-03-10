import Sidebar from "@/app/components/dashboard/Sidebar";
import Header from "@/app/components/dashboard/Header";
import { DashboardProvider } from "./context";
import CommandMenu from "@/app/components/dashboard/CommandMenu";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider>
      <div className="min-h-screen bg-[#030305] text-white flex overflow-hidden selection:bg-cyan-500/30 font-sans">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
          {/* Subtle background glow for the main area */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-linear-to-b from-cyan-900/10 to-transparent rounded-full blur-[100px] pointer-events-none -z-10" />
          
          <Header />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 z-10">
            {children}
          </main>
        </div>
      </div>
      <CommandMenu />
    </DashboardProvider>
  );
}
