'use client';

import Container from "../Container";
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { MdOutlineVilla } from 'react-icons/md';
import { FaSkiing } from 'react-icons/fa';
import { IoDiamond } from 'react-icons/io5';
import { 
  GiBarn, 
  GiBoatFishing, 
  GiCactus, 
  GiCaveEntrance, 
  GiForestCamp, 
  GiIsland,
  
  GiWindmill
} from 'react-icons/gi';
import CategoryBox from "../CategoryBox";
import { BsSnow } from 'react-icons/bs';
import { usePathname, useSearchParams } from "next/navigation";
export const categories = [
    {
        label :"Plage",
        icon: TbBeach,
        description: "Près de la plage",
    },
    {
        label: 'Moderne',
        icon: MdOutlineVilla,
        description: 'Cette propriété est moderne !'
      },
      {
        label: 'Au sommet',
        icon: TbMountain,
        description: 'Cette propriété est à la campagne !'
      },
    {
        label: 'Éoliennes',
        icon: GiWindmill,
        description: 'Cette propriété possède des éoliennes !',
      },
      {
        label: 'Îles',
        icon: GiIsland,
        description: 'Cette propriété est sur une île !'
      },
      {
        label: 'Lac',
        icon: GiBoatFishing,
        description: "Cette propriété est près d'un lac!"
      },
    {
        label: 'Piscines',
        icon: TbPool,
        description: 'Cette propriété possède une belle piscine !'
    },
    {
        label: 'Caves',
        icon: GiCaveEntrance,
        description: 'Cette propriété se trouve dans une grotte effrayante !'
      },
      {
        label: 'Camping',
        icon: GiForestCamp,
        description: 'Cette propriété propose des activités de camping !'
      },
      {
        label: 'Arctique',
        icon: BsSnow,
        description: 'Cette propriété est dans un environnement arctique !'
      },
      {
        label: 'Désert',
        icon: GiCactus,
        description: 'Cette propriété est dans le désert !'
      },
      {
        label: 'Grange',
        icon: GiBarn,
        description: 'Cette propriété est dans une grange !'
      },
      {
        label: 'Luxe',
        icon: IoDiamond,
        description: 'Cette propriété est toute neuve et luxueuse !'
      },
    {
        label: 'Ski',
        icon: FaSkiing,
        description: 'Cette propriété propose des activités de ski !'
      },
]
const Categories = ()=> {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();
    const isMainPage = pathname === '/';
    if (!isMainPage) {
        return null;
      }

    return (

    <Container>
        <div className="pt-2 flex flex-row items-center justify-between overflow-x-auto">
            {categories.map((item) => 
            (<CategoryBox key={item.label} label={item.label} selected ={category === item.label} icon={item.icon} />)
            )}
        </div>
                
    </Container>
    )

}

export default Categories;