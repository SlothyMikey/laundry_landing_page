import PricingCard from '@/features/PricingCard';
import { promoPlans, services } from '@/constants/pricingData';
import LaundryBasket from '@/assets/images/LaundryBasket.png';

export default function Pricing() {
  return (
    <>
      <section
        id="pricing"
        className="py-16 bg-bg-light transition-colors duration-300"
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-8">
          <h2 className="text-4xl text-center font-bold text-txt-primary mb-6">
            Check <span className="text-txt-highlight">Pricing</span> for every
            service.
          </h2>
          <p className="text-lg text-center text-txt-muted mb-10">
            Choose a plan that fits your laundry needs. No hidden fees, just
            simple and transparent pricing.
          </p>

          {/* Important Reminder Banner */}
          <div className="flex items-center justify-between max-w-screen-sm bg-gradient-to-r from-bg-highlight to-txt-highlight mx-auto rounded-2xl p-6 mb-10 shadow-lg overflow-hidden md:overflow-visible relative">
            <div className="text-left text-white z-10">
              <h3 className="text-2xl text-white font-bold mb-2 bg-red-400 px-3 py-1 rounded-full inline-block">
                ! Important Reminder
              </h3>
              <p className="text-lg font-medium">
                Only <span className="text-3xl font-extrabold">7kg</span> per
                load
              </p>
              <p className="text-sm opacity-90 mt-1">
                Exceeding the limit will count as another load
              </p>
            </div>

            <img
              src={LaundryBasket}
              alt="Laundry Basket"
              className="absolute -right-8 w-xs h-xs object-contain hover:scale-110 transition-transform duration-300 opacity-50 md:opacity-100"
            />
          </div>

          {/* Pricing Container */}
          <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
            {/* Left Section - Main Pricing Plans */}
            <div className="w-full flex flex-col justify-center md:flex-row gap-6 lg:sticky lg:top-24 lg:self-start">
              {promoPlans.map((plan, index) => (
                <PricingCard key={index} {...plan} />
              ))}
            </div>

            {/* Right Section - Additional Services */}
            <div className="flex flex-col items-center gap-6 w-full lg:w-auto">
              {services.map((service, index) => (
                <PricingCard key={index} {...service} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
