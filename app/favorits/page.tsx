import EmptyState from "../component/EmptyState";

import BugRefresh from "../component/BugRefresh";

import getUtilisateur from "../actions/getUtilisateur";
import FavoritsClient from "./FavoritsClient";
import getAnnoncesFavorits from "../actions/getAnnoncesFavorits";

const ListingPage = async () => {
    const annonce = await getAnnoncesFavorits();
    const utilisateur = await getUtilisateur();
  
    if (annonce.length === 0) {
      return (
        <BugRefresh>
          <EmptyState title=" Aucun favorits" subtitle="Il semble que vous n'ayez aucune annonce favorite."/>
        </BugRefresh>
      );
    }
  
    return (
      <BugRefresh>
        <FavoritsClient annonces={annonce} utilisateur={utilisateur}
        />
      </BugRefresh>
    );
  }
   
  export default ListingPage;