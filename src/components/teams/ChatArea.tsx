
import { useState, useRef } from "react";
import { Send, Paperclip, Smile, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EmojiPicker } from "./EmojiPicker";

interface Message {
  id: string;
  user: string;
  avatar: string;
  content: string;
  timestamp: string;
  type: "text" | "file";
  fileName?: string;
}

interface ChatAreaProps {
  teamName: string;
}

const sampleMessages: Message[] = [
  {
    id: "1",
    user: "Sarah Johnson",
    avatar: "SJ",
    content: "Hey team! Just wanted to share the latest design mockups for the project.",
    timestamp: "10:30 AM",
    type: "text"
  },
  {
    id: "2",
    user: "Mike Chen",
    avatar: "MC",
    content: "project-specs.pdf",
    timestamp: "10:32 AM",
    type: "file",
    fileName: "project-specs.pdf"
  },
  {
    id: "3",
    user: "Alex Rivera",
    avatar: "AR",
    content: "Looks great! I'll review the specifications and get back to you by EOD.",
    timestamp: "10:35 AM",
    type: "text"
  }
];

export function ChatArea({ teamName }: ChatAreaProps) {
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        user: "You",
        avatar: "Y",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: "text"
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const message: Message = {
        id: Date.now().toString(),
        user: "You",
        avatar: "Y",
        content: file.name,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: "file",
        fileName: file.name
      };
      setMessages([...messages, message]);
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                {message.avatar}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-gray-900">{message.user}</span>
                  <span className="text-xs text-gray-500">{message.timestamp}</span>
                </div>
                {message.type === "text" ? (
                  <p className="text-gray-700">{message.content}</p>
                ) : (
                  <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-3 border">
                    <File className="h-5 w-5 text-blue-500" />
                    <span className="text-blue-600 hover:underline cursor-pointer">
                      {message.fileName}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileUpload}
          />
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="text-gray-500 hover:text-gray-700"
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="text-gray-500 hover:text-gray-700"
            >
              <Smile className="h-5 w-5" />
            </Button>
            
            {showEmojiPicker && (
              <div className="absolute bottom-full mb-2 left-0">
                <EmojiPicker onEmojiSelect={handleEmojiSelect} />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={`Type a message to ${teamName}...`}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="border-gray-200"
            />
          </div>
          
          <Button 
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
