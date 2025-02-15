// utils.ts - Funciones reutilizables para traducciones y normalización

export const normalizarTexto = (texto: string) =>
    texto.trim().toLowerCase().replace(/\s+/g, "-");
  
  export const traducirTipo = (tipo: string) => {
    const tipos: Record<string, string> = {
      normal: "Normal", fire: "Fuego", water: "Agua", electric: "Eléctrico",
      grass: "Planta", ice: "Hielo", fighting: "Lucha", poison: "Veneno",
      ground: "Tierra", flying: "Volador", psychic: "Psíquico", bug: "Bicho",
      rock: "Roca", ghost: "Fantasma", dragon: "Dragón", dark: "Siniestro",
      steel: "Acero", fairy: "Hada",
    };
    return tipos[tipo] || tipo;
  };
  
  export const traducirHabilidad = (habilidad: string) => {
    const habilidades: Record<string, string> = {
      overgrow: "Espesura", blaze: "Mar Llamas", torrent: "Torrente",
      "shield-dust": "Polvo Escudo", "shed-skin": "Mudar", "compound-eyes": "Ojo Compuesto",
      "run-away": "Fuga", guts: "Agallas", intimidate: "Intimidación",
      static: "Electrostática", "lightning-rod": "Pararrayos", "keen-eye": "Vista Lince",
      "battle-armor": "Armadura Batalla", sturdy: "Robustez", damp: "Humedad",
    };
    return habilidades[habilidad] || habilidad;
  };
  
  export const traducirEstadistica = (stat: string) => {
    const stats: Record<string, string> = {
      hp: "PS", attack: "Ataque", defense: "Defensa",
      "special-attack": "Ataque Especial", "special-defense": "Defensa Especial",
      speed: "Velocidad",
    };
    return stats[stat] || stat;
  };
  