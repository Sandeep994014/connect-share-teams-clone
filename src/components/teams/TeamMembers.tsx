
import { useState } from "react";
import { Phone, Video, MessageCircle, MoreVertical, UserPlus, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "@/contexts/ChatContext";

interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "away" | "busy" | "offline";
  role: string;
  lastSeen?: string;
  isOwner?: boolean;
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "SJ",
    status: "online",
    role: "Team Lead",
    isOwner: true
  },
  {
    id: "2",
    name: "Mike Chen",
    avatar: "MC",
    status: "busy",
    role: "Senior Developer"
  },
  {
    id: "3",
    name: "Alex Rivera",
    avatar: "AR",
    status: "away",
    role: "UX Designer"
  },
  {
    id: "4",
    name: "Emma Wilson",
    avatar: "EW",
    status: "online",
    role: "Marketing Manager"
  },
  {
    id: "5",
    name: "David Kim",
    avatar: "DK",
    status: "offline",
    role: "Backend Developer",
    lastSeen: "2 hours ago"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "online": return "bg-green-500";
    case "busy": return "bg-red-500";
    case "away": return "bg-yellow-500";
    case "offline": return "bg-gray-400";
    default: return "bg-gray-400";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "online": return "Available";
    case "busy": return "Busy - Do not disturb";
    case "away": return "Away";
    case "offline": return "Offline";
    default: return status;
  }
};

export function TeamMembers() {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  const { startPersonalChat } = useChat();

  const handleStartChat = (member: TeamMember) => {
    startPersonalChat(member.id, member.name, member.avatar);
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900 text-sm">Members</h3>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-200">
            <UserPlus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex -space-x-2">
            {teamMembers.slice(0, 3).map((member) => (
              <div
                key={member.id}
                className="w-6 h-6 bg-[#5B5FC7] rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white"
              >
                {member.avatar}
              </div>
            ))}
          </div>
          <span className="text-sm text-gray-600">{teamMembers.length} members</span>
        </div>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-1">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
              onMouseEnter={() => setHoveredMember(member.id)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              <div className="relative mr-3">
                <div className="w-10 h-10 bg-[#5B5FC7] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {member.avatar}
                </div>
                <div className={`absolute bottom-0 right-0 w-3 h-3 ${getStatusColor(member.status)} rounded-full border-2 border-white`}></div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1">
                  <p className="font-medium text-gray-900 text-sm truncate">{member.name}</p>
                  {member.isOwner && (
                    <Crown className="h-3 w-3 text-yellow-500" />
                  )}
                </div>
                <p className="text-xs text-gray-600 truncate">{member.role}</p>
                <div className="flex items-center mt-1">
                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 ${getStatusColor(member.status)} rounded-full`}></div>
                    <span className="text-xs text-gray-500">{getStatusText(member.status)}</span>
                  </div>
                  {member.lastSeen && (
                    <span className="text-xs text-gray-400 ml-2">• {member.lastSeen}</span>
                  )}
                </div>
              </div>
              
              {hoveredMember === member.id && member.status !== "offline" && (
                <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 hover:bg-gray-200"
                    onClick={() => handleStartChat(member)}
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-200">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-200">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-200">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
