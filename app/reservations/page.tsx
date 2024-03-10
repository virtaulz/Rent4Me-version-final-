import EmptyState from "../component/EmptyState";

import BugRefresh from "../component/BugRefresh";

import ReservationsClient from "./ReservationsClients";
import getUtilisateur from "../actions/getUtilisateur";
import getReservations from "../actions/getReservations";


const ReservationsPage = async () => {
  const utilisateur = await getUtilisateur();

  if (!utilisateur) {
    return (
      <BugRefresh> 
        <EmptyState title="Non autorisé" subtitle="Bien vouloir se connecter"/>
      </BugRefresh>
    )
  }

  const reservations = await getReservations({ authorId: utilisateur.id });

  if (reservations.length === 0) {
    return (
      <BugRefresh>
        <EmptyState title="Aucune réservation" subtitle="Il semble que vous n'ayez aucune réservation sur vos propriétés."/>
      </BugRefresh>
    );
  }

  return (
    <BugRefresh>
      <ReservationsClient reservations={reservations} utilisateur={utilisateur}/>
    </BugRefresh>
  );
}
 
export default ReservationsPage;

