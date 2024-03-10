import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import Navbar from "./component/navbar/Navbar";
import "./globals.css";
import BugRefresh from "./component/BugRefresh";
import InscriptionModal from "./component/Modal/InscriptionModal";
import ToasterP from "./providers/ToasterP";
import ConnexionModal from "./component/Modal/ConnexionModal";
import getUtilisateur from "./actions/getUtilisateur";
import RentModal from "./component/Modal/RentModal";
import SearchModal from "./component/Modal/SearchModal";

const inter = Oswald({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rent4Me",
  description: "Application pour louer un logement",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUtilisateur = await getUtilisateur();

  return (
    <html lang="en">
      <body className={inter.className}>
        <BugRefresh>
          <ToasterP />
          <RentModal/>
          <SearchModal/>
          <ConnexionModal />
          <InscriptionModal />
          <Navbar currentUtilisateur={currentUtilisateur} />
        </BugRefresh>
        <div className="pb-20 pt-28">
          {children}
        </div>
      </body>
    </html>
  );
}
