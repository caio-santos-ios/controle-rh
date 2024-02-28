import { Tchildren } from "@/@types/children";
import { Metadata } from "next";
import "@/style/globals.css";

export const metadata: Metadata = {
  title: "Login - Controle RH",
  description: "Faça seu login no sistema do controle RH" 
}

const HomeLayout = ({ children }: Tchildren) => <html lang="pt-Br"><body>{children}</body></html>

export default HomeLayout