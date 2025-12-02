export default function ConfirmationLoading() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="inline-block">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
        <p className="text-muted-foreground">Processing your payment...</p>
        <p className="text-xs text-muted-foreground">Your email confirmation is being sent</p>
      </div>
    </main>
  )
}
