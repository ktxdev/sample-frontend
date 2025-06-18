import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Upload, 
  FileText, 
  Loader, 
  Check, 
  X, 
  Download,
  Save,
  Settings,
  Hash,
  File,
  Video,
  Image,
  Code,
  Presentation,
  BookOpen,
  Eye,
  Edit,
  Share,
  RefreshCw,
  Sparkles,
  Clock,
  Target,
  Layers
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

interface GeneratedNote {
  id: string;
  title: string;
  content: string;
  summary: string;
  keyPoints: string[];
  sourceFile: string;
  fileType: string;
  createdAt: Date;
  wordCount: number;
  readingTime: number;
}

const mockNote: GeneratedNote = {
  id: '1',
  title: 'Introduction to React Components',
  content: `# Introduction to React Components

## What are React Components?

React components are the building blocks of React applications. They are reusable pieces of code that return JSX elements to describe what should appear on the screen.

### Types of Components

1. **Functional Components**
   - Simple JavaScript functions that return JSX
   - Use React Hooks for state management
   - Preferred approach in modern React development

2. **Class Components**
   - ES6 classes that extend React.Component
   - Have built-in state and lifecycle methods
   - Legacy approach, still supported

### Component Lifecycle

Components go through several phases:
- **Mounting**: Component is being created and inserted into the DOM
- **Updating**: Component is being re-rendered as a result of changes to props or state
- **Unmounting**: Component is being removed from the DOM

### Best Practices

- Keep components small and focused
- Use descriptive names
- Extract reusable logic into custom hooks
- Follow the single responsibility principle
- Use PropTypes or TypeScript for type checking

### Example

\`\`\`jsx
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}
\`\`\`

This simple functional component takes a name prop and returns a greeting.`,
  summary: 'Comprehensive overview of React components, covering functional and class components, lifecycle methods, and best practices for component development.',
  keyPoints: [
    'React components are reusable building blocks of React applications',
    'Functional components are preferred over class components in modern React',
    'Components have lifecycle phases: mounting, updating, and unmounting',
    'Best practices include keeping components small and using descriptive names',
    'Components can receive data through props and manage internal state'
  ],
  sourceFile: 'react-components-guide.pdf',
  fileType: 'pdf',
  createdAt: new Date(),
  wordCount: 245,
  readingTime: 2
};

const supportedFormats = [
  { type: 'pdf', label: 'PDF Documents', icon: FileText, accept: 'application/pdf', extensions: ['.pdf'] },
  { type: 'doc', label: 'Word Documents', icon: File, accept: 'application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document', extensions: ['.doc', '.docx'] },
  { type: 'ppt', label: 'PowerPoint', icon: Presentation, accept: 'application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation', extensions: ['.ppt', '.pptx'] },
  { type: 'video', label: 'Videos', icon: Video, accept: 'video/*', extensions: ['.mp4', '.avi', '.mov', '.mkv'] },
  { type: 'notebook', label: 'Jupyter Notebooks', icon: Code, accept: '.ipynb', extensions: ['.ipynb'] },
  { type: 'text', label: 'Text Files', icon: FileText, accept: 'text/plain', extensions: ['.txt', '.md'] },
  { type: 'image', label: 'Images', icon: Image, accept: 'image/*', extensions: ['.jpg', '.png', '.gif'] }
];

