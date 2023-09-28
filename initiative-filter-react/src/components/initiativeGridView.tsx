import useInitiativesStore from "src/stores/initiativesStore";
import Initiative from "../interfaces/initiative";


function InitiativeGridView({ initiatives }: { initiatives: Initiative[] }) {

  const pillars = useInitiativesStore((state) => state.taxonomyPillars)
  const countries = useInitiativesStore((state) => state.taxonomyCountries)

  return (
    <>
    {initiatives.length === 0 && <div className="text-center">No initiatives found</div>}
    <div className="initiatives-container-grid">
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
    </>
  )
}

export default InitiativeGridView