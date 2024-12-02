import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="flex flex-col">
      <footer className="bg-[#065621] text-white py-8 mt-auto">
        <div className="container mx-auto px-4 mt-auto">
          <div className="flex flex-wrap justify-between gap-8 mt-4">
            <div>
              <ul className="space-y-2">
                <li>
                  <NavLink to="/" className="hover:underline">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/menu" className="hover:underline">ON THE Menu</NavLink>
                </li>
                <li>
                  <NavLink to="/about" className="hover:underline">Our Team</NavLink>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">เกี่ยวกับเรา</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <NavLink to="/contact" className="hover:underline">Help Center & FAQ</NavLink>
                </li>
                <li>
                  <p>089-999-9999</p>
                </li>
                <li>
                  <p>Quantum_C_S@gmail.com</p>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">ตัวตนของเรา</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <p>© Quantum-Chronicle-Saurus</p>
                </li>
                <li>
                  <p>Available in Thailand</p>
                </li>
                <li>
                  <NavLink to="" className="hover:underline">Ad Preferences</NavLink>
                </li>
                <li>
                  <NavLink to="" className="hover:underline">Privacy</NavLink>
                </li>
                <li>
                  <NavLink to="" className="hover:underline">Terms</NavLink>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Follow Us</h3>
              <ul className="flex space-x-4">
                <li><NavLink to="" aria-label="Facebook" className="hover:underline">Facebook</NavLink></li>
                <li><NavLink to="" aria-label="Instagram" className="hover:underline">Instagram</NavLink></li>
                <li><NavLink to="" aria-label="Twitter" className="hover:underline">Twitter</NavLink></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
