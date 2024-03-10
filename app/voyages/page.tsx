import EmptyState from "../component/EmptyState";

import BugRefresh from "../component/BugRefresh";

import getUtilisateur from "../actions/getUtilisateur";

import getReservations from "../actions/getReservations";
import VoyagesClient from "./VoyagesClient";



const VoyagesPage = async () => {
    const utilisateur = await getUtilisateur();
  
    if (!utilisateur) {
      return (
        <BugRefresh>
          <EmptyState title="Non autorisé" subtitle="S'il vous se connecter"/>
        </BugRefresh>
      );
    }
  
    const reservations = await getReservations({ userId: utilisateur.id });
  
    if (reservations.length === 0) {
      return (
        <BugRefresh>
          <EmptyState title="Aucun voyage trouvé" subtitle="Il parait que vous n'avez pas reserver"/>
        </BugRefresh>
      );
    }
  
    return (
      <BugRefresh>
        <VoyagesClient reservations={reservations} currentUser={utilisateur}/>
      </BugRefresh>
    );
  }
   
  export default VoyagesPage;