
import { useState } from "react";
import { MessageCircle, Video, File, Calendar, Phone, Settings, Users, Hash } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

interface TeamsSidebarProps {
  activeView: "chat" | "video" | "files" | "calendar";
  setActiveView: (view: "chat" | "video" | "files" | "calendar") => void;
  selectedTeam: string;
  setSelectedTeam: (team: string) => void;
}

const teams = [
  { name: "General", members: 12, unread: 3, type: "public" },
  { name: "Development", members: 8, unread: 0, type: "private" },
  { name: "Marketing", members: 6, unread: 1, type: "public" },
  { name: "Design", members: 4, unread: 0, type: "private" },
];

const menuItems = [
  { title: "Chat", icon: MessageCircle, view: "chat" as const },
  { title: "Teams", icon: Users, view: "video" as const },
  { title: "Files", icon: File, view: "files" as const },
  { title: "Calendar", icon: Calendar, view: "calendar" as const },
];

export function TeamsSidebar({ activeView, setActiveView, selectedTeam, setSelectedTeam }: TeamsSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} bg-[#292929] text-white border-r border-gray-700`}>
      <div className="p-3 border-b border-gray-700">
        <SidebarTrigger className="text-white hover:bg-gray-700 transition-colors" />
        {!collapsed && (
          <div className="mt-2">
            <h2 className="text-sm font-semibold text-gray-300">Microsoft Teams</h2>
          </div>
        )}
      </div>
      
      <SidebarContent className="bg-[#292929]">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => setActiveView(item.view)}
                    className={`
                      mx-2 my-1 rounded-md transition-all duration-200
                      ${activeView === item.view 
                        ? "bg-[#5B5FC7] text-white shadow-sm" 
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }
                    `}
                  >
                    <item.icon className="h-5 w-5" />
                    {!collapsed && <span className="ml-3 font-medium">{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400 text-xs uppercase tracking-wider font-semibold px-4">
            {!collapsed && "Your Teams"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {teams.map((team) => (
                <SidebarMenuItem key={team.name}>
                  <SidebarMenuButton
                    onClick={() => setSelectedTeam(team.name)}
                    className={`
                      mx-2 my-1 rounded-md transition-all duration-200
                      ${selectedTeam === team.name 
                        ? "bg-[#5B5FC7] text-white shadow-sm" 
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }
                    `}
                  >
                    <Hash className="h-4 w-4" />
                    {!collapsed && (
                      <div className="flex-1 flex items-center justify-between ml-3">
                        <div className="flex flex-col items-start">
                          <span className="font-medium text-sm">{team.name}</span>
                          <span className="text-xs text-gray-400">{team.members} members</span>
                        </div>
                        {team.unread > 0 && (
                          <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center font-medium">
                            {team.unread}
                          </span>
                        )}
                      </div>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
