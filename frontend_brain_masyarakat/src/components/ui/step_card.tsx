interface items{
    icon: any;
    judul: string;
    deskripsi: string;
}

const StepCards: React.FC<items> = ({icon, judul, deskripsi}) => {
    return (
        <div className="col-span-1">
            <div className="flex items-center p-6 border border-slate-200 hover:border-blue-600 rounded-2xl gap-4 [&_svg]:pointer-events-none [&_svg:not([class*='text-'])]:text-blue-600">
                <div className="bg-blue-200 p-4 rounded-full">
                    {icon}
                </div>
                <div className="text-black">
                    <p className="text-2xl font-medium">{judul}</p>
                    <p className="text-sm">{deskripsi}</p>
                </div>
            </div>
        </div>
    )
}

const CardData = () => {
    const data = [
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M168,152a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,152Zm-8-40H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm56-64V216a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V48A16,16,0,0,1,56,32H92.26a47.92,47.92,0,0,1,71.48,0H200A16,16,0,0,1,216,48ZM96,64h64a32,32,0,0,0-64,0ZM200,48H173.25A47.93,47.93,0,0,1,176,64v8a8,8,0,0,1-8,8H88a8,8,0,0,1-8-8V64a47.93,47.93,0,0,1,2.75-16H56V216H200Z"></path></svg>,
            judul: "Isi Form",
            deskripsi: "Masukkan judul, jenis, dan deskripsi pengaduan"
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,16V152h-28.7A15.86,15.86,0,0,0,168,156.69L148.69,176H107.31L88,156.69A15.86,15.86,0,0,0,76.69,152H48V48Zm0,160H48V168H76.69L96,187.31A15.86,15.86,0,0,0,107.31,192h41.38A15.86,15.86,0,0,0,160,187.31L179.31,168H208v40ZM90.34,109.66a8,8,0,0,1,0-11.32l32-32a8,8,0,0,1,11.32,0l32,32a8,8,0,0,1-11.32,11.32L136,91.31V152a8,8,0,0,1-16,0V91.31l-18.34,18.35A8,8,0,0,1,90.34,109.66Z"></path></svg>,
            judul: "Upload Foto",
            deskripsi: "Tambahkan gambar bukti dan pilih kondisi cuaca."
        },
        {
            icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 256 256"><path d="M227.32,28.68a16,16,0,0,0-15.66-4.08l-.15,0L19.57,82.84a16,16,0,0,0-2.49,29.8L102,154l41.3,84.87A15.86,15.86,0,0,0,157.74,248q.69,0,1.38-.06a15.88,15.88,0,0,0,14-11.51l58.2-191.94c0-.05,0-.1,0-.15A16,16,0,0,0,227.32,28.68ZM157.83,231.85l-.05.14,0-.07-40.06-82.3,48-48a8,8,0,0,0-11.31-11.31l-48,48L24.08,98.25l-.07,0,.14,0L216,40Z"></path></svg>,
            judul: "Kirim Laporan",
            deskripsi: `Tentukan lokasi, lalu klik "Kirim"`
        }
    ]
    return (
        <>
            {
                data.map((step, index) => 
                    <StepCards
                        key={index}
                        icon={step.icon}
                        judul={step.judul}
                        deskripsi={step.deskripsi}
                    />
                )
            }
        </>
    )
}

export default CardData;