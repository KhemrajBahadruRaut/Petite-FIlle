import React from "react";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaPaperPlane, FaPhoneAlt, FaEnvelope, FaUserFriends } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#7B4A2E] text-white py-5 px-6 md:px-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mx-auto container">
        {/* Logo + Description */}
        <div>
          <h2 className="text-2xl font-bold mb-3">Petite Fille</h2>
          <p className="text-sm leading-relaxed mb-6">
            Lorem ipsum dolor, sit amet, cons adipiscing eli Lorem ipsum dolor,
            sit amet, cons adipiscing eli
          </p>
          <div className="flex space-x-4 text-xl">
            <a href="#" aria-label="Facebook" className="hover:text-gray-200">
              <FaFacebook />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-gray-200">
              <FaInstagram />
            </a>
            <a href="#" aria-label="TikTok" className="hover:text-gray-200">
              <FaTiktok />
            </a>
          </div>
        </div>

        {/* Contacts */}
        <div>
          <h3 className="font-semibold mb-4 underline">Contacts</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <FaPaperPlane /> Lorem ipsum dolor, sit amet, cons adipiscing eli
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt /> (123) 456 - 7891
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope /> support@petitefille.com
            </li>
            <li className="flex items-center gap-2">
              <FaUserFriends /> Join our team
            </li>
            <li className="flex items-center gap-2">
              <FaUserFriends /> Any Queries?
            </li>
          </ul>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-semibold mb-4 underline">Navigation</h3>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-gray-200">Home</a></li>
            <li><a href="#" className="hover:text-gray-200">About us</a></li>
            <li><a href="#" className="hover:text-gray-200">Menu</a></li>
            <li><a href="#" className="hover:text-gray-200">Merchandise</a></li>
            <li><a href="#" className="hover:text-gray-200">Gallery</a></li>
            <li><a href="#" className="hover:text-gray-200">Careers</a></li>
            <li><a href="#" className="hover:text-gray-200">Catering</a></li>
          </ul>
        </div>

        {/* Additionals */}
        <div>
          <h3 className="font-semibold mb-4 underline">Additionals</h3>
          <ul className="space-y-3 text-sm">
            <li><a href="#" className="hover:text-gray-200">Terms of Service</a></li>
            <li><a href="#" className="hover:text-gray-200">Privacy policy</a></li>
            <li><a href="#" className="hover:text-gray-200">Terms and conditions</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 text-center text-xs text-gray-300">
        © 2025 Petite Fille. All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
