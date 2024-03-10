import React from 'react';

interface TitreProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

const Titre: React.FC<TitreProps> = ({ 
  title, 
  subtitle,
  center = false // Défaut ajouté pour center
}) => {
  const textAlign = center ? 'text-center' : 'text-start'; // Calcul de la classe de texte dynamiquement

  return ( 
    <div className={textAlign}>
      <div className="text-2xl font-bold">
        {title}
      </div>
      {subtitle && ( // Condition pour afficher le sous-titre uniquement s'il est présent
        <div className="font-light text-neutral-500 mt-2">
          {subtitle}
        </div>
      )}
    </div>
   );
}
 
export default Titre;
