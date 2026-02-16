# Proje Uygulama Planı (Project Startup Report)

**Team Lead Özeti:** Takımı topladım. TikTok Agency Gamification Hub için teknik ve tasarımsal yol haritamızı aşağıda tartışarak netleştirdik.

---

### 1. Teknik Stack Önerisi
**Karar:** `Next.js (App Router)` + `Supabase` + `Tailwind CSS` + `tiktok-live-connector` (Node.js Proxy).

- **Neden Next.js?** Hem Frontend hem de basit API route'lar için ideal. SEO ve hız avantajı yüksek.
- **Neden Supabase?** Auth, Realtime DB ve Edge Functions entegrasyonu "Tek Kişilik Dev Kadro" için en hızlı çözüm.
- **Neden Proxy?** `tiktok-live-connector` Node.js tabanlıdır ve tarayıcıdan direkt bağlantıda CORS/güvenlik kısıtlamalarına takılır. Küçük bir Node.js servisi veya Next.js API route (edge izin verirse) üzerinden WebSocket köprüsü kuracağız.

---

### 2. Eksik Gedik Analizi (Gap Analysis)
- **CORS & Socket Sorunu:** Client-side direkt TikTok'a bağlanamaz. Ara bir "Live Connector Proxy" kurmamız şart. Backend ajanımız bu konuda bir WebSocket gateway planlıyor.
- **Admin Kayıt Akışı:** Admin, yayıncıyı kaydederken TikTok kullanıcı adını girmeli. Ancak sadece kullanıcı adı yetmez, TikTok ID'sini de (secUid vb.) cache'lemeliyiz ki bağlantı stabil olsun.
- **Puan Geçmişi:** Puanlar sadece "toplam" olarak tutulmamalı, her coin/beğeni bir `Transaction` olarak kaydedilmeli ki geriye dönük denetim yapılabilsin.

---

### 3. Veritabanı Şeması Taslağı
**Backend Ajanı Önerisi:**
- **Users:** `id, username, password_hash, role (admin/streamer), tiktok_handle, total_points, avatar_url`
- **Streams:** `id, user_id, start_time, end_time, total_coins, total_likes`
- **Transactions:** `id, user_id, amount, type (coin, like, bonus, purchase), description, created_at`
- **Rewards:** `id, title, cost, stock_count, image_url`

---

### 4. Güvenlik Riski & Çözümler
**Data Analyst & Backend Tartışması:**
- **Risk:** Kullanıcıların tarayıcı üzerinden "Puan Ekle" isteği simüle etmesi.
- **Çözüm:** Puan hesaplama ASLA client-side'da yapılmayacak. `tiktok-live-connector` verisi sunucu tarafında (Proxy) işlenecek ve doğrudan veritabanına sadece sunucu yetkisiyle yazılacak. Client sadece "read-only" görecek.

---

### 5. Onay İsteği
"Projeye başlamak için bu mimari uygun mu? Özellikle Node.js Proxy gereksinimi sizin için uygun mudur? Eklemek veya çıkarmak istediğiniz bir özellik var mı?"

**Takım Durumu:**
- **Designer:** Tasarımlar için Soft Blue paletini hazırladı.
- **Frontend:** Next.js boilerplate için hazır.
- **Backend:** Supabase şeması üzerinde çalışmaya başlayabilir.

Onayınızı bekliyoruz. 🤖
