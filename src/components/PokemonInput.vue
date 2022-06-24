<template>
  <div>
    <label>Nombre:</label>
    <input
        type="text"
        name="pokemon"
        v-model:name="namePokemon"
        @keyup.enter="funcApi"
    />
    <button @click.prevent="funcApi" class="ml">Buscar</button>
    <br>
    <h3>{{ pokeName }}</h3>
    <img :src="pokeImage" alt="Imagen pokemon" class="fade-in">
    <br>

    <div>
      <label for="">Seleccione Tamaño de fuente</label>
      <select @change="changeFontSize">
        <option
            v-for="opt in fontSizeOpt"
            :key="opt"
            :value="opt"
        >
          {{opt}}
        </option>
      </select>
      <br>
    </div>

    <div>
      <h3>Movimientos</h3>
      <label for="">Estos son todos los Movimientos del Pokemón: </label>
      <select class="boxli">
        <option
            v-for="(move, index) in movesPokemon"
            :key="index"
            :value="index"
            :style="myStyles"
        >
          {{move}}
        </option>
      </select>
    </div>

    <div class="options-container">
      <h3>Habilidades</h3>
      <ul>
        <li v-for="(ability, index) in abilityPokemon"
            :key="index"
            class="boxli"
            :style="myStyles"
        >
          {{ ability }}
        </li>
      </ul>
    </div>

  </div>
</template>

<script>

import pokemonApi from '@/api/pokemonApi'


export default {
  name: "PokemonInput",
  data() {
    return {
      namePokemon: "",
      imagen:"",
      pokemon: {
        name: "",
        sprites:{
        other:{
           dream_world:{
             front_default:""
           }         
        },
       
        },        
        moves: [],
        abilities: [],
      },
      myStyles: {
        fontSize: "16px",
        color: ''
      },
      fontSizeOpt: [
        '16px',
        '18px',
        '20px',
        '24px'
      ],
    };
  },
  methods: {
    changeFontSize(event) {
      this.myStyles.fontSize = event.target.value
    },

    async funcApi() {
       const resp = await pokemonApi.get(this.url)
        try {
          this.pokemon = resp.data;
          let imagen = this.pokemon.sprites.other.dream_world.front_default
          this.pokemon.imagen = imagen
          this.namePokemon = "";
        } catch (error) {
          console.log(`Se produjo un error en la conexión: \n${error}`);
        }
      }
    },
  created() {
    this.funcApi()
  },

  computed: {
    url() {
      return this.namePokemon.trim() === "" ? 'pikachu' : this.namePokemon.toLowerCase().trim()
    },

    pokeName() {
      return this.pokemon.name.toUpperCase();
    },

    pokeImage() {
      return this.pokemon.imagen
           
    },

    movesPokemon() {
      return this.pokemon.moves.map((move)=>{
        return move.move.name
      });
    },

    abilityPokemon() {
      return this.pokemon.abilities.map((habilidad)=>{
        return habilidad.ability.name
      });
    },
  }
}

</script>

<style scoped>

ul {
  list-style-type: none;
}

.boxli {
  background-color: white;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  margin-bottom: 10px;
  width: 250px;
}

li:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.options-container {
  display: flex;
  justify-content: center;
  gap: 20px;
}
.ml{
  margin-left: 5px;
}
</style>