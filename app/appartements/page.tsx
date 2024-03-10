import EmptyState from "../component/EmptyState";

import BugRefresh from "../component/BugRefresh";
import getUtilisateur from "../actions/getUtilisateur";
import getAnnonces from "../actions/getAnnonces";
import AppartementsClient from "./AppartementsClient";

const AppartmentsPage = async () => {
    const utilisateur = await getUtilisateur();
  
    if (!utilisateur) {
      return <EmptyState title="Non autorisé" subtitle="Bien vouloir vous connecter"/>
    }
  
    const annonces = await getAnnonces({ userId: utilisateur.id });
  
    if (annonces.length === 0) {
      return (
        <BugRefresh>
          <EmptyState title="Aucune propriété trouvée" subtitle="Il semble que vous n'ayez aucune propriété."/>
        </BugRefresh>
      );
    }
  
    return (
      <BugRefresh>
        <AppartementsClient annonces={annonces} utilisateur={utilisateur}/>
      </BugRefresh>
    );
  }
   
  export default AppartmentsPage;
