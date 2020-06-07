# Šachy
## Zprovoznění
**Pro zprovoznění je potřeba:**
- Stáhnout nebo naklonovat repozitář do počítače
- Otevřít soubor **runServer.bat**
- Přejít na prohlížeč na stránku **http://localhost:8080/**
## O hře
### Herní systém
Jde o klasické šachy. Hra je navržena jako hráč proti hráči (na jednom PC).
Způsob ovládání je pomocí **Drag And Drop** figurky.
Při držení figurky myší se barevně zvýrázní pole (žlutě), na které může figurka jít v aktuálním tahu.
Pokud uživatel figurku pustí na poli, kam nemůže jít, pak je figurka vrácena zpět na původní místo. Figurka nemusí být přímo ve středu pole, je zde nastavena nějaká míra nepřesnosti, hra se sama postará o "zachycení" na správné pole.
Nad herním plátnem je základní informace, kdo je zrovna na tahu. Popřípadě pokud je hráč v šachu, pak je zde tato informace taky vyobrazena.
### Šach / šach mat
Pokud hráč dostal šach či šach mat, je to zobrazeno nad plátnem v textu.
Tým, který je pod útokem bude mít následně vyfiltrované tahy jen na ty, které mohou šach "ukončit".
### Proměna
Pokud se hráč dostane s pěšákem na konec šachovnice, je mu umožněna takzvaná "Proměna".  To znamená, že si může pěsce vyměnit permanentně za jinou, silnější figurku.
Po zahrání tohoto tahu pěscem vyskočí modální okno, které dá na výběr cílovou figurku proměny.
## Dokumentace
### Engine
Pro hru nebyl využit žádný framework, ale čistě canvas.
Využit byl OOP návrh, kde je hra rozdělena na více částí.
-** Game **
Třída hry, která v sobě uchovává následující části.
Může je řadit sestupně i vzestupně (v tom se potom odvíjí viditelnost na plátně)
- **Layer**
Vykreslování je rozděleno na vrstvy. Podle nich určujeme, které části vykreslovacích prvků jsem v pozadí, či popředí. Můžeme jimi manipulovat a editovat je přes Game část.
- **Component**
Zde jsou konkrétní útvary pro vykreslovaní (čtverce, elipsy, obrázky, ...)
Ty jsou ukládány do daných vrstev, se kterými dále pracuje hra.
Každá komponenta má akce, na kliknutí, na drag and drop, atd..  Způsob implementace je ten, že konkrétnímu potomkovi (implementaci komponenty) tzn. injektneme danou metodu s logikou.
- **Component connector**
Dopomocná část, která je určena pro spojení více komponent v jednu.
To se může hodit při akcích na komponenty, jako například při kliknutí, přejetí myši atd..
Nemusíme opisovat stejnou část kódu vícekrát pro tu samou činnost.
- **Render Manager**
Zde se děje veškerá logika vykreslování v Canvasu. Refreshování snímků a akcí.