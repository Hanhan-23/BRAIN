import CardData from "../ui/step_card";
import { Button } from "../ui/button";

const HowtoReports = () => {
    return  (
        <div className="flex flex-col items-center text-black gap-y-16 py-16" id="cara-melapor-section">
            <div className="text-center">
                <p className="text-5xl font-semibold mb-4">Bagaimana Cara Melapor ?</p>
                <p className="text-base">Ikuti panduan singkat berikut untuk mengirimkan laporan kerusakan jalan dengan cepat dan akurat.</p>
            </div>
            <div className="grid grid-cols-3 gap-x-4">
                <CardData />
            </div>
            <div >
                <Button className="bg-blue-600 hover:bg-blue-700 rounded-full">
                    Mulai Lapor
                </Button>
            </div>
        </div>
    )
}

export default HowtoReports;