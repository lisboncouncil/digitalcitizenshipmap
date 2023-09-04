import { useEffect, useState } from "react"
import useInitiativesStore from "src/stores/initiativesStore"

function Filter() {
  const [isOpen, setOpen] = useState(false)

  const getIcon = () => isOpen ? "▲" : "▼"

  const fetchCountries = useInitiativesStore( (state) => state.fetchCountries)
  const fetchPillars = useInitiativesStore( (state) => state.fetchPillars)
  const taxonomyCountries = useInitiativesStore( (state) => state.taxonomyCountries)
  const taxonomyPillars = useInitiativesStore( (state) => state.taxonomyPillars)

  useEffect( () => {
    (async () => {
      await fetchCountries()
      await fetchPillars()
    })()
  }, [fetchCountries, fetchPillars])

  return (
    <div id="initiatives-filter" className="mb-4">
      { !isOpen && 
        <button className="ifr-button d-block w-100" onClick={() => setOpen(!isOpen)}>Filters {getIcon()}</button>
      }
       
      <div className={`filter-open-container ${isOpen ? 'expanded' : ''}`}>
        <div className="filter-open-container__toggle" onClick={() => setOpen(!isOpen)}>
          Close &times;
        </div>
        <div className="filter-open-container__pillars">
          <button className="ifr-button inverted ms-2 mt-2 active">All pillars <span className="counter">(XX)</span></button>
          { taxonomyPillars.map( (pillar) => <button key={pillar.id} className="ifr-button inverted ms-2 mt-2">{pillar.name} <span className="counter">({pillar.initiatives_count})</span></button> ) }
        </div>
        <div className="filter-open-container__countries">
          { taxonomyCountries.map( (country) => <button key={country.id} className="ifr-button inverted ms-2 mt-2">{country.name} <span className="counter">({country.initiatives_count})</span></button> ) }
        </div>
      </div>
      
    </div>
  )
}

export default Filter