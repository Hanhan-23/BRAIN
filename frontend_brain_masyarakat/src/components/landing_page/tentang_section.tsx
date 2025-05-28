import Image from "next/image";

const About = () => {
    return (
        <div className="flex w-full justify-between items-center" id="tentang-section">
            <div className="max-w-xl w-full">
                <h1 className="text-5xl font-semibold mb-2">BRAIN</h1>
                <p className="text-sm">Platform pelaporan kerusakan infrastruktur jalan yang memudahkan masyarakat Kota Batam untuk menyampaikan kondisi jalan secara 
                    real-time. Dilengkapi dengan sistem rekomendasi, platform ini membantu mempercepat penanganan kerusakan infrastruktur jalan.</p>
            </div>
            <div>
                <Image
                    src="/image/插图.png"
                    width={475}
                    height={475}
                    alt="ilustrasi aplikasi"
                />
            </div>
        </div>
    )
}

export default About;