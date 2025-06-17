import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Send, 
  FileText, 
  Bot, 
  User, 
  Upload, 
  Paperclip, 
  Plus,
  Folder,
  FolderOpen,
  Settings,
  X,
  Edit2,
  Check
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ChatMessage, DocumentGroup, Document } from '../types';

const mockMessages: ChatMessage[] = [
  {
    id: '1',
    content: 'Hello! I\'ve analyzed your uploaded documents. What would you like to know about them?',
    sender: 'ai',
    timestamp: new Date(Date.now() - 10000)
  },
  {
    id: '2',
    content: 'Can you explain the main concepts from the React documentation I uploaded?',
    sender: 'user',
    timestamp: new Date(Date.now() - 8000)
  },
  {
    id: '3',
    content: 'Based on your React documentation, here are the main concepts:\n\n1. **Components**: Building blocks of React applications\n2. **JSX**: Syntax extension for JavaScript\n3. **Props**: Data passed to components\n4. **State**: Internal component data\n5. **Hooks**: Functions that let you use state and lifecycle features\n\nWould you like me to elaborate on any of these concepts?',
    sender: 'ai',
    timestamp: new Date(Date.now() - 5000)
  }
];

const mockDocuments: Document[] = [
  { 
    id: '1', 
    name: 'React_Documentation.pdf', 
    size: '2.3 MB', 
    uploadedAt: new Date(), 
    type: 'pdf',
    groupIds: ['frontend', 'all-docs']
  },
  { 
    id: '2', 
    name: 'JavaScript_Guide.pdf', 
    size: '1.8 MB', 
    uploadedAt: new Date(), 
    type: 'pdf',
    groupIds: ['frontend', 'all-docs']
  },
  { 
    id: '3', 
    name: 'Node.js_Best_Practices.pdf', 
    size: '3.1 MB', 
    uploadedAt: new Date(), 
    type: 'pdf',
    groupIds: ['backend', 'all-docs']
  },
  { 
    id: '4', 
    name: 'Database_Design.pdf', 
    size: '2.7 MB', 
    uploadedAt: new Date(), 
    type: 'pdf',
    groupIds: ['backend', 'all-docs']
  },
  { 
    id: '5', 
    name: 'UI_UX_Principles.pdf', 
    size: '1.9 MB', 
    uploadedAt: new Date(), 
    type: 'pdf',
    groupIds: ['design', 'all-docs']
  }
];

const mockGroups: DocumentGroup[] = [
  {
    id: 'all-docs',
    name: 'All Documents',
    description: 'All uploaded documents',
    color: '#6B7280',
    createdAt: new Date(),
    documentIds: ['1', '2', '3', '4', '5'],
    isDefault: true
  },
  {
    id: 'frontend',
    name: 'Frontend Development',
    description: 'React, JavaScript, and frontend technologies',
    color: '#3B82F6',
    createdAt: new Date(),
    documentIds: ['1', '2']
  },
  {
    id: 'backend',
    name: 'Backend Development',
    description: 'Node.js, databases, and server-side technologies',
    color: '#10B981',
    createdAt: new Date(),
    documentIds: ['3', '4']
  },
  {
    id: 'design',
    name: 'Design & UX',
    description: 'UI/UX design principles and guidelines',
    color: '#8B5CF6',
    createdAt: new Date(),
    documentIds: ['5']
  }
];

