import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  FileText, 
  Search, 
  Filter, 
  MoreVertical,
  Download,
  Trash2,
  Eye,
  Share,
  FolderPlus,
  Grid,
  List,
  Calendar,
  FileIcon,
  Image,
  Video,
  Music,
  Archive,
  Star,
  Clock,
  User
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Document } from '../types';

const mockFiles: Document[] = [
  {
    id: '1',
    name: 'React_Documentation.pdf',
    size: '2.3 MB',
    uploadedAt: new Date(Date.now() - 86400000),
    type: 'pdf',
    groupIds: ['frontend'],
    content: 'React documentation content...'
  },
  {
    id: '2',
    name: 'JavaScript_Guide.pdf',
    size: '1.8 MB',
    uploadedAt: new Date(Date.now() - 172800000),
    type: 'pdf',
    groupIds: ['frontend'],
    content: 'JavaScript guide content...'
  },
  {
    id: '3',
    name: 'Node.js_Best_Practices.pdf',
    size: '3.1 MB',
    uploadedAt: new Date(Date.now() - 259200000),
    type: 'pdf',
    groupIds: ['backend'],
    content: 'Node.js best practices...'
  },
  {
    id: '4',
    name: 'Database_Design.pdf',
    size: '2.7 MB',
    uploadedAt: new Date(Date.now() - 345600000),
    type: 'pdf',
    groupIds: ['backend'],
    content: 'Database design principles...'
  },
  {
    id: '5',
    name: 'UI_UX_Principles.pdf',
    size: '1.9 MB',
    uploadedAt: new Date(Date.now() - 432000000),
    type: 'pdf',
    groupIds: ['design'],
    content: 'UI/UX design principles...'
  }
];

const fileTypeIcons = {
  pdf: FileText,
  doc: FileIcon,
  txt: FileIcon,
  image: Image,
  video: Video,
  audio: Music,
  archive: Archive
};

const fileTypeColors = {
  pdf: 'text-red-600',
  doc: 'text-blue-600',
  txt: 'text-gray-600',
  image: 'text-green-600',
  video: 'text-purple-600',
  audio: 'text-orange-600',
  archive: 'text-yellow-600'
};

export function Files() {
  const [files, setFiles] = useState<Document[]>(mockFiles);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size'>('date');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedFiles = [...filteredFiles].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'date':
        return b.uploadedAt.getTime() - a.uploadedAt.getTime();
      case 'size':
        return parseFloat(b.size) - parseFloat(a.size);
      default:
        return 0;
    }
  });

  const handleFileSelect = (fileId: string) => {
    setSelectedFiles(prev =>
      prev.includes(fileId)
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleSelectAll = () => {
    setSelectedFiles(
      selectedFiles.length === sortedFiles.length
        ? []
        : sortedFiles.map(file => file.id)
    );
  };

  const handleDeleteSelected = () => {
    setFiles(prev => prev.filter(file => !selectedFiles.includes(file.id)));
    setSelectedFiles([]);
  };

  const getFileIcon = (type: string) => {
    const IconComponent = fileTypeIcons[type as keyof typeof fileTypeIcons] || FileIcon;
    return IconComponent;
  };

  const getFileColor = (type: string) => {
    return fileTypeColors[type as keyof typeof fileTypeColors] || 'text-gray-600';
  };

  const formatFileSize = (size: string) => {
    return size;
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Files</h1>
          <p className="text-gray-600">
            Manage and organize your uploaded documents
          </p>
        </div>
        <Button onClick={() => setShowUploadModal(true)}>
          <Upload className="w-4 h-4 mr-2" />
          Upload Files
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Files</p>
              <p className="text-2xl font-bold text-gray-900">{files.length}</p>
            </div>
            <FileText className="w-8 h-8 text-indigo-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Storage Used</p>
              <p className="text-2xl font-bold text-gray-900">12.4 MB</p>
            </div>
            <Archive className="w-8 h-8 text-emerald-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Recent Uploads</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
            </div>
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Shared Files</p>
              <p className="text-2xl font-bold text-gray-900">2</p>
            </div>
            <Share className="w-8 h-8 text-purple-600" />
          </div>
        </Card>
      </div>

      {/* Controls */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'date' | 'size')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="date">Sort by Date</option>
              <option value="name">Sort by Name</option>
              <option value="size">Sort by Size</option>
            </select>
            
            <div className="flex border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {selectedFiles.length > 0 && (
          <div className="mt-4 p-3 bg-indigo-50 rounded-lg flex items-center justify-between">
            <span className="text-sm text-indigo-700">
              {selectedFiles.length} file(s) selected
            </span>
            <div className="flex space-x-2">
              <Button size="sm" variant="ghost">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button size="sm" variant="ghost">
                <Share className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={handleDeleteSelected}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Files Display */}
      <Card className="p-6">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedFiles.map((file, index) => {
              const FileIcon = getFileIcon(file.type);
              return (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                    selectedFiles.includes(file.id)
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleFileSelect(file.id)}
                >
                  <div className="flex flex-col items-center text-center">
                    <FileIcon className={`w-12 h-12 mb-3 ${getFileColor(file.type)}`} />
                    <h3 className="font-medium text-gray-900 mb-1 truncate w-full">
                      {file.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{formatFileSize(file.size)}</p>
                    <p className="text-xs text-gray-500">{formatDate(file.uploadedAt)}</p>
                  </div>
                  
                  <div className="mt-3 flex justify-center space-x-2">
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center space-x-4 p-3 border-b border-gray-200 text-sm font-medium text-gray-600">
              <input
                type="checkbox"
                checked={selectedFiles.length === sortedFiles.length}
                onChange={handleSelectAll}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <div className="flex-1">Name</div>
              <div className="w-20">Size</div>
              <div className="w-24">Modified</div>
              <div className="w-20">Actions</div>
            </div>
            
            {sortedFiles.map((file, index) => {
              const FileIcon = getFileIcon(file.type);
              return (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 ${
                    selectedFiles.includes(file.id) ? 'bg-indigo-50' : ''
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedFiles.includes(file.id)}
                    onChange={() => handleFileSelect(file.id)}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <div className="flex items-center space-x-3 flex-1">
                    <FileIcon className={`w-5 h-5 ${getFileColor(file.type)}`} />
                    <span className="font-medium text-gray-900 truncate">{file.name}</span>
                  </div>
                  <div className="w-20 text-sm text-gray-600">{formatFileSize(file.size)}</div>
                  <div className="w-24 text-sm text-gray-600">{formatDate(file.uploadedAt)}</div>
                  <div className="w-20 flex space-x-1">
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
        
        {sortedFiles.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No files found</h3>
            <p className="text-gray-600 mb-4">
              {searchQuery ? 'Try adjusting your search terms' : 'Upload your first file to get started'}
            </p>
            <Button onClick={() => setShowUploadModal(true)}>
              <Upload className="w-4 h-4 mr-2" />
              Upload Files
            </Button>
          </div>
        )}
      </Card>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Upload Files</h2>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowUploadModal(false)}
                >
                  ×
                </Button>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Drop files here or click to browse
                </h3>
                <p className="text-gray-600 mb-4">
                  Support for PDF, DOC, TXT files up to 10MB
                </p>
                <Button>Choose Files</Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}