import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export type NotificationVariant = 'success' | 'error' | 'info';

export interface NotificationModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  variant?: NotificationVariant;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

const style: React.CSSProperties = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#fff',
  padding: '24px',
  borderRadius: '12px',
  width: '92%',
  maxWidth: 440,
  boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
};

const iconColor: Record<NotificationVariant, string> = {
  success: '#16a34a',
  error: '#dc2626',
  info: '#2563eb',
};

export default function NotificationModal({
  open,
  onClose,
  title,
  message,
  variant = 'info',
  primaryAction,
  secondaryAction,
}: NotificationModalProps) {
  const renderIcon = () => {
    const color = iconColor[variant];
    if (variant === 'success')
      return <CheckCircleIcon sx={{ color, fontSize: 36 }} />;
    if (variant === 'error')
      return <ErrorOutlineIcon sx={{ color, fontSize: 36 }} />;
    return <ErrorOutlineIcon sx={{ color, fontSize: 36 }} />;
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="notification-title">
      <Box sx={style}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 10,
          }}
        >
          {renderIcon()}
          <h3
            id="notification-title"
            style={{
              margin: 0,
              fontWeight: 700,
              fontSize: 18,
              color: '#111827',
            }}
          >
            {title ||
              (variant === 'success'
                ? 'Success'
                : variant === 'error'
                  ? 'Error'
                  : 'Notice')}
          </h3>
        </div>
        {message && (
          <p
            style={{
              marginTop: 6,
              marginBottom: 18,
              fontSize: 14,
              color: '#4b5563',
            }}
          >
            {message}
          </p>
        )}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 10,
            marginTop: 8,
          }}
        >
          {secondaryAction && (
            <Button variant="outlined" onClick={secondaryAction.onClick}>
              {secondaryAction.label}
            </Button>
          )}
          <Button
            variant="contained"
            onClick={primaryAction?.onClick || onClose}
          >
            {primaryAction?.label || 'OK'}
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
