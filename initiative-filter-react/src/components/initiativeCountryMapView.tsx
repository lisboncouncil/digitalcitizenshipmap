import useInitiativesStore from "src/stores/initiativesStore";
import Initiative from "../interfaces/initiative";
import EuropeMapSvg from "./europeMapSvg";
import { useMemo } from "react";

function InitiativeCountryMap({ initiatives }: { initiatives: Initiative[] }) {

  const pillars = useInitiativesStore((state) => state.taxonomyPillars)
  const countries = useInitiativesStore((state) => state.taxonomyCountries)
  const toggleCountry = useInitiativesStore((state) => state.toggleCountry)
  const taxonomyCountries = useInitiativesStore((state) => state.taxonomyCountries)
  const filterCountries = useInitiativesStore((state) => state.filterCountries)

  const taxonomyCountriesIsoMap = useMemo(() => {
    const isoCountryMap: { [key: string]: number } = {};
    taxonomyCountries.forEach((country) => {
      isoCountryMap[country.field_iso2] = country.id
    })
    return isoCountryMap
  }, [taxonomyCountries])

  const selectedCountriesISO = useMemo(() => {
    return filterCountries.map((countryId) => {
      const country = countries.find((c) => c.id === countryId)
      if (!country) return null
      return country.field_iso2
    }).filter(x => x !== null) as string[]
  }, [filterCountries, countries])

  const enabledCountries = useMemo(() => {
    return countries.filter((country) => country.field_iso2 !== "" && country.field_iso2 !== null).map((country) => country.field_iso2)
  }, [countries])


  const onCountryClick = (countryIso: string) => {
    taxonomyCountriesIsoMap[countryIso] && toggleCountry(taxonomyCountriesIsoMap[countryIso])
  }

    return (
      <div className="initiatives-container-map">
        <div className="row">
          <div className="col-lg-6">
            <div className="initiatives-container-map-grid">
              {initiatives.length === 0 && <div className="text-center">No initiatives found</div>}
              {initiatives.map((initiative) => {
                return (
                  <div key={`initiative-${initiative.id}`} id={initiative.created_at.toString()} className="initiative-item">
                    <a className="initiative-item__link" href={initiative.url}>
                      <div className="initiative-item__image">
                        <img className="rounded" src={initiative.image} alt={initiative.title} />
                      </div>
                    </a>
                    <div className="initiative-item__container">
                      <a className="initiative-item__link" href={initiative.url}>
                        <div className="initiative-item__name">{initiative.title}</div>
                      </a>
                      <div className="initiative-item__countries mt-2">{initiative.countries.map(x => countries.find(c => c.id === x)?.name).join(", ")}</div>
                      <div className="initiative-item__pillars">{initiative.pillars.map((pillarId) => {
                        const pillar = pillars.find((p) => p.id === pillarId)
                        if (!pillar) return null
                        return (<button
                          id={`pillar-${pillar.id}`}
                          key={`pillar-${pillar.id}`}
                          className={`ifr-button small inverted mt-2 pillar-bg pillar-bg-${pillar.id}`}
                        >{pillar.short_label || pillar.name}
                        </button>
                        )
                      })}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="col-lg-6">
            <div className="map-container ifr-border-left mt-5 mt-lg-0 ps-3 pe-2">
              <EuropeMapSvg
                style={{ borderRadius: "1rem", width: "100%", minHeight: "100%", backgroundColor: "rgba(126, 149, 158, 0.07)" }}
                activecolor="#7E959E"
                disabledcolor="#eeeeee"
                preserveAspectRatio="none"
                enabledcountries={enabledCountries}
                oncountryclick={(iso2: string) => {console.log("test");onCountryClick(iso2)}}
                countryselected={selectedCountriesISO} />
            </div>
          </div>
        </div>
      </div>
    )
  }

export default InitiativeCountryMap