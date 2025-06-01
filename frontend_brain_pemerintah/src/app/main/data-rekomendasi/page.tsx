import { Rekomendasi, columns } from "./columns";
import { DataTable } from "./data-table";
import { DataTableToolbar } from "./data-table-toolbar";
import { DataTableProvider } from "./data-table-context";

const getData = async (): Promise<Rekomendasi[]> => {
  const types = ["Jalan Rusak", "Jembatan Rusak", "Lampu Jalan Rusak"];

  return [
    {
      id: 1,
      rekomendasi: "Jalan berlubang besar",
      jenis_rekomendasi: types[Math.floor(Math.random() * types.length)],
      skor_urgensi: "1",
      lokasi: "32VP+R7J, Jl. Ahmad Yani, Sukajadi, Kec. Batam Kota, Kota Batam",
      status: "Menunggu pengecekan"
    },
    {
      id: 2,
      rekomendasi: "Lampu jalan mati total",
      jenis_rekomendasi: types[Math.floor(Math.random() * types.length)],
      skor_urgensi: "2",
      lokasi: "Jl. Kav. Flamboyan 2, Sungai Pelunggut, Kec. Sagulung, Kota Batam, Kepulauan Riau 29425",
      status: "Diperiksa"
    },
    {
      id: 3,
      rekomendasi: "Retakan jalan",
      jenis_rekomendasi: types[Math.floor(Math.random() * types.length)],
      skor_urgensi: "3",
      lokasi: "Tembesi, Kec. Sagulung, Kota Batam, Kepulauan Riau 29424",
      status: "Sedang diperbaiki"
    },
    {
      id: 4,
      rekomendasi: "Lampu jalan tidak menyala",
      jenis_rekomendasi: types[Math.floor(Math.random() * types.length)],
      skor_urgensi: "4",
      lokasi: "Jl. Golden Prawn 56, Tj. Buntung, Kec. Bengkong, Kota Batam, Kepulauan Riau 29444", 
      status: "Menunggu perbaikan"
    },
    {
      id: 5,
      rekomendasi: "Jalan bergelombang",
      jenis_rekomendasi: types[Math.floor(Math.random() * types.length)],
      skor_urgensi: "5",
      lokasi: "32VP+R7J, Jl. Ahmad Yani, Sukajadi, Kec. Batam Kota, Kota Batam",
      status: "Diperiksa"
    },
    {
      id: 6,
      rekomendasi: "Lampu jalan rusak",
      jenis_rekomendasi: types[Math.floor(Math.random() * types.length)],
      skor_urgensi: "6",
      lokasi: "Jl. Ahmad Yani, Tlk. Tering, Kec. Batam Kota, Kota Batam, Kepulauan Riau 29461",
      status: "Diperbaiki"
    },
  ];
};

const RecommendedPage = async () => {
  const data = await getData();
  return (
    <DataTableProvider>
      <div className="">
        <div className="mb-4 px-4 py-2 bg-red-300 rounded-md dark:bg-red-950">
          <div className="flex justify-between items-center">
            <h1 className="font-semibold">Rekomendasi Perbaikan</h1>
            <DataTableToolbar data={data} />
          </div>
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    </DataTableProvider>
  );
};

export default RecommendedPage;