import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import AnalyticsProvider from "./components/AnalyticsProvider";
import CookieConsent from "./components/CookieConsent";
import LiveChatWidget from "./components/LiveChatWidget";
import "./index.css";
import Home from "./pages/Home";
import Research from "./pages/Research";
import Pricing from "./pages/Pricing";
import ForProviders from "./pages/ForProviders";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import WaitlistConfirm from "./pages/WaitlistConfirm";
import AdminDashboard from "./pages/AdminDashboard";
import Book from "./pages/Book";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/book"} component={Book} />
      <Route path={"/research"} component={Research} />
      <Route path={"/pricing"} component={Pricing} />
      <Route path={"/for-providers"} component={ForProviders} />
      <Route path={"/blog"} component={Blog} />
      <Route path="/blog/:slug" component={BlogArticle} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/waitlist/confirm/:token" component={WaitlistConfirm} />
      <Route path="/admin/dashboard" component={AdminDashboard} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <AnalyticsProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
            <LiveChatWidget />
            <CookieConsent />
          </TooltipProvider>
        </AnalyticsProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
