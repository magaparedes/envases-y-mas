export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  description?: string;
  image: string;
  sizes?: string[];
  details?: string[];
}

export const CATEGORIES = [
  "Bolsas de Basura",
  "Vasos",
  "Vasos Térmicos",
  "Bolsas Camisilla",
  "Bolsas de Papel",
  "Bolsas Especiales",
  "Cartones y Cajas",
  "Rollos",
  "Cotillón",
  "Estuches",
  "Papeles y Servilletas",
  "Cubiertos",
  "Limpieza"
];

export const PRODUCTS: Product[] = [
  // BOLSAS DE BASURA
  {
    id: "bb-1",
    name: "Bolsas de Basura Económicas",
    category: "Bolsas de Basura",
    image: "https://picsum.photos/seed/trash-black/400/400",
    sizes: ["40L", "60L", "80L", "100L", "150L", "200L"],
    details: ["Color: Negro", "Tipo: Económico", "Ideal para residuos generales"]
  },
  {
    id: "bb-2",
    name: "Bolsas de Basura Reforzadas",
    category: "Bolsas de Basura",
    image: "https://picsum.photos/seed/trash-heavy/400/400",
    sizes: ["100L", "150L", "200L", "400L"],
    details: ["Color: Negro", "Tipo: Reforzado", "Alta resistencia para residuos pesados"]
  },
  {
    id: "bb-3",
    name: "Bolsas de Basura Resistentes Amarillas",
    category: "Bolsas de Basura",
    image: "https://picsum.photos/seed/trash-yellow/400/400",
    sizes: ["150L", "200L", "250L", "300L"],
    details: ["Color: Amarillo", "Tipo: Resistente", "Identificación de residuos especiales"]
  },
  {
    id: "bb-4",
    name: "Bolsas para Baño Blancas",
    category: "Bolsas de Basura",
    image: "/user-uploads/magaparedesp@gmail.com/1741193000000-ecociclo.png",
    sizes: ["50L"],
    details: ["Color: Blanco", "Tipo: Para Baño", "Diseño discreto y limpio"]
  },
  
  // VASOS
  {
    id: "v-1",
    name: "Vasos Asiplast",
    category: "Vasos",
    image: "https://picsum.photos/seed/plastic-cups/400/400",
    sizes: ["50ml", "180ml", "200ml", "250ml", "300ml", "400ml", "500ml"],
    details: ["Paquetes x 50/100 unidades", "Opciones con tapa", "Material virgen de alta transparencia"]
  },
  {
    id: "v-2",
    name: "Vasos Copobras Cristal",
    category: "Vasos",
    image: "https://picsum.photos/seed/crystal-cups/400/400",
    sizes: ["300ml", "400ml", "500ml"],
    details: ["Material: Cristal", "Opciones con/sin agujero en tapa", "Brillo y claridad superior"]
  },
  {
    id: "v-3",
    name: "Vasos Copaza",
    category: "Vasos",
    image: "https://picsum.photos/seed/copaza-cups/400/400",
    sizes: ["50ml", "200ml", "300ml", "700ml"],
    details: ["Potes de 100ml", "Tapas disponibles", "Variedad de tamaños para todo uso"]
  },
  
  // VASOS TERMICOS
  {
    id: "vt-1",
    name: "Vasos Térmicos Isopor",
    category: "Vasos Térmicos",
    image: "https://picsum.photos/seed/thermal-cups/400/400",
    sizes: ["120ml", "180ml", "240ml", "300ml"],
    details: ["Marca: Copobras", "Incluye tapas térmicas", "Mantiene la temperatura por más tiempo"]
  },
  {
    id: "vt-2",
    name: "Vasos Polipapel",
    category: "Vasos Térmicos",
    image: "https://picsum.photos/seed/paper-coffee-cups/400/400",
    sizes: ["120ml", "180ml", "240ml", "300ml"],
    details: ["Sin tapa", "Ecológicos", "Ideal para café y bebidas calientes"]
  },

  // BOLSAS CAMISILLA
  {
    id: "bc-1",
    name: "Bolsas Camisilla Especial",
    category: "Bolsas Camisilla",
    image: "https://picsum.photos/seed/shopping-bags/400/400",
    sizes: ["22x30", "25x40", "30x45", "40x50", "45x60", "50x70"],
    details: ["Color: Blanco", "Reutilizables", "Gran capacidad de carga"]
  },
  {
    id: "bc-2",
    name: "Bolsas Camisilla Macroplast",
    category: "Bolsas Camisilla",
    image: "https://picsum.photos/seed/macro-bags/400/400",
    sizes: ["22x30", "25x40", "30x45", "40x50", "45x60", "50x70"],
    details: ["Paquetes x 100 unidades", "Alta resistencia", "Marca líder en el mercado"]
  },

  // BOLSAS DE PAPEL
  {
    id: "bp-1",
    name: "Bolsas de Papel Madera",
    category: "Bolsas de Papel",
    image: "https://picsum.photos/seed/brown-paper-bags/400/400",
    sizes: ["Nº 1 a Nº 16"],
    details: ["Sin impresión", "Ideal para panadería y cubiertos", "100% Biodegradables"]
  },
  {
    id: "bp-2",
    name: "Bolsas Delivery Kraft",
    category: "Bolsas de Papel",
    image: "https://picsum.photos/seed/kraft-delivery/400/400",
    sizes: ["Chico (20x30)", "Fino (16.5x34)", "Nº 2 (24x32)", "Extra Grande (28x40)"],
    details: ["Material: Kraft", "Base cuadrada", "Resistente para transporte de alimentos"]
  },

  // BOLSAS ESPECIALES
  {
    id: "be-1",
    name: "Bolsas Doypack",
    category: "Bolsas Especiales",
    image: "https://picsum.photos/seed/doypack-standup/400/400",
    sizes: ["12x16 cm", "14x18 cm", "16x19 cm", "18x23 cm"],
    details: ["Paquetes x 25 unidades", "Cierre hermético", "Base estable para exhibición"]
  },
  {
    id: "be-2",
    name: "Bolsas PP (Polipropileno)",
    category: "Bolsas Especiales",
    image: "https://picsum.photos/seed/pp-clear-bags/400/400",
    sizes: ["8x20", "10x20", "12x25", "15x30", "20x30", "30x45"],
    details: ["Con y sin adhesivo", "Paquetes x 90/100 unidades", "Máxima transparencia"]
  },
  {
    id: "be-3",
    name: "Bolsas Picotada",
    category: "Bolsas Especiales",
    image: "https://picsum.photos/seed/picotada-roll/400/400",
    sizes: ["22x35", "30x45", "40x60", "50x80"],
    details: ["Fácil corte", "Ideal para supermercados y fruterías"]
  },

  // CARTONES Y CAJAS
  {
    id: "cc-1",
    name: "Cajas para Pizza",
    category: "Cartones y Cajas",
    image: "https://picsum.photos/seed/pizza-boxes/400/400",
    sizes: ["32x32 cm", "35x35 cm", "22x22 cm (Pizzeta)"],
    details: ["Marrón o Impresa", "Tapa enteriza o separada", "Cartón microcorrugado resistente"]
  },
  {
    id: "cc-2",
    name: "Bandejas de Cartón",
    category: "Cartones y Cajas",
    image: "https://picsum.photos/seed/cardboard-trays/400/400",
    sizes: ["Mini Torta", "Nº 1 a Nº 5"],
    details: ["Celulosa virgen", "100% Reciclables", "Apto para contacto con alimentos"]
  },
  {
    id: "cc-3",
    name: "Recipientes de Isopor",
    category: "Cartones y Cajas",
    image: "https://picsum.photos/seed/styrofoam-containers/400/400",
    sizes: ["R-8", "R-9", "B-17", "B-18", "B-19", "B-650", "B-690"],
    details: ["Tapa separada o bisagra", "Estuches cuadrados y rectangulares", "Térmicos"]
  },

  // ROLLOS
  {
    id: "r-1",
    name: "Film de PVC",
    category: "Rollos",
    image: "https://packingenvases.com.ar/wp-content/uploads/2021/01/1555-3-350x350.jpg",
    sizes: ["30x1000", "38x1000", "45x1000"],
    details: ["Grado alimenticio", "Resistente y autoadherente", "Protección garantizada"]
  },
  {
    id: "r-2",
    name: "Papel de Aluminio Hornal",
    category: "Rollos",
    image: "https://stock.com.py/images/thumbs/0151343.jpeg",
    sizes: ["30cm x 7.5m", "38cm x 7.5m", "45cm x 7.5m"],
    details: ["Marca: Hornal", "Uso profesional", "Resistente al calor"]
  },
  {
    id: "r-3",
    name: "Papel de Aluminio Lumipam",
    category: "Rollos",
    image: "https://prezunic.vtexassets.com/arquivos/ids/182435/65678bf51ef3739680761c6d.jpg?v=638368816563330000",
    sizes: ["30cm x 7.5m", "38cm x 7.5m", "45cm x 7.5m"],
    details: ["Marca: Lumipam", "Uso profesional", "Resistente al calor"]
  },

  // COTILLON
  {
    id: "cot-1",
    name: "Globos y Decoración",
    category: "Cotillón",
    image: "https://www.salemmaonline.com.py/products/7805670006610.png?v=2",
    details: ["Globos lisos y motas", "Servilletas de colores", "Cubiertos de colores", "Variedad de diseños"]
  },

  // ESTUCHES
  {
    id: "est-1",
    name: "Estuches Transparentes",
    category: "Estuches",
    image: "https://plastienvasesrl.com.py/wp-content/uploads/2026/01/032087.png",
    sizes: ["101 con tapa", "142/143 Microondas", "Multipropósito 250/380/500ml"],
    details: ["Aptos para microondas", "Cierre seguro", "Alta visibilidad"]
  },
  {
    id: "est-2",
    name: "Estuches para Cupcakes",
    category: "Estuches",
    image: "https://m.media-amazon.com/images/I/812eAUKMy7L._AC_UF894,1000_QL80_.jpg",
    details: ["Bandeja para 2/6 Cupcakes", "Cierre seguro", "Alta transparencia"]
  },
  {
    id: "est-4",
    name: "Bandejas para Sushi",
    category: "Estuches",
    image: "https://www.envasesdelmediterraneo.com/490-large_default/bandeja-para-sushi-pla--tapa-150x230mm-600-uds.jpg",
    details: ["Bandeja Oriental para Sushi", "Con tapa incluida", "Diseño elegante"]
  },
  {
    id: "est-3",
    name: "Triángulos para Sandwich",
    category: "Estuches",
    image: "https://sansei.com.py/uploads/products/2093_tims2-triangulo-p-sandwich-375.png",
    details: ["Nacional x 100 unidades", "Importado x 75 unidades", "Cierre hermético"]
  },

  // PAPELES Y SERVILLETAS
  {
    id: "ps-1",
    name: "Servilletas con Logo",
    category: "Papeles y Servilletas",
    image: "https://www.jofisasl.com/almacen/articulos/zoom_servilletas_de_22x22_blancas.jpg",
    sizes: ["23x23 cm", "33x33 cm"],
    details: ["Impresión personalizada", "Ideal para gastronomía", "Suaves y absorbentes"]
  },

  // CUBIERTOS
  {
    id: "cub-1",
    name: "Cubiertos Descartables",
    category: "Cubiertos",
    image: "https://picsum.photos/seed/plastic-cutlery/400/400",
    details: ["Cucharitas", "Tenedores", "Cuchillos", "Cucharas soperas", "Paquetes x 100"]
  },

  // LIMPIEZA
  {
    id: "l-1",
    name: "Artículos de Limpieza",
    category: "Limpieza",
    image: "https://picsum.photos/seed/cleaning-supplies/400/400",
    details: ["Escurridores 30/40cm", "Detergente 5L", "Lavandina 5L", "Desodorante de ambiente", "Calidad industrial"]
  }
];
