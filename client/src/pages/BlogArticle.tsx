import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Activity,
  Download,
  Clock,
  Calendar,
  User,
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Linkedin
} from "lucide-react";
import { APP_TITLE } from "@/const";
import { blogArticles } from "@/data/blogArticles";
import { Link, useParams } from "wouter";
import { Streamdown } from "streamdown";

export default function BlogArticle() {
  const params = useParams();
  const article = blogArticles.find(a => a.slug === params.slug);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedArticles = blogArticles.filter(a => a.id !== article.id).slice(0, 3);

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
        {/* Back to Blog */}
        <section className="py-6 border-b">
          <div className="container">
            <Link href="/blog">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </section>

        {/* Article Header */}
        <section className="py-12 bg-muted/30">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <Badge className="mb-4">{article.category}</Badge>
              <h1 className="mb-6">{article.title}</h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(article.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime} min read</span>
                </div>
              </div>

              {/* Social Share Buttons */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Share:</span>
                <Button variant="outline" size="sm">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="py-0">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div 
                className="w-full h-96 bg-cover bg-center rounded-lg shadow-lg"
                style={{ backgroundImage: `url(${article.image})` }}
              />
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <article className="prose prose-lg max-w-none">
                <Streamdown>{article.content}</Streamdown>
              </article>
            </div>
          </div>
        </section>

        {/* Author Bio */}
        <section className="py-12 border-t">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-hero flex items-center justify-center flex-shrink-0">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">About {article.author}</h4>
                    <p className="text-sm text-muted-foreground">
                      {article.author} is a healthcare professional specializing in metabolic health and ketogenic nutrition. 
                      They contribute evidence-based content to help people make informed decisions about their health.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="py-20 bg-muted/30">
            <div className="container">
              <div className="max-w-6xl mx-auto">
                <h2 className="mb-8">Related Articles</h2>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {relatedArticles.map((relatedArticle) => (
                    <Card key={relatedArticle.id} className="overflow-hidden flex flex-col">
                      <div 
                        className="h-48 bg-cover bg-center"
                        style={{ backgroundImage: `url(${relatedArticle.image})` }}
                      />
                      <div className="p-6 flex flex-col flex-1">
                        <Badge className="w-fit mb-3">{relatedArticle.category}</Badge>
                        <h3 className="text-lg font-semibold mb-2">{relatedArticle.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">{relatedArticle.excerpt}</p>
                        
                        <Link href={`/blog/${relatedArticle.slug}`}>
                          <Button variant="outline" className="w-full" size="sm">
                            Read Article
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 bg-gradient-hero">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="text-white mb-4">Ready to Start Your Ketogenic Journey?</h2>
              <p className="text-xl text-white/90 mb-8">
                Download KetoWell and get personalized guidance from Dr. Ketone, your AI-powered health companion.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  <Download className="w-5 h-5 mr-2" />
                  Download for iOS
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Download className="w-5 h-5 mr-2" />
                  Download for Android
                </Button>
              </div>
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
