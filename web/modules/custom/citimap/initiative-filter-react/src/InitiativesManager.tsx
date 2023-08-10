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
    <InitiativeGridView initiatives={initiatives} />
  </div>)
}


export default InitiativesManager

