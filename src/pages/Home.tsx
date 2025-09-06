import { Button, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import NavigationBar from "../components/navigationBar";

export default function Home() {
  return (
    <div className="" >
      <h1>Home</h1>
      <nav>

        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <div>

      </div>
    </div>
  );
}
