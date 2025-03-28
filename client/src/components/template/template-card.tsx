import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TemplateCardProps {
  title: string;
  description: string;
  code: string;
  tags: string[];
}

export default function TemplateCard({ title, description, code, tags }: TemplateCardProps) {
  const { toast } = useToast();

  const copyTemplate = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Template copied",
      description: "Template has been copied to clipboard",
    });
  };

  return (
    <Card className="overflow-hidden border border-gray-200">
      <div className="p-4 border-b">
        <h4 className="font-semibold text-lg">{title}</h4>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
      <div className="p-4 bg-gray-50 code-font text-sm overflow-auto" style={{ maxHeight: "200px" }}>
        <pre className="whitespace-pre-wrap">{code}</pre>
      </div>
      <div className="p-4 flex justify-between items-center">
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
          ))}
        </div>
        <Button 
          variant="ghost" 
          size="sm"
          className="text-accent hover:text-blue-700 flex items-center text-sm font-medium"
          onClick={copyTemplate}
        >
          <Copy className="h-4 w-4 mr-1" />
          Copy Template
        </Button>
      </div>
    </Card>
  );
}
