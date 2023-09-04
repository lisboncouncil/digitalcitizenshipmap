import Initiative from "../interfaces/initiative";

function InitiativeGridView({ initiatives }: { initiatives: Initiative[] }) {
  
  return (
    <div className="initiatives-container-grid">
      { initiatives.map( (initiative) => {
        return (
          <div key={initiative.uuid} className="initiative-item">
            <div className="initiative-item__image">
              <img className="rounded" src={initiative.image} alt={initiative.title}/>
            </div>
            <div className="initiative-item__countries mt-2">{initiative.countries}</div>
            <div className="initiative-item__name">{initiative.title}</div>
          </div>
        )
      }) }
    </div>
  )
}

export default InitiativeGridView