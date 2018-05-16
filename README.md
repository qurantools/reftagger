# Verse Reference

Verse Reference, yazınızdaki Kur'an ayet referansınıza otomatik link eklemeyi ve link üzerine gelince
 açılır pencerede ile ilgili ayet(ler)e dair meallerin görünmesini sağlar. Bu sayede referanslara tek tek link ekleme ve
 bu linkleri açılır pencerede gösterme gibi zahmetli bir işten kurtulmuş olacksınız. 
 Üstelik bu özelliği edinmek çok kolay: aşağıda verdiğimiz kod parçasını sisteminize entegre etmek. Kullanımı da 
 oldukça kolay. Geniş referans sözcük dağarcığı ile ile Kur'an ayetlerine referans vererek ayetlere dair meallere 
 anında ulaşarak Kur'an çalışmalarınızı hiç olmadığı kadar zevkli hale getirebilirsiniz. Referans Ayet 
 üzerine gelince otomatik olarak açılan açılır pencere ile meal bilgisi görüyor olacaksınız.
 Aynı zamanda açılır penceredeki meal seçimi bölümü ile Ayet(ler)e dair meal bilgisini farklı mealler üzerinden de
  inceleyebiliyor olacaksınız.

## Verse Reference Kullanımı
Verse Reference ile 3 şekilde referans vermeniz mümkün. Bunları 3 kategori altında inceledik.

Not: Ağağıdaki ifadelerde Sure_no 1-114 arası Sure numarasını, Ayet_no ise ilgili Surenin ayet numarası 
ifade etmektedir. Ayet_no için değişik alternatifler mevcut: Tek bir sayı ile, virgülle ayrılmış sayılar ile
ya da tire ile ayrılmış sayılar ile Ayet_no gösterimini yapabilirsiniz. Örneklerde durum daha net anlaşılacaktır.

#### 1.  (Kur'an|Kuran|Quran|Qur'an|Koran) Sure_no:Ayet_no

Kur'an 2:123          //Kur'an 2. Sure 123. Ayeti temsil etmekte

Kur'an 2:123,124      //Kur'an 2. Sure 123 ve 124. Ayetleri temsil etmekte (virgül ',' tek tek ayetleri belirtmek için)

Kur'an 2:123-127      //Kur'an 2. Sure 123,124,125,126 ve 127. Ayetleri temsil etmekte (tire '-' ayet grubu aralığındaki tüm ayetleri ifade etmek için)

Kur'an 2:123,129-131  //Kur'an 2. Sure 123,129,130 ve 131. Ayetleri temsil etmekte

Benzer kullanım Quran, Qur'an, Koran, ve Kuran için başlayan ifadeler için de geçerli

#### 2.  Sure_Adı (Suresi) Ayet_no(. Ayet) 

Fatiha 1,2,5-7         //Fatiha Suresi 1,2,5,6 ve 7 Ayetlerini temsil eder

Bakara 123             //Bakara Suresi 123. Ayeti temsil eder 

Bakara 123,124         //Bakara Suresi 123 ve 124. Ayetleri temsil eder 

Bakara 123-127         //Bakara Suresi 123,124,125,126 ve 127. Ayetleri temsil eder 

Bakara 123,129-131     //Bakara Suresi 123,129,130 ve 131. Ayetleri temsil eder  

Bakara Suresi 7. Ayet  //"Suresi" and ".Ayet" şeklinde sözcükler ile de kullanıabilirsiniz. Bu sözcükler seçeneğe bağlı

Bakara Suresi 2-7

Bakara 4,5-7

Bakara Suresi 4

Bakara 4. Ayet

Bakara Suresi 4. Ayet

#### 3.  Sure_no:Ayet_no

2:123          //Kur'an 2. Sure 123. Ayeti temsil etmekte

2:123,124      //Kur'an 2. Sure 123 ve 124. Ayetleri temsil etmekte (virgül ',' tek tek ayetleri belirtmek için)

2:123-127      //Kur'an 2. Sure 123,124,125,126 ve 127. Ayetleri temsil etmekte (tire '-' ayet grubu aralığındaki tüm ayetleri ifade etmek için)

2:123,129-131  //Kur'an 2. Sure 123,129,130 ve 131. Ayetleri temsil etmekte

Örnek kullanımlar için [demo](http://quran.tr.cx/verse-reference/) sayfasını inceleyiniz.

## Kurulum

Verse Referance kurulumu oldukça kolay. Aşağıdaki kodu kopyalayıp sitenizin (`</body>`) etiketi öncesinde bir yere yapıştırmanız yeterli.

```js
<script>
  var refTagger = {};

  (function(d, t) {
    var g = d.createElement(t), s = d.getElementsByTagName(t)[0];
    g.src = "http://quran.tr.cx/verse-reference/reftagger.min.js";
    s.parentNode.insertBefore(g, s);
  }(document, "script"));
</script>
```

#### Wordpress için Kurulum

Yönetici (`Admin`) Panelinden -> Görünüm (`Appearance`) -> Editör (`Editor`) yolunu takip ederek tema dosyalarından 
(theme files) `footer.php` dosyasını açarak yukarıdaki kodu (`</body>`) etiketi öncesinde yapıştırmanız gerekmekte.


#### Joomla için Kurulum

Uzantılar (`Extensions`) -> Tema Yöneticisi (`Template manager`) -> sol bölümdeki Şablonlar (`Templates`) yolunu takip ederek
aktif temayı seçiniz. Aktif temanın `index.php` dosyasını açarak yukarıdaki kodu (`</body>`) etiketi öncesinde yapıştırmanız gerekmekte.


#### Dikkat!
Açılır pencere (tooltips) gösterimi için tippy.js kütüphanesi kullanılmıştır. Eğer sisteminizde hali hazırda bu kütüphane yüklü ise 
birtakım çakışmalar söz konusu olabilir. Bu konuda bizi bilgilendiriniz.
