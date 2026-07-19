"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation"; // Gunakan next/router jika masih pakai Pages Router

// Helper functions diletakkan di luar komponen agar tidak dirender ulang
function generateUniqueId() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

async function getIP() {
  try {
    const response = await fetch("https://ipapi.co/json");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Error fetching IP data:", error);
    return {}; // Return empty object sebagai fallback jika gagal
  }
}

async function sha256(text) {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(text),
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Pastikan kode hanya berjalan di browser
    if (typeof window === "undefined") return;

    const initTracking = async () => {
      const hostname = window.location.hostname;
      const page = `${hostname}${pathname}`;

      // 1. Cek Sesi (Mencegah hit berulang di halaman yang sama)
      let findSesi = sessionStorage.getItem(page);
      if (findSesi) return;

      try {
        // 2. Dapatkan atau Buat Visitor ID
        let dataKey = await sha256(hostname);
        let visitorId = localStorage.getItem(dataKey);

        if (!visitorId) {
          visitorId = generateUniqueId();
          localStorage.setItem(dataKey, visitorId);
        }

        // 3. Kumpulkan Data Meta
        let ip = await getIP();

        // Fallback aman untuk Battery API (Safari/Firefox tidak support)
        let batteryLevel = null;
        if ("getBattery" in navigator) {
          const battery = await navigator.getBattery();
          batteryLevel = battery.level * 100;
        }

        let currentMeta = {
          userAgent: navigator.userAgent,
          vendor: navigator.vendor,
          os: navigator.platform,
          ip: ip.ip || "unknown",
          as: ip.asn || "unknown",
          isp: ip.org || "unknown",
          city: ip.city || "unknown",
          batteryLevel: batteryLevel,
        };

        // 4. Kirim Data
        await fetch("https://count.spairum.my.id/api/counter/view", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uid: visitorId,
            url: page,
            visitorInfo: currentMeta,
          }),
        });

        // 5. Simpan ke Session Storage setelah sukses
        sessionStorage.setItem(page, visitorId);
      } catch (error) {
        console.error("Tracking Error:", error);
      }
    };

    initTracking();
  }, [pathname]); // Dependency pathname membuat script jalan tiap ganti halaman

  return null; // Komponen ini tidak merender UI apapun
}
