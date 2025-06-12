import Image from "next/image";

const About = () => {
    return (
        <>
            <h1 className="text-3xl font-semibold mb-2 md:hidden">BRAIN</h1>
            <div className="flex flex-col-reverse md:flex-row w-full justify-between items-center">
                <div className="md:max-w-xs lg:max-w-md w-full">
                    <h1 className="text-3xl font-semibold mb-2 hidden md:block md:text-3xl lg:text-5xl">BRAIN</h1>
                    <p className="text-[10px] md:text-xs lg:text-sm">Platform pelaporan kerusakan infrastruktur jalan yang memudahkan masyarakat Kota Batam untuk menyampaikan kondisi jalan secara 
                        real-time. Dilengkapi dengan sistem rekomendasi, platform ini membantu mempercepat penanganan kerusakan infrastruktur jalan.</p>
                </div>
                <div>
                    <Image
                        className="size-48 md:size-64 lg:size-96"
                        src="/image/插图.png"
                        width={475}
                        height={475}
                        alt="ilustrasi aplikasi"
                    />
                </div>
            </div>
        </>
    )
}

export default About;