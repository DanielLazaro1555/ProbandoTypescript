<template>
  <div class="bg-red-600 border-4 border-black rounded-lg shadow-lg p-6 w-full max-w-4xl mx-auto">
    <!-- Título de Pokédex -->
    <div class="bg-black text-white text-center p-2 rounded-md mb-6">
      <h1 class="text-2xl font-bold">📟 Pokédex</h1>
    </div>

    <!-- Diseño GRID (Escritorio: imagen a la izquierda, datos a la derecha) -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
      <!-- Imagen del Pokémon -->
      <div class="flex justify-center">
        <img
          :src="pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default"
          :alt="pokemon.nombre_es"
          class="w-40 md:w-52 bg-white border-4 border-black rounded-lg shadow-md p-2"
        />
      </div>

      <!-- Nombre y Tipos -->
      <div class="bg-gray-100 p-4 rounded-lg shadow-md border-2 border-black">
        <h2 class="text-3xl font-bold text-gray-800 text-center">
          #{{ pokemon.id }} - {{ pokemon.nombre_es.toUpperCase() }}
        </h2>

        <!-- Tipos de Pokémon con fondo de color -->
        <div class="mt-4 flex flex-wrap justify-center gap-2">
          <span
            v-for="tipo in pokemon.tipos"
            :key="tipo.name"
            class="px-4 py-1 text-sm font-semibold rounded-full border-2 border-black text-white"
            :class="tipoColor(tipo.name)"
          >
            {{ tipo.name }}
          </span>
        </div>
      </div>
    </div>

    <!-- Descripción del Pokémon -->
    <div class="bg-gray-200 p-4 mt-6 rounded-lg shadow-md border-2 border-black text-gray-700">
      <h3 class="text-lg font-semibold">📖 Descripción</h3>
      <p class="italic mt-2">
        "{{ pokemon.descripcion_es }}"
      </p>
    </div>

    <!-- Datos Generales (Altura, Peso, Habilidades) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      <div class="bg-gray-100 p-4 rounded-lg shadow-md border-2 border-black">
        <h3 class="text-lg font-semibold text-gray-700">📏 Altura</h3>
        <p class="text-gray-800">{{ pokemon.height / 10 }} m</p>
      </div>

      <div class="bg-gray-100 p-4 rounded-lg shadow-md border-2 border-black">
        <h3 class="text-lg font-semibold text-gray-700">⚖️ Peso</h3>
        <p class="text-gray-800">{{ pokemon.weight / 10 }} kg</p>
      </div>

      <div class="bg-gray-100 p-4 rounded-lg shadow-md border-2 border-black">
        <h3 class="text-lg font-semibold text-gray-700">🛡️ Habilidades</h3>
        <div class="flex flex-wrap justify-center gap-2 mt-2">
          <span
            v-for="(habilidad, index) in pokemon.habilidades"
            :key="index"
            class="bg-blue-200 text-blue-800 px-3 py-1 rounded-lg text-sm border border-black"
          >
            {{ habilidad.name }}
          </span>
        </div>
      </div>
    </div>

    <!-- Estadísticas Base -->
    <div class="bg-gray-200 p-4 mt-6 rounded-lg shadow-md border-2 border-black">
      <h3 class="text-lg font-semibold text-gray-700 text-center">📊 Estadísticas Base</h3>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
        <div v-for="stat in pokemon.estadisticas" :key="stat.name" class="w-full">
          <p class="text-gray-800 text-sm font-medium">{{ stat.name }}: {{ stat.value }}</p>
          <div class="bg-gray-300 h-2 rounded w-full border border-black">
            <div class="h-2 rounded transition-all duration-300" :style="{ width: stat.value + '%', backgroundColor: getStatColor(stat.name) }"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
defineProps<{ pokemon: any }>(); // ✅ No asigna a una variable, pero Vue lo usa internamente



// Función para asignar colores a los tipos de Pokémon
const tipoColor = (tipo: string) => {
  const colores: Record<string, string> = {
    Normal: "bg-gray-500",
    Fuego: "bg-red-600",
    Agua: "bg-blue-500",
    Planta: "bg-green-600",
    Eléctrico: "bg-yellow-500",
    Hielo: "bg-blue-300",
    Lucha: "bg-orange-700",
    Veneno: "bg-purple-500",
    Tierra: "bg-yellow-700",
    Volador: "bg-indigo-400",
    Psíquico: "bg-pink-500",
    Bicho: "bg-green-700",
    Roca: "bg-gray-600",
    Fantasma: "bg-indigo-700",
    Dragón: "bg-purple-700",
    Siniestro: "bg-gray-800",
    Acero: "bg-gray-400",
    Hada: "bg-pink-400",
  };
  return colores[tipo] || "bg-gray-400";
};

// Función para asignar colores a las estadísticas base
const getStatColor = (stat: string) => {
  const statColors: Record<string, string> = {
    "PS": "#FF595E",
    "Ataque": "#FF924C",
    "Defensa": "#FFCA3A",
    "Ataque Especial": "#1982C4",
    "Defensa Especial": "#8AC926",
    "Velocidad": "#6A4C93",
  };
  return statColors[stat] || "#9CA3AF"; // Gris por defecto
};
</script>
