'use client';

import { Button } from '@/components/ui/button';

interface Prompt {
  id: number;
  title: string;
  category: string;
  price: number;
  sales: number;
  revenue: number;
  status: 'active' | 'inactive';
}

interface PromptTableProps {
  prompts: Prompt[];
  onDelete: (id: number) => void;
  onToggleStatus: (id: number) => void;
}

export function PromptTable({ prompts, onDelete, onToggleStatus }: PromptTableProps) {
  if (prompts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No prompts found. Create your first prompt to get started!</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 font-semibold text-foreground">Title</th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">Category</th>
            <th className="text-right py-3 px-4 font-semibold text-foreground">Price</th>
            <th className="text-right py-3 px-4 font-semibold text-foreground">Sales</th>
            <th className="text-right py-3 px-4 font-semibold text-foreground">Revenue</th>
            <th className="text-center py-3 px-4 font-semibold text-foreground">Status</th>
            <th className="text-center py-3 px-4 font-semibold text-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {prompts.map((prompt) => (
            <tr key={prompt.id} className="border-b border-border hover:bg-card/50 transition">
              <td className="py-4 px-4">
                <span className="font-medium text-foreground">{prompt.title}</span>
              </td>
              <td className="py-4 px-4">
                <span className="text-muted-foreground text-xs bg-card px-2 py-1 rounded">
                  {prompt.category}
                </span>
              </td>
              <td className="py-4 px-4 text-right">
                <span className="font-medium text-primary">${prompt.price.toFixed(2)}</span>
              </td>
              <td className="py-4 px-4 text-right">
                <span className="text-foreground">{prompt.sales}</span>
              </td>
              <td className="py-4 px-4 text-right">
                <span className="text-foreground">${prompt.revenue.toFixed(2)}</span>
              </td>
              <td className="py-4 px-4 text-center">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded ${
                    prompt.status === 'active'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {prompt.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="py-4 px-4">
                <div className="flex justify-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onToggleStatus(prompt.id)}
                    className="text-xs"
                  >
                    {prompt.status === 'active' ? 'Disable' : 'Enable'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(prompt.id)}
                    className="text-xs text-red-400 border-red-500/50 hover:bg-red-500/10"
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
