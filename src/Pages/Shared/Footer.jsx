import { FaFacebookF, FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { Link } from "react-router";
import footerLogo from "../../assets/logo/Old .png";

const Footer = () => {
  const socialLinks = [
    { icon: FaFacebookF, link: "https://www.facebook.com/abusolaymun.sefat/", color: "from-blue-400 to-blue-600" },
    { icon: FaGithub, link: "https://github.com/Abusolaymansefat", color: "from-gray-700 to-gray-900" },
    { icon: FaLinkedinIn, link: "https://www.linkedin.com/in/abu-solayman-sefat/", color: "from-blue-500 to-blue-700" },
    { icon: FaTwitter, link: "#", color: "from-blue-300 to-blue-500" },
  ];

  return (
    <footer className="bg-gray-100 text-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
        {/* Logo & Slogan */}
        <div className="flex flex-col items-start">
          <img src={footerLogo} alt="VolunteerConnect Logo" className="w-32 mb-4" />
          <p className="text-gray-600">
            Empowering communities through volunteering.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="flex flex-col space-y-2">
            <li>
              <Link to="/" className="hover:text-green-600 transition-colors">Home</Link>
            </li>
            <li>
              <Link to="/AddVolunteerPost" className="hover:text-green-600 transition-colors">Add Volunteer Post</Link>
            </li>
            <li>
              <Link to="/manage-posts" className="hover:text-green-600 transition-colors">Manage My Posts</Link>
            </li>
            <li>
              <Link to="/volunteer" className="hover:text-green-600 transition-colors">All Volunteer Posts</Link>
            </li>
            <li>
              <Link to="/my-requests" className="hover:text-green-600 transition-colors">My Requests</Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            {socialLinks.map((social, idx) => {
              const Icon = social.icon;
              return (
                <a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br ${social.color} text-white transform hover:scale-110 transition-transform duration-300`}
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="bg-green-800 text-center py-3 text-white text-sm">
        &copy; {new Date().getFullYear()} VolunteerConnect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
