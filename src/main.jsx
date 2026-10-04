import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowDownRight, ArrowUpRight, Menu, X, Instagram, Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

const properties = [
  {
    location: "Yorkville, Toronto",
    price: "$2,895,000",
    meta: "3 Beds  •  3 Baths",
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85"
  },
  {
    location: "The Annex, Toronto",
    price: "$1,749,000",
    meta: "4 Beds  •  3 Baths",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85"
  },
  {
    location: "Rosedale, Toronto",
    price: "$3,450,000",
    meta: "5 Beds  •  4 Baths",
    image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1600&q=85"
  }
];

const testimonials = [
  ["“Kevin made every step feel clear, calm and completely manageable. His attention to detail was exceptional.”", "Toronto Buyer"],
  ["“We felt represented from day one. Kevin's strategy and negotiation skills made a huge difference.”", "Toronto Seller"],
  ["“Professional, responsive and genuinely invested in getting the right result for our family.”", "Homeowner"]
];

function App() {
  const app = useRef(null);
  const [menu, setMenu] = useState(false);
  const [review, setReview] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-copy > *", { y: 45, opacity: 0, duration: 1.1, stagger: .12, ease: "power3.out", delay: .2 });
      gsap.from(".hero-portrait", { scale: 1.08, opacity: 0, duration: 1.5, ease: "power3.out" });
      gsap.utils.toArray(".reveal").forEach((el) => {
        gsap.from(el, {
          y: 55, opacity: 0, duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%" }
        });
      });
      gsap.utils.toArray(".property-card").forEach((el, i) => {
        gsap.from(el, {
          y: 70, opacity: 0, duration: .9, delay: i * .08,
          scrollTrigger: { trigger: el, start: "top 88%" }
        });
      });
      gsap.to(".hero-bg", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
      });
      gsap.to(".toronto-photo", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: { trigger: ".toronto", start: "top bottom", end: "bottom top", scrub: true }
      });
      gsap.utils.toArray(".stat-number").forEach((el) => {
        const target = Number(el.dataset.value);
        const obj = { value: 0 };
        gsap.to(obj, {
          value: target, duration: 1.8, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 86%", once: true },
          onUpdate: () => { el.textContent = Math.round(obj.value) + (target > 100 ? "+" : ""); }
        });
      });
    }, app);
    return () => ctx.revert();
  }, []);

  const go = (id) => {
    setMenu(false);
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={app} className="site">
      <div className="grain" />
      <header className="nav">
        <button className="brand" onClick={() => go("#home")}>
          <span>KEVIN</span>
          <b>NOWACKI</b>
        </button>
        <nav className={menu ? "nav-links open" : "nav-links"}>
          {["About", "Buy", "Sell", "Properties", "Experience"].map((x) =>
            <button key={x} onClick={() => go("#" + x.toLowerCase())}>{x}</button>
          )}
          <button className="nav-cta" onClick={() => go("#contact")}>Let's Talk <ArrowUpRight size={15}/></button>
        </nav>
        <button className="menu-btn" onClick={() => setMenu(!menu)} aria-label="Menu">{menu ? <X/> : <Menu/>}</button>
      </header>

      <main>
        <section className="hero" id="home">
          <img className="hero-bg" src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2200&q=90" alt="Toronto skyline" />
          <div className="hero-overlay" />
          <div className="hero-copy">
            <p className="eyebrow">TORONTO • ONTARIO • REAL ESTATE</p>
            <h1>YOUR NEXT<br/><em>MOVE</em><br/>STARTS HERE.</h1>
            <p className="hero-sub">Strategic real estate advice with a personal approach — from first conversation to closing day.</p>
            <div className="hero-actions">
              <button className="button light" onClick={() => go("#properties")}>Explore Properties <ArrowDownRight size={17}/></button>
              <button className="text-link" onClick={() => go("#contact")}>Work With Kevin <ArrowRight size={16}/></button>
            </div>
          </div>
          <div className="hero-portrait-wrap">
            <div className="portrait-frame">
              <img className="hero-portrait" src="/public/p.png" alt="Professional real estate advisor" />
            </div>
          </div>
          <div className="hero-bottom">
            <span>SCROLL TO DISCOVER</span><span className="line" />
            <span>SIDOROVA INWOOD TEAM / RE/MAX</span>
          </div>
        </section>

        <section className="intro section" id="about">
          <div className="section-label reveal">01 / ABOUT KEVIN</div>
          <div className="intro-grid">
            <div className="reveal">
              <h2>Real estate,<br/><i>with a personal touch.</i></h2>
            </div>
            <div className="intro-copy reveal">
              <p className="lead">Buying or selling a home is more than a transaction. It's a decision about what comes next.</p>
              <p>Kevin Nowacki brings a thoughtful, strategic approach to Toronto real estate — combining local knowledge, market insight and a genuine commitment to his clients.</p>
              <button className="circle-link" onClick={() => go("#experience")}>Discover the experience <ArrowUpRight size={18}/></button>
            </div>
          </div>
          <div className="stats">
            <div><strong className="stat-number" data-value="48">0</strong><span>Social posts & insights</span></div>
            <div><strong className="stat-number" data-value="1059">0</strong><span>Community connections</span></div>
            <div><strong>HOF</strong><span>RE/MAX Hall of Fame</span></div>
            <div><strong>TO</strong><span>Toronto local expertise</span></div>
          </div>
        </section>

        <section className="split section" id="buy">
          <div className="split-card buy">
            <div className="split-image" />
            <div className="split-content">
              <span>FOR BUYERS</span>
              <h2>Find a place<br/><i>that feels like home.</i></h2>
              <button onClick={() => go("#contact")}>Start your search <ArrowUpRight size={17}/></button>
            </div>
          </div>
          <div className="split-card sell" id="sell">
            <div className="split-image" />
            <div className="split-content">
              <span>FOR SELLERS</span>
              <h2>Position your home<br/><i>for its next chapter.</i></h2>
              <button onClick={() => go("#contact")}>Let's talk strategy <ArrowUpRight size={17}/></button>
            </div>
          </div>
        </section>

        <section className="properties section" id="properties">
          <div className="section-top reveal">
            <div>
              <div className="section-label">02 / SELECTED HOMES</div>
              <h2>Featured <i>properties.</i></h2>
            </div>
            <button className="circle-link">View all homes <ArrowRight size={18}/></button>
          </div>
          <div className="property-grid">
            {properties.map((p, i) => (
              <article className="property-card" key={p.location}>
                <div className="property-image">
                  <img src={p.image} alt={p.location}/>
                  <span className="property-index">0{i+1}</span>
                  <span className="view-pill">VIEW <ArrowUpRight size={14}/></span>
                </div>
                <div className="property-info">
                  <div><h3>{p.location}</h3><p>{p.meta}</p></div>
                  <strong>{p.price}</strong>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="process section" id="experience">
          <div className="process-head reveal">
            <div className="section-label">03 / THE PROCESS</div>
            <h2>From first conversation<br/><i>to closing day.</i></h2>
          </div>
          <div className="process-list">
            {[
              ["01", "DISCOVER", "Understand your goals, priorities and what the next chapter should look like."],
              ["02", "STRATEGIZE", "Build a clear plan around market conditions, timing and opportunity."],
              ["03", "EXECUTE", "Manage the details, negotiations and moving pieces with precision."],
              ["04", "CLOSE", "Get you confidently across the finish line — and ready for what's next."]
            ].map(([n,t,d]) => <div className="process-row reveal" key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p><ArrowUpRight size={21}/></div>)}
          </div>
        </section>

        <section className="toronto" id="toronto">
          <img className="toronto-photo" src="https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&w=2200&q=90" alt="Toronto skyline"/>
          <div className="toronto-overlay"/>
          <div className="toronto-content">
            <span className="eyebrow">THE CITY I CALL HOME</span>
            <h2>TORONTO<br/><i>IS HOME.</i></h2>
            <p>From established neighbourhoods to emerging communities, discover what makes Toronto one of the world's most exciting places to live.</p>
            <div className="neighbourhoods">
              {["Yorkville", "Rosedale", "The Annex", "North York", "Etobicoke"].map(n => <span key={n}>{n}</span>)}
            </div>
          </div>
        </section>

        <section className="reviews section">
          <div className="review-side reveal">
            <div className="section-label">04 / CLIENT EXPERIENCE</div>
            <h2>Kind words<br/><i>from clients.</i></h2>
            <div className="review-controls"><button onClick={() => setReview((review + testimonials.length - 1) % testimonials.length)}>←</button><span>0{review+1} / 0{testimonials.length}</span><button onClick={() => setReview((review + 1) % testimonials.length)}>→</button></div>
          </div>
          <div className="review-card reveal" key={review}>
            <span className="quote-mark">“</span>
            <blockquote>{testimonials[review][0]}</blockquote>
            <div className="stars">★★★★★</div>
            <span className="reviewer">{testimonials[review][1]}</span>
          </div>
        </section>

        <section className="instagram section">
          <div className="section-top reveal">
            <div><div className="section-label">05 / SOCIAL</div><h2>Follow the <i>journey.</i></h2></div>
            <a className="circle-link" href="https://www.instagram.com/kdnowacki/" target="_blank" rel="noreferrer">@kdnowacki <Instagram size={18}/></a>
          </div>
          <div className="ig-grid">
            {[
              "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85",
              "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85",
              "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=85",
             "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=85"
            ].map((img,i)=><a href="https://www.instagram.com/kdnowacki/" target="_blank" rel="noreferrer" className="ig-item" key={img}><img src={img} alt={"Instagram preview "+(i+1)}/><span><Instagram size={17}/></span></a>)}
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="contact-inner">
            <div className="section-label">06 / LET'S TALK</div>
            <h2>Make your next<br/><i>move.</i></h2>
            <p>Whether you're buying, selling, or simply exploring your options, let's start a conversation.</p>
            <div className="contact-actions">
              <a href="tel:+14169516647"><Phone size={17}/> 416-951-6647</a>
              <a href="mailto:kevin@sidorovainwood.com"><Mail size={17}/> kevin@sidorovainwood.com</a>
            </div>
            <div className="contact-meta"><span><MapPin size={15}/> Toronto, Ontario</span><span>Sidorova Inwood Team / RE/MAX</span></div>
          </div>
          <div className="contact-word">NOWACKI</div>
        </section>
      </main>

      <footer>
        <span>© {new Date().getFullYear()} Kevin Nowacki</span>
        <span>Sidorova Inwood Team / RE/MAX</span>
        <a href="https://www.instagram.com/kdnowacki/" target="_blank" rel="noreferrer"><Instagram size={15}/> Instagram</a>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
