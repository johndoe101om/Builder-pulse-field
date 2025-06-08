import React, { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  MessageCircle,
  Send,
  Search,
  Users,
  MapPin,
  Calendar,
  Star,
  Phone,
  Video,
  Image,
  Smile,
  MoreVertical,
  Check,
  CheckCheck,
  Shield,
  Translate,
} from "lucide-react";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: Date;
  type: "text" | "image" | "location" | "booking";
  status: "sent" | "delivered" | "read";
  translation?: string;
}

interface Chat {
  id: string;
  participants: {
    id: string;
    name: string;
    avatar?: string;
    isOnline: boolean;
    verified: boolean;
    rating: number;
    location: string;
  }[];
  lastMessage: Message;
  unreadCount: number;
  propertyId?: string;
  propertyName?: string;
  propertyImage?: string;
}

export const MessagingSystem: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: "1",
      participants: [
        {
          id: "2",
          name: "Maria Santos",
          avatar:
            "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100&h=100&fit=crop&crop=face",
          isOnline: true,
          verified: true,
          rating: 4.9,
          location: "Goa, India",
        },
      ],
      lastMessage: {
        id: "1",
        senderId: "2",
        senderName: "Maria Santos",
        content:
          "Hey! Are you still looking for a travel buddy to explore Goa? I'm also traveling solo and would love to join!",
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        type: "text",
        status: "delivered",
      },
      unreadCount: 2,
      propertyId: "1",
      propertyName: "Beachfront Villa Goa",
      propertyImage:
        "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=200&h=120&fit=crop",
    },
    {
      id: "2",
      participants: [
        {
          id: "3",
          name: "Alex Chen",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
          isOnline: false,
          verified: true,
          rating: 4.8,
          location: "Mumbai, India",
        },
      ],
      lastMessage: {
        id: "2",
        senderId: "1",
        senderName: "You",
        content:
          "Thanks for the local recommendations! The restaurant you suggested was amazing 🙌",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        type: "text",
        status: "read",
      },
      unreadCount: 0,
      propertyId: "2",
      propertyName: "Downtown Mumbai Apartment",
    },
  ]);

  const [activeChat, setActiveChat] = useState<Chat | null>(chats[0]);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      senderId: "2",
      senderName: "Maria Santos",
      content:
        "Hi! I saw you're also staying in Goa during the same dates. Are you traveling solo?",
      timestamp: new Date(Date.now() - 25 * 60 * 1000),
      type: "text",
      status: "read",
    },
    {
      id: "2",
      senderId: "1",
      senderName: "You",
      content:
        "Yes, I am! Looking forward to exploring the beaches. Are you familiar with the area?",
      timestamp: new Date(Date.now() - 20 * 60 * 1000),
      type: "text",
      status: "read",
    },
    {
      id: "3",
      senderId: "2",
      senderName: "Maria Santos",
      content:
        "Hey! Are you still looking for a travel buddy to explore Goa? I'm also traveling solo and would love to join!",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      type: "text",
      status: "delivered",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim() || !activeChat) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: "1",
      senderName: "You",
      content: newMessage,
      timestamp: new Date(),
      type: "text",
      status: "sent",
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage("");

    // Update chat last message
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === activeChat.id ? { ...chat, lastMessage: message } : chat,
      ),
    );
  };

  const getStatusIcon = (status: Message["status"]) => {
    switch (status) {
      case "sent":
        return <Check className="w-3 h-3 text-gray-400" />;
      case "delivered":
        return <CheckCheck className="w-3 h-3 text-gray-400" />;
      case "read":
        return <CheckCheck className="w-3 h-3 text-blue-500" />;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const filteredChats = chats.filter(
    (chat) =>
      chat.participants.some((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ) || chat.propertyName?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Messages</h2>
        <p className="text-gray-600">Connect with fellow travelers and hosts</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Chat List */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Conversations</CardTitle>
              <Button variant="ghost" size="sm">
                <Users className="w-4 h-4" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-0 max-h-[480px] overflow-y-auto">
              {filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setActiveChat(chat)}
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                    activeChat?.id === chat.id
                      ? "bg-blue-50 border-l-4 border-l-blue-500"
                      : ""
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={chat.participants[0].avatar} />
                        <AvatarFallback>
                          {chat.participants[0].name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {chat.participants[0].isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                      {chat.participants[0].verified && (
                        <Shield className="absolute -top-1 -right-1 w-4 h-4 text-blue-500 bg-white rounded-full" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-sm text-gray-900 truncate">
                          {chat.participants[0].name}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {formatTime(chat.lastMessage.timestamp)}
                        </span>
                      </div>

                      <div className="flex items-center space-x-1 mb-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-600">
                          {chat.participants[0].rating}
                        </span>
                        <span className="text-xs text-gray-400">•</span>
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-600 truncate">
                          {chat.participants[0].location}
                        </span>
                      </div>

                      {chat.propertyName && (
                        <div className="flex items-center space-x-2 mb-2">
                          {chat.propertyImage && (
                            <img
                              src={chat.propertyImage}
                              alt={chat.propertyName}
                              className="w-6 h-6 rounded object-cover"
                            />
                          )}
                          <span className="text-xs text-blue-600 truncate">
                            {chat.propertyName}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600 truncate">
                          {chat.lastMessage.senderId === "1" ? "You: " : ""}
                          {chat.lastMessage.content}
                        </p>
                        {chat.unreadCount > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {chat.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Window */}
        {activeChat ? (
          <Card className="lg:col-span-2 flex flex-col">
            {/* Chat Header */}
            <CardHeader className="pb-3 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={activeChat.participants[0].avatar} />
                      <AvatarFallback>
                        {activeChat.participants[0].name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {activeChat.participants[0].isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 flex items-center space-x-2">
                      <span>{activeChat.participants[0].name}</span>
                      {activeChat.participants[0].verified && (
                        <Shield className="w-4 h-4 text-blue-500" />
                      )}
                    </h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span>{activeChat.participants[0].rating}</span>
                      <span>•</span>
                      <span
                        className={
                          activeChat.participants[0].isOnline
                            ? "text-green-600"
                            : "text-gray-500"
                        }
                      >
                        {activeChat.participants[0].isOnline
                          ? "Online"
                          : "Last seen 2h ago"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {activeChat.propertyName && (
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg mt-3">
                  {activeChat.propertyImage && (
                    <img
                      src={activeChat.propertyImage}
                      alt={activeChat.propertyName}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  )}
                  <div>
                    <p className="font-medium text-blue-900">
                      {activeChat.propertyName}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-blue-700">
                      <span className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>Dec 15-22</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>Goa, India</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === "1" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] ${message.senderId === "1" ? "order-2" : "order-1"}`}
                    >
                      <div
                        className={`px-4 py-2 rounded-2xl ${
                          message.senderId === "1"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        {message.translation && (
                          <div className="mt-2 pt-2 border-t border-gray-200 border-opacity-20">
                            <div className="flex items-center space-x-1 mb-1">
                              <Translate className="w-3 h-3 opacity-70" />
                              <span className="text-xs opacity-70">
                                Translation
                              </span>
                            </div>
                            <p className="text-xs opacity-90">
                              {message.translation}
                            </p>
                          </div>
                        )}
                      </div>
                      <div
                        className={`flex items-center space-x-1 mt-1 ${
                          message.senderId === "1"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <span className="text-xs text-gray-500">
                          {formatTime(message.timestamp)}
                        </span>
                        {message.senderId === "1" &&
                          getStatusIcon(message.status)}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Image className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Smile className="w-4 h-4" />
                </Button>
                <div className="flex-1 flex items-center space-x-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} size="sm">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="lg:col-span-2 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Select a conversation
              </h3>
              <p className="text-gray-600">
                Choose a conversation to start messaging
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
