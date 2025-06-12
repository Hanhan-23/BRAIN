import { redirect } from "next/navigation";

export default function Home() {
  redirect("/pemerintah/login");
} // Langsung masuk ke login