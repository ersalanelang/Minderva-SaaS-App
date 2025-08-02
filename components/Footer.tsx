import { FaLinkedin, FaGithub, FaInstagram, FaGlobe, FaEnvelope } from "react-icons/fa";

const socialLinks = [
  { href: "https://www.linkedin.com/in/ersalan-kusuma/", icon: <FaLinkedin /> },
  { href: "https://ersalan-portofolio.vercel.app/", icon: <FaGlobe /> },
  { href: "https://github.com/ersalanelang", icon: <FaGithub /> },
  { href: "https://www.instagram.com/ersalanek/", icon: <FaInstagram /> },
  { href: "mailto:ersa.kusuma.ek@gmail.com", icon: <FaEnvelope /> },
];

const Footer = () => {
  return (
    <footer className="w-screen bg-background2 py-8 ">
      <div className="container mx-auto flex flex-col items-center gap-4 px-4">
        {/* Social Links - Di atas */}
        <div className="flex justify-center gap-4">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-gray-500 dark:hover:text-gray-500 text-black dark:text-white text-xl transition-colors duration-500 ease-in-out"
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Copyright Text - Di tengah */}
        <p className="text-center text-sm font-light text-black dark:text-white">
          © 2025 Ersalan Elang Kusuma
        </p>

        {/* Privacy Policy - Di bawah */}
        <a
          href="#privacy-policy"
          className="text-center text-sm font-light hover:underline text-black dark:text-white"
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
};

export default Footer;