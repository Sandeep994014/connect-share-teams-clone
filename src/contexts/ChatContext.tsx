
import { createContext, useContext, useState, ReactNode } from "react";

interface Message {
  id: string;
  user: string;
  avatar: string;
  content: string;
  timestamp: string;
  type: "text" | "file";
  fileName?: string;
  isMe?: boolean;
}

interface Chat {
  id: string;
  name: string;
  type: "team" | "personal";
  participantId?: string;
  messages: Message[];
  unreadCount: number;
  lastMessage?: Message;
}

interface ChatContextType {
  chats: Chat[];
  activeChat: string;
  setActiveChat: (chatId: string) => void;
  sendMessage: (chatId: string, message: Omit<Message, "id" | "timestamp">) => void;
  startPersonalChat: (memberId: string, memberName: string, memberAvatar: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const initialChats: Chat[] = [
  {
    id: "general",
    name: "General",
    type: "team",
    unreadCount: 0,
    messages: [
      {
        id: "1",
        user: "Sarah Johnson",
        avatar: "SJ",
        content: "Hey team! Just wanted to share the latest design mockups for the project. Looking forward to your feedback!",
        timestamp: "10:30 AM",
        type: "text",
        isMe: false
      },
      {
        id: "2",
        user: "Mike Chen",
        avatar: "MC",
        content: "project-specs.pdf",
        timestamp: "10:32 AM",
        type: "file",
        fileName: "project-specs.pdf",
        isMe: false
      }
    ]
  },
  {
    id: "development",
    name: "Development",
    type: "team",
    unreadCount: 2,
    messages: [
      {
        id: "1",
        user: "Alex Rivera",
        avatar: "AR",
        content: "The API endpoints are ready for testing",
        timestamp: "9:15 AM",
        type: "text",
        isMe: false
      }
    ]
  }
];

export function ChatProvider({ children }: { children: ReactNode }) {
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [activeChat, setActiveChat] = useState("general");

  const sendMessage = (chatId: string, message: Omit<Message, "id" | "timestamp">) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChats(prev => prev.map(chat => 
      chat.id === chatId 
        ? { 
            ...chat, 
            messages: [...chat.messages, newMessage],
            lastMessage: newMessage
          }
        : chat
    ));
  };

  const startPersonalChat = (memberId: string, memberName: string, memberAvatar: string) => {
    const existingChat = chats.find(chat => 
      chat.type === "personal" && chat.participantId === memberId
    );

    if (existingChat) {
      setActiveChat(existingChat.id);
      return;
    }

    const newChat: Chat = {
      id: `personal_${memberId}`,
      name: memberName,
      type: "personal",
      participantId: memberId,
      messages: [],
      unreadCount: 0
    };

    setChats(prev => [...prev, newChat]);
    setActiveChat(newChat.id);
  };

  return (
    <ChatContext.Provider value={{
      chats,
      activeChat,
      setActiveChat,
      sendMessage,
      startPersonalChat
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
