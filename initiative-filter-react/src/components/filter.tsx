import { useEffect, useState } from "react"
import useInitiativesStore from "src/stores/initiativesStore"

function Filter() {
  const [isOpen, setOpen] = useState(false)

  const getIcon = () => isOpen ? "▲" : "▼"

  const fetchData = useInitiativesStore((state) => state.fetchData)
  const updateInitiativesMap = useInitiativesStore((state) => state.updateInitiativesMap)

  const taxonomyCountries = useInitiativesStore((state) => state.taxonomyCountries)
  const taxonomyPillars = useInitiativesStore((state) => state.taxonomyPillars)
  const taxonomyAudiences = useInitiativesStore((state) => state.taxonomyAudiences)

  const filterPillars = useInitiativesStore((state) => state.filterPillars)
  const filterCountries = useInitiativesStore((state) => state.filterCountries)
  const filterAudiences = useInitiativesStore((state) => state.filterAudiences)

  const clearPillars = useInitiativesStore((state) => state.clearPillars)
  const clearCountries = useInitiativesStore((state) => state.clearCountries)
  const clearAudiences = useInitiativesStore((state) => state.clearAudiences)

  const togglePillar = useInitiativesStore((state) => state.togglePillar)
  const toggleCountry = useInitiativesStore((state) => state.toggleCountry)
  const toggleAudience = useInitiativesStore((state) => state.toggleAudience)

  const checkPillar = useInitiativesStore((state) => state.checkPillar)
  const checkCountry = useInitiativesStore((state) => state.checkCountry)
  const checkAudience = useInitiativesStore((state) => state.checkAudience)


  useEffect(() => {
    (async () => {
      await fetchData()
      updateInitiativesMap()
    })()
  }, [fetchData])


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
              onClick={() => togglePillar(pillar.id)}
              className={`ifr-button inverted ms-2 mt-2 ${checkPillar(pillar.id) ? "active" : ""} pillar-bg pillar-bg-${pillar.id}`}>
              {pillar.name}
              <span className="ms-2 counter">({pillar.initiatives_count})</span>
            </button>
          )}
        </div>
        <div className="filter-open-container__countries">
          <button className={`ifr-button inverted ms-2 mt-2 ${filterCountries.length == 0 && "active"}`} onClick={clearCountries}>All countries</button>

          {taxonomyCountries.map((country) => 
            <button onClick={() => toggleCountry(country.id)} 
            key={`country-${country.id}`} id={`country-${country.id}`} 
            className={`ifr-button inverted ms-2 mt-2 ${checkCountry(country.id) ? "active" : ""}`}>
              {country.name} <span className="counter">({country.initiatives_count})</span></button>)}
        </div>
        <div className="filter-open-container__audiences">
          <button className={`ifr-button inverted ms-2 mt-2 ${filterAudiences.length == 0 && "active"}`} onClick={clearAudiences}>All audiences</button>
          {taxonomyAudiences.map((audience) =>
            <button key={`audience-${audience.id}`}
              id={`audience-${audience.id}`}
              onClick={() => toggleAudience(audience.id)}
              className={`ifr-button inverted ms-2 mt-2 ${checkAudience(audience.id) ? "active" : ""}`}>
              {audience.name} <span className="counter">({audience.initiatives_count})</span></button>)}
        </div>
      </div>

    </div>
  )
}

export default Filter