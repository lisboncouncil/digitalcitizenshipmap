import { useEffect, useState } from "react"
import useInitiativesStore from "src/stores/initiativesStore"

function Filter() {
  const [isOpen, setOpen] = useState(false)

  const getIcon = () => isOpen ? "▲" : "▼"

  const fetchCountries = useInitiativesStore((state) => state.fetchCountries)
  const fetchPillars = useInitiativesStore((state) => state.fetchPillars)
  const fetchAudiences = useInitiativesStore((state) => state.fetchAudiences)
  
  const fetchInitiatives = useInitiativesStore((state) => state.fetchInitiatives)
  
  const taxonomyCountries = useInitiativesStore((state) => state.taxonomyCountries)
  const taxonomyPillars = useInitiativesStore((state) => state.taxonomyPillars)
  const taxonomyAudiences = useInitiativesStore((state) => state.taxonomyAudiences)

  const filterPillars = useInitiativesStore((state) => state.filterPillars)
  const filterPillarsCheck = useInitiativesStore((state) => state.filterByPillar_check)
  const filterPillarsAdd = useInitiativesStore((state) => state.filterByPillar_add)
  const filterPillarsRemove = useInitiativesStore((state) => state.filterByPillar_remove)
  const filterPillarsClear = useInitiativesStore((state) => state.filterByPillar_clear)

  const filterCountries = useInitiativesStore((state) => state.filterCountries)
  const filterCountriesCheck = useInitiativesStore((state) => state.filterByCountry_check)
  const filterCountriesAdd = useInitiativesStore((state) => state.filterByCountry_add)
  const filterCountriesRemove = useInitiativesStore((state) => state.filterByCountry_remove)
  const filterCountriesClear = useInitiativesStore((state) => state.filterByCountry_clear)

  const filterAudiences = useInitiativesStore((state) => state.filterAudiences)
  const filterAudiencesCheck = useInitiativesStore((state) => state.filterByAudience_check)
  const filterAudiencesAdd = useInitiativesStore((state) => state.filterByAudience_add)
  const filterAudiencesRemove = useInitiativesStore((state) => state.filterByAudience_remove)
  const filterAudiencesClear = useInitiativesStore((state) => state.filterByAudience_clear)

  const clearPillars = () => {
    filterPillarsClear()
    fetchInitiatives()
  }

  const clearCountries = () => {
    filterCountriesClear()
    fetchInitiatives()
  }

  const clearAudiences = () => {
    filterAudiencesClear()
    fetchInitiatives()
  }

  const onPillarClick = (pillarId: number) => {
    console.log("Pillar click", pillarId)
    if (filterPillarsCheck(pillarId)) {
      filterPillarsRemove(pillarId)
    } else {
      filterPillarsAdd(pillarId)
    }
    fetchInitiatives()
  }

  const onCountryClick = (countryId: number) => {
    console.log("Country click", countryId)
    if (filterCountriesCheck(countryId)) {
      filterCountriesRemove(countryId)
    }
    else {
      filterCountriesAdd(countryId)
    }
    fetchInitiatives()
  }

  const onAudienceClick = (audienceId: number) => {
    console.log("Audience click", audienceId)
    if (filterAudiencesCheck(audienceId)) {
      filterAudiencesRemove(audienceId)
    }
    else {
      filterAudiencesAdd(audienceId)
    }
    fetchInitiatives()
  }

  useEffect(() => {
    (async () => {
      await fetchCountries()
      await fetchPillars()
      await fetchAudiences()
    })()
  }, [fetchCountries, fetchPillars])

  
  return (
    <div id="initiatives-filter" className="mb-4">
      {!isOpen &&
        <button className="ifr-button d-block w-100" onClick={() => setOpen(!isOpen)}>Filters {getIcon()}</button>
      }

      <div className={`filter-open-container ${isOpen ? 'expanded' : ''}`}>
        <div className="filter-open-container__toggle" onClick={() => setOpen(!isOpen)}>
          Close &times;
        </div>
        <div className="filter-open-container__pillars">
          <button className={`ifr-button inverted ms-2 mt-2 ${filterPillars.length == 0 && "active"}`} onClick={clearPillars}>All pillars</button>
          {taxonomyPillars.map((pillar) =>
            <button
              id={`pillar-${pillar.id}`}
              key={`pillar-${pillar.id}`}
              onClick={() => onPillarClick(pillar.id)}
              className={`ifr-button inverted ms-2 mt-2 ${filterPillarsCheck(pillar.id) ? "active" : ""}`}
              style={filterPillarsCheck(pillar.id) && pillar.field_color_hex ? { backgroundColor: pillar.field_color_hex, borderColor: pillar.field_color_hex, color: "white"} : {}}>
                {pillar.name}
              <span className="ms-2 counter">({pillar.initiatives_count})</span>
            </button>
          )}
        </div>
        <div className="filter-open-container__countries">
          <button className={`ifr-button inverted ms-2 mt-2 ${filterCountries.length == 0 && "active"}`} onClick={clearCountries}>All countries</button>

          {taxonomyCountries.map((country) => <button onClick={() => onCountryClick(country.id)} key={`country-${country.id}`} id={`country-${country.id}`} className={`ifr-button inverted ms-2 mt-2 ${filterCountriesCheck(country.id) ? "active" : ""}`}>{country.name} <span className="counter">({country.initiatives_count})</span></button>)}
        </div>
        <div className="filter-open-container__audiences">
          <button className={`ifr-button inverted ms-2 mt-2 ${filterAudiences.length == 0 && "active"}`} onClick={clearAudiences}>All pillars</button>
          {taxonomyAudiences.map((audience) => <button key={`audience-${audience.id}`} id={`audience-${audience.id}`} onClick={() => onAudienceClick(audience.id)} className={`ifr-button inverted ms-2 mt-2 ${filterAudiencesCheck(audience.id) ? "active" : ""}`}>{audience.name} <span className="counter">({audience.initiatives_count})</span></button>)}
        </div>
      </div>

    </div>
  )
}

export default Filter