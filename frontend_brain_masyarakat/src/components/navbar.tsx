import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import Link from "next/link"

interface iconProps {
    icon: any
}

const Navbar = () => {
    return (
        <nav className="flex w-full h-14 px-6 sticky top-0 text-black justify-between items-center bg-white z-50">
            <div className="flex">
                <a className="font-semibold" href="">BRAIN</a>
            </div>
            <div className="hidden md:flex md:gap-x-4">
                <div className="flex gap-x-4 items-center">    
                    <Link className="text-sm font-medium px-2 py-1 hover:bg-gray-100 hover:rounded" href={"#beranda"}>Beranda</Link>
                    <Link className="text-sm font-medium px-2 py-1 hover:bg-gray-100 hover:rounded" href={"#tentang-section"}>Tentang</Link>
                    <Link className="text-sm font-medium px-2 py-1 hover:bg-gray-100 hover:rounded" href={"#cara-melapor-section"}>Cara Melapor</Link>
                    <Link className="text-sm font-medium px-2 py-1 hover:bg-gray-100 hover:rounded" href={"#peta-persebaran-section"}>Peta Persebaran</Link>
                    <Link className="text-sm font-medium px-2 py-1 hover:bg-gray-100 hover:rounded" href={"#statistik-section"}>Statistik</Link>
                    <Link className="text-sm font-medium px-2 py-1 hover:bg-gray-100 hover:rounded" href={"#laporan-section"}>Laporan</Link>
                    <Link className="text-sm font-medium px-2 py-1 hover:bg-gray-100 hover:rounded" href={"#rekomendasi-section"}>Rekomendasi</Link>
                </div>
                <div>
                    <Button className="rounded-full me-2" variant={"outline"}>Login</Button>
                    <Button className="bg-blue-500 hover:bg-blue-600 rounded-full">Daftar</Button>
                </div>
            </div>
            <div className="block md:hidden">
                <Drawer>
                    <DrawerTrigger>Open</DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                        <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                        <DrawerDescription>This action cannot be undone.</DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter>
                        <Button>Submit</Button>
                        <DrawerClose>
                            <Button variant="outline">Cancel</Button>
                        </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                    </Drawer>

            </div>
        </nav>
    )
}


export default Navbar;