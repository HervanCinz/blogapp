import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS so Flutter Web on any localhost port can fetch from backend
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Toko & Blog API Server",
    status: "online",
    endpoints: {
      rekomendasi: "/api/rekomendasi",
      about: "/api/about",
      products: "/api/products",
      health: "/api/health"
    }
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API Rekomendasi (from Rekomedasi.json)
app.get("/api/rekomendasi", (req, res) => {
  try {
    const jsonPath = path.resolve(__dirname, "../../Rekomedasi.json");
    if (fs.existsSync(jsonPath)) {
      const data = fs.readFileSync(jsonPath, "utf-8");
      return res.json(JSON.parse(data));
    }
    // Fallback if file not found
    res.json([
      { id: 1, title: "Data Science Modern", teks: "Panduan lengkap data science", gambar: "https://picsum.photos/400/250?1" },
      { id: 2, title: "Mobile Flutter Web", teks: "Membangun aplikasi responsif", gambar: "https://picsum.photos/400/250?2" },
      { id: 3, title: "UI/UX Aesthetic", teks: "Desain visual menarik dan modern", gambar: "https://picsum.photos/400/250?3" }
    ]);
  } catch (error) {
    res.status(500).json({ error: "Gagal membaca data rekomendasi" });
  }
});

// API About (Christy JKT48 profile data matching design)
app.get("/api/about", (req, res) => {
  res.json({
    name: "Angelina CHRISTY",
    kanji: "クリスティ",
    stageName: "Christy JKT48",
    generation: "Generasi ke-7 JKT48",
    introDate: "September 29, 2018",
    bio: "Angelina Christy, known as Christy JKT48, is a singer from Indonesia who is a member of the idol group JKT48. He is a member of the seventh generation of JKT48 which was introduced on September 29 2018.",
    avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Angelina_Christy_at_JKT48_Showroom.jpg/640px-Angelina_Christy_at_JKT48_Showroom.jpg",
    tags: ["FEEDS", "STORIES", "TYPOGRAPHY", "DESIGN", "UI"],
    socials: {
      pinterest: "@dandulld",
      designer: "@bembianddy_",
      instagram: "@jkt48.christy",
      twitter: "@A_ChristyJKT48"
    }
  });
});

// API Products proxy / backup from FakeStore API
app.get("/api/products", async (req, res) => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (response.ok) {
      const data = await response.json();
      return res.json(data);
    }
    throw new Error("Gagal mengambil dari FakeStore API");
  } catch (error) {
    // Fallback sample data
    res.json([
      {
        id: 1,
        title: "Fjallraven - Foldsack No. 1 Backpack",
        price: 109.95,
        description: "Your perfect pack for everyday use and walks in the forest.",
        category: "men's clothing",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
        rating: { rate: 3.9, count: 120 }
      },
      {
        id: 2,
        title: "Mens Casual Premium Slim Fit T-Shirts",
        price: 22.3,
        description: "Slim-fitting style, contrast raglan long sleeve.",
        category: "men's clothing",
        image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png",
        rating: { rate: 4.1, count: 259 }
      }
    ]);
  }
});

app.listen(PORT, () => {
  console.log(`Server Express running on http://localhost:${PORT}`);
  console.log(`API endpoints ready:`);
  console.log(`- http://localhost:${PORT}/api/products`);
  console.log(`- http://localhost:${PORT}/api/rekomendasi`);
  console.log(`- http://localhost:${PORT}/api/about`);
});
