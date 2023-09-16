import useInitiativesStore from "src/stores/initiativesStore";
import Initiative from "../interfaces/initiative";


function InitiativeGridView({ initiatives }: { initiatives: Initiative[] }) {

  const pillars = useInitiativesStore((state) => state.taxonomyPillars)
  const countries = useInitiativesStore((state) => state.taxonomyCountries)

  return (
    <div className="initiatives-container-grid">
      {initiatives.map((initiative) => {
        return (
          <div key={`initiative-${initiative.id}`} className="initiative-item">
            <a className="initiative-item__link" href={initiative.url}>
              <div className="initiative-item__image">
                <img className="rounded" src={initiative.image} alt={initiative.title} />
              </div>
            </a>
            <div className="initiative-item__pillars">
              {initiative.pillars.map((pillarId) => {
                const pillar = pillars.find((p) => p.id == pillarId)
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
            <div className="initiative-item__countries mt-2">{initiative.countries.map(x => countries.find(c => c.id == x)?.name).join(", ")}</div>
            <a className="initiative-item__link" href={initiative.url}>
              <div className="initiative-item__name">{initiative.title}</div>
            </a>
          </div>
        )
      })}
    </div>
  )
}

export default InitiativeGridView