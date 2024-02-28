import { Tchildren } from "@/@types/children"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Inicial - Controle RH",
    description: "Tela inicial do colaborador"
}

const DashboardLayout = ({ children }: Tchildren) => <html lang="pt-Br"><body>{children}</body></html>

export default DashboardLayout