import { Link } from "react-router-dom";
import {
  HomeIcon,
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  LinkedinIcon,
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <HomeIcon className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">StayConnect</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Connect with unique stays and experiences around the world.
            </p>
            <div className="flex space-x-4">
              <FacebookIcon className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <TwitterIcon className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <InstagramIcon className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <LinkedinIcon className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/help"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  to="/safety"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Safety information
                </Link>
              </li>
              <li>
                <Link
                  to="/cancellation"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Cancellation options
                </Link>
              </li>
              <li>
                <Link
                  to="/disability-support"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Disability support
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact us
                </Link>
              </li>
            </ul>
          </div>

          {/* Hosting */}
          <div>
            <h3 className="font-semibold mb-4">Hosting</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/host"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Become a host
                </Link>
              </li>
              <li>
                <Link
                  to="/host-resources"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Host resources
                </Link>
              </li>
              <li>
                <Link
                  to="/community-forum"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Community forum
                </Link>
              </li>
              <li>
                <Link
                  to="/responsible-hosting"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Responsible hosting
                </Link>
              </li>
              <li>
                <Link
                  to="/host-guarantee"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Host guarantee
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/press"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Press
                </Link>
              </li>
              <li>
                <Link
                  to="/investors"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Investors
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; 2024 StayConnect. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms
            </Link>
            <Link
              to="/privacy"
              className="hover:text-primary transition-colors"
            >
              Privacy
            </Link>
            <Link
              to="/sitemap"
              className="hover:text-primary transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
