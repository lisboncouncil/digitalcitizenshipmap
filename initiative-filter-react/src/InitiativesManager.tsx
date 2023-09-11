import useInitiativesStore from "./stores/initiativesStore"
import Initiative from "./interfaces/initiative"
import { useEffect } from "react"
import Filter from "./components/filter"
import InitiativeGridView from "./components/initiativeGridView"

function InitiativesManager() {

  const initiatives = useInitiativesStore<Initiative[]>((state) => state.initiatives)
  const fetchInitiatives = useInitiativesStore((state) => state.fetchInitiatives)

  useEffect(() => {
    (async () => {
      await fetchInitiatives()
    })()
  }, [fetchInitiatives])


  return (<div id="initiatives-container">
    <Filter />
    <div className="mt-5 mb-5">
      <div className="d-flex justify-content-between">
        <div className="sorty-by-controller">
          <div className="sort-by">Sort by
            <button id="sort-latest" key="sort-latest" className="ms-3 ifr-button mt-2">Latest</button>
            <button id="sort-latest" key="sort-latest" className="ifr-button mt-2">A - Z</button>
          </div>
        </div>
      </div>
    </div>
    <InitiativeGridView initiatives={initiatives} />
  </div>)
}


export default InitiativesManager

