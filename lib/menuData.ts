export type Locale = "es" | "en" | "it" | "de";
export type LocalizedText = Record<Locale, string>;

export interface PizzaItem {
  id: string;
  name: string;
  desc: LocalizedText;
  normal: number;
  maxi: number;
  image?: string;
  badge?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  desc: LocalizedText;
  price: number;
  image?: string;
  badge?: string;
}

/* ── Pizzas ──────────────────────────────────────────────────────────────── */
export const pizzas: PizzaItem[] = [
  {
    id: "margherita",
    name: "Margherita",
    desc: { es: "Tomate, mozzarella", en: "Tomato, mozzarella", it: "Pomodoro, mozzarella", de: "Tomate, Mozzarella" },
    normal: 6.50, maxi: 9.00,
  },
  {
    id: "cotto",
    name: "Cotto",
    desc: { es: "Jamón cocido", en: "Cooked ham", it: "Prosciutto cotto", de: "Gekochter Schinken" },
    normal: 7.90, maxi: 10.40, image: "pizza-cotto.jpg",
  },
  {
    id: "funghi",
    name: "Funghi",
    desc: { es: "Champiñones frescos", en: "Fresh mushrooms", it: "Funghi freschi", de: "Frische Champignons" },
    normal: 7.90, maxi: 10.40,
  },
  {
    id: "diavola",
    name: "Diavola",
    desc: { es: "Salami picante", en: "Spicy salami", it: "Salame piccante", de: "Scharfe Salami" },
    normal: 8.00, maxi: 10.50, image: "pizza-diavola.jpg", badge: "🌶️ Picante",
  },
  {
    id: "napoli",
    name: "Napoli",
    desc: { es: "Sardinas, orégano", en: "Sardines, oregano", it: "Sardine, origano", de: "Sardellen, Oregano" },
    normal: 7.50, maxi: 10.00,
  },
  {
    id: "hawaii",
    name: "Hawaii",
    desc: { es: "Jamón cocido, piña tropical", en: "Cooked ham, tropical pineapple", it: "Prosciutto cotto, ananas tropicale", de: "Gekochter Schinken, tropische Ananas" },
    normal: 7.90, maxi: 10.40,
  },
  {
    id: "tonno-e-cipolla",
    name: "Tonno e Cipolla",
    desc: { es: "Atún, cebolla", en: "Tuna, onion", it: "Tonno, cipolla", de: "Thunfisch, Zwiebel" },
    normal: 8.50, maxi: 11.00, image: "pizza-tuna-onion.jpg",
  },
  {
    id: "susanna",
    name: "Susanna",
    desc: { es: "Champiñones frescos, pimiento, cebolla", en: "Fresh mushrooms, pepper, onion", it: "Funghi freschi, peperone, cipolla", de: "Frische Champignons, Paprika, Zwiebel" },
    normal: 8.50, maxi: 11.00,
  },
  {
    id: "saporita",
    name: "Saporita",
    desc: { es: "Gorgonzola, salami picante", en: "Gorgonzola, spicy salami", it: "Gorgonzola, salame piccante", de: "Gorgonzola, scharfe Salami" },
    normal: 8.90, maxi: 11.40,
  },
  {
    id: "delicata",
    name: "Delicata",
    desc: { es: "Gambas, calabacín, scamorza", en: "Shrimp, zucchini, scamorza", it: "Gamberi, zucchine, scamorza", de: "Garnelen, Zucchini, Scamorza" },
    normal: 8.90, maxi: 11.40,
  },
  {
    id: "capricciosa",
    name: "Capricciosa",
    desc: { es: "Jamón cocido, aceitunas, champiñones, alcachofas", en: "Cooked ham, olives, mushrooms, artichokes", it: "Prosciutto cotto, olive, funghi, carciofi", de: "Gekochter Schinken, Oliven, Champignons, Artischocken" },
    normal: 9.00, maxi: 11.50,
  },
  {
    id: "godfather",
    name: "Godfather",
    desc: { es: "Jamón cocido, salami picante, bacon, salsa barbacoa", en: "Cooked ham, spicy salami, bacon, BBQ sauce", it: "Prosciutto cotto, salame piccante, bacon, salsa barbecue", de: "Gekochter Schinken, scharfe Salami, Speck, Barbecuesoße" },
    normal: 9.50, maxi: 12.00, image: "pizza-godfather.jpg", badge: "⭐ Popular",
  },
  {
    id: "barbacoa",
    name: "Barbacoa",
    desc: { es: "Carne picada, bacon, salsa barbacoa", en: "Minced meat, bacon, BBQ sauce", it: "Carne macinata, bacon, salsa barbecue", de: "Gehacktes Fleisch, Speck, Barbecuesoße" },
    normal: 9.00, maxi: 11.50,
  },
  {
    id: "vegetariana",
    name: "Vegetariana",
    desc: { es: "Berenjena, calabacín, rúcula", en: "Eggplant, zucchini, arugula", it: "Melanzane, zucchine, rucola", de: "Aubergine, Zucchini, Rucola" },
    normal: 8.90, maxi: 11.40, image: "pizza-vegetariana.jpg", badge: "🌿 Vegetal",
  },
  {
    id: "tricolore",
    name: "Tricolore",
    desc: { es: "Jamón serrano, tomates cherry, rúcula, parmesano", en: "Serrano ham, cherry tomatoes, arugula, parmesan", it: "Prosciutto serrano, pomodorini, rucola, parmigiano", de: "Serrano-Schinken, Cherrytomaten, Rucola, Parmesan" },
    normal: 9.50, maxi: 12.00, badge: "👨‍🍳 Chef",
  },
  {
    id: "italiana",
    name: "Italiana",
    desc: { es: "Bresaola, tomates cherry, rúcula, parmesano", en: "Bresaola, cherry tomatoes, arugula, parmesan", it: "Bresaola, pomodorini, rucola, parmigiano", de: "Bresaola, Cherrytomaten, Rucola, Parmesan" },
    normal: 9.90, maxi: 12.40, image: "pizza-italiana.jpg", badge: "👨‍🍳 Chef",
  },
  {
    id: "formaggi",
    name: "Formaggi",
    desc: { es: "Gorgonzola, brie, queso de cabra, parmesano", en: "Gorgonzola, brie, goat cheese, parmesan", it: "Gorgonzola, brie, formaggio di capra, parmigiano", de: "Gorgonzola, Brie, Ziegenkäse, Parmesan" },
    normal: 9.00, maxi: 11.50,
  },
  {
    id: "carbonara",
    name: "Carbonara",
    desc: { es: "Bacon, huevo, cebolla", en: "Bacon, egg, onion", it: "Bacon, uovo, cipolla", de: "Speck, Ei, Zwiebel" },
    normal: 8.50, maxi: 11.00,
  },
];

