import { create } from 'zustand'
import { subscribeWithSelector } from 'zustand/middleware'

import Initiative from '../interfaces/initiative'
import TaxonomyCountry from '../interfaces/taxonomyCountry'
import TaxonomyPillar from '../interfaces/taxonomyPillar'
import TaxonomyAudience from '../interfaces/taxonomyAudience'

export type SortBy = "DATE" | "NAME"

const initiativesUrl = "/api/initiatives"
const countriesUrl = "/api/taxonomy/countries"
const pillarsUrl = "/api/taxonomy/pillars"
const audiencesUrl = "/api/taxonomy/audiences"

export interface InitiativeState {
  initiatives: Initiative[],
  initiativesCountriesMap: {[key: number]: Initiative[]},
  initiativesPillarsMap: {[key: number]: Initiative[]},
  initiativesAudiencesMap: {[key: number]: Initiative[]},
  sortBy: SortBy,
  
  searchInput: string,
  updateSearchInput: (searchInput: string) => void,
  

  updateSortBy: (sortBy: SortBy) => void,

  initiativesFiltered: () => Initiative[],
  updateInitiativesCountMap: () => void,

  taxonomyCountries:  TaxonomyCountry[],
  taxonomyPillars:  TaxonomyPillar[],
  taxonomyAudiences:  TaxonomyAudience[],

  saveFiltersConfig: () => void,
  loadFiltersConfig: () => void,

  fetchData: () => Promise<void>

  fetchInitiatives: () => Promise<void>,
  fetchCountries: () => Promise<void>,
  fetchPillars: () => Promise<void>,
  fetchAudiences: () => Promise<void>,

  // FILTERS PILLARS
  filterPillars: number[],
  togglePillar: (id: number) => void,
  clearPillars: () => void,
  checkPillar: (id: number) => boolean,

  // FILTERS COUNTRIES
  filterCountries: number[],
  toggleCountry: (id: number) => void,
  clearCountries: () => void,
  checkCountry: (id: number) => boolean,

  // FILTERS AUDIENCES
  filterAudiences: number[],
  toggleAudience: (id: number) => void,
  clearAudiences: () => void,
  checkAudience: (id: number) => boolean
}




