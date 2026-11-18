import { useRef } from "react";
import { getCompanyLogo, getCompanyTheme } from "../../companyLogos";

export function JobCarousel({ children, className = "" }) {
  const trackRef = useRef(null);

  const scroll = (direction) => {
    if (!trackRef.current) return;

    trackRef.current.scrollBy({
      left: direction * 290,
      behavior: "smooth",
    });
  };

  return (
    <section className={`job-carousel ${className}`}>
      <div className="job-carousel-controls">
        <button
          type="button"
          aria-label="Scroll jobs left"
          onClick={() => scroll(-1)}
        >
          &#8592;
        </button>

        <button
          type="button"
          aria-label="Scroll jobs right"
          onClick={() => scroll(1)}
        >
          &#8594;
        </button>
      </div>

      <div className="job-carousel-track" ref={trackRef}>
        {children}
      </div>
    </section>
  );
}

export function JobCarouselCard({
  job,
  badge = "Opportunity",
  topAction,
  description,
  footer,
  children,
  className = "",
}) {
  const title = job?.t || "Untitled position";
  const company = job?.company || job?.c || job?.companyName || job?.employerName || "Company";
  const category = job?.tag || "Career";
  const theme = getCompanyTheme(company, category);
  const companyLogo = getCompanyLogo(company) || job?.companyLogoUrl || job?.companyLogo || job?.logoUrl || job?.logo || job?.employerLogo || job?.companyImage || job?.companyPhoto;

  return (
    <article
      className={`job-carousel-card ${className}`}
      data-company={String(company).toLowerCase().replace(/[^a-z0-9]+/g, "-")}
      style={{
        "--company-banner-accent": theme.accent,
        "--job-company-photo": `url("${theme.photo}")`
      }}
    >
      <div className={`job-carousel-image job-banner-${String(category).toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
        <div className="job-carousel-image-pattern" />
        <span className="job-carousel-image-category">{category}</span>
        <div className="job-carousel-image-symbol">
          <span className="job-carousel-image-fallback">
            {company.trim().charAt(0).toUpperCase()}
          </span>
          {companyLogo && (
            <img
              className="job-carousel-company-logo"
              src={companyLogo}
              alt={`${company} official logo`}
              loading="lazy"
              onLoad={(e) => {
                const fallback = e.currentTarget.previousElementSibling;
                if (fallback) fallback.style.display = "none";
              }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const fallback = e.currentTarget.previousElementSibling;
                if (fallback) fallback.style.display = "grid";
              }}
            />
          )}
        </div>

        <span className="job-carousel-badge">{badge}</span>

        {topAction && (
          <div className="job-carousel-top-action">
            {topAction}
          </div>
        )}
      </div>

      <div className="job-carousel-content">
        <p className="job-carousel-company">{company}</p>

        <h3 className="job-carousel-title">{title}</h3>

        <p className="job-carousel-location">
          <span aria-hidden="true">&#9906;</span>
          {job?.l || "Location not specified"}
        </p>

        {description && (
          <p className="job-carousel-description">{description}</p>
        )}

        {children}

        {footer && (
          <div className="job-carousel-footer">
            {footer}
          </div>
        )}
      </div>
    </article>
  );
}





