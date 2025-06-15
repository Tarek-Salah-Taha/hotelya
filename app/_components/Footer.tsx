function Footer() {
  return (
    <footer className="bg-text text-white py-10 px-4 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold  mb-2">Hotelya</h3>
          <p>
            Your trusted partner for hotel reservations worldwide. Book with
            confidence.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-2">Company</h4>
          <ul>
            <li>About Us</li>
            <li>Careers</li>
            <li>Press</li>
            <li>Blog</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Support</h4>
          <ul>
            <li>Help Center</li>
            <li>Contact Us</li>
            <li>Safety</li>
            <li>Cancellation</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-2">Legal</h4>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Cookie Policy</li>
            <li>Sitemap</li>
          </ul>
        </div>
      </div>
      <p className="text-center mt-8 text-sm">
        © {new Date().getFullYear()} Hotelya. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
