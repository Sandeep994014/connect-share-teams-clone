
import { Phone, Video, Settings, Search, MoreHorizontal, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TeamsHeaderProps {
  selectedTeam: string;
  isVideoCallActive: boolean;
  setIsVideoCallActive: (active: boolean) => void;
}

export function TeamsHeader({ selectedTeam, isVideoCallActive, setIsVideoCallActive }: TeamsHeaderProps) {
  return (
    <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <h1 className="text-lg font-semibold text-gray-900"># {selectedTeam}</h1>
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
            <Info className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Search in conversation..." 
            className="pl-10 w-96 bg-gray-50 border-gray-300 focus:border-[#5B5FC7] focus:ring-[#5B5FC7] h-9"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-1">
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 h-8 w-8 p-0"
        >
          <Phone className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsVideoCallActive(!isVideoCallActive)}
          className={`h-8 w-8 p-0 ${
            isVideoCallActive 
              ? 'bg-[#5B5FC7] text-white hover:bg-[#4A4FB5]' 
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <Video className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 h-8 w-8 p-0"
        >
          <Settings className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 h-8 w-8 p-0"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
