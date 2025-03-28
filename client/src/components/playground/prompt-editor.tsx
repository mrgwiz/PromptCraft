import { Button } from "@/components/ui/button";
import { Copy, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PromptEditorProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  onLoadTemplate: () => void;
}

export default function PromptEditor({ value, onChange, onClear, onLoadTemplate }: PromptEditorProps) {
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Copied to clipboard",
      description: "Prompt copied to clipboard successfully",
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="font-medium text-gray-700">Prompt</label>
        <div className="flex">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClear}
            className="text-sm text-gray-500 hover:text-gray-700 mr-3"
          >
            Clear
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onLoadTemplate}
            className="text-sm text-accent hover:text-blue-700"
          >
            Load Template
          </Button>
        </div>
      </div>
      <div className="border rounded-lg bg-gray-50 overflow-hidden">
        <div className="flex items-center px-3 py-2 bg-gray-100 border-b">
          <span className="text-sm font-medium text-gray-700">Edit Prompt</span>
          <div className="ml-auto flex">
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-1 rounded hover:bg-gray-200" 
              title="Copy to clipboard"
              onClick={copyToClipboard}
            >
              <Copy className="h-4 w-4 text-gray-600" />
            </Button>
          </div>
        </div>
        <textarea 
          className="w-full p-3 bg-gray-50 font-mono text-sm min-h-[300px] focus:outline-none resize-none" 
          placeholder="Enter your prompt here..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}
