
import { useState } from "react";
import { Mic, MicOff, Video, VideoOff, Phone, Users, MessageCircle, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoCallProps {
  onEndCall: () => void;
}

export function VideoCall({ onEndCall }: VideoCallProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);

  const participants = [
    { name: "Sarah Johnson", avatar: "SJ", isPresenting: false },
    { name: "Mike Chen", avatar: "MC", isPresenting: true },
    { name: "Alex Rivera", avatar: "AR", isPresenting: false },
    { name: "You", avatar: "Y", isPresenting: false },
  ];

  return (
    <div className="flex-1 bg-gray-900 flex flex-col">
      {/* Main video area */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
          <div className="text-center">
            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
              <span className="text-4xl font-bold text-white">MC</span>
            </div>
            <p className="text-white text-xl">Mike Chen is presenting</p>
            <p className="text-white/70">Screen sharing active</p>
          </div>
        </div>
        
        {/* Participant thumbnails */}
        <div className="absolute top-4 right-4 space-y-2">
          {participants.filter(p => !p.isPresenting).map((participant) => (
            <div
              key={participant.name}
              className="w-24 h-18 bg-gray-800 rounded-lg flex items-center justify-center border-2 border-white/20"
            >
              <span className="text-white font-medium">{participant.avatar}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Call controls */}
      <div className="h-20 bg-gray-800 flex items-center justify-center space-x-4 px-6">
        <Button
          variant="ghost"
          size="lg"
          onClick={() => setIsMuted(!isMuted)}
          className={`rounded-full p-4 ${isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'} text-white`}
        >
          {isMuted ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
        </Button>
        
        <Button
          variant="ghost"
          size="lg"
          onClick={() => setIsVideoOn(!isVideoOn)}
          className={`rounded-full p-4 ${!isVideoOn ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'} text-white`}
        >
          {isVideoOn ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
        </Button>
        
        <Button
          variant="ghost"
          size="lg"
          className="rounded-full p-4 bg-gray-700 hover:bg-gray-600 text-white"
        >
          <Users className="h-6 w-6" />
        </Button>
        
        <Button
          variant="ghost"
          size="lg"
          className="rounded-full p-4 bg-gray-700 hover:bg-gray-600 text-white"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
        
        <Button
          variant="ghost"
          size="lg"
          className="rounded-full p-4 bg-gray-700 hover:bg-gray-600 text-white"
        >
          <MoreHorizontal className="h-6 w-6" />
        </Button>
        
        <Button
          variant="ghost"
          size="lg"
          onClick={onEndCall}
          className="rounded-full p-4 bg-red-600 hover:bg-red-700 text-white ml-4"
        >
          <Phone className="h-6 w-6 transform rotate-180" />
        </Button>
      </div>
    </div>
  );
}
