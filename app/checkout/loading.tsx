export default function CheckoutLoading() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-4 w-16 bg-muted rounded mb-8"></div>
          <div className="h-8 w-48 bg-muted rounded mb-8"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div className="border border-border rounded-lg p-6">
                <div className="h-6 w-32 bg-muted rounded mb-4"></div>
                <div className="h-4 w-full bg-muted rounded mb-2"></div>
                <div className="h-4 w-24 bg-muted rounded"></div>
              </div>

              <div className="border border-border rounded-lg p-6">
                <div className="h-6 w-40 bg-muted rounded mb-4"></div>
                <div className="h-20 bg-muted rounded"></div>
              </div>
            </div>

            <div>
              <div className="border border-border rounded-lg p-6">
                <div className="h-6 w-20 bg-muted rounded mb-4"></div>
                <div className="h-10 w-full bg-muted rounded mb-2"></div>
                <div className="h-10 w-full bg-muted rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
