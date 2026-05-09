import Link from 'next/link'
import { Header } from '@/components/shared/header'
import { Footer } from '@/components/shared/footer'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-8 py-32">
          <div>
            <h1 className="font-serif text-8xl md:text-9xl text-accent mb-4">
              404
            </h1>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              It seems the page you&apos;re looking for doesn&apos;t exist. Let us guide you back to our portfolio.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link
              href="/"
              className="px-8 py-3 bg-foreground text-background hover:bg-accent hover:text-foreground transition-all duration-300 text-sm font-medium"
            >
              Return Home
            </Link>
            <Link
              href="/portfolio"
              className="px-8 py-3 border-2 border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300 text-sm font-medium"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