const useInitiativesStore = create(subscribeWithSelector<InitiativeState>((set, get) => ({
  initiatives: [] as Initiative[],
  initiativesCountriesMap: {} as {[key: number]: Initiative[]},
  initiativesPillarsMap: {} as {[key: number]: Initiative[]},
  initiativesAudiencesMap: {} as {[key: number]: Initiative[]},

  taxonomyCountries: [] as TaxonomyCountry[],
  taxonomyPillars: [] as TaxonomyPillar[],
  taxonomyAudiences: [] as TaxonomyAudience[],
  
  sortBy: "DATE",

  searchInput: "",
  updateSearchInput: (searchInput: string) => {
    if(searchInput !== get().searchInput)
      set({searchInput})
  },
  
  updateSortBy: (sortBy: SortBy) => {
    if(sortBy !== get().sortBy)
      set({sortBy})
  },

  saveFiltersConfig: () => {
    const filterData = {
      filterPillars: get().filterPillars,
      filterCountries: get().filterCountries,
      filterAudiences: get().filterAudiences
    }
    localStorage.setItem("filterPillars", JSON.stringify(filterData))
  },
  loadFiltersConfig: () => {
    const filtersData = localStorage.getItem("filterPillars")
    console.log("filtersData", filtersData)
    if(filtersData) {
      const filters = JSON.parse(filtersData)
      set({
        filterPillars: filters.filterPillars || [],
        filterCountries: filters.filterCountries || [],
        filterAudiences: filters.filterAudiences || []
      })
    }
  },

  fetchData: async () => {
    await Promise.all([
      get().fetchInitiatives(),
      get().fetchCountries(),
      get().fetchPillars(),
      get().fetchAudiences(),
    ])
    get().updateInitiativesCountMap()
  },

  updateInitiativesCountMap: () => {
    const initiativesCountriesMap = {} as {[key: number]: Initiative[]}
    const initiativesPillarsMap = {} as {[key: number]: Initiative[]}
    const initiativesAudiencesMap = {} as {[key: number]: Initiative[]}

    const initiatives = get().initiativesFiltered()

    initiatives.forEach(initiative => {
      initiative.countries.forEach(countryId => {
        if (!initiativesCountriesMap[countryId]) {
          initiativesCountriesMap[countryId] = []
        }
        initiativesCountriesMap[countryId].push(initiative)
      })
      initiative.pillars.forEach(pillarId => {
        if (!initiativesPillarsMap[pillarId]) {
          initiativesPillarsMap[pillarId] = []
        }
        initiativesPillarsMap[pillarId].push(initiative)
      })
      initiative.audiences.forEach(audienceId => {
        if (!initiativesAudiencesMap[audienceId]) {
          initiativesAudiencesMap[audienceId] = []
        }
        initiativesAudiencesMap[audienceId].push(initiative)
      })
    })

    set({initiativesCountriesMap, initiativesPillarsMap, initiativesAudiencesMap}, false)
  },

  initiativesFiltered: () => {
    const arrayContainAll = (array: number[], search: number[]) => search.every(x => array.includes(x))

     let initiatives = get().initiatives.filter(initiative => {
      
      if(get().filterCountries.length > 0 && !arrayContainAll(initiative.countries, get().filterCountries)) {
        return false
      }
      if(get().filterPillars.length > 0 && !arrayContainAll(initiative.pillars, get().filterPillars)) {
        return false
      }
      if(get().filterAudiences.length > 0 && !arrayContainAll(initiative.audiences, get().filterAudiences)) {
        return false
      }
      return true
    })

    if(get().searchInput.length > 0) {
      initiatives = initiatives.filter(i => {
        return i.title.toLowerCase().includes(get().searchInput.toLowerCase())
      })
    }

    return initiatives.sort((a, b) => {
      if (get().sortBy === "DATE") {
        return b.created_at.getTime() - a.created_at.getTime()
      } else {
        return a.title.localeCompare(b.title)
      }
    })
  },

  fetchInitiatives: async () => {
    const response: Response = await fetch(initiativesUrl)
    const initiatives: Initiative[] = (await response.json()).map((response: any): Initiative => {
      const initiative = {
        id: response.id,
        title: response.title,
        image: response.image,
        countries: [], 
        pillars: [],
        audiences: [],
        status: response.status,
        url: response.url,
        description: response.description,
        created_at: new Date(response.created_at.replace(/\n/g, "").trim())
      }
      
      if(Boolean(response.countries)) {
        initiative.countries = response.countries.split(",").map((country: string) => parseInt(country))
      }

      if(Boolean(response.pillars)) {
        initiative.pillars = response.pillars.split(",").map((pillar: string) => parseInt(pillar))
      }

      if(Boolean(response.audiences)) {
        initiative.audiences = response.audiences.split(",").map((audience: string) => parseInt(audience))
      }

      return initiative
    })
    set({initiatives}, false)
  },
  fetchCountries: async () => {
    const response: Response = await fetch(countriesUrl)
    const taxonomyCountries = (await response.json()).map((response: any): TaxonomyCountry => {
      return {
        id: parseInt(response.id),
        name: response.name,
        field_iso2: response.field_iso2,
        initiatives_count: parseInt(response.initiatives_count)
      }
    })
    set({taxonomyCountries}, false)  
  },
  fetchPillars: async () => {
    const response: Response = await fetch(pillarsUrl)
    const json = (await response.json()).map((response: any): TaxonomyPillar => {
      return {
        id: parseInt(response.id),
        name: response.name,
        field_color_hex: response.field_color_hex,
        initiatives_count: parseInt(response.initiatives_count),
        short_label: response.short_label
      }
    })
    set({taxonomyPillars: json}, false)  
  },
  fetchAudiences: async () => {
    const response: Response = await fetch(audiencesUrl)
    const taxonomyAudiences = (await response.json()).map((response: any): TaxonomyAudience => {
      return {
        id: parseInt(response.id),
        name: response.name.replace(/&lt;/g, '<').replace(/&gt;/g, '>'),
        initiatives_count: parseInt(response.initiatives_count)
      }
    })
    set({taxonomyAudiences}, false)
  },

  // FILTER PILLARS
  filterPillars: [] as number[],
  togglePillar: (id: number) => {
    if (get().filterPillars.includes(id)) {
      set(state => ({filterPillars: state.filterPillars.filter(pillarId => pillarId !== id)}))
    } else {
      set(state => ({filterPillars: [...state.filterPillars, id]}))
    }
    get().updateInitiativesCountMap()
  },
  clearPillars: () => {
    set({filterPillars: []})
    get().updateInitiativesCountMap()
  },
  checkPillar: (id: number) => {
    return get().filterPillars.includes(id)
  },


  // FILTER COUNTRIES
  filterCountries: [] as number[],
  toggleCountry: (id: number) => {
    if (get().filterCountries.includes(id)) {
      set(state => ({filterCountries: state.filterCountries.filter(countryId => countryId !== id)}))
    } else {
      set(state => ({filterCountries: [...state.filterCountries, id]}))
    }
    get().updateInitiativesCountMap()
  },
  clearCountries: () => {
    set({filterCountries: []})
    get().updateInitiativesCountMap()
  },
  checkCountry: (id: number) => {
    return get().filterCountries.includes(id)
  },

  // FILTER AUDIENCES
  filterAudiences: [] as number[],
  toggleAudience: (id: number) => {
    if (get().filterAudiences.includes(id)) {
      set(state => ({filterAudiences: state.filterAudiences.filter(audienceId => audienceId !== id)}))
    } else {
      set(state => ({filterAudiences: [...state.filterAudiences, id]}))
    }
    get().updateInitiativesCountMap()
  },
  clearAudiences: () => {
    set({filterAudiences: []})
    get().updateInitiativesCountMap()
  },
  checkAudience: (id: number) => {
    return get().filterAudiences.includes(id)
  }
})))


/*const audienceSub = useInitiativesStore.subscribe((state) => state.filterAudiences, () => {
  useInitiativesStore.getState().updateInitiativesCountMap()
  console.log("Audiences changed, updated local storage")
})*/



export default useInitiativesStore

