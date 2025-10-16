import '@/global.css';
import Button from '@mui/material/Button';

export default function Hero() {
  return (
    <>
      <section
        id="home"
        className="relative flex items-center justify-center w-full h-screen max-h-[768px] overflow-hidden bg-bg-light transition-colors duration-300"
      >
        <div className="flex flex-col md:flex-row justify-evenly w-full max-w-screen-xl mx-auto px-4 md:px-8 relative z-10">
          {/* Left Side */}
          <div className="flex-div w-full md:w-1/2 flex-col px-4 sm:px-6 items-center md:items-start text-center md:text-left justify-center">
            <h1 className="text-6xl font-bold text-txt-primary mb-6 leading-18">
              The Best Laundry Service in
              <span className="text-txt-highlight"> Silang</span>
            </h1>

            <p className="text-md text-txt-muted mb-6">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. In,
              repudiandae est sequi suscipit voluptate dolorum?
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 justify-center sm:justify-start md:flex-row">
              <Button variant="contained" color="primary">
                Track My Laundry
              </Button>

              <Button variant="text" color="primary" href="#services">
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Side */}
          <div className="hidden md:flex flex-div items-center sm:w-1/2 justify-center">
            <img
              src="https://picsum.photos/1000"
              alt="Laundry Service"
              className="w-9/12 max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>
    </>
  );
}
