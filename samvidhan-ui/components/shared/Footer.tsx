import Link from "next/link"
import { ROUTES } from "@/lib/constants"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg text-primary mb-4">SAMVIDHAN</h3>
            <p className="text-sm text-muted-foreground">
              Aadhaar Intelligence Platform for enrollment analysis and fraud detection.
            </p>
          </div>
          
          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href={ROUTES.OVERVIEW} className="text-muted-foreground hover:text-primary transition-colors">Overview</Link></li>
              <li><Link href={ROUTES.DASHBOARD} className="text-muted-foreground hover:text-primary transition-colors">Dashboard</Link></li>
              <li><Link href={ROUTES.DATA_EXPLORER} className="text-muted-foreground hover:text-primary transition-colors">Data Explorer</Link></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href={ROUTES.DOCS} className="text-muted-foreground hover:text-primary transition-colors">Documentation</Link></li>
              <li><Link href={ROUTES.BLOG} className="text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href={ROUTES.FAQS} className="text-muted-foreground hover:text-primary transition-colors">FAQs</Link></li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; 2025 SAMVIDHAN. All rights reserved.</p>
            <p>Made with ❤️ for Aadhaar Intelligence</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
