import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

import Initiative from '../interfaces/initiative'
import TaxonomyCountry from '../interfaces/taxonomyCountry'
import TaxonomyPillar from '../interfaces/taxonomyPillar'
import TaxonomyAudience from '../interfaces/taxonomyAudience'

const initiativesUrl = "/api/initiatives"
const countriesUrl = "/api/taxonomy/countries"
const pillarsUrl = "/api/taxonomy/pillars"
const audiencesUrl = "/api/taxonomy/audiences"

export interface InitiativeState {
  initiatives: Initiative[],

  taxonomyCountries:  TaxonomyCountry[],
  taxonomyPillars:  TaxonomyPillar[],
  taxonomyAudiences:  TaxonomyAudience[],

  fetchInitiatives: () => Promise<void>,
  fetchCountries: () => Promise<void>,
  fetchPillars: () => Promise<void>,
  fetchAudiences: () => Promise<void>,

  // FILTERS PILLARS
  filterPillars: number[],
  filterByPillar_add: (id: number) => void,
  filterByPillar_remove: (id: number) => void,
  filterByPillar_clear: () => void,
  filterByPillar_check: (id: number) => boolean,

  // FILTERS COUNTRIES
  filterCountries: number[],
  filterByCountry_add: (id: number) => void,
  filterByCountry_remove: (id: number) => void,
  filterByCountry_clear: () => void,
  filterByCountry_check: (id: number) => boolean,

  // FILTERS AUDIENCES
  filterAudiences: number[],
  filterByAudience_add: (id: number) => void,
  filterByAudience_remove: (id: number) => void,
  filterByAudience_clear: () => void,
  filterByAudience_check: (id: number) => boolean,

  // UTILS
  buildQueryParams: () => string
}


const useInitiativesStore = create(subscribeWithSelector<InitiativeState>((set, get) => ({
  initiatives: [] as Initiative[],
  taxonomyCountries: [] as TaxonomyCountry[],
  taxonomyPillars: [] as TaxonomyPillar[],
  taxonomyAudiences: [] as TaxonomyAudience[],

  fetchInitiatives: async () => {
    const url = initiativesUrl + get().buildQueryParams() // ADD FILTERS
    const response: Response = await fetch(url)
    const json = await response.json()
    set({initiatives: json}, false)
  },

  fetchCountries: async () => {
    const response: Response = await fetch(countriesUrl)
    const json = await response.json()
    set({taxonomyCountries: json}, false)  
  },
  fetchPillars: async () => {
    const response: Response = await fetch(pillarsUrl)
    const json = await response.json()
    set({taxonomyPillars: json}, false)  
  },
  fetchAudiences: async () => {
    const response: Response = await fetch(audiencesUrl)
    const json = await response.json()
    set({taxonomyAudiences: json}, false)
  },
  // FILTER PILLARS
  filterPillars: [] as number[],
  filterByPillar_add: (id: number) => {
    set(state => ({filterPillars: [...state.filterPillars, id]}))
  },
  filterByPillar_remove: (id: number) => {
    set(state => ({filterPillars: state.filterPillars.filter(pillarId => pillarId !== id)}))
  }, 
  filterByPillar_clear: () => {
    set({filterPillars: []})
  },
  filterByPillar_check: (id: number) => {
    return get().filterPillars.includes(id)
  },
  // FILTER COUNTRIES
  filterCountries: [] as number[],
  filterByCountry_add: (id: number) => {
    set(state => ({filterCountries: [...state.filterCountries, id]}))
  },
  filterByCountry_remove: (id: number) => {
    set(state => ({filterCountries: state.filterCountries.filter(countryId => countryId !== id)}))
  },
  filterByCountry_clear: () => {
    set({filterCountries: []})
  },
  filterByCountry_check: (id: number) => {
    return get().filterCountries.includes(id)
  },

  filterAudiences: [] as number[],
  filterByAudience_add: (id: number) => {
    set(state => ({filterAudiences: [...state.filterAudiences, id]}))
  },
  filterByAudience_remove: (id: number) => {
    set(state => ({filterAudiences: state.filterAudiences.filter(audienceId => audienceId !== id)}))
  },
  filterByAudience_clear: () => {
    set({filterAudiences: []})
  },
  filterByAudience_check: (id: number) => {
    return get().filterAudiences.includes(id)
  },

  // BUILD QUERY PARAMS
  buildQueryParams: () => {
    let queryParams = ""
    if (get().filterPillars.length > 0) {
      // Change with the format pillar[]=1&pillar[]=2
      queryParams = "&pillars[]=" + get().filterPillars.join("&pillars[]=")
    }
    if (get().filterCountries.length > 0) {
      // Change with the format country[]=1&country[]=2
      queryParams += "&countries[]=" + get().filterCountries.join("&countries[]=")
    }
    if (get().filterAudiences.length > 0) {
      // Change with the format audience[]=1&audience[]=2
      queryParams += "&audiences[]=" + get().filterAudiences.join("&audiences[]=")
    }

    return "?" + queryParams.substring(1);
  }
})))


export default useInitiativesStore