import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

function MemberCard({ image, name, role, bio }) {
  const [showBio, setShowBio] = useState(false);

  return (
    <div className="col-4 text-center mb-5">
      <img
        src={image}
        alt={name}
        style={{
          width: "220px",
          height: "220px",
          borderRadius: "50%",
          objectFit: "cover",
        }}
      />

      <h4 className="mt-4">{name}</h4>
      <p className="text-muted">{role}</p>

      <p
        className="bio-toggle"
        style={{ cursor: "pointer", color: "#424242" }}
        onClick={() => setShowBio(!showBio)}
      >
        Bio {showBio ? <FiChevronUp /> : <FiChevronDown />}
      </p>

      {showBio && (
        <p className="text-muted px-4">{bio}</p>
      )}
    </div>
  );
}

function Team() {
  return (
    <div className="container team-section">
      
      <div className="row p-5">
        <h1 className="text-center fs-3" style={{ fontWeight: 500 }}>
          People
        </h1>
      </div>

      <div
        className="row text-muted mb-5"
        style={{ lineHeight: "1.8", fontSize: "1.1em" }}
      >
        <div className="col-6 p-5 text-center">
          <img
            src="/media/images/nithinKamath.jpg"
            style={{
              borderRadius: "50%",
              width: "70%",
            }}
            alt="Nithin Kamath"
          />
          <h4 className="mt-4">Nithin Kamath</h4>
          <h6>Founder, CEO</h6>
        </div>

        <div className="col-6 p-5">
          <p>
            Nithin bootstrapped and founded Zerodha in 2010 to overcome the
            hurdles he faced during his decade long stint as a trader.
          </p>

          <p>
            He is a member of the SEBI Secondary Market Advisory Committee
            (SMAC) and the Market Data Advisory Committee (MDAC).
          </p>

          <p>Playing basketball is his zen.</p>

          <p>
            Connect on{" "}
            <a href="" style={{ textDecoration: "none" }}>
              Homepage
            </a>{" "}
            /{" "}
            <a href="" style={{ textDecoration: "none" }}>
              TradingQnA
            </a>{" "}
            /{" "}
            <a href="" style={{ textDecoration: "none" }}>
              Twitter
            </a>
          </p>
        </div>
      </div>

      <div className="row mt-5">
        <MemberCard
          image="/media/images/nikhilKamath.jpg"
          name="Nikhil Kamath"
          role="Co-founder & CFO"
          bio="Nikhil is an astute and experienced investor, and he heads financial planning at Zerodha. An avid reader, he always appreciates a good game of chess."
        />

        <MemberCard
          image="/media/images/kailashNadh.jpg"
          name="Dr. Kailash Nadh"
          role="CTO"
          bio="Kailash has a PhD in Artificial Intelligence & Computational Linguistics, and is the brain behind all our technology and products. He has been a developer from his adolescence and continues to write code every day."
        />

        <MemberCard
          image="/media/images/venuMadhav.jpg"
          name="Venu Madhav"
          role="COO"
          bio="Venu is the backbone of Zerodha taking care of operations and ensuring that we are compliant to rules and regulations. He has over a dozen certifications in financial markets and is also proficient in technical analysis. Workouts, cycling, and adventuring is what he does outside of Zerodha."
        />

        <MemberCard
          image="/media/images/seemaPatil.jpg"
          name="Seema Patil"
          role="Director"
          bio="Seema who has lead the quality team since the beginning of Zerodha, is now a director. She is an extremely disciplined fitness enthusiast."
        />

        <MemberCard
          image="/media/images/karthikRangappa.jpg"
          name="Karthik Rangappa"
          role="Chief of Education"
          bio="Karthik 'Guru' Rangappa single handledly wrote Varsity, Zerodha's massive educational program. He heads investor education initiatives at Zerodha and loves stock markets, classic rock, single malts, and photography."
        />

        <MemberCard
          image="/media/images/austinPrakesh.jpg"
          name="Austin Prakesh"
          role="Director Strategy"
          bio="Austin is a successful self-made entrepreneur from Singapore. His area of specialty revolves around helping organisations including grow by optimizing revenue streams and creating growth strategies. He is a boxing enthusiast and loves collecting exquisite watches."
        />
      </div>
    </div>
  );
}

export default Team;