export function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [documents] = useState<Document[]>(mockDocuments);
  const [groups, setGroups] = useState<DocumentGroup[]>(mockGroups);
  const [selectedGroupId, setSelectedGroupId] = useState<string>('all-docs');
  const [showGroupManager, setShowGroupManager] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [newGroupColor, setNewGroupColor] = useState('#6366F1');
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
  const [editGroupName, setEditGroupName] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedGroup = groups.find(g => g.id === selectedGroupId);
  const filteredDocuments = documents.filter(doc => 
    selectedGroup?.documentIds.includes(doc.id)
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: `Based on the documents in "${selectedGroup?.name}", I can help you with that. Let me analyze the relevant information...`,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCreateGroup = () => {
    if (!newGroupName.trim()) return;

    const newGroup: DocumentGroup = {
      id: Date.now().toString(),
      name: newGroupName,
      description: newGroupDescription,
      color: newGroupColor,
      createdAt: new Date(),
      documentIds: []
    };

    setGroups(prev => [...prev, newGroup]);
    setNewGroupName('');
    setNewGroupDescription('');
    setNewGroupColor('#6366F1');
    setShowGroupManager(false);
  };

  const handleEditGroup = (groupId: string) => {
    const group = groups.find(g => g.id === groupId);
    if (group && !group.isDefault) {
      setEditingGroupId(groupId);
      setEditGroupName(group.name);
    }
  };

  const handleSaveGroupEdit = () => {
    if (!editGroupName.trim() || !editingGroupId) return;

    setGroups(prev => prev.map(group => 
      group.id === editingGroupId 
        ? { ...group, name: editGroupName }
        : group
    ));
    setEditingGroupId(null);
    setEditGroupName('');
  };

  const handleDeleteGroup = (groupId: string) => {
    const group = groups.find(g => g.id === groupId);
    if (group && !group.isDefault) {
      setGroups(prev => prev.filter(g => g.id !== groupId));
      if (selectedGroupId === groupId) {
        setSelectedGroupId('all-docs');
      }
    }
  };

  const toggleDocumentInGroup = (documentId: string, groupId: string) => {
    const group = groups.find(g => g.id === groupId);
    if (group && !group.isDefault) {
      const isInGroup = group.documentIds.includes(documentId);
      setGroups(prev => prev.map(g => 
        g.id === groupId 
          ? {
              ...g,
              documentIds: isInGroup 
                ? g.documentIds.filter(id => id !== documentId)
                : [...g.documentIds, documentId]
            }
          : g
      ));
    }
  };

  const groupColors = [
    '#6366F1', '#10B981', '#F59E0B', '#EF4444', 
    '#8B5CF6', '#06B6D4', '#84CC16', '#F97316'
  ];

  return (
    <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-6 h-[calc(100vh-8rem)]">
      {/* Groups Sidebar */}
      <div className="lg:col-span-1">
        <Card className="p-4 h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Document Groups</h2>
            <Button 
              size="sm" 
              variant="ghost"
              onClick={() => setShowGroupManager(true)}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex-1 space-y-2 overflow-y-auto">
            {groups.map((group) => (
              <div key={group.id} className="group">
                <button
                  onClick={() => setSelectedGroupId(group.id)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedGroupId === group.id
                      ? 'bg-indigo-50 border-2 border-indigo-200'
                      : 'hover:bg-gray-50 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: group.color }}
                    />
                    <div className="flex-1 min-w-0">
                      {editingGroupId === group.id ? (
                        <div className="flex items-center space-x-2">
                          <input
                            type="text"
                            value={editGroupName}
                            onChange={(e) => setEditGroupName(e.target.value)}
                            className="flex-1 text-sm font-medium bg-white border border-gray-300 rounded px-2 py-1"
                            onKeyPress={(e) => e.key === 'Enter' && handleSaveGroupEdit()}
                            autoFocus
                          />
                          <button
                            onClick={handleSaveGroupEdit}
                            className="text-emerald-600 hover:text-emerald-700"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {group.name}
                          </p>
                          <p className="text-xs text-gray-600">
                            {group.documentIds.length} documents
                          </p>
                        </>
                      )}
                    </div>
                    {!group.isDefault && editingGroupId !== group.id && (
                      <div className="opacity-0 group-hover:opacity-100 flex items-center space-x-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditGroup(group.id);
                          }}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteGroup(group.id);
                          }}
                          className="text-gray-400 hover:text-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Documents Sidebar */}
      <div className="lg:col-span-1">
        <Card className="p-4 h-full flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">
              {selectedGroup?.name}
            </h2>
            <Button size="sm" variant="ghost">
              <Upload className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex-1 space-y-2 overflow-y-auto">
            {filteredDocuments.map((doc, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                <div className="flex items-start space-x-3">
                  <FileText className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {doc.name}
                    </p>
                    <p className="text-xs text-gray-600">
                      {doc.size} • {doc.uploadedAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <Button variant="ghost" size="sm" className="w-full">
              <Paperclip className="w-4 h-4 mr-2" />
              Add Documents
            </Button>
          </div>
        </Card>
      </div>

      {/* Chat Area */}
      <div className="lg:col-span-3">
        <Card className="h-full flex flex-col">
          {/* Chat Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">AI Assistant</h2>
                  <p className="text-sm text-gray-600">
                    Chatting with {selectedGroup?.name} ({filteredDocuments.length} documents)
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setShowGroupManager(true)}
              >
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-start space-x-3 ${
                  message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'user' 
                    ? 'bg-indigo-100' 
                    : 'bg-gradient-to-r from-indigo-600 to-purple-600'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="w-4 h-4 text-indigo-600" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                
                <div className={`max-w-sm lg:max-w-md xl:max-w-lg ${
                  message.sender === 'user' ? 'text-right' : ''
                }`}>
                  <div className={`rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </motion.div>
            ))}
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start space-x-3"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex space-x-3">
              <div className="flex-1">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Ask a question about ${selectedGroup?.name}...`}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  rows={1}
                />
              </div>
              <Button 
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="px-4 py-3"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Group Manager Modal */}
      {showGroupManager && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Manage Document Groups</h2>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowGroupManager(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Create New Group */}
              <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium text-gray-900 mb-4">Create New Group</h3>
                <div className="space-y-4">
                  <Input
                    label="Group Name"
                    value={newGroupName}
                    onChange={(e) => setNewGroupName(e.target.value)}
                    placeholder="Enter group name"
                  />
                  <Input
                    label="Description (Optional)"
                    value={newGroupDescription}
                    onChange={(e) => setNewGroupDescription(e.target.value)}
                    placeholder="Enter group description"
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Color
                    </label>
                    <div className="flex space-x-2">
                      {groupColors.map(color => (
                        <button
                          key={color}
                          onClick={() => setNewGroupColor(color)}
                          className={`w-8 h-8 rounded-full border-2 ${
                            newGroupColor === color ? 'border-gray-900' : 'border-gray-300'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                  <Button onClick={handleCreateGroup} disabled={!newGroupName.trim()}>
                    Create Group
                  </Button>
                </div>
              </div>

              {/* Existing Groups */}
              <div>
                <h3 className="font-medium text-gray-900 mb-4">Existing Groups</h3>
                <div className="space-y-4">
                  {groups.filter(g => !g.isDefault).map(group => (
                    <div key={group.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: group.color }}
                          />
                          <div>
                            <h4 className="font-medium text-gray-900">{group.name}</h4>
                            {group.description && (
                              <p className="text-sm text-gray-600">{group.description}</p>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteGroup(group.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Documents:</p>
                        <div className="space-y-2 max-h-32 overflow-y-auto">
                          {documents.map(doc => (
                            <label key={doc.id} className="flex items-center space-x-2 text-sm">
                              <input
                                type="checkbox"
                                checked={group.documentIds.includes(doc.id)}
                                onChange={() => toggleDocumentInGroup(doc.id, group.id)}
                                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <span className="text-gray-700">{doc.name}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}