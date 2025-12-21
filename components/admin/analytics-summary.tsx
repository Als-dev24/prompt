import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AnalyticsSummaryProps {
  totalSales: number;
  totalRevenue: number;
  totalPrompts: number;
}

export function AnalyticsSummary({
  totalSales,
  totalRevenue,
  totalPrompts,
}: AnalyticsSummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Sales</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">{totalSales}</div>
          <p className="text-xs text-muted-foreground mt-1">Prompts sold this month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-primary">${totalRevenue.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground mt-1">In cryptocurrency</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Active Prompts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-foreground">{totalPrompts}</div>
          <p className="text-xs text-muted-foreground mt-1">Available for purchase</p>
        </CardContent>
      </Card>
    </div>
  );
}
