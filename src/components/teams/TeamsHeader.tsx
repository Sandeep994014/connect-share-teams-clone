
import { Phone, Video, Settings, Search, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TeamsHeaderProps {
  selectedTeam: string;
  isVideoCallActive: boolean;
  setIsVideoCallActive: (active: boolean) => void;
}

export function TeamsHeader({ selectedTeam, isVideoCallActive, setIsVideoCallActive }: TeamsHeaderProps) {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold text-gray-900">{selectedTeam}</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Search in conversation..." 
            className="pl-10 w-80 bg-gray-50 border-gray-200"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-600 hover:text-gray-900"
        >
          <Phone className="h-5 w-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsVideoCallActive(!isVideoCallActive)}
          className={`text-gray-600 hover:text-gray-900 ${isVideoCallActive ? 'bg-blue-100 text-blue-600' : ''}`}
        >
          <Video className="h-5 w-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-600 hover:text-gray-900"
        >
          <Settings className="h-5 w-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-600 hover:text-gray-900"
        >
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
