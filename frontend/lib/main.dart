import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Halaman Profil saya ini',
      theme: ThemeData(
        scaffoldBackgroundColor: const Color(0xFFA5D6A7), // Background layar: Hijau Pastel Soft
      ),
      home: const ProfilePage(),
    );
  }
}

class ProfilePage extends StatelessWidget {
  const ProfilePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Halaman profil saya ini',
          style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
        ),
        backgroundColor: Colors.indigo, // Warna AppBar: Nila / Indigo
        centerTitle: true,
      ),
      body: Center(
        child: Container(
          decoration: BoxDecoration(
            color: const Color(0xFFFFF8E1), // Background Card: Kuning Cream Soft
            borderRadius: BorderRadius.circular(16),
            border: Border.all(color: Colors.amber, width: 3), // Border Card: Kuning Amber
            boxShadow: const [
              BoxShadow(
                color: Colors.black25,
                blurRadius: 10,
                offset: Offset(0, 4),
              ),
            ],
          ),
          margin: const EdgeInsets.all(24),
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: [
                // Foto Profil dengan ring border warna terpisah
                const CircleAvatar(
                  radius: 48,
                  backgroundColor: Colors.deepOrange, // Border foto: Oranye
                  child: CircleAvatar(
                    radius: 45,
                    backgroundImage: AssetImage("assets/basnya.jpg"),
                  ),
                ),
                const SizedBox(height: 12),

                // Nama Profil
                const Text(
                  'jamal',
                  style: TextStyle(
                    fontSize: 22,
                    fontWeight: FontWeight.bold,
                    color: Colors.teal, // Warna Nama: Teal
                  ),
                ),

                // Subtitle / Jabatan
                const Text(
                  'Flutter Developer',
                  style: TextStyle(
                    fontSize: 14,
                    color: Colors.purple, // Warna Text Jabatan: Ungu
                    fontWeight: FontWeight.w600,
                  ),
                ),
                const SizedBox(height: 12),

                // Baris Lokasi
                const Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(Icons.location_on, size: 18, color: Colors.red), // Icon: Merah
                    SizedBox(width: 6),
                    Text(
                      'orang jawa aseli',
                      style: TextStyle(color: Colors.brown), // Text: Cokelat
                    ),
                  ],
                ),
                const SizedBox(height: 6),

                // Baris Email
                const Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(Icons.email, size: 18, color: Colors.blue), // Icon: Biru
                    SizedBox(width: 6),
                    Text(
                      'jamal@email.com',
                      style: TextStyle(color: Colors.blueGrey), // Text: Blue Grey
                    ),
                  ],
                ),
                const SizedBox(height: 16),

                // Tombol Hubungi Saya
                ElevatedButton(
                  onPressed: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Menghubungi...')),
                    );
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.pink, // Background Tombol: Pink
                    foregroundColor: Colors.white, // Text Tombol: Putih
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20),
                    ),
                    padding: const EdgeInsets.symmetric(
                      horizontal: 24,
                      vertical: 10,
                    ),
                  ),
                  child: const Text('Hubungi Saya'),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}