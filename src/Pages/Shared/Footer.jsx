import { FaFacebookF, FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { Link } from "react-router";
import footerLogo from "../../assets/logo/Old .png";

const Footer = () => {
  return (
    <footer className="bg-[#e4e4e4] text-black mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <img src={footerLogo} alt="" />
          
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/AddVolunteerPost" className="hover:underline">
                Add Volunteer Post
              </Link>
            </li>
            <li>
              <Link to="/manage-posts" className="hover:underline">
                Manage My Posts
              </Link>
            </li>
            <li>
              <Link to="/volunteer" className="hover:underline">
                All Volunteer Posts
              </Link>
            </li>
            <li>
              <Link to="/my-requests" className="hover:underline">
                My-requests
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/abusolaymun.sefat/" target="_blank" rel="noreferrer">
              <FaFacebookF className="text-2xl " />
            </a>
            <a href="https://github.com/Abusolaymansefat" target="_blank" rel="noreferrer">
              <FaGithub className="text-2xl" />
            </a>
            <a href="https://www.linkedin.com/in/abu-solayman-sefat/" target="_blank" rel="noreferrer">
              <FaLinkedinIn className="text-2xl" />
            </a>
          </div>
        </div>
      </div>

      <div className="bg-green-800 text-center py-3 text-sm">
        &copy; {new Date().getFullYear()} VolunteerConnect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
