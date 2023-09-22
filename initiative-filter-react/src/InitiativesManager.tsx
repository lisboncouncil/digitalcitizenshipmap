import useInitiativesStore, { SortBy } from "./stores/initiativesStore"
import Initiative from "./interfaces/initiative"
import { useState } from "react"
import Filter from "./components/filter"
import InitiativeGridView from "./components/initiativeGridView"
import InitiativeListView from "./components/initiativeListView"


const gridIcon = <svg width="20" height="20" viewBox="0 0 24 24" preserveAspectRatio="none" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
        d="M22 8.52V3.98C22 2.57 21.36 2 19.77 2H15.73C14.14 2 13.5 2.57 13.5 3.98V8.51C13.5 9.93 14.14 10.49 15.73 10.49H19.77C21.36 10.5 22 9.93 22 8.52Z"
         stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path
        d="M22 19.77V15.73C22 14.14 21.36 13.5 19.77 13.5H15.73C14.14 13.5 13.5 14.14 13.5 15.73V19.77C13.5 21.36 14.14 22 15.73 22H19.77C21.36 22 22 21.36 22 19.77Z"
         stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path
        d="M10.5 8.52V3.98C10.5 2.57 9.86 2 8.27 2H4.23C2.64 2 2 2.57 2 3.98V8.51C2 9.93 2.64 10.49 4.23 10.49H8.27C9.86 10.5 10.5 9.93 10.5 8.52Z"
        stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path
        d="M10.5 19.77V15.73C10.5 14.14 9.86 13.5 8.27 13.5H4.23C2.64 13.5 2 14.14 2 15.73V19.77C2 21.36 2.64 22 4.23 22H8.27C9.86 22 10.5 21.36 10.5 19.77Z"
        stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>
    
const listIcon = <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
  <path d="M19.9 13.5H4.1C2.6 13.5 2 14.14 2 15.73V19.77C2 21.36 2.6 22 4.1 22H19.9C21.4 22 22 21.36 22 19.77V15.73C22 14.14 21.4 13.5 19.9 13.5Z"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M19.9 2H4.1C2.6 2 2 2.64 2 4.23V8.27C2 9.86 2.6 10.5 4.1 10.5H19.9C21.4 10.5 22 9.86 22 8.27V4.23C22 2.64 21.4 2 19.9 2Z"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

const mapIcon = <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.28998 7.77998V17.51C2.28998 19.41 3.63998 20.19 5.27998 19.25L7.62998 17.91C8.13998 17.62 8.98998 17.59 9.51998 17.86L14.77 20.49C15.3 20.75 16.15 20.73 16.66 20.44L20.99 17.96C21.54 17.64 22 16.86 22 16.22V6.48998C22 4.58998 20.65 3.80998 19.01 4.74998L16.66 6.08998C16.15 6.37998 15.3 6.40998 14.77 6.13998L9.51998 3.51998C8.98998 3.25998 8.13998 3.27998 7.62998 3.56998L3.29998 6.04998C2.73998 6.36998 2.28998 7.14998 2.28998 7.77998Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.56 4V17" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.73 6.62012V20.0001" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


type DisplayMode = "grid" | "list"

function InitiativesManager() {

  const initiatives = useInitiativesStore<Initiative[]>((state) => state.initiativesFiltered())
  const sortBy = useInitiativesStore<SortBy>((state) => state.sortBy)
  const updateSortBy = useInitiativesStore((state) => state.updateSortBy)

  const [displayMode, setDisplayMode] = useState("grid" as DisplayMode)
  
  return (<div id="initiatives-container">
    <Filter />
    <div className="mt-5 mb-5">
      <div className="d-lg-flex justify-content-between">
        <div className="sorty-by-controller">
          <div className="sort-by color-primary">Sort by
            <button id="sort-latest" key="sort-latest" onClick={() => updateSortBy("DATE")} className={`ms-2 ifr-button mt-2 ${sortBy === "DATE" ? 'active' : ''}`}>Latest</button>
            <button id="sort-latest" key="sort-az" onClick={() => updateSortBy("NAME")}  className={`ifr-button mt-2 ${sortBy === "NAME" ? 'active' : ''}`}>A - Z</button>
          </div>
        </div>
        <div className="display-modes color-primary">Display
          <button id="display-mode-grid" key="display-mode-grid" className={`ms-2 ifr-button mt-2 ${displayMode === "grid" && "active"}`} onClick={() => setDisplayMode("grid")}>{gridIcon}</button>
          <button id="display-mode-list" key="display-mode-list" className={`ifr-button mt-2 ${displayMode === "list" && "active"}`} onClick={() => setDisplayMode("list")}>{listIcon}</button>
          <button id="display-mode-list" key="display-mode-map" className={`ifr-button mt-2`}>{mapIcon}</button>
        </div>
      </div>
    </div>
    {initiatives.length === 0 && <div className="text-center">No initiatives found</div>}
    { displayMode === "grid" && <InitiativeGridView initiatives={initiatives} />}
    { displayMode === "list" && <InitiativeListView initiatives={initiatives} /> }
  </div>)
}


export default InitiativesManager

