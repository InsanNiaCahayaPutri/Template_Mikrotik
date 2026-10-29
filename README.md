# INSANMOY CONNECT — Template Login MikroTik HotSpot

Kumpulan template halaman login captive portal MikroTik HotSpot dengan tampilan responsif untuk desktop dan ponsel. Setiap versi berada di folder terpisah agar mudah dipilih dan dikembangkan.

## Pilihan template

| Folder | Gaya tampilan |
| --- | --- |
| `template1` | Nuansa laut Karimunjawa dengan foto udara dan card login biru laut. |
| `template2` | Ilustrasi pantai pastel dengan card warna pasir dan aksen jingga. |
| `template3` | Ilustrasi awan, pelangi, bunga, dan bintang dengan card pink-lavender. |
| `template4` | Gaya baddie bernuansa gelap dengan motif kilau dan aksen hot pink. |

## Fitur

- Tampilan responsif untuk layar desktop dan ponsel.
- Pilihan login **Voucher** atau **Member**.
- Tampilkan/sembunyikan password.
- Area pesan error memakai variabel HotSpot RouterOS.
- Halaman status dan logout.
- Dukungan HTTP-CHAP melalui `md5.js`.
- Ilustrasi dan stylesheet lokal; tidak memakai CDN.

## Pratinjau di komputer

Buka `index.html` di salah satu folder template menggunakan browser atau VS Code. Untuk mencoba simulasi, isi form lalu pilih **Hubungkan**. Halaman lokal hanya menampilkan simulasi koneksi; username dan password tidak diverifikasi oleh router.

## Menggunakan di MikroTik

1. Pilih satu folder template.
2. Buat cadangan folder HotSpot yang sedang digunakan di router.
3. Salin isi folder template ke direktori HTML HotSpot yang dipakai profil server. Salin file di dalam foldernya, bukan folder template sebagai satu folder bersarang.
4. Pastikan `login.html`, `status.html`, `logout.html`, `style.css`, `script.js`, `md5.js`, dan file wallpaper dari template pilihan tersalin bersama.
5. Pertahankan file HotSpot bawaan lain yang tidak disertakan di repositori ini. RouterOS dapat memakai halaman tambahan seperti `redirect.html`, `alogin.html`, dan `errors.txt`.
6. Arahkan profil HotSpot ke direktori HTML yang dipilih, lalu uji melalui perangkat yang tersambung ke jaringan HotSpot.

`index.html` disediakan sebagai alias untuk pratinjau browser. Halaman login yang dipakai HotSpot adalah `login.html`. Jangan menghapus `md5.js` jika metode HTTP-CHAP digunakan. Variabel seperti `$(link-login-only)`, `$(username)`, dan `$(error)` harus tetap utuh agar diproses oleh RouterOS.

> Sebelum mengganti halaman di router, simpan salinan folder HotSpot lama. Konfigurasi dan hasil akhir dapat berbeda menurut versi RouterOS serta profil HotSpot yang digunakan.

## Kredit wallpaper

- `template1`: lihat `template1/IMAGE_CREDIT.txt` untuk sumber foto dan lisensinya.
- `template2`, `template3`, dan `template4`: ilustrasi SVG dibuat khusus untuk masing-masing template. File `IMAGE_CREDIT.txt` di setiap folder mencatat keterangannya.

## Referensi

- [MikroTik RouterOS — HotSpot Customisation](https://help.mikrotik.com/docs/spaces/ROS/pages/87162881/Hotspot%2Bcustomisation)
- [MikroTik RouterOS — HotSpot Captive Portal](https://help.mikrotik.com/docs/spaces/ROS/pages/56459266/HotSpot%2B-%2BCaptive%2Bportal)
