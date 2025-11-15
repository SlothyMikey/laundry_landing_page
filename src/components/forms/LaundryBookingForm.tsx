//TODO: Implement Customer Identity Verification Logic
//TODO: Do not forget the Loading & Error of Services

import { useState, useEffect } from 'react';
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
import { isPhoneNumberValid, isEmailValid } from '@/lib/utils';
import { useServices } from '@/hooks/useServices';
import { useBooking } from '@/hooks/useBooking';
import NotificationModal from '@/components/modal/NotificationModal';

export default function LaundryBookingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isCustomerVerified, setIsCustomerVerified] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone_number: '',
    email: '',
    address: '',
    promo: '',
    load: 1,
    main_services: [],
    supplies: [],
    pickup_date: '',
    special_instruction: '',
  });
  const [isReturningCustomer, setIsReturningCustomer] = useState(false);
  const { services, loadServices } = useServices();
  const { submitBooking } = useBooking();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    loadServices();
  }, []);

  // Derived options
  const bundleOptions = services
    .filter((svc) => svc.service_type === 'bundle_package')
    .map((plan) => ({
      label: plan.service_name,
      value: plan.service_name,
      price: plan.price,
      features: plan.description?.split(',').map((feat) => feat.trim()) || [],
    }));

  const mainServiceOptions = services
    .filter((svc) => svc.service_type === 'main_service')
    .map((svc) => ({
      label: svc.service_name,
      value: svc.service_name,
      price: svc.price,
    }));

  // Initialize supplies from API when loaded
  useEffect(() => {
    if (services.length > 0 && (formData.supplies ?? []).length === 0) {
      const initialSupplies = services
        .filter((svc) => svc.service_type === 'add_on_supply')
        .map((svc) => ({
          key: svc.service_name,
          name: svc.service_name,
          quantity: 0,
        }));
      setFormData((prev) => ({ ...prev, supplies: initialSupplies }));
    }
  }, [services, formData.supplies]);

  // Calculate total amount
  const calculateTotal = () => {
    let total = 0;

    // Add promo price (bundle)
    if (formData.promo) {
      const selectedPromo = bundleOptions.find(
        (bundle) => bundle.value === formData.promo,
      );
      if (selectedPromo) {
        total += parseFloat(selectedPromo.price) * formData.load;
      }
    }

    // Add main services prices
    if (formData.main_services && formData.main_services.length > 0) {
      formData.main_services.forEach((serviceName) => {
        const selectedService = mainServiceOptions.find(
          (svc) => svc.value === serviceName,
        );
        if (selectedService) {
          total += parseFloat(selectedService.price) * formData.load;
        }
      });
    }

    // Add supplies prices
    if (formData.supplies && formData.supplies.length > 0) {
      formData.supplies.forEach((supply) => {
        if (supply.quantity > 0) {
          const supplyService = services.find(
            (svc) =>
              svc.service_name === supply.name &&
              svc.service_type === 'add_on_supply',
          );
          if (supplyService) {
            total += parseFloat(supplyService.price) * supply.quantity;
          }
        }
      });
    }

    return total;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    // If selecting a promo, clear any selected main services (wash/dry/fold)
    if (name === 'promo') {
      setFormData((prev) => ({
        ...prev,
        promo: value,
        main_services: [],
      }));
      return;
    }

    // Phone number validation: only digits, max 11 characters
    if (name === 'phone_number') {
      const numericValue = value.replace(/\D/g, ''); // Remove non-digits
      if (numericValue.length <= 11) {
        setFormData((prev) => ({ ...prev, [name]: numericValue }));
      }
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleServiceToggle = (serviceName: string) => {
    setFormData((prev) => {
      const isSelected = prev.main_services?.includes(serviceName);
      const nextServices = isSelected
        ? (prev.main_services ?? []).filter((s) => s !== serviceName)
        : [...(prev.main_services ?? []), serviceName];

      const nextPromo =
        !isSelected && nextServices.length > 0 ? '' : prev.promo;

      return { ...prev, main_services: nextServices, promo: nextPromo };
    });
  };

  const handleNext = () => {
    // Input Validation
    if (currentStep === 1) {
      if (isReturningCustomer) {
        if (!isCustomerVerified) {
          alert('Please verify your phone number');
          return;
        }
      }

      if (!isReturningCustomer) {
        if (
          !formData.name.trim() ||
          !formData.phone_number.trim() ||
          !formData.address.trim()
        ) {
          alert('Please fill in all required fields');
          return;
        }

        // Phone number format validation
        if (!isPhoneNumberValid(formData.phone_number)) {
          alert('Please enter a valid phone number');
          return;
        }

        // Email format validation (if provided)
        if (formData.email && !isEmailValid(formData.email)) {
          alert('Please enter a valid email address');
          return;
        }
      }
    }

    if (currentStep === 2) {
      const hasPromo = !!formData.promo?.trim();
      const hasMainServices = (formData.main_services?.length ?? 0) > 0;
      if (hasPromo && hasMainServices) {
        alert('Please choose either a promo or main services, not both.');
        return;
      }
      if (!hasPromo && !hasMainServices) {
        alert(
          'Please select a promo or choose at least one main service (wash, dry, fold).',
        );
        return;
      }
    }

    if (currentStep === 3) {
      if (!formData.pickup_date.trim()) {
        alert('Please Select a Pickup Date');
        return;
      }
    }

    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const updateSupply = (key: string, delta: number) => {
    setFormData((prev) => ({
      ...prev,
      supplies: (prev.supplies ?? []).map((item) =>
        item.key === key
          ? {
              ...item,
              quantity: Math.max(0, Math.min(99, item.quantity + delta)),
            }
          : item,
      ),
    }));
  };

  const setSupplyDirect = (key: string, value: string) => {
    const parsed = Math.max(
      0,
      Math.min(99, Number(value.replace(/\D/g, '')) || 0),
    );
    setFormData((prev) => ({
      ...prev,
      supplies: (prev.supplies ?? []).map((item) =>
        item.key === key ? { ...item, quantity: parsed } : item,
      ),
    }));
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleConfirmBooking = async () => {
    try {
      await submitBooking(formData);
      setShowSuccess(true);
      setCurrentStep(1);
      setFormData({
        name: '',
        phone_number: '',
        email: '',
        address: '',
        promo: '',
        load: 1,
        main_services: [],
        supplies: [],
        pickup_date: '',
        special_instruction: '',
      });
    } catch (err) {
      console.error('Booking failed:', err);
    }
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
      <NotificationModal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Booking Confirmed"
        message="Thank you! Your booking was submitted successfully. We'll contact you shortly to confirm pickup."
        variant="success"
        primaryAction={{
          label: 'Great!',
          onClick: () => setShowSuccess(false),
        }}
      />
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
        <h2 className="text-2xl md:text-3xl font-bold text-dark mb-2">
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && currentStep < 4) {
            e.preventDefault();
          }
        }}
      >
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <PersonIcon className="text-dark" />
              <h3 className="text-xl font-semibold text-dark">
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
              <label htmlFor="returningCustomer" className="text-sm text-dark">
                Are You A Returning Customer?
              </label>
            </div>

            {/* Personal info fields (new customer) */}
            {!isReturningCustomer && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-dark mb-2">
                      Full Name <span className="text-orange-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bg-highlight bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark mb-2">
                      Phone Number <span className="text-orange-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      placeholder="0912 345 6789"
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bg-highlight bg-gray-50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="JohnDoe@example.com"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bg-highlight bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    Pickup/Delivery Address{' '}
                    <span className="text-orange-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Main St, City"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bg-highlight bg-gray-50"
                  />
                </div>
              </>
            )}

            {/* Returning customer phone + verify */}
            {isReturningCustomer && (
              <div>
                <label className="block text-sm font-medium text-dark mb-2">
                  Phone Number <span className="text-orange-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={(e) => {
                    handleChange(e);
                    isCustomerVerified && setIsCustomerVerified(false);
                  }}
                  placeholder="0912 345 6789"
                  required
                  className="max-w-full border border-gray-300 rounded-lg mr-4 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bg-highlight bg-gray-50"
                />
                <Button
                  type="button"
                  disabled={
                    !formData.phone_number ||
                    formData.phone_number.trim() === '' ||
                    !isPhoneNumberValid(formData.phone_number)
                  }
                  onClick={() => setIsCustomerVerified(!isCustomerVerified)}
                  startIcon={<CheckIcon />}
                  variant="contained"
                  color="primary"
                  sx={{ marginTop: '8px' }}
                >
                  {isCustomerVerified ? 'Verified' : 'Verify'}
                </Button>
              </div>
            )}

            {/* End personal info */}
            {/* End Step 1 */}
          </div>
        )}
        {/* Step 2: Laundry Details */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <LocalLaundryServiceIcon className="text-dark" />
              <h3 className="text-xl font-semibold text-dark">
                Service Details
              </h3>
            </div>

            {/* Load Input */}
            <p className="text-sm text-orange-500 mb-6">
              Please indicate your estimated laundry weight per load (7kg = 1
              Load)
            </p>

            <label className="block text-sm font-medium text-dark mb-2">
              Laundry Load Weight
            </label>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    load: Math.max(1, prev.load - 1),
                  }))
                }
                className="w-9 h-9 rounded-lg border border-gray-300 bg-gray-50 hover:bg-gray-100"
              >
                −
              </button>
              <input
                type="text"
                inputMode="numeric"
                value={formData.load}
                onChange={(e) => {
                  const numericValue = e.target.value.replace(/\D/g, '');
                  if (numericValue === '') {
                    setFormData((prev) => ({ ...prev, load: 1 }));
                    return;
                  }
                  const parsed = Number(numericValue);
                  setFormData((prev) => ({
                    ...prev,
                    load: Math.max(1, parsed),
                  }));
                }}
                className="flex-1 text-center border border-gray-300 rounded-lg px-4 py-2 bg-gray-50"
              />
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, load: prev.load + 1 }))
                }
                className="w-9 h-9 rounded-lg border border-gray-300 bg-gray-50 hover:bg-gray-100"
              >
                +
              </button>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>⚠️ Important:</strong> Maximum 7kg per load. Exceeding
                this limit will count as an additional load.
              </p>
            </div>

            {/* Service Details */}
            <p className="text-sm text-orange-500 mb-6">
              Select your preferred service or main service options
            </p>

            <div>
              <label className="block text-sm font-medium text-dark mb-2">
                Promo (Bundles)
              </label>
              <select
                name="promo"
                value={formData.promo}
                onChange={handleChange}
                disabled={(formData.main_services?.length ?? 0) > 0}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bg-highlight bg-gray-50 disabled:opacity-60"
              >
                <option value="">Select a promo</option>
                {bundleOptions.map((service) => (
                  <option key={service.value} value={service.value}>
                    {service.label} - ₱{service.price}/Load
                  </option>
                ))}
              </select>
              {(formData.main_services?.length ?? 0) > 0 && (
                <p className="text-sm text-txt-muted mt-2">
                  Promo selection disabled because main services are selected.
                </p>
              )}
            </div>

            {formData.promo && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="font-semibold text-dark mb-2">
                  Service includes:
                </p>
                <ul className="list-disc ml-6 text-sm text-txt-muted space-y-1">
                  {bundleOptions
                    .find((s) => s.value === formData.promo)
                    ?.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                </ul>
              </div>
            )}

            <div className="flex items-center gap-4 my-6">
              <hr className="flex-1 border-gray-300" />
              <span className="text-sm text-gray-500 font-medium">OR</span>
              <hr className="flex-1 border-gray-300" />
            </div>

            <div>
              <label className="block text-sm font-medium text-dark mb-3">
                Main Services
              </label>
              {formData.promo && (
                <p className="text-sm text-txt-muted mb-2">
                  Disabled because a promo is selected.
                </p>
              )}
              <div className="space-y-3">
                {mainServiceOptions.map((service) => (
                  <label
                    key={service.value}
                    className={`flex items-center justify-between p-4 border border-gray-300 rounded-lg cursor-pointer transition-colors bg-gray-50 ${formData.promo ? 'opacity-60 cursor-not-allowed' : 'hover:bg-gray-50'}`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        disabled={!!formData.promo}
                        checked={(formData.main_services ?? []).includes(
                          service.value,
                        )}
                        onChange={() => handleServiceToggle(service.value)}
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

            {/* Supplies Needed (Quantity) */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-dark">
                  Supplies Needed (Quantity)
                </span>
              </div>
              <div className="bg-yellow-50 border border-blue-200 rounded-lg p-4 my-4">
                <p className="text-sm text-blue-800">
                  <strong> ℹ️ Info: </strong>
                  Enter 0 if you have your own or it is included in the promo
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(formData.supplies ?? []).map((item) => (
                  <div key={item.key}>
                    <label className="block text-sm font-medium text-dark mb-2">
                      {item.name}
                    </label>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateSupply(item.key, -1)}
                        className="w-9 h-9 rounded-lg border border-gray-300 bg-gray-50 hover:bg-gray-100"
                      >
                        −
                      </button>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={item.quantity}
                        onChange={(e) =>
                          setSupplyDirect(item.key, e.target.value)
                        }
                        className="flex-1 text-center border border-gray-300 rounded-lg px-4 py-2 bg-gray-50"
                      />
                      <button
                        type="button"
                        onClick={() => updateSupply(item.key, 1)}
                        className="w-9 h-9 rounded-lg border border-gray-300 bg-gray-50 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* Step 3: Schedule */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <CalendarMonthIcon className="text-dark" />
              <h3 className="text-xl font-semibold text-dark">Schedule</h3>
            </div>
            <p className="text-sm text-orange-500 mb-6">
              Choose your preferred pickup date
            </p>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                We Offer free pickup and delivery within 2km radius. extra fee
                will be applied for locations beyond this range. Pick up can be
                in the morning
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark mb-2">
                Pickup Date <span className="text-orange-500">*</span>
              </label>
              <input
                type="date"
                name="pickup_date"
                value={formData.pickup_date}
                onChange={handleChange}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bg-highlight bg-gray-50"
              />
            </div>
          </div>
        )}
        {/* Step 4: Review */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircleIcon className="text-dark" />
              <h3 className="text-xl font-semibold text-dark">Review</h3>
            </div>
            <p className="text-sm text-orange-500 mb-6">
              Please review your booking details before confirming
            </p>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="font-semibold text-dark mb-3">
                  Personal Information
                </h4>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-txt-muted">Name:</span>{' '}
                    {formData.name}
                  </p>
                  <p>
                    <span className="text-txt-muted">Phone:</span>{' '}
                    {formData.phone_number}
                  </p>
                  {formData.email && (
                    <p>
                      <span className="text-txt-muted">Email:</span>{' '}
                      {formData.email}
                    </p>
                  )}
                  <p>
                    <span className="text-txt-muted">Address:</span>{' '}
                    {formData.address}
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="font-semibold text-dark mb-3">
                  Service Details
                </h4>
                <div className="space-y-2 text-sm">
                  {formData.promo ? (
                    <p>
                      <span className="text-txt-muted">Promo:</span>{' '}
                      <strong>{formData.promo}</strong>
                    </p>
                  ) : (
                    <p>
                      <span className="text-txt-muted">Main Services:</span>{' '}
                      <strong>
                        {(formData.main_services ?? []).join(', ') ||
                          'None Selected'}
                      </strong>
                    </p>
                  )}
                  <p>
                    <span className="text-txt-muted">Load Weight:</span>{' '}
                    <strong>{formData.load}</strong>
                  </p>
                  <div>
                    <span className="text-txt-muted">Supplies:</span>{' '}
                    {(formData.supplies ?? []).filter((s) => s.quantity > 0)
                      .length > 0 ? (
                      <span>
                        {(formData.supplies ?? [])
                          .filter((s) => s.quantity > 0)
                          .map((s) => `${s.name} x${s.quantity}`)
                          .join(', ')}
                      </span>
                    ) : (
                      <span className="italic">None</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="font-semibold text-dark mb-3">Schedule</h4>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="text-txt-muted">Date:</span>{' '}
                    {formData.pickup_date}
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-300">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-bold text-dark">Total Amount:</h4>
                  <p className="text-2xl font-bold text-blue-600">
                    ₱{calculateTotal().toFixed(2)}
                  </p>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  * Price may vary based on actual load weight and additional
                  services during pickup
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark mb-2">
                  Special Instructions (Optional)
                </label>
                <textarea
                  name="special_instruction"
                  value={formData.special_instruction}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Any special requests or notes..."
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-bg-highlight resize-none bg-gray-50"
                />
              </div>
              <div className="mt-4">
                <p className="text-sm text-txt-muted mb-4">
                  Please review all details carefully before confirming your
                  booking.
                </p>
                <p className="text-sm">
                  By clicking "Confirm Booking", you agree to our{' '}
                  <a
                    href="/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Terms and Conditions
                  </a>
                  .
                </p>
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
              type="button"
              variant="contained"
              onClick={handleConfirmBooking}
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
