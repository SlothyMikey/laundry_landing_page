import Logo from '@/components/ui/Logo';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  const services = [
    'Wash & Fold',
    'Dry Cleaning',
    'Ironing Service',
    'Self-Service',
    'Pickup & Delivery',
  ];

  return (
    <footer className="w-full bg-dark-light border-t border-txt-muted/10 transition-colors duration-300 text-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4 text-txt-highlight">
              <Logo className="w-8 h-8 " />
              <h3 className="text-xl font-bold">Laver Savon</h3>
            </div>
            <p className="text-txt-muted text-sm">
              Your trusted laundry service provider in Silang. We ensure your
              clothes are cleaned with care and returned fresh every time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-txt-muted text-sm hover:text-txt-highlight transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Our Services
            </h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-txt-muted text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">
              Contact Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <LocationOnIcon className="text-txt-highlight text-xl mt-0.5" />
                <p className="text-txt-muted text-sm">
                  105 M. H. Del Pilar St, Poblacion 3, Silang, Cavite
                </p>
              </div>
              <div className="flex items-center gap-2">
                <PhoneIcon className="text-txt-highlight text-xl" />
                <div className="text-txt-muted text-sm transition-colors flex gap-2">
                  <a
                    href="tel:+639338107121"
                    className="hover:text-txt-highlight"
                  >
                    +63 933 810 7121
                  </a>
                  <span>|</span>
                  <a
                    href="tel:+639338107122"
                    className="hover:text-txt-highlight"
                  >
                    +63 933 810 7122
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FacebookIcon className="text-txt-highlight text-xl" />
                <a
                  href="https://www.facebook.com/laversavon/"
                  className="text-txt-muted text-sm hover:text-txt-highlight transition-colors"
                >
                  Laversavon Laundry Shop
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-txt-muted/10">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <p className="text-txt-muted text-sm">
              © {currentYear} Laversavon. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
