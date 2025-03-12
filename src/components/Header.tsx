import logo from "../assets/logos/LunaEdgeLogo.svg";

export default function Header() {
  return (
    <header className="container  !py-5 flex justify-between">
      <img src={logo} alt="Website logo" />
      <p>Welcome to Luna Edge test task!</p>
    </header>
  );
}
