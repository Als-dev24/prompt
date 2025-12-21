'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

interface PromptFormProps {
  onSubmit: (prompt: any) => void;
  onCancel: () => void;
}

const categories = ['Social Media', 'E-commerce', 'SEO', 'Marketing', 'Productivity'];

export function PromptForm({ onSubmit, onCancel }: PromptFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Social Media',
    price: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.price) {
      alert('Please fill in all required fields');
      return;
    }
    onSubmit({
      title: formData.title,
      category: formData.category,
      price: parseFloat(formData.price),
      description: formData.description,
    });
    setFormData({ title: '', category: 'Social Media', price: '', description: '' });
  };

  return (
    <Card className="border-primary/50">
      <CardHeader>
        <CardTitle>Add New Prompt</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Prompt Title *</label>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Email Marketing Master"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-card border border-border rounded text-foreground"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Price (USD) *</label>
              <Input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="9.99"
                step="0.01"
                min="0.99"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Description</label>
              <Input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief description of the prompt"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" size="lg">
              Create Prompt
            </Button>
            <Button type="button" variant="outline" size="lg" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
