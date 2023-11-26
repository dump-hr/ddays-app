import useLocation from "wouter/use-location";
import Button from "../Button";
import c from "./Layout.module.scss";
import Input from "../Input";
import Modal from "../Modal";
import { useState } from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const navLinks = [
  {
    href: "/",
    text: "Home",
  },
  {
    href: "/guest",
    text: "Guest",
  },
  {
    href: "/events",
    text: "Events",
  },
  {
    href: "/achievements",
    text: "Achievements",
  },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [location, navigate] = useLocation();
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <div className={c.layout}>
      <nav className={c.nav}>
        {navLinks.map(({ href, text }) => (
          <Button
            key={href}
            variant={location === href ? "primary" : "secondary"}
            onClick={() => navigate(href)}
          >
            {text}
          </Button>
        ))}
        <Input placeholder="placeholder" />
        <Button onClick={toggleModal}>Open modal</Button>
        <Modal modal={modal} toggleModal={toggleModal}>
          <Input placeholder="Username" />
          <Input placeholder="Password" />
        </Modal>
      </nav>
      {children}
    </div>
  );
};

export default Layout;
