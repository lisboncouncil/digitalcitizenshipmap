import useInitiativesStore from "./stores/initiativesStore"
import Initiative from "./interfaces/initiative"
import { useEffect, useState } from "react"
import Filter from "./components/filter"
import InitiativeGridView from "./components/initiativeGridView"
import InitiativeListView from "./components/initiativeListView"

type DisplayMode = "grid" | "list"

function InitiativesManager() {

  const initiatives = useInitiativesStore<Initiative[]>((state) => state.initiativesFiltered())
  const fetchInitiatives = useInitiativesStore((state) => state.fetchInitiatives)

  const [displayMode, setDisplayMode] = useState("grid" as DisplayMode)

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
            <button id="sort-latest" key="sort-az" className="ifr-button mt-2">A - Z</button>
          </div>
        </div>
        <div className="display-modes">
          <button id="display-mode-grid" key="display-mode-grid" className={`ms-3 ifr-button mt-2 ${displayMode == "grid" && "active"}`} onClick={() => setDisplayMode("grid")}>Grid</button>
          <button id="display-mode-list" key="display-mode-list" className={`ms-3 ifr-button mt-2 ${displayMode == "list" && "active"}`} onClick={() => setDisplayMode("list")}>List</button>
        </div>
      </div>
    </div>
    {initiatives.length == 0 && <div className="text-center">No initiatives found</div>}
    { displayMode == "grid" && <InitiativeGridView initiatives={initiatives} />}
    { displayMode == "list" && <InitiativeListView initiatives={initiatives} /> }
  </div>)
}


export default InitiativesManager

