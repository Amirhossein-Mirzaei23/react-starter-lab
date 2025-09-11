import { Button, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import NavigationBar from "../components/navigationBar";

export default function Home() {
  return (
    <div className="grid grid-cols-2 gap-4 h-24 ">
      <div className="bg-slate-900 w-full h-full rounded-2xl">
        box1
      </div>
      <div className="bg-slate-900 w-full h-full rounded-2xl">
        box2
      </div>
    </div>
  );
}
