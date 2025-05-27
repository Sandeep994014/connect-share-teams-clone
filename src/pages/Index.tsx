
import { useState } from "react";
import { TeamsSidebar } from "@/components/teams/TeamsSidebar";
import { TeamsHeader } from "@/components/teams/TeamsHeader";
import { ChatArea } from "@/components/teams/ChatArea";
import { VideoCall } from "@/components/teams/VideoCall";
import { FileSharing } from "@/components/teams/FileSharing";
import { TeamMembers } from "@/components/teams/TeamMembers";
import { SidebarProvider } from "@/components/ui/sidebar";

const Index = () => {
  const [activeView, setActiveView] = useState<"chat" | "video" | "files" | "calendar">("chat");
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState("General");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <TeamsSidebar 
          activeView={activeView} 
          setActiveView={setActiveView}
          selectedTeam={selectedTeam}
          setSelectedTeam={setSelectedTeam}
        />
        
        <div className="flex-1 flex flex-col">
          <TeamsHeader 
            selectedTeam={selectedTeam}
            isVideoCallActive={isVideoCallActive}
            setIsVideoCallActive={setIsVideoCallActive}
          />
          
          <div className="flex-1 flex">
            <div className="flex-1 flex flex-col">
              {isVideoCallActive && (
                <VideoCall onEndCall={() => setIsVideoCallActive(false)} />
              )}
              
              {activeView === "chat" && !isVideoCallActive && (
                <ChatArea teamName={selectedTeam} />
              )}
              
              {activeView === "files" && !isVideoCallActive && (
                <FileSharing teamName={selectedTeam} />
              )}
              
              {activeView === "calendar" && !isVideoCallActive && (
                <div className="flex-1 p-6">
                  <h2 className="text-2xl font-bold mb-4">Calendar</h2>
                  <div className="bg-white rounded-lg shadow p-6">
                    <p className="text-gray-600">Calendar view coming soon...</p>
                  </div>
                </div>
              )}
            </div>
            
            <TeamMembers teamName={selectedTeam} />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
