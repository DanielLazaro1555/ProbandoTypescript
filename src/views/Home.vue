<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-6">
    <h1 class="text-3xl md:text-5xl font-bold text-gray-800 text-center overflow-hidden">
      🔍 <span>Buscador de</span> <span class="text-blue-500 whitespace-nowrap overflow-hidden">Pokémon</span>
    </h1>
    <!-- Barra de búsqueda con sugerencias -->
    <div class="mt-6 relative w-80 overflow-visible">

      <input v-model="busqueda" @keydown.down.prevent="moverSeleccion($event, 1)"
        @keydown.up.prevent="moverSeleccion($event, -1)" type="text" placeholder="Busca un Pokémon..."
        class="border border-gray-300 p-2 rounded-lg w-full text-center focus:outline-none focus:ring-2 focus:ring-blue-400 overflow-hidden" />




      <!-- Lista de sugerencias -->
      <ul v-if="sugerencias.length"
        class="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg z-50">
        <li v-for="(sugerencia, index) in sugerencias" :key="sugerencia" @click="seleccionarSugerencia(sugerencia)"
          :class="{ 'bg-blue-100': index === indiceSeleccionado }" class="p-2 cursor-pointer hover:bg-blue-200">
          {{ sugerencia }}
        </li>
      </ul>

    </div>

    <button @click="buscarPokemon"
      class="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-200">
      Buscar
    </button>

    <PokemonCard v-if="pokemon" :pokemon="pokemon" class="mt-6 w-full max-w-md" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PokemonCard from "../components/PokemonCard.vue";
import { normalizarTexto, traducirTipo, traducirHabilidad, traducirEstadistica } from "../utils";

const busqueda = ref("");
const pokemon = ref<any>(null);
const sugerencias = ref<string[]>([]);
const indiceSeleccionado = ref(-1);

// Obtener sugerencias de Pokémon al escribir
const obtenerSugerencias = async () => {
  if (busqueda.value.length < 2) {
    sugerencias.value = [];
    return;
  }

  try {
    const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1302");
    const data = await respuesta.json();

    sugerencias.value = data.results
      .map((p: any) => p.name)
      .filter((nombre: string) => nombre.includes(busqueda.value.toLowerCase()))
      .slice(0, 6);
  } catch (error) {
    console.error("Error obteniendo sugerencias:", error);
  }
};

// Manejar selección con teclas ↑ y ↓
const moverSeleccion = (event: KeyboardEvent, direccion: number) => {
  event.preventDefault(); // Prevenir comportamiento por defecto
  if (!sugerencias.value.length) return;
  indiceSeleccionado.value = (indiceSeleccionado.value + direccion + sugerencias.value.length) % sugerencias.value.length;
  busqueda.value = sugerencias.value[indiceSeleccionado.value] ?? "";
};


// Seleccionar una sugerencia
const seleccionarSugerencia = (nombre?: string) => {
  busqueda.value = nombre ?? sugerencias.value[indiceSeleccionado.value] ?? "";
  sugerencias.value = [];
  indiceSeleccionado.value = -1;
};

// Buscar Pokémon en la API
const buscarPokemon = async () => {
  if (!busqueda.value.trim()) return alert("Ingresa un Pokémon o ID");

  const nombreLimpio = normalizarTexto(busqueda.value);
  try {
    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombreLimpio}`);
    if (!respuesta.ok) throw new Error("Pokémon no encontrado");
    const data = await respuesta.json();

    const respuestaEspecie = await fetch(data.species.url);
    const dataEspecie = await respuestaEspecie.json();

    const nombreEspanol = dataEspecie.names.find((n: any) => n.language.name === "es")?.name || data.name;
    const descripcionEspanol = dataEspecie.flavor_text_entries.find(
      (entry: any) => entry.language.name === "es"
    )?.flavor_text.replace(/\n|\f/g, " ") || "Descripción no disponible.";

    pokemon.value = {
      ...data,
      nombre_es: nombreEspanol,
      descripcion_es: descripcionEspanol,
      habilidades: data.abilities.map((hab: any) => ({ name: traducirHabilidad(hab.ability.name) })),
      tipos: data.types.map((tipo: any) => ({ name: traducirTipo(tipo.type.name) })),
      estadisticas: data.stats.map((stat: any) => ({ name: traducirEstadistica(stat.stat.name), value: stat.base_stat })),
    };
  } catch (error) {
    console.error("Error al buscar el Pokémon:", error);
    alert("Pokémon no encontrado");
    pokemon.value = null;
  }
};
</script>
