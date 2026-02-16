# TikTok Live Library Karşılaştırma Raporu (Tech Validation)

**Researcher Notu:** TikTok'un resmi bir API'si olmadığı için tüm kütüphaneler Webcast push servisini reverse-engineer ederek çalışır. İşte en popüler seçeneklerin analizi:

| Kriter | `tiktok-live-connector` (Node.js) | `TikTokLive` (Python) | `gotiktoklive` (Go) |
| :--- | :--- | :--- | :--- |
| **Bağlantı Kararlılığı** | Yüksek (Orijinal repo) | Çok Yüksek | Orta |
| **Topluluk Desteği** | En Geniş (Starter proje) | Geniş | Dar |
| **Güncellik** | Aktif | Çok Aktif | Seyrek |
| **Kurulum Kolaylığı** | Çok Kolay (npm) | Kolay (pip) | Orta (Go setup gerektirir) |
| **Ekstra Özellikler** | Chat yazma (riskli) | Gelişmiş event handling, Proxy desteği | Stream indirme özelliği |

### Sonuç ve Seçim
Projemiz için **`tiktok-live-connector` (Node.js)** seçimine devam edilmiştir. 

**Nedenleri:**
1.  **Ekosistem Uyumu:** Next.js (Node.js tabanlı) kullanacağımız için proxy server'ı aynı dilde yazmak karmaşıklığı azaltır.
2.  **Hız:** Webcast verilerini decode etme hızı Node.js event-loop yapısında oldukça performanslıdır.
3.  **Örnek Kaynaklar:** Diğer kütüphaneler zaten bu kütüphanenin mantığını referans alır.

---

### Unknown Gift Handler Stratejisi
Backend ekibimiz, hediye event'ini yakalarken şu mantığı uygulayacak:

```javascript
/* MANTIK TASLAĞI */
if (!giftDatabase.contains(incomingGiftId)) {
    logUnknownGift(incomingGiftId, incomingGiftName, coins); // Admin Paneline Düşür
    processAsGenericGift(incomingGiftId, coins); // Sistemin durmasını engelle, sadece coin işle
}
```
