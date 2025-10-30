import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import type { PricingPlanTypes } from '@/types/pricingTypes';
import { Link } from 'react-router-dom';

export default function PricingCard({
  price,
  planName,
  description,
  features,
  variant,
  showButton = true,
}: PricingPlanTypes) {
  const isExclusive = variant === 'exclusive';
  const bgClass = isExclusive ? 'bg-bg-card-exclusive' : 'bg-bg-card-standard';
  const textClass = isExclusive
    ? 'text-txt-card-exclusive'
    : 'text-txt-card-standard';
  const tilt = isExclusive ? '-rotate-2' : 'rotate-2';

  return (
    <div
      className={`w-full md:w-80 ${bgClass} rounded-2xl p-8 shadow-lg ${textClass} transition-all duration-300 hover:shadow-2xl hover:scale-101 ${tilt}`}
    >
      <div className="mb-6">
        <div className="text-5xl font-bold mb-2">
          ₱{price} <span className="text-lg font-normal">/ Load</span>
        </div>
        <h3 className="flex gap-2 text-xl font-semibold mb-1">{planName}</h3>
        <p className="flex flex-col text-sm opacity-90">
          {description}
          <span
            className={
              isExclusive
                ? 'text-sm text-txt-primary font-normal rounded bg-bg-light my-2 px-2 py-1 w-fit'
                : 'hidden'
            }
          >
            Best Service
          </span>
        </p>
      </div>

      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <CheckIcon className={textClass + ' mt-0.5'} fontSize="small" />
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      {showButton && (
        <Link to="/booking">
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: isExclusive ? 'white' : 'var(--color-primary)',
              color: isExclusive ? 'var(--color-primary)' : 'white',
              '&:hover': {
                backgroundColor: isExclusive
                  ? 'var(--color-accent)'
                  : 'var(--color-primary)',
              },
              textTransform: 'none',
              fontWeight: 600,
              py: 1.5,
              borderRadius: 2,
            }}
          >
            Book Now!
          </Button>
        </Link>
      )}
    </div>
  );
}
