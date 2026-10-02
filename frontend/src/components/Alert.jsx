import React from 'react';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';

const Alert = ({ alert }) => {
  if (!alert) return null;

  const getIcon = () => {
    switch (alert.type) {
      case 'success':
        return <FaCheckCircle style={{ color: 'var(--accent-gold)' }} />;
      case 'danger':
      case 'error':
        return <FaExclamationCircle style={{ color: '#EF4444' }} />;
      default:
        return <FaInfoCircle style={{ color: 'var(--accent-gold)' }} />;
    }
  };

  return (
    <div className="aura-toast" role="alert">
      <span style={{ fontSize: '1.2rem', display: 'flex', alignItems: 'center' }}>
        {getIcon()}
      </span>
      <div>
        <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{alert.message}</div>
      </div>
    </div>
  );
};

export default Alert;
