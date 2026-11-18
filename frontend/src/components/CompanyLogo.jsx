import React, { useState } from "react";
import { getCompanyLogo } from "../companyLogos";
import "./CompanyLogo.css";

export default function CompanyLogo({ companyName }) {
  const [imageError, setImageError] = useState(false);

  const logo = getCompanyLogo(companyName);

  return (
    <div className="company-logo-wrapper">
      {logo && !imageError ? (
        <img
          src={logo}
          alt={`${companyName} official logo`}
          className="company-full-logo"
          onError={() => setImageError(true)}
        />
      ) : (
        <span className="company-logo-fallback">
          {companyName}
        </span>
      )}
    </div>
  );
}
