import { useState } from "react";
import { ArrowUpRight, BriefcaseBusiness } from "lucide-react";

const categories = [
  {
    id: "technology",
    title: "Technology & IT",
    subtitle: "Build the technology of tomorrow",
    number: "01",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=85",
    filter: "Technology & IT"
  },
  {
    id: "corporate",
    title: "Corporate & Management",
    subtitle: "Lead teams and shape businesses",
    number: "02",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=85",
    filter: "Corporate & Management"
  },
  {
    id: "data",
    title: "Data & Analytics",
    subtitle: "Turn information into insights",
    number: "03",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=85",
    filter: "Data & Analytics"
  },
  {
    id: "internships",
    title: "Internships & Freshers",
    subtitle: "Take your first career step",
    number: "04",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=85",
    filter: "Internships & Freshers"
  },
  {
    id: "emerging",
    title: "Emerging Technologies",
    subtitle: "Explore tomorrow's innovations",
    number: "05",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=85",
    filter: "Emerging Technologies"
  }
];

export default function ElasticGallery({ onSelectCategory }) {
  const [active, setActive] = useState("technology");

  const selectCategory = (category) => {
    setActive(category.id);
  };

  return (
    <section className="elastic-gallery-section">
      <div className="elastic-gallery-heading">
        <div>
          <span className="elastic-gallery-eyebrow">
            <BriefcaseBusiness size={15} />
            FIND YOUR DIRECTION
          </span>
          <h2>Explore Career Opportunities</h2>
          <p>Discover a career path that matches your ambitions.</p>
        </div>
      </div>

      <div className="elastic-gallery" aria-label="Career categories">
        {categories.map((category) => {
          const isActive = active === category.id;

          return (
            <article
              key={category.id}
              className={`elastic-gallery-panel ${isActive ? "active" : ""}`}
              style={{ backgroundImage: `url("${category.image}")` }}
              onClick={() => selectCategory(category)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  selectCategory(category);
                }
              }}
              role="button"
              tabIndex={0}
              aria-expanded={isActive}
              aria-label={category.title}
            >
              <div className="elastic-gallery-overlay" />

              <span className="elastic-gallery-number">
                {category.number}
              </span>

              <div className="elastic-gallery-content">
                <span className="elastic-gallery-small-title">
                  {category.title}
                </span>

                {isActive && (
                  <div className="elastic-gallery-details">
                    <h3>{category.title}</h3>
                    <p>{category.subtitle}</p>
                    <button
                      type="button"
                      className="elastic-gallery-action"
                      onClick={(event) => {
                        event.stopPropagation();
                        onSelectCategory?.(category.filter);
                      }}
                    >
                      View Opportunities
                      <ArrowUpRight size={17} />
                    </button>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