/* ── Calzones ────────────────────────────────────────────────────────────── */
export const calzones: MenuItem[] = [
  {
    id: "classico",
    name: "Classico",
    desc: { es: "Tomate, mozzarella, jamón, champiñones", en: "Tomato, mozzarella, ham, mushrooms", it: "Pomodoro, mozzarella, prosciutto, funghi", de: "Tomate, Mozzarella, Schinken, Pilze" },
    price: 9.50, image: "calzone-classico.jpg",
  },
  {
    id: "capriccioso",
    name: "Capriccioso",
    desc: { es: "Clásico con aceitunas y alcachofas", en: "Classic with olives and artichokes", it: "Classico con olive e carciofi", de: "Klassisch mit Oliven und Artischocken" },
    price: 10.00,
  },
  {
    id: "vegetal",
    name: "Vegetal",
    desc: { es: "Tomate, mozzarella, pimiento, calabacín, champiñones", en: "Tomato, mozzarella, peppers, zucchini, mushrooms", it: "Pomodoro, mozzarella, peperoni, zucchine, funghi", de: "Tomate, Mozzarella, Pilze, Zucchini, Paprika" },
    price: 9.50, badge: "🌿 Vegetal",
  },
  {
    id: "del-mar",
    name: "Del Mar",
    desc: { es: "Tomate, mozzarella, atún, gambas, mejillones", en: "Tomato, mozzarella, tuna, shrimp, mussels", it: "Pomodoro, mozzarella, tonno, gamberi, cozze", de: "Tomate, Mozzarella, Thunfisch, Garnelen, Muscheln" },
    price: 10.50, image: "calzone-board.jpg",
  },
  {
    id: "nutella",
    name: "Nutella",
    desc: { es: "Calzone dulce con Nutella y nata montada", en: "Sweet calzone with Nutella and whipped cream", it: "Calzone dolce con Nutella e panna montata", de: "Süßer Calzone mit Nutella und Schlagsahne" },
    price: 5.50, image: "calzone-nutella.jpg", badge: "🍫 Postre",
  },
];

