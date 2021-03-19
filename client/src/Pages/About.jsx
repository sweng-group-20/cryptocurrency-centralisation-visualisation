import React from "react";
import "./About.css";
import "../index.css";

function About() {
  return (
    <section className="About">
      <h1 className="about-header">
        What Is Centralisation in Cryptocurrencies?
      </h1>
      <div className="about-container">
        <div className="about-body">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi amet
          quibusdam obcaecati totam et perspiciatis tempora natus voluptates
          explicabo aliquam perferendis doloribus possimus est enim facere iure,
          magnam harum rem. Lorem ipsum dolor, sit amet consectetur adipisicing
          elit. Sequi amet quibusdam obcaecati totam et perspiciatis tempora
          natus voluptates explicabo aliquam perferendis doloribus possimus est
          enim facere iure, magnam harum rem. Lorem ipsum dolor, sit amet
          consectetur adipisicing elit. Sequi amet quibusdam obcaecati totam et
          perspiciatis tempora natus voluptates explicabo aliquam perferendis
          doloribus possimus est enim facere iure, magnam harum rem.
        </div>
        <div className="about-image-container">
          <img
            className="about-image"
            src="{./images/—Pngtree—white cartoon line electronics_4615679.png}"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}

export default About;
