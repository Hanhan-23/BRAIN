interface CardCaraMelapor {
    title: string;
    description: string;
    icons: any;
}

const CardCaraMelapor = ({title, description, icons}: CardCaraMelapor) => {
    return (
        <div className="w-full h-[6rem] md:h-[7rem] lg:h-[7.5rem] border-[#BFBFBF] border-2 rounded-3xl">
            <div className="w-full h-full flex flex-row  place-items-center p-4">
                <IconCara icon={
                    [icons]
                }/>
                <div className="pl-4 text-black">
                    <div className="font-medium text-sm">{title}</div>
                    <div className="font-normal text-xs">{description}</div>
                </div>
            </div>
        </div>
    )
}

const IconCara = ({icon}: any) => {
    return (
        <div className="bg-[#DBEAFE] w-16 rounded-full place-items-center place-content-center p-2 md:p-3.5">
            {icon}
        </div>
    )
}

export default CardCaraMelapor;