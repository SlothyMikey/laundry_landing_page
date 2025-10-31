import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FacebookIcon from '@mui/icons-material/Facebook';
import Map from '@/features/Map';

// Business location coordinates
const businessLocation = { lat: 14.2226546, lng: 120.9736 };

export default function Contact() {
  return (
    <>
      <section
        id="contact"
        className="w-full bg-bg-light transition-colors duration-300"
      >
        <div className="max-w-screen-lg mx-auto px-4 sm:px-8 py-24">
          {/* Two Column Layout */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left Section - Contact Info */}
            <div className="w-full lg:w-2/5">
              <h2 className="text-4xl font-bold text-txt-primary mb-4">
                Get in <span className="text-txt-highlight">Touch</span>
              </h2>
              <p className="text-txt-muted mb-8">
                We're always on the lookout to work with new clients. If you're
                interested in working with us, please get in touch in one of the
                following ways.
              </p>

              {/* Contact Details */}
              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <LocationOnIcon className="text-txt-highlight mt-1" />
                  <div>
                    <h4 className="font-semibold text-txt-primary mb-1">
                      Address
                    </h4>
                    <p className="text-txt-muted text-sm">
                      105 M. H. Del Pilar St, Poblacion 3, Silang, Cavite
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <PhoneIcon className="text-txt-highlight mt-1" />
                  <div>
                    <h4 className="font-semibold text-txt-primary mb-1">
                      Phone
                    </h4>
                    <div className="text-txt-muted text-sm">
                      <a
                        href="tel:+639338107121"
                        className="hover:text-txt-highlight transition-colors"
                      >
                        +63 933 810 7121
                      </a>
                      <span className="mx-2">|</span>
                      <a
                        href="tel:+639338107122"
                        className="hover:text-txt-highlight transition-colors"
                      >
                        +63 933 810 7122
                      </a>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <FacebookIcon className="text-txt-highlight mt-1" />
                  <div>
                    <h4 className="font-semibold text-txt-primary mb-1">
                      Facebook
                    </h4>
                    <a
                      href="https://www.facebook.com/laversavon/"
                      className="text-txt-muted text-sm hover:text-txt-highlight transition-colors"
                    >
                      Laversavon Laundry Shop
                    </a>
                  </div>
                </div>

                {/* Opening Hours */}
                <div className="flex items-start gap-3">
                  <AccessTimeIcon className="text-txt-highlight mt-1" />
                  <div>
                    <h4 className="font-semibold text-txt-primary mb-1">
                      Opening Hours
                    </h4>
                    <div className="text-txt-muted text-sm space-y-1">
                      <p>Mon - Fri: 9am - 6pm</p>
                      <p>Sat - Sun: 9am - 2pm</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Image */}
            <div className="w-full lg:w-3/5 rounded-2xl overflow-hidden shadow-[var(--box-shadow)] z-10">
              <Map
                position={businessLocation}
                markerText="Acme Corp HQ - Manila"
                zoom={19} // Zoom in closer
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
