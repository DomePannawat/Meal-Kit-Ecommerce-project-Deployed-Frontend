

const Footer = () => {
  
  return (
    <div className="flex flex-col ">
      <footer className="bg-[#065621] text-white py-8 mt-auto">
        <div className="container mx-auto px-4 mt-auto">
          <div className="flex flex-wrap justify-between gap-8 mt-4">

            <div>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:underline">PLANS</a>
                </li>
                <li>
                  <p>Pricing</p>
                </li>
                <li>
                  <a href="#" className="hover:underline">Market</a>
                </li>
                <li>
                  <a href="#" className="hover:underline">ON THE Menu</a>
                </li>
                <li>
                  <a href="#" className="hover:underline">Our Team</a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">เกี่ยวกับเรา</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <p>Help Center & FAQ</p>
                </li>
                <li>
                  <p>089-999-9999</p>
                </li>
                <li>
                  <p>ContactUs@gmail.com</p>
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
                  <p>Ad Preferences</p>
                </li>
                <li>
                  <p>Privacy</p>
                </li>
                <li>
                  <p>Terms</p>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Follow Us</h3>
              <ul className="flex space-x-4">
                <li><a href="#" aria-label="Facebook" className="hover:underline">Facebook</a></li>
                <li><a href="#" aria-label="Instagram" className="hover:underline">Instagram</a></li>
                <li><a href="#" aria-label="Twitter" className="hover:underline">Twitter</a></li>
              </ul>
            </div>

          </div>
        </div>
      </footer>
    </div>
  );
};


export default Footer;