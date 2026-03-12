export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Aspiring – Your Path to Professional Growth
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