/* ── Starters ────────────────────────────────────────────────────────────── */
export const starters: MenuItem[] = [
  {
    id: "tabla-embutidos",
    name: "Tabla de Embutidos",
    desc: { es: "Bresaola, mortadela, soppressata, salami, búfala", en: "Bresaola, mortadella, soppressata, spicy salami, buffalo mozzarella", it: "Bresaola, mortadella, soppressata, salame piccante, bufala", de: "Bresaola, Mortadella, Soppressata, würzige Salami, Büffel" },
    price: 14.80,
  },
  {
    id: "vitello-tonnato",
    name: "Vitello Tonnato",
    desc: { es: "Lonchas de ternera en salsa de atún y mayonesa con alcaparras", en: "Veal slices in tuna sauce with capers", it: "Fettine di vitello in salsa di tonno con capperi", de: "Kalbsscheiben in Thunfischsauce mit Kapern" },
    price: 9.80,
  },
  {
    id: "ensaladilla",
    name: "Ensaladilla",
    desc: { es: "Ensaladilla rusa de trufa", en: "Russian truffle salad", it: "Insalata russa al tartufo", de: "Russischer Trüffelsalat" },
    price: 6.50,
  },
  {
    id: "caprese-burrata",
    name: "Caprese Burrata",
    desc: { es: "Crema de alcachofas, tomates cherry, burrata, orégano y pan de pizza", en: "Artichoke cream, cherry tomatoes, burrata, oregano, and pizza bread", it: "Crema di carciofi, pomodorini, burrata, origano e pane pizza", de: "Artischockencreme, Kirschtomaten, Burrata, Oregano und Pizzabrot" },
    price: 10.90, image: "pizza-burrata-pesto.jpg", badge: "⭐ Recomendado",
  },
  {
    id: "focaccia-ajo",
    name: "Focaccia de Ajo",
    desc: { es: "Mozzarella, ajo, romero y orégano", en: "Mozzarella, garlic, rosemary, and oregano", it: "Mozzarella, aglio, rosmarino e origano", de: "Mozzarella, Knoblauch, Rosmarin und Oregano" },
    price: 5.00,
  },
  {
    id: "focaccia-casa",
    name: "Focaccia Casa",
    desc: { es: "Mozzarella, ajo, aceitunas, tomates cherry, parmesano, albahaca, orégano", en: "Mozzarella, garlic, olives, cherry tomatoes, parmesan, basil, oregano", it: "Mozzarella, aglio, olive, pomodorini, parmigiano, basilico, origano", de: "Mozzarella, Knoblauch, Oliven, Kirschtomaten, Parmesan, Basilikum, Oregano" },
    price: 8.00,
  },
];

/* ── Salads ──────────────────────────────────────────────────────────────── */
export const salads: MenuItem[] = [
  {
    id: "ensalada-mixta",
    name: "Ensalada Mixta",
    desc: { es: "Lechuga, rúcula, maíz, tomate y aceitunas", en: "Lettuce, arugula, corn, tomato, and olives", it: "Lattuga, rucola, mais, pomodoro e olive", de: "Kopfsalat, Rucola, Mais, Tomate und Oliven" },
    price: 7.00,
  },
  {
    id: "ensalada-atun",
    name: "Ensalada Atún",
    desc: { es: "Mixta con atún", en: "Mixed salad with tuna", it: "Insalata mista con tonno", de: "Gemischter Salat mit Thunfisch" },
    price: 8.00,
  },
  {
    id: "ensalada-fuerte",
    name: "Ensalada Fuerte",
    desc: { es: "Tomate, aceitunas, queso de cabra y rúcula", en: "Tomato, olives, goat cheese, and arugula", it: "Pomodoro, olive, formaggio di capra e rucola", de: "Tomate, Oliven, Ziegenkäse und Rucola" },
    price: 7.50,
  },
  {
    id: "ensalada-caprese",
    name: "Ensalada Caprese",
    desc: { es: "Tomate, mozzarella fresca, albahaca y lechuga", en: "Tomato, fresh mozzarella, basil, and lettuce", it: "Pomodoro, mozzarella fresca, basilico e lattuga", de: "Tomate, frischer Mozzarella, Basilikum und Kopfsalat" },
    price: 7.50,
  },
  {
    id: "ensalada-casa",
    name: "Ensalada Casa",
    desc: { es: "Lechuga, rúcula, tomate cherry, queso de cabra, nueces y aceitunas", en: "Lettuce, arugula, cherry tomato, goat cheese, nuts, and olives", it: "Lattuga, rucola, pomodorini, formaggio di capra, noci e olive", de: "Kopfsalat, Rucola, Kirschtomaten, Ziegenkäse, Walnüsse und Oliven" },
    price: 9.00, image: "salad-fresh.jpg", badge: "⭐ Casa",
  },
];

/* ── Specials ─────────────────────────────────────────────────────────────── */
export const specials: MenuItem[] = [
  {
    id: "perla",
    name: "Perla",
    desc: { es: "Focaccia con burrata, rúcula, jamón serrano y tomate natural", en: "Focaccia with burrata, arugula, Serrano ham, and natural tomato", it: "Focaccia con burrata, rucola, prosciutto serrano e pomodoro naturale", de: "Focaccia mit Burrata, Rucola, Serrano-Schinken und frischen Tomaten" },
    price: 11.50, badge: "⭐",
  },
  {
    id: "porchetta",
    name: "Porchetta",
    desc: { es: "Focaccia con porchetta, cebolla caramelizada, scamorza y crema de balsámico", en: "Focaccia with porchetta, caramelized onion, scamorza, and balsamic cream", it: "Focaccia con porchetta, cipolla caramellata, scamorza e crema di balsamico", de: "Focaccia mit Porchetta, karamellisierten Zwiebeln, Scamorza und Balsamico-Creme" },
    price: 9.90,
  },
  {
    id: "lasagna",
    name: "Lasagna",
    desc: { es: "Lasaña de carne", en: "Meat lasagna", it: "Lasagna di carne", de: "Lasagne mit Fleisch" },
    price: 10.90,
  },
];
