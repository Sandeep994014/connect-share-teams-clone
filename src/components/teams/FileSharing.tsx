
import { useState, useRef } from "react";
import { Upload, File, Download, Search, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SharedFile {
  id: string;
  name: string;
  size: string;
  uploadedBy: string;
  uploadedAt: string;
  type: string;
}

interface FileSharingProps {
  teamName: string;
}

const sampleFiles: SharedFile[] = [
  {
    id: "1",
    name: "Project Specifications.pdf",
    size: "2.5 MB",
    uploadedBy: "Sarah Johnson",
    uploadedAt: "2 hours ago",
    type: "pdf"
  },
  {
    id: "2",
    name: "Design Mockups.figma",
    size: "15.3 MB",
    uploadedBy: "Mike Chen",
    uploadedAt: "1 day ago",
    type: "figma"
  },
  {
    id: "3",
    name: "Budget Report Q4.xlsx",
    size: "890 KB",
    uploadedBy: "Alex Rivera",
    uploadedAt: "3 days ago",
    type: "excel"
  },
  {
    id: "4",
    name: "Team Photo.jpg",
    size: "4.2 MB",
    uploadedBy: "Sarah Johnson",
    uploadedAt: "1 week ago",
    type: "image"
  }
];

export function FileSharing({ teamName }: FileSharingProps) {
  const [files, setFiles] = useState<SharedFile[]>(sampleFiles);
  const [searchTerm, setSearchTerm] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (uploadedFiles) {
      Array.from(uploadedFiles).forEach((file) => {
        const newFile: SharedFile = {
          id: Date.now().toString() + Math.random(),
          name: file.name,
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          uploadedBy: "You",
          uploadedAt: "Just now",
          type: file.type.split('/')[0] || 'file'
        };
        setFiles(prev => [newFile, ...prev]);
      });
    }
  };

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFileIcon = (type: string) => {
    return <File className="h-8 w-8 text-blue-500" />;
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Files - {teamName}</h2>
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Files
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 max-w-md"
          />
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileUpload}
        />
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-6">
          {filteredFiles.length === 0 ? (
            <div className="text-center py-12">
              <File className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No files found</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="mr-4">
                    {getFileIcon(file.type)}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{file.name}</h3>
                    <p className="text-sm text-gray-500">
                      {file.size} • Uploaded by {file.uploadedBy} • {file.uploadedAt}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
