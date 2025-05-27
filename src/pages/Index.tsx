
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
                <div className="flex-1 p-6 bg-white">
                  <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900">Calendar</h2>
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-[#5B5FC7] rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-white text-2xl">📅</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Calendar integration coming soon</h3>
                        <p className="text-gray-600">Schedule and manage team meetings, events, and deadlines.</p>
                      </div>
                    </div>
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
