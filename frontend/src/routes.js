// Import your Home component
import Home from "layouts/pages/presentation/index"
import AboutUs from "layouts/pages/landing-pages/about-us";
import ContactUs from "layouts/pages/landing-pages/contact-us";

import Support from "layouts/pages/landing-pages/support-us";


const routes = [
  {
    name: "Home",
    route: "/",
    component: <Home />, // This points to your Home component
  },
  
  {
    name: "About Us",
    route: "/about",
    component: <AboutUs />,
  },
  {
    name: "Contact Us",
    route: "/contact",
    component: <ContactUs />,
  },
  {
    name: "Support",
    route: "/support",
    component: <Support />, // This points to your Support component
  },
  {
    name: "",
    route: "/support",
    component: <Support />, // This points to your Support component
  },
  
];

export default routes;