export function Notes() {
  const navigate = useNavigate();
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'processing' | 'complete'>('idle');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [generatedNote, setGeneratedNote] = useState<GeneratedNote | null>(null);
  const [noteSettings, setNoteSettings] = useState({
    title: '',
    style: 'comprehensive' as 'summary' | 'comprehensive' | 'outline',
    includeKeyPoints: true,
    includeSummary: true,
    language: 'english'
  });

  const getFileIcon = (file: File) => {
    const extension = file.name.toLowerCase().split('.').pop();
    const format = supportedFormats.find(f => f.extensions.includes(`.${extension}`));
    return format?.icon || FileText;
  };

  const getFileType = (file: File) => {
    const extension = file.name.toLowerCase().split('.').pop();
    const format = supportedFormats.find(f => f.extensions.includes(`.${extension}`));
    return format?.type || 'unknown';
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: supportedFormats.reduce((acc, format) => {
      acc[format.accept] = format.extensions;
      return acc;
    }, {} as Record<string, string[]>),
    multiple: false,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        handleFileUpload(acceptedFiles[0]);
      }
    }
  });

  const handleFileUpload = async (file: File) => {
    setUploadedFile(file);
    setUploadState('uploading');
    
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 2000));
    setUploadState('processing');
    
    // Simulate AI processing (longer for videos)
    const processingTime = getFileType(file) === 'video' ? 8000 : 4000;
    await new Promise(resolve => setTimeout(resolve, processingTime));
    setUploadState('complete');
    
    // Generate notes with user settings
    const generated: GeneratedNote = {
      ...mockNote,
      id: Date.now().toString(),
      title: noteSettings.title || `Notes from ${file.name}`,
      sourceFile: file.name,
      fileType: getFileType(file),
      createdAt: new Date()
    };
    
    setGeneratedNote(generated);
  };

  const handleSaveNotes = () => {
    console.log('Saving notes:', generatedNote);
    navigate('/files');
  };

  const handleEditNotes = () => {
    // Navigate to notes editor
    navigate(`/notes/${generatedNote?.id}/edit`);
  };

  if (uploadState === 'idle') {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Generate Notes from Files</h1>
          <p className="text-gray-600">Upload documents, videos, or presentations and our AI will create comprehensive notes for you</p>
        </div>

        {/* Supported Formats */}
        <Card className="p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Supported File Formats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {supportedFormats.map((format) => (
              <div key={format.type} className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                <format.icon className="w-8 h-8 text-indigo-600 mb-2" />
                <span className="text-xs font-medium text-gray-700 text-center">{format.label}</span>
                <span className="text-xs text-gray-500 mt-1">{format.extensions.join(', ')}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Notes Settings */}
        <Card className="p-6 mb-6">
          <div className="flex items-center space-x-3 mb-6">
            <Settings className="w-6 h-6 text-indigo-600" />
            <h2 className="text-lg font-semibold text-gray-900">Notes Settings</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Input
              label="Notes Title (Optional)"
              value={noteSettings.title}
              onChange={(e) => setNoteSettings(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter notes title..."
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes Style
              </label>
              <select
                value={noteSettings.style}
                onChange={(e) => setNoteSettings(prev => ({ ...prev, style: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="summary">Summary Only</option>
                <option value="comprehensive">Comprehensive</option>
                <option value="outline">Outline Format</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select
                value={noteSettings.language}
                onChange={(e) => setNoteSettings(prev => ({ ...prev, language: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
                <option value="chinese">Chinese</option>
              </select>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Include
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={noteSettings.includeKeyPoints}
                    onChange={(e) => setNoteSettings(prev => ({ ...prev, includeKeyPoints: e.target.checked }))}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Key Points</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={noteSettings.includeSummary}
                    onChange={(e) => setNoteSettings(prev => ({ ...prev, includeSummary: e.target.checked }))}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Summary</span>
                </label>
              </div>
            </div>
          </div>
        </Card>

        {/* File Upload */}
        <Card className="p-8">
          <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-indigo-400 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'
          }`}>
            <input {...getInputProps()} />
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {isDragActive ? 'Drop your file here' : 'Upload File'}
            </h3>
            <p className="text-gray-600 mb-4">
              Drag and drop your file here, or click to browse
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Supports PDF, Word, PowerPoint, Videos, Jupyter Notebooks, and more
            </p>
            <Button>Choose File</Button>
          </div>
        </Card>
      </div>
    );
  }

  if (uploadState !== 'complete' || !generatedNote) {
    const FileIcon = uploadedFile ? getFileIcon(uploadedFile) : FileText;
    
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="p-8 text-center">
          <div className="mb-6">
            {uploadState === 'uploading' && (
              <>
                <Upload className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Uploading File</h3>
                <p className="text-gray-600">Please wait while we upload your file...</p>
              </>
            )}
            {uploadState === 'processing' && (
              <>
                <div className="relative mb-4">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
                    <Sparkles className="w-6 h-6 text-indigo-600 animate-pulse" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Generating Notes</h3>
                <p className="text-gray-600">
                  Our AI is analyzing your {getFileType(uploadedFile!)} and creating {noteSettings.style} notes...
                </p>
                {getFileType(uploadedFile!) === 'video' && (
                  <p className="text-sm text-gray-500 mt-2">Video processing may take a bit longer</p>
                )}
              </>
            )}
          </div>
          
          {uploadedFile && (
            <div className="flex items-center justify-center space-x-3 text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
              <FileIcon className="w-4 h-4" />
              <span>{uploadedFile.name}</span>
              <span>({Math.round(uploadedFile.size / 1024)} KB)</span>
            </div>
          )}
        </Card>
      </div>
    );
  }

  // Notes Generated Successfully
  return (
    <div className="max-w-6xl mx-auto">
      <Card className="p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Notes Generated Successfully!</h2>
          <p className="text-gray-600">Your comprehensive notes have been created and are ready to use</p>
        </div>

        {/* Notes Preview */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{generatedNote.title}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <BookOpen className="w-4 h-4" />
                  <span>{generatedNote.wordCount} words</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{generatedNote.readingTime} min read</span>
                </div>
                <div className="flex items-center space-x-1">
                  <File className="w-4 h-4" />
                  <span>{generatedNote.fileType.toUpperCase()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          {noteSettings.includeSummary && (
            <div className="bg-white rounded-lg p-4 mb-4">
              <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                <Target className="w-4 h-4 mr-2" />
                Summary
              </h4>
              <p className="text-gray-700 text-sm leading-relaxed">{generatedNote.summary}</p>
            </div>
          )}

          {/* Key Points */}
          {noteSettings.includeKeyPoints && (
            <div className="bg-white rounded-lg p-4 mb-4">
              <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                <Layers className="w-4 h-4 mr-2" />
                Key Points
              </h4>
              <ul className="space-y-2">
                {generatedNote.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm text-gray-700">
                    <span className="w-5 h-5 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-medium mt-0.5">
                      {index + 1}
                    </span>
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Content Preview */}
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3 flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Notes Preview
            </h4>
            <div className="prose prose-sm max-w-none text-gray-700">
              <div className="max-h-64 overflow-y-auto">
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                  {generatedNote.content.substring(0, 500)}...
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
          <Button onClick={handleSaveNotes} variant="secondary" size="lg" className="group">
            <Save className="w-5 h-5 mr-2" />
            Save Notes
          </Button>
          
          <Button onClick={handleEditNotes} size="lg" className="group">
            <Edit className="w-5 h-5 mr-2" />
            Edit Notes
          </Button>

          <Button variant="secondary" size="lg" className="group">
            <Eye className="w-5 h-5 mr-2" />
            Full View
          </Button>
        </div>

        {/* Additional Options */}
        <div className="pt-6 border-t border-gray-200">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export as PDF</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export as Word</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Share className="w-4 h-4" />
              <span>Share Notes</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
              <RefreshCw className="w-4 h-4" />
              <span>Regenerate</span>
            </button>
            <button 
              onClick={() => navigate('/files')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>View All Files</span>
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}