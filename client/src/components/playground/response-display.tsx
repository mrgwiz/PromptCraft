import { Button } from "@/components/ui/button";
import { Copy, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ResponseDisplayProps {
  model: string;
  response: string;
  loading: boolean;
}

export default function ResponseDisplay({ model, response, loading }: ResponseDisplayProps) {
  const { toast } = useToast();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response);
    toast({
      title: "Copied to clipboard",
      description: "Response copied to clipboard successfully",
    });
  };

  const saveResponse = () => {
    // In a real app, this would save to a backend
    toast({
      title: "Response saved",
      description: "Response has been saved for future reference",
    });
  };

  return (
    <div>
      <div className="mb-2">
        <label className="font-medium text-gray-700">Response</label>
      </div>
      <div className="border rounded-lg overflow-hidden">
        <div className="flex items-center px-3 py-2 bg-gray-100 border-b">
          <div className="flex items-center">
            <div className={`w-2 h-2 ${loading ? 'bg-amber-500' : 'bg-green-500'} rounded-full mr-2`}></div>
            <span className="text-sm font-medium text-gray-700">{model}</span>
          </div>
          <div className="ml-auto flex">
            <Button 
              variant="ghost" 
              size="sm"
              className="p-1 rounded hover:bg-gray-200" 
              title="Copy to clipboard"
              onClick={copyToClipboard}
              disabled={!response || loading}
            >
              <Copy className="h-4 w-4 text-gray-600" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="p-1 rounded hover:bg-gray-200 ml-1" 
              title="Save response"
              onClick={saveResponse}
              disabled={!response || loading}
            >
              <Save className="h-4 w-4 text-gray-600" />
            </Button>
          </div>
        </div>
        <div className="p-4 bg-gray-50 overflow-auto min-h-[300px]">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-pulse text-gray-400">Generating response...</div>
            </div>
          ) : response ? (
            <div className="whitespace-pre-line">{response}</div>
          ) : (
            <div className="text-gray-400 h-full flex items-center justify-center">
              <p>Response will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
