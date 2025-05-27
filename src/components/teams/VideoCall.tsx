
import { useState } from "react";
import { Mic, MicOff, Video, VideoOff, Phone, Users, MessageCircle, MoreHorizontal, Monitor, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VideoCallProps {
  onEndCall: () => void;
}

export function VideoCall({ onEndCall }: VideoCallProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isRecording, setIsRecording] = useState(false);

  const participants = [
    { name: "Sarah Johnson", avatar: "SJ", isPresenting: false, isMuted: false },
    { name: "Mike Chen", avatar: "MC", isPresenting: true, isMuted: false },
    { name: "Alex Rivera", avatar: "AR", isPresenting: false, isMuted: true },
    { name: "You", avatar: "Y", isPresenting: false, isMuted: isMuted },
  ];

  return (
    <div className="flex-1 bg-[#1f1f1f] flex flex-col">
      {/* Call header */}
      <div className="h-14 bg-[#292929] flex items-center justify-between px-6 border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <h2 className="text-white font-semibold">Team Meeting</h2>
          {isRecording && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-400 text-sm">Recording</span>
            </div>
          )}
        </div>
        <div className="text-gray-400 text-sm">
          {participants.length} participants
        </div>
      </div>

      {/* Main video area */}
      <div className="flex-1 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#5B5FC7] to-[#8B5FBF] flex items-center justify-center">
          <div className="text-center">
            <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto backdrop-blur-sm">
              <span className="text-4xl font-bold text-white">MC</span>
            </div>
            <p className="text-white text-xl font-semibold">Mike Chen</p>
            <p className="text-white/80 text-sm">Presenting screen</p>
          </div>
        </div>
        
        {/* Participant thumbnails */}
        <div className="absolute top-4 right-4 space-y-2">
          {participants.filter(p => !p.isPresenting).map((participant) => (
            <div
              key={participant.name}
              className="relative w-28 h-20 bg-gray-800 rounded-lg flex items-center justify-center border-2 border-gray-600 overflow-hidden"
            >
              <span className="text-white font-semibold text-sm">{participant.avatar}</span>
              {participant.isMuted && (
                <div className="absolute bottom-1 right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <MicOff className="h-3 w-3 text-white" />
                </div>
              )}
              <div className="absolute bottom-1 left-1 text-xs text-white bg-black/50 px-1 rounded">
                {participant.name.split(' ')[0]}
              </div>
            </div>
          ))}
        </div>

        {/* Meeting controls overlay */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
          <div className="bg-black/80 backdrop-blur-sm rounded-lg px-4 py-2">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsRecording(!isRecording)}
                className={`text-white hover:bg-white/20 ${isRecording ? 'bg-red-600' : ''}`}
              >
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                {isRecording ? 'Stop Recording' : 'Record'}
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
              >
                <Monitor className="h-4 w-4 mr-2" />
                Share Screen
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Call controls */}
      <div className="h-20 bg-[#292929] flex items-center justify-center space-x-4 px-6 border-t border-gray-700">
        <Button
          variant="ghost"
          size="lg"
          onClick={() => setIsMuted(!isMuted)}
          className={`rounded-full p-4 transition-all ${
            isMuted 
              ? 'bg-red-600 hover:bg-red-700 text-white' 
              : 'bg-gray-700 hover:bg-gray-600 text-white'
          }`}
        >
          {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
        </Button>
        
        <Button
          variant="ghost"
          size="lg"
          onClick={() => setIsVideoOn(!isVideoOn)}
          className={`rounded-full p-4 transition-all ${
            !isVideoOn 
              ? 'bg-red-600 hover:bg-red-700 text-white' 
              : 'bg-gray-700 hover:bg-gray-600 text-white'
          }`}
        >
          {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
        </Button>
        
        <Button
          variant="ghost"
          size="lg"
          className="rounded-full p-4 bg-gray-700 hover:bg-gray-600 text-white"
        >
          <Users className="h-5 w-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="lg"
          className="rounded-full p-4 bg-gray-700 hover:bg-gray-600 text-white"
        >
          <MessageCircle className="h-5 w-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="lg"
          className="rounded-full p-4 bg-gray-700 hover:bg-gray-600 text-white"
        >
          <Settings className="h-5 w-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="lg"
          className="rounded-full p-4 bg-gray-700 hover:bg-gray-600 text-white"
        >
          <MoreHorizontal className="h-5 w-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="lg"
          onClick={onEndCall}
          className="rounded-full p-4 bg-red-600 hover:bg-red-700 text-white ml-4 transition-all"
        >
          <Phone className="h-5 w-5 transform rotate-180" />
        </Button>
      </div>
    </div>
  );
}
