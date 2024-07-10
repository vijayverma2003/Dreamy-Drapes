import React from "react";
import { Julius_Sans_One } from "next/font/google";
import Link from "next/link";
import Logo from "./Logo";
const juliusSansOne = Julius_Sans_One({ weight: "400", subsets: ["latin"] });

const Footer = () => {
  const footerLinks = [
    { label: "Home", link: "/" },
    { label: "About", link: "/about" },
    { label: "Terms & Conditions", link: "/terms" },
    { label: "Shipping & Return Policy", link: "/shipping-return-policy" },
    { label: "Privacy Policy", link: "/privacy" },
    { label: "FAQ", link: "/faq" },
  ];

  return (
    <footer className="mt-48 bg-zinc-900 py-8 pb-16">
      <div className="container m-auto">
        <div className="container m-auto mt-8 grid grid-cols-3 pb-8 border-b border-zinc-400">
          <div>
            <div className="flex gap-4 items-center">
              <span className="border border-zinc-500 rounded-md">
                <Logo />
              </span>
              <h1 className={`${juliusSansOne.className} text-center text-xl`}>
                Dreamy Drapes
              </h1>
            </div>
          </div>
          <div>
            <ul className="text-sm text-zinc-500">
              {footerLinks.map((footerLink) => (
                <li className="mt-3 text-zinc-500">
                  <Link
                    className="inline-block hover:text-white hover:underline transition-colors"
                    href={footerLink.link}
                  >
                    {footerLink.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="justify-self-center">
            <h3
              className={`${juliusSansOne.className} text-lg font-semibold mb-4`}
            >
              Contact Us
            </h3>
            <h4 className="mb-4 text-">+91 190241989412</h4>
            <p>Blabalba, blaladlf, India</p>
          </div>
        </div>
        <div className="pt-8 flex justify-start gap-8">
          <p className="text-sm text-zinc-300">
            &copy; {new Date().getFullYear()} Dreamy Drapes, All Rights Reserved{" "}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
