"use client";

import { Account } from "./columns";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const handleDeleteAccount = (id: number) => {
  console.log(`Akun dengan ID ${id} telah dihapus.`);
  // Add API call here if needed
};

export function MobileAccountCard({ account, index }: { account: Account, index: number }) {
  const bgColor = index % 2 === 0 ? 'bg-blue-100' : 'bg-white';
  const darkBgColor = index % 2 === 0 ? 'dark:bg-blue-900/20' : 'dark:bg-gray-800';

  return (
    <div className={`border rounded-lg p-4 mb-4 shadow-sm ${bgColor} ${darkBgColor}`}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium text-base">{account.username}</h3>
          <p className="text-sm text-muted-foreground">{account.email}</p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-600 hover:text-red-800 h-8 w-8 p-0"
            >
              <Trash2 className="w-4 h-4" />
              <span className="sr-only">Hapus akun</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-slate-50 border-red-100 dark:bg-slate-600 dark:border-red-50">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-red-800 dark:text-slate-100">
                Apakah Anda yakin ingin menghapus akun ini?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-slate-800 dark:text-slate-300">
                Aksi ini tidak dapat dibatalkan. Akun akan dihapus secara permanen.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-white text-black dark:text-white hover:bg-gray-200">
                Batal
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600 text-white hover:bg-red-700"
                onClick={() => handleDeleteAccount(account.id)}
              >
                Hapus Permanen
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">ID</span>
          <span>{account.id}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Nomor HP</span>
          <span>{account.no_telp}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Alamat</span>
          <span className="text-right">{account.alamat}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Jabatan</span>
          <span>{account.jabatan}</span>
        </div>
      </div>
    </div>
  );
}