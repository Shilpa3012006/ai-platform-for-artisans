import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">Artisan Marketplace</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">Welcome to Artisan Marketplace</h2>
            <p className="text-xl text-muted-foreground max-w-lg mx-auto">
              Discover authentic handcrafted products from talented artisans around the world. Join our community of
              creators and craft enthusiasts.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-border hover:bg-accent bg-transparent">
              <Link href="/register">Register</Link>
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-muted-foreground">
            © 2024 Artisan Marketplace. Empowering artisans worldwide.
          </p>
        </div>
      </footer>
    </div>
  )
}
