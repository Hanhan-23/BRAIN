import { Account } from "./columns";
import { AccountsClient } from "./accounts-client";

const getData = async (): Promise<Account[]> => {
  return [
    {
      id: 1,
      username: "Farhan9098",
      email: "frhn@gmail.com",
      no_telp: "081278783322",
      alamat: "Jl. Ahmad Yani",
      jabatan: "government",
    },
    {
      id: 2,
      username: "Yuliapipka",
      email: "yulipipk@gmail.com",
      no_telp: "082134567890",
      alamat: "Jl. Sudirman No. 12",
      jabatan: "government",
    },
    {
      id: 3,
      username: "MichaelLee",
      email: "michael@email.com",
      no_telp: "081223344556",
      alamat: "Jl. Merdeka No. 45",
      jabatan: "public",
    },
    {
      id: 4,
      username: "Iskandar",
      email: "kandar@gmail.com",
      no_telp: "082199887766",
      alamat: "Jl. Kartini No. 5",
      jabatan: "government",
    },
    {
      id: 5,
      username: "BudiSantoso",
      email: "budi.santoso@yahoo.com",
      no_telp: "085611223344",
      alamat: "Jl. Imam Bonjol No. 10",
      jabatan: "public",
    },
    {
      id: 6,
      username: "AgusSaputra",
      email: "agus.saputra@email.com",
      no_telp: "081356789012",
      alamat: "Jl. Soekarno Hatta",
      jabatan: "public",
    },
    {
      id: 7,
      username: "NurAini",
      email: "nur.aini@gmail.com",
      no_telp: "082145678900",
      alamat: "Jl. Diponegoro No. 9",
      jabatan: "government",
    },
    {
      id: 8,
      username: "RizkyPratama",
      email: "rizky.pratama@hotmail.com",
      no_telp: "083812345678",
      alamat: "Jl. Pelita No. 22",
      jabatan: "public",
    },
    {
      id: 9,
      username: "LestariDewi",
      email: "lestari.dewi@email.com",
      no_telp: "082298765432",
      alamat: "Jl. Teuku Umar No. 8",
      jabatan: "government",
    },
    {
      id: 10,
      username: "YusufHidayat",
      email: "yusuf.hidayat@gmail.com",
      no_telp: "081377889900",
      alamat: "Jl. Gajah Mada No. 14",
      jabatan: "public",
    },
  ];
};

const AccountsPage = async () => {
  const data = await getData();
  return <AccountsClient data={data} />;
};

export default AccountsPage;