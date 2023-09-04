import { create } from 'zustand'
import Initiative from '../interfaces/initiative'
import TaxonomyCountry from '../interfaces/taxonomyCountry'
import TaxonomyPillar from '../interfaces/taxonomyPillar'

const initiativesUrl = "/api/initiatives"
const countriesUrl = "/api/taxonomy/countries"
const pillarsUrl = "/api/taxonomy/pillars"

export interface InitiativeState {
  initiatives: Initiative[],
  taxonomyCountries:  TaxonomyCountry[],
  taxonomyPillars:  TaxonomyPillar[],
  fetchInitiatives: () => Promise<void>,
  fetchCountries: () => Promise<void>,
  fetchPillars: () => Promise<void>
}


const useInitiativesStore = create<InitiativeState>((set) => ({
  initiatives: [] as Initiative[],
  taxonomyCountries: [] as TaxonomyCountry[],
  taxonomyPillars: [] as TaxonomyPillar[],
  fetchInitiatives: async () => {
    const response: Response = await fetch(initiativesUrl)
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
  }
}))


export default useInitiativesStore