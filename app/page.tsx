'use client'

import { useEffect, useState } from "react";
import getAnnonces, { IAnnoncesParams } from "./actions/getAnnonces";
import getUtilisateur from "./actions/getUtilisateur";
import AnnonceCard from "./component/Annonces/AnnonceCard";
import BugRefresh from "./component/BugRefresh";
import Container from "./component/Container";
import EmptyState from "./component/EmptyState";

export const dynamic = 'force-dynamic';

interface HomeProps {
  search: IAnnoncesParams;
}

const Home: React.FC<HomeProps> = ({ search }) => {
  const [annonces, setAnnonces] = useState<any[]>([]);
  const [utilisateur, setUtilisateur] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const annoncesData = await getAnnonces(search);
      const utilisateurData = await getUtilisateur();
      setAnnonces(annoncesData);
      setUtilisateur(utilisateurData);
    };

    fetchData();
  }, [search]);

  if (annonces.length === 0) {
    return (
      <BugRefresh>
        <EmptyState showReset />
      </BugRefresh>
    );
  }

  return (
    <BugRefresh>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {annonces.map((annonce) => (
            <AnnonceCard currentUser={utilisateur} key={annonce.id} data={annonce} />
          ))}
        </div>
      </Container>
    </BugRefresh>
  );
};

export default Home;
