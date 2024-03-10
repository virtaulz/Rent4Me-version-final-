'use client';

import Image from "next/image";
import {useRouter} from "next/navigation"

const Logo = ()=> {
    const router = useRouter();

    return(
            <Image  onClick={() => router.push('/')} alt="Logo" className="hidden md:block curser-pointer" height='300' width='250'src='/images/capture.png'/>
            
        
    );
}

export default Logo;