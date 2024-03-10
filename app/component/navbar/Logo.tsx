'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
    const router = useRouter();

    return (
        <div onClick={() => router.push('/')}>
            <Image src="/images/capture.jpg" alt="Logo" className="hidden md:block cursor-pointer" height={100} width={250} />
        </div>
    );
}

export default Logo;
