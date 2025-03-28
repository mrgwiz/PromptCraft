import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import TemplateCard from "@/components/template/template-card";
import { Search, Filter, ArrowDownAZ } from "lucide-react";

export default function Templates() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  // Fetch templates from API
  const { data: templates = [], isLoading } = useQuery({
    queryKey: ["/api/templates"],
  });

  // Filter templates based on search query and active filter
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "all" || template.tags.includes(activeFilter);
    return matchesSearch && matchesFilter;
  });

  // Extract all unique tags from templates
  const allTags = [...new Set(templates.flatMap(template => template.tags))];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-6">
        <h2 className="text-3xl font-bold mb-2">Prompt Template Library</h2>
        <p className="text-lg text-muted-foreground mb-6">
          Browse our collection of prompt templates and patterns. Copy and adapt them for your specific use cases.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search templates..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={activeFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter("all")}
              className={activeFilter === "all" ? "bg-accent hover:bg-accent/90" : ""}
            >
              All
            </Button>
            {allTags.map(tag => (
              <Button
                key={tag}
                variant={activeFilter === tag ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(tag)}
                className={activeFilter === tag ? "bg-accent hover:bg-accent/90" : ""}
              >
                {tag}
              </Button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 h-64 animate-pulse">
                <div className="p-4 border-b h-20 bg-gray-200"></div>
                <div className="p-4 bg-gray-100 h-32"></div>
                <div className="p-4 flex justify-between items-center">
                  <div className="flex gap-1">
                    <div className="h-6 w-16 bg-gray-200 rounded"></div>
                    <div className="h-6 w-20 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-8 w-28 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Expert Chain-of-Thought */}
            <TemplateCard
              title="Expert Chain-of-Thought"
              description="For complex reasoning tasks requiring domain expertise"
              code={`As an expert in [DOMAIN], solve the following problem using rigorous step-by-step reasoning:

[PROBLEM]

To solve this, I'll think through it systematically:
1. First, I'll identify the key elements...
2. Next, I'll analyze how these elements relate...
3. Then, I'll apply the relevant principles...
4. Finally, I'll derive the solution by...`}
              tags={["Chain-of-Thought", "Expert Role"]}
            />
            
            {/* Information Extraction */}
            <TemplateCard
              title="Information Extraction"
              description="For extracting structured data from text"
              code={`Extract the following entities from the text below in JSON format:
- [ENTITY_1]
- [ENTITY_2]
- [ENTITY_3]

Example 1:
"[EXAMPLE_TEXT_1]"
{
  "entity_1": "[EXTRACTED_VALUE]",
  "entity_2": "[EXTRACTED_VALUE]",
  "entity_3": "[EXTRACTED_VALUE]"
}

Now extract from this text:
"[INPUT_TEXT]"`}
              tags={["Few-Shot", "Structured Output"]}
            />
            
            {/* Comparative Analysis */}
            <TemplateCard
              title="Comparative Analysis"
              description="For analyzing differences between concepts"
              code={`Analyze the similarities and differences between [CONCEPT_A] and [CONCEPT_B] using the following structured format:

1. Key Similarities:
   - Consider shared principles
   - Identify common applications
   - Note historical connections

2. Important Differences:
   - Examine foundational approaches
   - Compare technical implementations
   - Contrast practical limitations

3. Synthesis:
   - Explain how they complement each other
   - Identify potential integration points`}
              tags={["Analytical", "Structured"]}
            />
            
            {/* Code Debugging Assistant */}
            <TemplateCard
              title="Code Debugging Assistant"
              description="For systematic code review and debugging"
              code={`Review the following code and identify any bugs, inefficiencies, or improvements. Proceed systematically:

\`\`\`[LANGUAGE]
[CODE]
\`\`\`

Please provide your analysis in this format:
1. Issues Identified:
   - [Issue 1]: [Brief description]
   - [Issue 2]: [Brief description]

2. Recommended Fixes:
\`\`\`[LANGUAGE]
[CORRECTED CODE SNIPPET 1]
\`\`\`

3. Optimizations:
   - [Suggestion 1]
   - [Suggestion 2]

4. Best Practices:
   - [Recommendation 1]
   - [Recommendation 2]`}
              tags={["Code", "Debugging"]}
            />
            
            {/* Role-Based Persona */}
            <TemplateCard
              title="Role-Based Persona"
              description="For responses from a specific expert perspective"
              code={`You are an experienced [PROFESSION/ROLE] with expertise in [SPECIFIC_DOMAIN]. Your communication style is [STYLE_DESCRIPTION].

I need your professional perspective on the following situation:

[SITUATION/QUESTION]

In your response:
- Draw on your [PROFESSION/ROLE] expertise
- Consider important factors such as [FACTOR_1], [FACTOR_2]
- Provide practical, actionable advice based on best practices in [SPECIFIC_DOMAIN]
- Include any relevant [TOOLS/METHODS/FRAMEWORKS] that would be helpful`}
              tags={["Role-Play", "Expert"]}
            />
            
            {/* Task Decomposition */}
            <TemplateCard
              title="Task Decomposition"
              description="For breaking down complex problems into manageable steps"
              code={`I need to accomplish the following complex task: [TASK_DESCRIPTION]

Please help me break this down into smaller, manageable subtasks. For each subtask:

1. Provide a clear objective
2. List the resources or information needed
3. Highlight potential challenges
4. Suggest an approach or methodology
5. Indicate how to verify completion

Organize these in a logical sequence, indicating dependencies between subtasks where they exist.`}
              tags={["Problem-Solving", "Structured"]}
            />
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg text-center">
            <p className="text-gray-500 mb-2">No templates found matching your criteria.</p>
            <Button variant="outline" onClick={() => { setSearchQuery(""); setActiveFilter("all"); }}>
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
