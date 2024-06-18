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

  const taxonomyPillarsMap = useInitiativesStore((state) => state.taxonomyPillarsMap)
  const taxonomyCountriesMap = useInitiativesStore((state) => state.taxonomyCountriesMap)
  const taxonomyAudiencesMap = useInitiativesStore((state) => state.taxonomyAudiencesMap)


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

  const initiativesPillarsMap = useInitiativesStore((state) => state.initiativesPillarsMap)
  const initiativesCountriesMap = useInitiativesStore((state) => state.initiativesCountriesMap)
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
    <div id="initiatives-filter" className="mb-lg-4 mb-lg-3">


      <div className="d-block d-lg-none" id="filter-mobile-button-activator">
        <button className="ifr-button" type="button" data-bs-toggle="offcanvas" data-bs-target="#offCanvasFilterMobile" aria-controls="offCanvasFilterMobile">
          Open Filters
        </button>
      </div>

      <div className="d-none d-lg-flex justify-start items-center mb-3 pb-3 ifr-border-bottom" id="filter-desktop">
        <div className="dropdown filter-dropdown filter-dropdown__pillars">
          <button className="ifr-button dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Pillars
          </button>
          <ul className="dropdown-menu" data-bs-auto-close="outside" onClick={(e) => { e.stopPropagation(); }}>
            {taxonomyPillars.map((pillar) => {
              return (
                <li className="position-relative dropdown-item" key={`pillar-${pillar.id}`} onClick={(e) => { e.preventDefault(); e.stopPropagation(); togglePillar(pillar.id) }}>
                  <fieldset>
                    <div className="form-check ps-0 pe-3">
                      <input className="form-check-input position-absolute ms-2 me-2 end-0" onClick={(e) => { e.stopPropagation(); togglePillar(pillar.id) }} checked={checkPillar(pillar.id)}
                        disabled={initiativesPillarsMap[pillar.id] == null}
                        type="checkbox" name={`pillar-${pillar.id}`}
                        id={`pillar-${pillar.id}`}
                      />
                      <label className={`form-check-label`} htmlFor={`pillar-${pillar.id}`} >
                        {pillar.name}<span className="ms-2 me-2 counter d-none">({initiativesPillarsMap[pillar.id]?.length || "0"})</span>
                      </label>
                    </div>
                  </fieldset>
                </li>
              )
            }
            )}
          </ul>
        </div>

        <div className="dropdown filter-dropdown filter-dropdown__countries ms-2">
          <button className="ifr-button dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Countries
          </button>
          <ul className="dropdown-menu" data-bs-auto-close="outside" onClick={(e) => { e.stopPropagation(); }}>
            {taxonomyCountries.map((country) => {
              return (
                <li className="position-relative dropdown-item" key={`country-${country.id}`} onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleCountry(country.id) }}>
                  <fieldset>
                    <div className="form-check ps-0 pe-3">
                      <input className="form-check-input position-absolute ms-2 me-2 end-0" onClick={(e) => { e.stopPropagation(); toggleCountry(country.id) }} checked={checkCountry(country.id)}
                        //disabled={initiativesCountriesMap[country.id] == null}
                        type="checkbox" name={`country-${country.id}`}
                        id={`country-${country.id}`}
                      />
                      <label className="form-check-label" htmlFor={`country-${country.id}`} >
                        {country.name}<span className="ms-2 me-2 counter d-none">({ initiativesCountriesMap[country.id]?.length || "0" })</span>
                      </label>
                    </div>
                  </fieldset>
                </li>
              )
            }
            )}
          </ul>
        </div>

        <div className="dropdown filter-dropdown filter-dropdown__countries ms-2">
          <button className="ifr-button dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            Audiences
          </button>
          <ul className="dropdown-menu" data-bs-auto-close="outside" onClick={(e) => { e.stopPropagation(); }}>
            {taxonomyAudiences.map((audience) => {
              return (
                <li className="position-relative dropdown-item" key={`audience-${audience.id}`} onClick={(e) => { e.preventDefault(); e.stopPropagation(); initiativesAudiencesMap[audience.id]?.length && toggleAudience(audience.id) }}>
                  <fieldset>
                    <div className="form-check ps-0 pe-3">
                      <input className="form-check-input position-absolute ms-2 me-2 end-0" onClick={(e) => { e.stopPropagation(); initiativesAudiencesMap[audience.id]?.length && toggleAudience(audience.id) }} checked={checkAudience(audience.id)}
                        disabled={initiativesAudiencesMap[audience.id] == null}
                        type="checkbox" name={`audience-${audience.id}`}
                        id={`audience-${audience.id}`}
                      />
                      <label className="form-check-label" htmlFor={`audience-${audience.id}`} >
                        {audience.name}<span className="ms-2 me-2 counter d-none">({initiativesAudiencesMap[audience.id]?.length || "0"})</span>
                      </label>
                    </div>
                  </fieldset>
                </li>
              )
            }
            )}
          </ul>
        </div>
      </div>

      {(filterPillars.length + filterCountries.length + filterAudiences.length) > 0 && (
      <div className="d-flex justify-start items-center flex-wrap mt-2 mb-2 mb-lg-5" id="selected-filter-desktop-mobile">

        {filterPillars.map((pillarId) => {
          const pillar = taxonomyPillarsMap[pillarId]
          return (
            <div className="ifr-button me-2 mb-2" key={`pillar-${pillarId}`} onClick={() => togglePillar(pillarId)}>
              {pillar?.name}
              <i className="ms-2 pointer fa-solid fa-xmark"></i>
            </div>
          )
        })}
        {filterCountries.map((countryId) => {
          const pillar = taxonomyCountriesMap[countryId]
          return (
            <div className="ifr-button me-2 mb-2" key={`country-${countryId}`} onClick={() => toggleCountry(countryId)}>
              {pillar?.name}
              <i className="ms-2 pointer fa-solid fa-xmark"></i>
            </div>
          )
        })}
        {filterAudiences.map((audienceId) => {
          const pillar = taxonomyAudiencesMap[audienceId]
          return (
            <div className="ifr-button me-2 mb-2" key={`audience-${audienceId}`} onClick={() => toggleAudience(audienceId)}>
              {pillar?.name}
              <i className="ms-2 pointer fa-solid fa-xmark"></i>
            </div>
          )
        })}
        {(filterPillars.length + filterCountries.length + filterAudiences.length) > 0 && <div className="ifr-button me-2 mb-2" onClick={() => { clearPillars(); clearCountries(); clearAudiences() }}>
          Clear Filters
          <i className="ms-2 pointer fa-solid fa-xmark"></i>
        </div>}
      </div>)}

      <div className="offcanvas offcanvas-bottom" style={{ height: "80vh" }} tabIndex={-1} id="offCanvasFilterMobile" aria-labelledby="offCanvasFilterMobileLabel">
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offCanvasFilterMobileLabel">Filters</h5>
          <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">

          <div className="accordion" id="accordionMobileFilters">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapsePillars" aria-expanded="true" aria-controls="collapsePillars">
                  Pillars
                </button>
              </h2>
              <div id="collapsePillars" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionMobileFilters">
                <div className="accordion-body">
                  {taxonomyPillars.map((pillar) => {
                    return (
                      <li className="position-relative dropdown-item pb-2 pt-2 ifr-border-bottom" key={`m-pillar-${pillar.id}`} onClick={(e) => { e.preventDefault(); e.stopPropagation(); initiativesPillarsMap[pillar.id]?.length > 0 && togglePillar(pillar.id) }}>
                        <fieldset>
                          <div className="form-check ps-0 pe-3">
                            <input className="form-check-input position-absolute ms-2 me-2 end-0" onClick={(e) => { e.stopPropagation(); initiativesPillarsMap[pillar.id]?.length > 0 && togglePillar(pillar.id) }} checked={checkPillar(pillar.id)}
                              disabled={initiativesPillarsMap[pillar.id] == null}
                              type="checkbox" name={`m-pillar-${pillar.id}`}
                              id={`m-pillar-${pillar.id}`}
                            />
                            <label className="form-check-label" htmlFor={`m-pillar-${pillar.id}`} >
                              {pillar.name}<span className="ms-2 me-2 counter d-none">({initiativesPillarsMap[pillar.id]?.length || "0"})</span>
                            </label>
                          </div>
                        </fieldset>
                      </li>
                    )
                  }
                  )}
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCountries" aria-expanded="false" aria-controls="collapseCountries">
                  Countries
                </button>
              </h2>
              <div id="collapseCountries" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionMobileFilters">
                <div className="accordion-body">
                  {taxonomyCountries.map((country) => {
                    return (
                      <li className="position-relative dropdown-item pb-2 pt-2 ifr-border-bottom" key={`m-country-${country.id}`} onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleCountry(country.id) }}>
                        <fieldset>
                          <div className="form-check ps-0 pe-3">
                            <input className="form-check-input position-absolute ms-2 me-2 end-0" onClick={(e) => { e.stopPropagation(); toggleCountry(country.id) }} checked={checkCountry(country.id)}
                              disabled={initiativesCountriesMap[country.id] == null}
                              type="checkbox" name={`m-country-${country.id}`}
                              id={`m-country-${country.id}`}
                            />
                            <label className="form-check-label" htmlFor={`m-country-${country.id}`} >
                              {country.name}<span className="ms-2 me-2 counter d-none">({initiativesCountriesMap[country.id]?.length || "0"})</span>
                            </label>
                          </div>
                        </fieldset>
                      </li>
                    )
                  }
                  )}
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseAudiences" aria-expanded="false" aria-controls="collapseAudiences">
                  Audiences
                </button>
              </h2>
              <div id="collapseAudiences" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionMobileFilters">
                <div className="accordion-body">
                  {taxonomyAudiences.map((audience) => {
                    return (
                      <li className="position-relative dropdown-item pb-2 pt-2 ifr-border-bottom" key={`m-audience-${audience.id}`} onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleAudience(audience.id) }}>
                        <fieldset>
                          <div className="form-check ps-0 pe-3">
                            <input className="form-check-input position-absolute ms-2 me-2 end-0" onClick={(e) => { e.stopPropagation(); toggleAudience(audience.id) }} checked={checkAudience(audience.id)}
                              disabled={initiativesAudiencesMap[audience.id] == null}
                              type="checkbox" name={`m-audience-${audience.id}`}
                              id={`m-audience-${audience.id}`}
                            />
                            <label className="form-check-label" htmlFor={`m-audience-${audience.id}`} >
                              {audience.name}<span className="ms-2 me-2 counter d-none">({initiativesAudiencesMap[audience.id]?.length || "0"})</span>
                            </label>
                          </div>
                        </fieldset>
                      </li>
                    )
                  }
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filter