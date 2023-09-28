import { useEffect, useState } from "react"
import useInitiativesStore from "src/stores/initiativesStore"

function Filter() {
  const [isOpen, setOpen] = useState(false)

  const getIcon = () => isOpen ? "▲" : "▼"

  const fetchData = useInitiativesStore((state) => state.fetchData)
  //const loadFiltersConfig = useInitiativesStore((state) => state.loadFiltersConfig)

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

  const initiativesCountriesMap = useInitiativesStore((state) => state.initiativesCountriesMap)
  const initiativesPillarsMap = useInitiativesStore((state) => state.initiativesPillarsMap)
  const initiativesAudiencesMap = useInitiativesStore((state) => state.initiativesAudiencesMap)

  const initiatives = useInitiativesStore((state) => state.initiativesFiltered())

  useEffect(() => {
    const initializeData = (async () => {
      console.log("calling fetch data")
      //loadFiltersConfig()
      await fetchData()
    })

    initializeData()
  }, [fetchData])
  

  return (
    <div id="initiatives-filter" className="mb-lg-4 mb-3">
      
      <div className="d-lg-flex justify-start items-center mb-5">

        <div className="dropdown filter-dropdown filter-dropdown__pillars">
          <button className="ifr-button dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              All pillars <span className="ms-2 counter">({initiatives?.length || "0"})</span>
          </button>
          <ul className="dropdown-menu">
            {taxonomyPillars.map((pillar) => {
            return (
              <li className="position-relative">
                <a id={`pillar-${pillar.id}`}
                key={`pillar-${pillar.id}`}
                onClick={() => togglePillar(pillar.id)}
                className={`dropdown-item pe-4 ${checkPillar(pillar.id) ? "active" : ""}`}>
                {pillar.name}
                <span className="ms-2 me-2  counter">({initiativesPillarsMap[pillar.id]?.length || "0"})</span>
                <input onChange={(e) => {e.preventDefault(); e.stopPropagation();}}
                className="position-absolute ms-2 me-2 end-0 filter-checkbox form-check-input" type="checkbox" checked={checkPillar(pillar.id)} 
                key={`check-pillar-${pillar.id}`} id={`check-pillar-${pillar.id}`} />
                </a>
              </li>
            )}
          )}
          </ul>
        </div>

        <div className="dropdown filter-dropdown filter-dropdown__countries ms-3">
          <button className="ifr-button dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              All countries <span className="ms-2 counter">({initiatives?.length || "0"})</span>
          </button>
          <ul className="dropdown-menu" data-bs-auto-close="outside">
            {taxonomyCountries.map((country) => {
            return (
              <li className="position-relative">
                <a id={`country-${country.id}`}
                key={`country-${country.id}`}
                onClick={(e) => {e.preventDefault(); e.stopPropagation(); toggleCountry(country.id)}}
                className={`dropdown-item pe-4`}>
                {country.name}
                <span className="ms-2 me-2 counter">({initiativesCountriesMap[country.id]?.length || "0"})</span>
                <input onChange={(e) => {e.preventDefault(); e.stopPropagation();}}
                className="position-absolute ms-2 me-2 end-0 filter-checkbox form-check-input" type="checkbox" checked={checkCountry(country.id)} 
                key={`check-country-${country.id}`} id={`check-country-${country.id}`} />
                </a>
              </li>
            )}
          )}
          </ul>
        </div>

        <div className="dropdown filter-dropdown filter-dropdown__countries ms-3">
          <button className="ifr-button dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              All audiences <span className="ms-2 counter">({initiatives?.length || "0"})</span>
          </button>
          <ul className="dropdown-menu">
            {taxonomyAudiences.map((audience) => {
            return (
              <li className="position-relative">
                <a id={`audience-${audience.id}`}
                key={`audience-${audience.id}`}
                onClick={(e) => {e.preventDefault(); e.stopPropagation(); toggleAudience(audience.id)}}
                className={`dropdown-item pe-4`}>
                {audience.name}
                <span className="ms-2 me-2 counter">({initiativesAudiencesMap[audience.id]?.length || "0"})</span>
                <input onChange={(e) => {e.preventDefault(); e.stopPropagation();}}
                className="position-absolute ms-2 me-2 end-0 filter-checkbox form-check-input" type="checkbox" checked={checkAudience(audience.id)} 
                key={`check-audience-${audience.id}`} id={`check-audience-${audience.id}`} />
                </a>
              </li>
            )}
          )}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Filter