import { Sparkle } from "lucide-react";

const Footer = () => (
  <footer className="bg-background text-foreground">
    <div className="container mx-auto px-6 pb-10 pt-16">
      <div className="max-w-7xl mx-auto grid xl:grid-cols-3 gap-8">
        {/* Logo & Description */}
        <div className="space-y-4">
          <a
            href="/"
            className="flex items-center space-x-2 text-2xl font-semibold text-primary-foreground"
          >
            <Sparkle className="w-8 h-8 text-primary" />
            <h2 className="font-bold text-primary text-2xl">Findora</h2>
          </a>
          <p className="max-w-md pr-8 text-sm text-muted-foreground">
            Findora is a smart marketplace that connects buyers and sellers
            effortlessly. Discover, trade, and thrive — all in one platform.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-foreground" aria-label="LinkedIn">
              {/* LinkedIn SVG */}
              <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                <path d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" />
              </svg>
            </a>
            <a href="#" className="hover:text-foreground" aria-label="Twitter">
              {/* Twitter SVG */}
              <svg fill="currentColor" viewBox="0 0 24 24" className="h-6 w-6">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
          </div>
        </div>

        {/* Sections */}
        <div className="xl:col-span-2 grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <h3 className="text-primary font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2">
              <li>
                <a href="/aiplatform" className="hover:text-primary">
                  AI Platform
                </a>
              </li>
              <li>
                <a href="/aialgorithms" className="hover:text-primary">
                  AI Algorithms
                </a>
              </li>
              <li>
                <a href="/industryapplications" className="hover:text-primary">
                  Industry Apps
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-primary font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="/pricing" className="hover:text-primary ">
                  Pricing
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-primary ">
                  Blog
                </a>
              </li>
              <li>
                <a href="/casestudies" className="hover:text-primary ">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-primary ">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-primary ">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-primary font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="/aboutus" className="hover:text-primary ">
                  About Us
                </a>
              </li>
              <li>
                <a href="/careers" className="hover:text-primary ">
                  Careers
                </a>
              </li>
              <li>
                <a href="/contactus" className="hover:text-primary ">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-16 border-t border-primary/30 pt-6 text-center text-sm text-primary">
        © {new Date().getFullYear()} Findora. Built with{" "}
        <span className="text-secondary-foreground">♥</span> by passionate devs.
      </div>
    </div>
  </footer>
);

export default Footer;
