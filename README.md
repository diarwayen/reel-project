# Proje Kurulumu ve Çalıştırılması

Bu projeyi Github'dan klonladıktan sonra çalıştırmak için aşağıdaki adımları izleyin:

## 1. Bağımlılıkların Kurulumu
npm install

## 2. Geliştirme Sunucusunu Başlatma
npm run dev

Bu komut ile uygulama yerel geliştirme sunucusunda çalışacaktır. Terminalde çıkan adresi tarayıcınızda açarak projeyi görüntüleyebilirsiniz.

## 3. .gitignore Hakkında

Aşağıdaki dosya ve klasörler versiyon kontrolüne dahil edilmez:
- `node_modules/` : Yüklenen bağımlılıklar (npm install ile tekrar oluşturulur)
- `.next/` : Next.js derleme çıktıları
- `dist/` ve `dist-ssr/` : Derleme çıktıları
- `.env` : Ortam değişkenleri (gizli anahtarlar vs.)
- `package-lock.json` : Bağımlılıkların tam sürüm kilidi (herkesin kendi ortamında oluşur)

Kaynak kodu ve yapılandırma dosyaları dışında kalan bu dosyalar, projenin çalışması için gerekli değildir ve her geliştirici kendi ortamında oluşturabilir.
