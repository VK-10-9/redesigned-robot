import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function OverviewPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">National Overview</h1>
          <p className="text-muted-foreground text-lg">
            High-level statistics and insights about the Aadhaar enrollment ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Enrollments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">6M+</div>
              <p className="text-xs text-muted-foreground mt-1">Records analyzed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">States Covered</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">28</div>
              <p className="text-xs text-muted-foreground mt-1">National coverage</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Accuracy</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">98%</div>
              <p className="text-xs text-muted-foreground mt-1">Detection rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">API Endpoints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">40+</div>
              <p className="text-xs text-muted-foreground mt-1">RESTful services</p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Coming Soon</CardTitle>
            <CardDescription>
              Dashboard with charts, state-wise distribution, and real-time analytics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Full dashboard with data visualizations will be available soon.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
