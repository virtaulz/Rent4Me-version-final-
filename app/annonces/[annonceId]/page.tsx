import getAnnonceById from "@/app/actions/getAnnonceById";
import getUtilisateur from "@/app/actions/getUtilisateur";
import BugRefresh from "@/app/component/BugRefresh";
import EmptyState from "@/app/component/EmptyState";
import AnnonceClient from "./AnnonceClient";
import getReservations from "@/app/actions/getReservations";


interface IParams {
    annonceId?: string;
  }

const AnnoncePage = async ({ params }: { params: IParams }) => {
    const annonce = await getAnnonceById(params);
    const reservations = await getReservations(params); 
    const utilisateur = await getUtilisateur();

    if (!annonce) {
        return (
          <BugRefresh>
            <EmptyState/>
          </BugRefresh>
        );
      }
    return(
        <BugRefresh>
            <AnnonceClient annonce = {annonce} utilisateur={utilisateur} reservations={reservations} />
        </BugRefresh>
        
    )
}

export default AnnoncePage;