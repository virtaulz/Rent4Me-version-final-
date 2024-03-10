'use client';

import { useRouter } from "next/navigation";
import Link from "next/link";

const Logo = () => {
    const router = useRouter();

    return (
        <Link href="/">
            <a>
                <img onClick={() => router.push('/')} src="Capture.png" alt="Logo" className="hidden md:block cursor-pointer" height="90" width="250" />
            </a>
        </Link>
    );
}

export default Logo;
