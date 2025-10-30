import '@/global.css';
import LaundryBookingForm from '@/components/forms/LaundryBookingForm';

export default function Booking() {
  return (
    <>
      <section className="w-full h-screen flex justify-center px-4 md:px-8 lg:px-16">
        <div className="absolute -z-10 w-full h-1/2 bg-primary top-0"></div>
        <div className="mt-10 w-full max-w-2xl">
          <LaundryBookingForm></LaundryBookingForm>
        </div>
      </section>
    </>
  );
}
