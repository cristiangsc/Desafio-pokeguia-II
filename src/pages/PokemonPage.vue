<template>
  <div>
    <img alt="logo Pokemon" src="../assets/logo.png" width="450" class="fade-in"/>
    <h2>PokeGuía</h2>
    <pokemon-input/>
  </div>
</template>

<script>

import PokemonInput from "@/components/PokemonInput";

export default {
  name: "PokemonPage",
  components: {
    PokemonInput,
  }
}
</script>

<style scoped>

</style>