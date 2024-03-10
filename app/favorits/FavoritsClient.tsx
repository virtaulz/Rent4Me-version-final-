import { SafeAnnonces, SafeUtilisateur } from "@/app/types";

import Titre from "../component/Titre";
import Container from "../component/Container";
import AnnonceCard from "../component/Annonces/AnnonceCard";

interface FavoritsClientProps {
  annonces: SafeAnnonces[],
  utilisateur?: SafeUtilisateur | null,
}

const FavoritsClient: React.FC<FavoritsClientProps> = ({
  annonces,
  utilisateur
}) => {
  return (
    <Container>
      <Titre title="Favorits" subtitle="Liste des endroits que vous avez ajoutés en favoris !"/>
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {annonces.map((annonce: any) => (
          <AnnonceCard currentUser={utilisateur} key={annonce.id} data={annonce}/>
        ))}
      </div>
    </Container>
   );
}
 
export default FavoritsClient;