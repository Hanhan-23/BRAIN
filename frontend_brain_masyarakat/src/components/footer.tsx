import Link from "next/link"

const Footer = () => {
    return (
        <footer className="w-full px-9 py-6 bg-white">
            {/* divider */}
            <div className="py-4 border-t border-gray-200 h-px"></div>
            <div className="grid grid-cols-1 gap-y-4 md:grid-cols-5">
                    {/* LOGO */}
                <div className="col-span-1 flex justify-center md:justify-start items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="#000000" viewBox="0 0 256 256">
                        <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path>
                    </svg>
                    <div className="text-2xl font-bold">
                        BRAIN
                    </div>
                </div>

                {/* NAVIGASI */}
                <div className="col-span-1 md:col-span-3 flex flex-col md:flex-row gap-5 justify-center items-center w-full text-xs lg:text-base ">
                    <Link className="font-medium px-2 py-1 hover:underline hover:rounded" href={"#beranda"}>Beranda</Link>
                    <Link className="font-medium px-2 py-1 hover:underline hover:rounded" href={"#tentang-section"}>Tentang</Link>
                    <Link className="font-medium px-2 py-1 hover:underline hover:rounded" href={"#cara-melapor-section"}>Cara Melapor</Link>
                    <Link className="font-medium px-2 py-1 hover:underline hover:rounded" href={"#peta-persebaran-section"}>Peta Persebaran</Link>
                    <Link className="font-medium px-2 py-1 hover:underline hover:rounded" href={"#statistik-section"}>Statistik</Link>
                </div>
                
                {/* 4 ICON FOOTER KONTAK */}
                <div className="col-span-1 flex items-center justify-center md:justify-end gap-2">
                    <IconFoot icon={
                        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="#1154ED" viewBox="0 0 256 256">
                            <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"></path>
                        </svg>
                    }></IconFoot>
                    <IconFoot icon={
                        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="#1154ED" viewBox="0 0 256 256">
                            <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z">
                            </path>
                        </svg>
                    }></IconFoot>
                    <IconFoot icon={
                        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="#1154ED" viewBox="0 0 256 256">
                            <path d="M214.75,211.71l-62.6-98.38,61.77-67.95a8,8,0,0,0-11.84-10.76L143.24,99.34,102.75,35.71A8,8,0,0,0,96,32H48a8,8,0,0,0-6.75,12.3l62.6,98.37-61.77,68a8,8,0,1,0,11.84,10.76l58.84-64.72,40.49,63.63A8,8,0,0,0,160,224h48a8,8,0,0,0,6.75-12.29ZM164.39,208,62.57,48h29L193.43,208Z">     
                            </path>
                        </svg>
                    }></IconFoot>
                    <IconFoot icon={
                        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="#1154ED" viewBox="0 0 256 256">
                            <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48Zm-96,85.15L52.57,64H203.43ZM98.71,128,40,181.81V74.19Zm11.84,10.85,12,11.05a8,8,0,0,0,10.82,0l12-11.05,58,53.15H52.57ZM157.29,128,216,74.18V181.82Z">
                            </path>
                        </svg>
                    }></IconFoot>
                </div>

                {/* COPYRIGHT */}
                <div className="text-base text-center col-span-1 md:col-span-5 pt-8">
                    © 2023 BRAIN. All Rights Reserved.
                </div>
            </div>
        </footer>
    )
}

const IconFoot = ({icon}: any) => {
    return (
        <div className="bg-[#DBEAFE] w-8 h-8 rounded-full place-items-center place-content-center p-1">
            {icon}
        </div>
    )
}

export default Footer;