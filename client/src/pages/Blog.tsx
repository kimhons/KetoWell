import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Activity,
  Download,
  Clock,
  Calendar,
  User,
  ArrowRight
} from "lucide-react";
import { APP_TITLE } from "@/const";
import { blogArticles } from "@/data/blogArticles";
import { Link } from "wouter";
import NewsletterForm from "@/components/NewsletterForm";

export default function Blog() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-hero">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl">{APP_TITLE}</span>
            </a>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="/#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </a>
            <a href="/research" className="text-sm font-medium hover:text-primary transition-colors">
              Research
            </a>
            <a href="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </a>
            <a href="/blog" className="text-sm font-medium text-primary">
              Blog
            </a>
          </nav>
          
          <Button className="bg-gradient-cta hover:opacity-90 transition-opacity">
            <Download className="w-4 h-4 mr-2" />
            Download App
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4">Knowledge Hub</Badge>
              <h1>Ketogenic Health Blog</h1>
              <p className="text-muted-foreground mt-4 text-lg">
                Evidence-based articles on ketogenic diets, metabolic health, and the science behind KetoWell. 
                Written by healthcare professionals and backed by peer-reviewed research.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Article */}
        <section className="py-12 border-b">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <Badge className="mb-4">Featured Article</Badge>
              <Card className="overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  <div 
                    className="h-64 md:h-auto bg-cover bg-center"
                    style={{ backgroundImage: `url(${blogArticles[0].image})` }}
                  />
                  <div className="p-8 flex flex-col justify-center">
                    <Badge className="w-fit mb-3">{blogArticles[0].category}</Badge>
                    <h2 className="text-2xl font-bold mb-3">{blogArticles[0].title}</h2>
                    <p className="text-muted-foreground mb-4">{blogArticles[0].excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{blogArticles[0].author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{blogArticles[0].readTime} min read</span>
                      </div>
                    </div>
                    <Link href={`/blog/${blogArticles[0].slug}`}>
                      <Button>
                        Read Article
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* All Articles */}
        <section className="py-20">
          <div className="container">
            <div className="max-w-6xl mx-auto">
              <h2 className="mb-8">Latest Articles</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogArticles.map((article) => (
                  <Card key={article.id} className="overflow-hidden flex flex-col">
                    <div 
                      className="h-48 bg-cover bg-center"
                      style={{ backgroundImage: `url(${article.image})` }}
                    />
                    <div className="p-6 flex flex-col flex-1">
                      <Badge className="w-fit mb-3">{article.category}</Badge>
                      <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4 flex-1">{article.excerpt}</p>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 pt-4 border-t">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(article.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{article.readTime} min</span>
                        </div>
                      </div>
                      
                      <Link href={`/blog/${article.slug}`}>
                        <Button variant="outline" className="w-full">
                          Read More
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-20 bg-gradient-hero">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="text-white mb-4">Stay Updated with Latest Research</h2>
              <p className="text-xl text-white/90 mb-8">
                Get evidence-based insights on ketogenic health delivered to your inbox. 
                No spam, just science.
              </p>
              <div className="max-w-md mx-auto">
                <NewsletterForm variant="dark" />
              </div>
              <p className="text-sm text-white/70 mt-4">
                Join 10,000+ readers. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-hero">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold">{APP_TITLE}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your AI-native partner in ketogenic health.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/#features" className="hover:text-foreground">Features</a></li>
                <li><a href="/research" className="hover:text-foreground">Research</a></li>
                <li><a href="/pricing" className="hover:text-foreground">Pricing</a></li>
                <li><a href="/for-providers" className="hover:text-foreground">For Providers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="/blog" className="hover:text-foreground">Blog</a></li>
                <li><a href="#" className="hover:text-foreground">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground">Community</a></li>
                <li><a href="#" className="hover:text-foreground">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-foreground">Terms of Service</a></li>
                <li><a href="#" className="hover:text-foreground">Medical Disclaimer</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 {APP_TITLE}. All rights reserved.</p>
            <p className="mt-2">
              This app is not a substitute for professional medical advice. Always consult your physician before starting a ketogenic diet.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
