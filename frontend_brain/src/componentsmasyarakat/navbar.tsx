import { Button } from "@/componentsmasyarakat/ui/button"
import Link from "next/link"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/componentsmasyarakat/ui/dropdown"

interface iconProps {
    icon: any
}

const Navbar = () => {
    return (
        <nav className="flex w-full h-14 px-4 md:px-6 sticky top-0 text-black justify-between items-center bg-white z-50">
            <div className="flex">
                <a className="font-semibold" href="">BRAIN</a>
            </div>
            <div className="hidden lg:flex lg:gap-x-4">
                <div className="flex gap-x-4 text-sm items-center">    
                    <Link className="font-medium px-2 py-1 hover:bg-gray-100 hover:rounded" href={"#beranda"}>Beranda</Link>
                    <Link className="font-medium px-2 py-1 hover:bg-gray-100 hover:rounded" href={"#about-section"}>Tentang</Link>
                    <Link className="font-medium px-2 py-1 hover:bg-gray-100 hover:rounded" href={"#cara-melapor-section"}>Cara Melapor</Link>
                    <Link className="font-medium px-2 py-1 hover:bg-gray-100 hover:rounded" href={"#peta-persebaran-section"}>Peta Persebaran</Link>
                    <Link className="font-medium px-2 py-1 hover:bg-gray-100 hover:rounded" href={"#statistik-section"}>Statistik</Link>
                    <Link className="font-medium px-2 py-1 hover:bg-gray-100 hover:rounded" href={"#laporan-section"}>Laporan</Link>
                    <Link className="font-medium px-2 py-1 hover:bg-gray-100 hover:rounded" href={"#rekomendasi-section"}>Rekomendasi</Link>
                </div>
                <div>
                    <Button className="bg-blue-500 hover:bg-blue-600 rounded-full">Login</Button>
                </div>
            </div>
            <div className="block lg:hidden">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path></svg>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            <Link className="text-sm px-2 py-1 hover:bg-gray-100 hover:rounded" href={"#beranda"}>Beranda</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link className="text-sm px-2 py-1 hover:bg-gray-100 hover:rounded" href={"#tentang-section"}>Tentang</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link className="text-sm px-2 py-1 hover:bg-gray-100 hover:rounded" href={"#cara-melapor-section"}>Cara Melapor</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link className="text-sm px-2 py-1 hover:bg-gray-100 hover:rounded" href={"#peta-persebaran-section"}>Peta Persebaran</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link className="text-sm px-2 py-1 hover:bg-gray-100 hover:rounded" href={"#statistik-section"}>Statistik</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link className="text-sm px-2 py-1 hover:bg-gray-100 hover:rounded" href={"#laporan-section"}>Laporan</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link className="text-sm px-2 py-1 hover:bg-gray-100 hover:rounded" href={"#rekomendasi-section"}>Rekomendasi</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>
            </div>
        </nav>
    )
}


export default Navbar;