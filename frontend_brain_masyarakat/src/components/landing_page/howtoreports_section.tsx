import CardData from "../ui/step_card";
import { Button } from "../ui/button";

const HowtoReports = () => {
    return  (
        <>
            <div className="max-w-md lg:max-w-2xl mx-auto text-center">
                <p className="text-3xl font-semibold mb-2 md:text-3xl lg:text-5xl">
                    <span>Bagaimana </span>
                    <span className="bg-gradient-to-r from-blue-500 to-blue-950 bg-clip-text text-transparent">
                        Cara Melapor?
                    </span>
                </p>
                <p className="max-w-sm mx-auto text-[10px] md:text-xs lg:text-sm">
                    Ikuti panduan singkat berikut untuk mengirimkan laporan kerusakan jalan dengan cepat dan akurat.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <CardData />
            </div>
            <div >
                <Button className="bg-blue-600 hover:bg-blue-700 rounded-full">
                    Mulai Lapor
                </Button>
            </div>
        </>
    )
}

export default HowtoReports;