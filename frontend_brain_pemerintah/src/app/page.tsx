import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login");
} // Langsung masuk ke login