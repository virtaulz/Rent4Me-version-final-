'use client';

import useCountries from "@/app/compte/useCountries";
import { SafeAnnonces, SafeReservation, SafeUtilisateur } from "@/app/types";
import { Reservation } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from 'date-fns';

import Image from "next/image";
import Heartbutton from "../HeartButton";
import Button from "../Button";

interface AnnonceCardProps {
    data: SafeAnnonces;
    reservation?: SafeReservation;
    onAction?: (id: string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUtilisateur | null;
};

const AnnonceCard: React.FC<AnnonceCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = '',
    currentUser,

}) => {
    const router = useRouter();
    const { getByValue } = useCountries();
    const location = getByValue(data.locationValue);
    const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (disabled) {
            return;
        }
        onAction?.(actionId)
    }, [disabled, onAction, actionId]);


    const prix = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice;
        }

        return data.price;
    }, [reservation, data.price]);

    const reservationDate = useMemo(() => {
        if (!reservation) {
            return null;
        }
        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);

        return `${format(start, 'PP')} - ${format(end, 'PP')}`;
    }, [reservation]);
    return (

        <div onClick={() => router.push(`/annonces/${data.id}`)} className="col-span-1 cursor-pointer group">
            <div className="flex flex-col gap-2 w-full">
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                    <Image fill alt="annonce" src={data.imageSrc} className="object-cover h-full w-full group-hover:scale-110 transition" />
                    <div className="absolute top-3 right-3" >
                        <Heartbutton annonceId={data.id} currentUser={currentUser} />
                    </div>
                </div>

                <div className="font-semibold text-lg">
                    {location?.region}, {location?.label}
                </div>
                <div className="font-light text-neutral-500">
                    {reservationDate || data.category}
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">
                        {prix} CAD
                    </div>
                    {!reservation && (
                        <div className="font-light">nuit</div>
                    )}
                </div>
                {onAction && actionLabel && (
                    <Button
                        disabled={disabled}
                        small
                        label={actionLabel}
                        onClick={handleCancel}
                    />
                )}
            </div>
        </div>
    )
}

export default AnnonceCard;