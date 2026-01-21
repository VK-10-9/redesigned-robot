import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function DataExplorerPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Data Explorer</h1>
          <p className="text-muted-foreground text-lg">
            Interactive tool to search and filter enrollment data
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Data Explorer</CardTitle>
            <CardDescription>
              Advanced search and filtering capabilities coming soon
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Features will include:
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground text-sm">
              <li>Full-text search</li>
              <li>State and district filtering</li>
              <li>Date range selection</li>
              <li>Demographic filters</li>
              <li>Sortable data tables</li>
              <li>Export to CSV/JSON</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
