
import { useState } from "react";
import { MessageCircle, Video, File, Calendar, Phone, Settings, Users } from "lucide-react";
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
  { name: "General", members: 12, unread: 3 },
  { name: "Development", members: 8, unread: 0 },
  { name: "Marketing", members: 6, unread: 1 },
  { name: "Design", members: 4, unread: 0 },
];

const menuItems = [
  { title: "Chat", icon: MessageCircle, view: "chat" as const },
  { title: "Video", icon: Video, view: "video" as const },
  { title: "Files", icon: File, view: "files" as const },
  { title: "Calendar", icon: Calendar, view: "calendar" as const },
];

export function TeamsSidebar({ activeView, setActiveView, selectedTeam, setSelectedTeam }: TeamsSidebarProps) {
  const { collapsed } = useSidebar();

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} bg-[#464775] text-white border-r-0`}>
      <SidebarTrigger className="m-2 self-end text-white hover:bg-white/10" />
      
      <SidebarContent className="bg-[#464775]">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/80 text-xs uppercase tracking-wider">
            {!collapsed && "Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => setActiveView(item.view)}
                    className={`
                      ${activeView === item.view 
                        ? "bg-white/20 text-white" 
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                      }
                    `}
                  >
                    <item.icon className="h-5 w-5" />
                    {!collapsed && <span className="ml-3">{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-white/80 text-xs uppercase tracking-wider">
            {!collapsed && "Teams"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {teams.map((team) => (
                <SidebarMenuItem key={team.name}>
                  <SidebarMenuButton
                    onClick={() => setSelectedTeam(team.name)}
                    className={`
                      ${selectedTeam === team.name 
                        ? "bg-white/20 text-white" 
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                      }
                    `}
                  >
                    <Users className="h-4 w-4" />
                    {!collapsed && (
                      <div className="flex-1 flex items-center justify-between ml-3">
                        <span>{team.name}</span>
                        {team.unread > 0 && (
                          <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
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
