import LaporForm from "@/components/lapor/formlapor";

const FormPage = () => {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-xl flex-col gap-1 text-center">
        <h1 className="text-2xl font-semibold">Buat Laporan Sekarang</h1>
        <p className="text-xs">
          Laporkan kerusakan infrastruktur di Batam dengan mengisi detail dan
          unggah foto atau video pendukung.
        </p>
      </div>
      <div className="flex w-full flex-col gap-1 text-center">
        <LaporForm />
      </div>
    </div>
  );
};

export default FormPage;
