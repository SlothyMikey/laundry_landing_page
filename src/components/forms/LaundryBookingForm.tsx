//TODO: Implement Customer Identity Verification Logic

import { useState } from 'react';
import { pricingPlans, additionalServices } from '@/constants/pricingData';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import PersonIcon from '@mui/icons-material/Person';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
import { Link } from 'react-router-dom';
import type { FormData } from '@/types/BookingTypes';
import { isPhoneNumberValid } from '@/lib/utils';

export default function LaundryBookingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isCustomerVerified, setIsCustomerVerified] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phoneNumber: '',
    email: '',
    pickupAddress: '',
    service: '',
    additionalServices: [],
    pickupDate: '',
    pickupTime: '',
    specialInstructions: '',
  });
  const [isReturningCustomer, setIsReturningCustomer] = useState(false);

  const allServices = [
    ...pricingPlans.map((plan) => ({
      label: plan.planName,
      value: plan.planName,
      price: plan.price,
      features: plan.features,
    })),
  ];

  const additionalServiceOptions = additionalServices.map((service) => ({
    label: service.planName,
    value: service.planName,
    price: service.price,
  }));

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdditionalServiceToggle = (serviceName: string) => {
    setFormData((prev) => ({
      ...prev,
      additionalServices: prev.additionalServices?.includes(serviceName)
        ? prev.additionalServices.filter((s) => s !== serviceName)
        : [...(prev.additionalServices ?? []), serviceName],
    }));
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (isReturningCustomer) {
        if (!isCustomerVerified) {
          alert('Please verify your phone number');
          return;
        }
      } else {
        if (
          !formData.fullName.trim() ||
          !formData.phoneNumber.trim() ||
          !formData.pickupAddress.trim()
        ) {
          alert('Please fill in all required fields');
          return;
        }
      }
    }

    if (currentStep === 2) {
      if (!formData.service.trim()) {
        alert('Please Select Atleast One Service');
        return;
      }
    }

    if (currentStep === 3) {
      if (!formData.pickupDate.trim() || !formData.pickupTime.trim()) {
        alert('Please Select a Pickup Date and Time');
        return;
      }
    }

    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Booking submitted:', formData);
    // Handle form submission here
  };

  const steps = ['Personal Info', 'Service Details', 'Schedule', 'Review'];

  const stepIcons: { [index: number]: React.ReactElement } = {
    0: <PersonIcon />,
    1: <LocalLaundryServiceIcon />,
    2: <CalendarMonthIcon />,
    3: <CheckCircleIcon />,
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl p-6 md:p-10 lg:p-12">
      {/* Back to Home */}
      <div className="mb-4">
        <Button
          component={Link}
          to="/"
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          sx={{
            color: '#374151',
            borderColor: '#e5e7eb',
            '&:hover': {
              borderColor: '#9ca3af',
              backgroundColor: '#f3f4f6',
            },
          }}
        >
          Back to Home
        </Button>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-txt-primary mb-2">
          Book Your Laundry Service
        </h2>
        <p className="text-sm text-txt-muted">
          Complete the steps below to schedule your laundry service
        </p>
      </div>

      {/* Material UI Stepper */}
      <div className="mb-10">
        <Stepper
          activeStep={currentStep - 1}
          alternativeLabel
          sx={{
            '& .MuiStepConnector-line': {
              borderColor: '#e5e7eb',
              borderTopWidth: 2,
              marginTop: '-1px',
            },
            '& .MuiStepConnector-root': {
              top: '24px',
              left: 'calc(-50% + 40px)',
              right: 'calc(50% + 40px)',
            },
            '& .MuiStepConnector-root.Mui-active .MuiStepConnector-line': {
              borderColor: '#3b82f6',
            },
            '& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line': {
              borderColor: '#3b82f6',
            },
            '& .MuiStepLabel-label': {
              marginTop: '8px',
              fontSize: '0.875rem',
              fontWeight: 500,
            },
            '& .MuiStepLabel-label.Mui-active': {
              color: '#1f2937',
              fontWeight: 600,
            },
            '& .MuiStepLabel-label.Mui-completed': {
              color: '#1f2937',
              fontWeight: 500,
            },
          }}
        >
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel
                StepIconComponent={() => (
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-md ${
                      currentStep - 1 > index
                        ? 'bg-blue-500 text-white'
                        : currentStep - 1 === index
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {stepIcons[index]}
                  </div>
                )}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>

      {/* Form Steps */}
      <form onSubmit={handleSubmit}>
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <PersonIcon className="text-txt-primary" />
              <h3 className="text-xl font-semibold text-txt-primary">
                Personal Information
              </h3>
            </div>
            <p className="text-sm text-orange-500 mb-6">
              Please provide your contact details for pickup/delivery
            </p>

            {/* Returning Customer Checkbox */}
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="returningCustomer"
                checked={isReturningCustomer}
                onChange={() => setIsReturningCustomer(!isReturningCustomer)}
                className="mr-2"
              />
              <label
                htmlFor="returningCustomer"
                className="text-sm text-txt-primary"
              >
                Are You A Returning Customer?
              </label>
            </div>

            {/* Conditional rendering for form fields */}
            {!isReturningCustomer ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-txt-primary mb-2">
                      Full Name <span className="text-orange-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bg-highlight bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-txt-primary mb-2">
                      Phone Number <span className="text-orange-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="0912 345 6789"
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bg-highlight bg-gray-50"
                    />
                  </div>
                </div>

                {/* Email - Full Width */}
                <div>
                  <label className="block text-sm font-medium text-txt-primary mb-2">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="JohnDoe@example.com"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bg-highlight bg-gray-50"
                  />
                </div>

                {/* Pickup/Delivery Address - Full Width */}
                <div>
                  <label className="block text-sm font-medium text-txt-primary mb-2">
                    Pickup/Delivery Address{' '}
                    <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="pickupAddress"
                    value={formData.pickupAddress}
                    onChange={handleChange}
                    placeholder="123 Main St, City"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bg-highlight bg-gray-50"
                  />
                </div>
              </>
            ) : (
              <div>
                <label className="block text-sm font-medium text-txt-primary mb-2">
                  Phone Number <span className="text-orange-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => {
                    handleChange(e);
                    isCustomerVerified && setIsCustomerVerified(false); // Reset verification if number changes
                  }}
                  placeholder="0912 345 6789"
                  required
                  className="max-w-full border border-gray-300 rounded-lg mr-4 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bg-highlight bg-gray-50"
                />
                <Button
                  type="button"
                  disabled={
                    !formData.phoneNumber ||
                    formData.phoneNumber.trim() === '' ||
                    !isPhoneNumberValid(formData.phoneNumber)
                  }
                  onClick={() => setIsCustomerVerified(!isCustomerVerified)}
                  startIcon={<CheckIcon />}
                  variant="contained"
                  color="primary"
                  sx={{
                    marginTop: '8px',
                  }}
                >
                  Verify
                </Button>
              </div>
            )}

            {/* Always show phone number field */}
          </div>
        )}

        {/* Step 2: Service Details */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <LocalLaundryServiceIcon className="text-txt-primary" />
              <h3 className="text-xl font-semibold text-txt-primary">
                Service Details
              </h3>
            </div>
            <p className="text-sm text-orange-500 mb-6">
              Select your preferred service and any additional options
            </p>

            <div>
              <label className="block text-sm font-medium text-txt-primary mb-2">
                Main Service <span className="text-orange-500">*</span>
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bg-highlight bg-gray-50"
              >
                <option value="">Select a service</option>
                {allServices.map((service) => (
                  <option key={service.value} value={service.value}>
                    {service.label} - ₱{service.price}/Load
                  </option>
                ))}
              </select>
            </div>

            {formData.service && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="font-semibold text-txt-primary mb-2">
                  Service includes:
                </p>
                <ul className="list-disc ml-6 text-sm text-txt-muted space-y-1">
                  {allServices
                    .find((s) => s.value === formData.service)
                    ?.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                </ul>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-txt-primary mb-3">
                Additional Services (Optional)
              </label>
              <div className="space-y-3">
                {additionalServiceOptions.map((service) => (
                  <label
                    key={service.value}
                    className="flex items-center justify-between p-4 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={(formData.additionalServices ?? []).includes(
                          service.value,
                        )}
                        onChange={() =>
                          handleAdditionalServiceToggle(service.value)
                        }
                        className="w-5 h-5 text-bg-highlight focus:ring-2 focus:ring-bg-highlight rounded"
                      />
                      <span className="font-medium">{service.label}</span>
                    </div>
                    <span className="text-txt-highlight font-semibold">
                      +₱{service.price}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Schedule */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <CalendarMonthIcon className="text-txt-primary" />
              <h3 className="text-xl font-semibold text-txt-primary">
                Schedule
              </h3>
            </div>
            <p className="text-sm text-orange-500 mb-6">
              Choose your preferred pickup date and time
            </p>

            <div>
              <label className="block text-sm font-medium text-txt-primary mb-2">
                Pickup Date <span className="text-orange-500">*</span>
              </label>
              <input
                type="date"
                name="pickupDate"
                value={formData.pickupDate}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bg-highlight bg-gray-50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-txt-primary mb-2">
                Pickup Time <span className="text-orange-500">*</span>
              </label>
              <select
                name="pickupTime"
                value={formData.pickupTime}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bg-highlight bg-gray-50"
              >
                <option value="">Select a time</option>
                <option value="08:00-10:00">8:00 AM - 10:00 AM</option>
                <option value="10:00-12:00">10:00 AM - 12:00 PM</option>
                <option value="12:00-14:00">12:00 PM - 2:00 PM</option>
                <option value="14:00-16:00">2:00 PM - 4:00 PM</option>
                <option value="16:00-18:00">4:00 PM - 6:00 PM</option>
              </select>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>⚠️ Important:</strong> Maximum 7kg per load. Exceeding
                this limit will count as an additional load.
              </p>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircleIcon className="text-txt-primary" />
              <h3 className="text-xl font-semibold text-txt-primary">Review</h3>
            </div>
            <p className="text-sm text-orange-500 mb-6">
              Please review your booking details before confirming
            </p>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="font-semibold text-txt-primary mb-3">
                  Personal Information
                </h4>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-txt-muted">Name:</span>{' '}
                    {formData.fullName}
                  </p>
                  <p>
                    <span className="text-txt-muted">Phone:</span>{' '}
                    {formData.phoneNumber}
                  </p>
                  <p>
                    <span className="text-txt-muted">Email:</span>{' '}
                    {formData.email}
                  </p>
                  <p>
                    <span className="text-txt-muted">Address:</span>{' '}
                    {formData.pickupAddress}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="font-semibold text-txt-primary mb-3">
                  Service Details
                </h4>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-txt-muted">Main Service:</span>{' '}
                    {formData.service}
                  </p>
                  {(formData.additionalServices?.length ?? 0) > 0 && (
                    <p>
                      <span className="text-txt-muted">
                        Additional Services:
                      </span>{' '}
                      {(formData.additionalServices ?? []).join(', ')}
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="font-semibold text-txt-primary mb-3">
                  Schedule
                </h4>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-txt-muted">Date:</span>{' '}
                    {formData.pickupDate}
                  </p>
                  <p>
                    <span className="text-txt-muted">Time:</span>{' '}
                    {formData.pickupTime}
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-txt-primary mb-2">
                  Special Instructions (Optional)
                </label>
                <textarea
                  name="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Any special requests or notes..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bg-highlight resize-none bg-gray-50"
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t gap-4">
          <Button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 1}
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            sx={{
              color: currentStep === 1 ? '#9ca3af' : '#374151',
              borderColor: currentStep === 1 ? '#e5e7eb' : '#d1d5db',
              '&:hover': {
                borderColor: currentStep === 1 ? '#e5e7eb' : '#9ca3af',
                backgroundColor: currentStep === 1 ? 'transparent' : '#f3f4f6',
              },
              '&.Mui-disabled': {
                color: '#9ca3af',
                borderColor: '#e5e7eb',
              },
            }}
          >
            Back
          </Button>

          {currentStep < 4 ? (
            <Button
              type="button"
              onClick={handleNext}
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              sx={{
                backgroundColor: '#000',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#1f2937',
                },
              }}
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              variant="contained"
              endIcon={<CheckCircleIcon />}
              sx={{
                backgroundColor: '#000',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#1f2937',
                },
              }}
            >
              Confirm Booking
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
