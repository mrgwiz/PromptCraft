import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface AnalysisPanelProps {
  scores: {
    effectiveness: number;
    coherence: string;
    coherenceScore: number;
    techniques: string[];
  };
}

export default function AnalysisPanel({ scores }: AnalysisPanelProps) {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-4">Prompt Analysis</h4>
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <h5 className="font-medium mb-2 text-gray-700">Effectiveness Score</h5>
            <div className="flex items-center">
              <span className="text-2xl font-bold text-secondary">{scores.effectiveness.toFixed(1)}</span>
              <span className="text-sm text-gray-500 ml-2">/10</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {scores.effectiveness >= 9 ? "Highly effective" : 
               scores.effectiveness >= 7 ? "Good prompt structure" : 
               scores.effectiveness >= 5 ? "Average effectiveness" : 
               "Could use improvement"}
              {scores.techniques.includes("Chain-of-Thought") ? " chain-of-thought structure" : ""}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h5 className="font-medium mb-2 text-gray-700">Response Quality</h5>
            <div className="h-2 bg-gray-200 rounded-full mb-2">
              <div 
                className="h-2 bg-secondary rounded-full" 
                style={{ width: `${scores.coherenceScore}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm">
              <span>Coherence</span>
              <span className="font-medium">{scores.coherence}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <h5 className="font-medium mb-2 text-gray-700">Technique Applied</h5>
            <div className="flex flex-wrap gap-2">
              {scores.techniques.map((technique) => (
                <Badge key={technique} variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                  {technique}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
