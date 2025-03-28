import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  maxHeight?: string;
}

export default function CodeBlock({ 
  code, 
  language = "plaintext", 
  showLineNumbers = false,
  maxHeight = "300px"
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-gray-50 rounded-md border overflow-hidden font-mono text-sm">
      <div className="absolute right-2 top-2">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-8 w-8 p-0 bg-primary/10 hover:bg-primary/20",
            copied && "bg-green-500/10 hover:bg-green-500/20"
          )}
          onClick={copyToClipboard}
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4 text-gray-600" />
          )}
        </Button>
      </div>
      <pre 
        className={cn(
          "p-4 overflow-auto custom-scrollbar",
          showLineNumbers && "pl-12 relative"
        )}
        style={{ maxHeight }}
      >
        <code className="language-${language}">{code}</code>
      </pre>
    </div>
  );
}
