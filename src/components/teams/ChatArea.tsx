
import { useState, useRef } from "react";
import { Send, Paperclip, Smile, File, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EmojiPicker } from "./EmojiPicker";
import { useChat } from "@/contexts/ChatContext";

export function ChatArea() {
  const { chats, activeChat, sendMessage } = useChat();
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentChat = chats.find(chat => chat.id === activeChat);

  const handleSendMessage = () => {
    if (newMessage.trim() && currentChat) {
      sendMessage(currentChat.id, {
        user: "You",
        avatar: "Y",
        content: newMessage,
        type: "text",
        isMe: true
      });
      setNewMessage("");
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && currentChat) {
      sendMessage(currentChat.id, {
        user: "You",
        avatar: "Y",
        content: file.name,
        type: "file",
        fileName: file.name,
        isMe: true
      });
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
    setShowEmojiPicker(false);
  };

  if (!currentChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No chat selected</h3>
          <p className="text-gray-600">Choose a team or start a personal conversation</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          {currentChat.messages.map((message) => (
            <div key={message.id} className="flex space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold ${
                message.isMe ? 'bg-[#5B5FC7]' : 'bg-gray-600'
              }`}>
                {message.avatar}
              </div>
              <div className="flex-1 max-w-3xl">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="font-semibold text-gray-900 text-sm">{message.user}</span>
                  <span className="text-xs text-gray-500">{message.timestamp}</span>
                  <Button variant="ghost" size="sm" className="opacity-0 hover:opacity-100 transition-opacity h-6 w-6 p-0">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </div>
                {message.type === "text" ? (
                  <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
                    <p className="text-gray-800 leading-relaxed">{message.content}</p>
                  </div>
                ) : (
                  <div className="flex items-center space-x-3 bg-white rounded-lg p-3 shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer max-w-xs">
                    <File className="h-5 w-5 text-[#5B5FC7]" />
                    <div className="flex-1 min-w-0">
                      <span className="text-[#5B5FC7] hover:underline font-medium text-sm block truncate">
                        {message.fileName}
                      </span>
                      <span className="text-xs text-gray-500">Click to download</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="border-t border-gray-200 bg-white p-4">
        <div className="flex items-end space-x-3">
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
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 h-9 w-9 p-0"
          >
            <Paperclip className="h-4 w-4" />
          </Button>
          
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 h-9 w-9 p-0"
            >
              <Smile className="h-4 w-4" />
            </Button>
            
            {showEmojiPicker && (
              <div className="absolute bottom-full mb-2 left-0 z-50">
                <EmojiPicker onEmojiSelect={handleEmojiSelect} />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="relative">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={`Type a message in ${currentChat.name}...`}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="pr-12 border-gray-300 focus:border-[#5B5FC7] focus:ring-[#5B5FC7] rounded-lg"
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#5B5FC7] hover:text-[#4A4FB5] hover:bg-gray-100 h-8 w-8 p-0 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="text-xs text-gray-500 mt-2">
          Press Enter to send, Shift+Enter for new line
        </div>
      </div>
    </div>
  );
}
