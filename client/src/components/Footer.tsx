// src/components/Footer/Footer.tsx

import React from 'react';
import './Footer.scss';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} PMS - All rights reserved.</p>
    </footer>
  );
};

export default Footer;
