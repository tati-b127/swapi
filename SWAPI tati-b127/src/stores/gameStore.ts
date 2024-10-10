import { defineStore } from 'pinia'
import axios from 'axios'
import type { Person } from '@/types/person'

export const useGameStore = defineStore('game', {
  state: () => ({
    persons: [] as Person[],
    results: [] as { winner: Person; loser: Person }[],
    count: 0,
    allPersons: []
  }),
  getters: {
    getPerson: (state) => (index: number) => {
      return state.persons[index] || null
    },
    getWinner: (state) => {
      if (state.persons[0] && state.persons[1]) {
        const [firstPerson, secondPerson] = state.persons

        if (typeof firstPerson.mass === 'number' && typeof secondPerson.mass === 'number') {
          if (firstPerson.mass === secondPerson.mass) {
            firstPerson.winner = 'tie'
            secondPerson.winner = 'tie'
          } else if (firstPerson.mass > secondPerson.mass) {
            firstPerson.winner = 'winner'
            secondPerson.winner = 'loser'
          } else {
            firstPerson.winner = 'loser'
            secondPerson.winner = 'winner'
          }
        } else {
          if (typeof firstPerson.mass === 'string') {
            firstPerson.winner = 'loser'
            secondPerson.winner = 'winner'
          } else if (typeof secondPerson.mass === 'string') {
            firstPerson.winner = 'winner'
            secondPerson.winner = 'loser'
          } else if (
            typeof firstPerson.mass === 'string' &&
            typeof secondPerson.mass === 'string'
          ) {
            firstPerson.winner = 'loser'
            secondPerson.winner = 'loser'
          }
        }
      }
    }
  },
  actions: {
    async getAllPersons() {
      try {
        const response = await axios.get('https://swapi.dev/api/people/')
        this.count = response.data.count
      } catch (error) {
        throw new Error('Error fetching characters:' + error)
      }
    },
    async getRandomPerson(index: number) {
      if (this.count !== 0) {
        const randomId = Math.floor(Math.random() * this.count) + 1
        try {
          const response = await axios
            .get(`https://swapi.dev/api/people/${randomId}/`)
            .then((res) => res.data)
          this.persons[index] = {
            name: response.name,
            height: response.height,
            mass: response.mass !== 'unknown' ? Number(response.mass) : '?'
          }
        } catch (error) {
          throw new Error('Error fetching character:' + error)
        }
      } else {
        await this.getAllPersons()
        await this.getRandomPerson(index)
      }
    },
    recordResult() {
      const [first, second] = this.persons
      if (this.persons.length === 2 && first.winner && second.winner) {
        const result =
          first.winner === 'winner'
            ? { winner: first, loser: second }
            : { loser: first, winner: second }
        this.$state.results.push(result)
      } else {
        throw new Error('Error: not enough persons')
      }
    }
  }
})
