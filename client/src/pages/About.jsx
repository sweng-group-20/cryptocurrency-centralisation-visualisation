import React from 'react';
import './About.css';
import '../index.css';

function About() {
  return (
    <section className="About">
      <h1 className="about-header">
        What Is Centralisation in Cryptocurrencies?
      </h1>
      <div className="about-container">
        <div className="about-body">
          A centralized cryptocurrency exchange is a platform where you can buy
          or sell digital assets. With centralised cryptocurrencies you have to
          trust a third party to monitor the transaction and secure the assets
          on behalf of the buyer and the seller. These deals aren’t tracked on
          the blockchain. Such exchanges require you to submit your personal
          information for verification. On the other hand, if you’re a company,
          then you’d have to provide your corporate information to the exchange
          so it can verify your account. In a centralized crypto exchange, most
          of the control over your account remains in the hands of the third
          party which runs the exchange. A considerable risk of trading with
          centralized crypto exchanges is of hackers. They can hack the third
          party which uses private keys to access all the funds of the users,
          and you could lose all of your deposit. Examples of centralized
          cryptocurrency exchanges include Binance, Coinbase and LocalBitcoins.
          <br />A decentralized cryptocurrency exchange is similar to a
          centralized one, except it doesn’t involve a third party. This means
          all the control of the account remains with you. Decentralized
          platforms are more secure because there’s no possibility of multiple
          users losing their funds due to a single cause (hacking the third
          party).
        </div>
        {/* <div className="about-image-container">
          <img className="about-image" src={Image} alt="" />
        </div> */}
      </div>
    </section>
  );
}

export default About;
