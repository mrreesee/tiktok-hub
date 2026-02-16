# TikTok Agency Gamification Hub - PRD

## Proje Amacı
TikTok yayıncılarının verilerini takip ettiği, oyunlaştırılmış bir ajans yönetim paneli sunmak.

## Fonksiyonel Gereksinimler
1. **Auth:** Admin tarafından manuel kayıt, kullanıcı adı + şifre girişi.
2. **TikTok Entegrasyonu:** `tiktok-live-connector` ile canlı yayın verilerine erişim.
3. **Veri Takibi:** Sohbet, Jeton, Beğeni, Paylaşımların anlık kaydı.
4. **Gamification:**
   - 1 Jeton = 1 Puan.
   - Reward Store: Puan karşılığı hediye talebi.
5. **Yayıncı Dashboard:** Anlık analizler, grafikler, canlı sohbet, kazanç hesabı.
6. **Admin Dashboard:** Çoklu yayıncı izleme, raporlar, kullanıcı yönetimi.
7. **Leaderboard:** Haftalık/Aylık sıralama (Algoritma: Beğeni + Yorum + Jeton + Süre).
8. **Bonuslar:** 1.ye özel ek puanlar.

## Teknik ve Tasarım Gereksinimleri
- **Mimari:** Next.js + Supabase + Tailwind (Kolay bakım, enterprise kalite).
- **UI/UX:** Modern, rounded-xl, Soft Blue/Teal tonları, samimi Türkçe dil kullanımı.
- **SEO:** Meta etiketleri ve optimize yapı.
