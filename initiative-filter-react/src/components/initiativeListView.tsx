import useInitiativesStore from "src/stores/initiativesStore";
import Initiative from "../interfaces/initiative";


function InitiativeGridView({ initiatives }: { initiatives: Initiative[] }) {

  const pillars = useInitiativesStore((state) => state.taxonomyPillars)
  const countries = useInitiativesStore((state) => state.taxonomyCountries)

  return (
    <div className="initiatives-container-list">
      {initiatives.length === 0 && <div className="text-center">No initiatives found</div>}
      {initiatives.map((initiative) => {
        return (
            <div key={`initiative-${initiative.id}`} className="row initiative-item">
              <div className="col-md-3 block-left">
                <a className="initiative-item__link" href={initiative.url}>
                  <div className="initiative-item__image">
                    <img className="rounded" src={initiative.image} alt={initiative.title} />
                  </div>
                </a>
              </div>
              <div className="col-md-9">
                <div className="block-right d-flex flex-column justify-content-between">
                  <div>
                    <div className="initiative-item__pillars">
                      {initiative.pillars.map((pillarId) => {
                        const pillar = pillars.find((p) => p.id === pillarId)
                        if (!pillar) return <></>
                        return (<button
                          id={`pillar-${pillar.id}`}
                          key={`pillar-${pillar.id}`}
                          className="ifr-button small inverted mt-2"
                          style={pillar.field_color_hex ? { backgroundColor: pillar.field_color_hex, borderColor: pillar.field_color_hex, color: "white" } : {}}>
                          {pillar.name}
                        </button>
                        )
                      })}
                    </div>
                    <div className="initiative-item__countries mt-2">{initiative.countries.map(x => countries.find(c => c.id === x)?.name).join(", ")}</div>
                    <a className="initiative-item__link" href={initiative.url}>
                      <div className="initiative-item__name">{initiative.title}</div>
                    </a>
                  </div>
                  <div className="initiative-item__description mt-2 mb-2">
                    {initiative.description}
                  </div>
                </div>
              </div>
            </div>
        )})}
      </div >
  )}

export default InitiativeGridView