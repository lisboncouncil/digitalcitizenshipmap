import useInitiativesStore, { SortBy } from "./stores/initiativesStore"
import Initiative from "./interfaces/initiative"
import React, { useState, useMemo, useEffect } from "react"
import Filter from "./components/filter"
import InitiativeGridView from "./components/initiativeGridView"
import InitiativeListView from "./components/initiativeListView"
import InitiativeCountryMap from "./components/initiativeCountryMapView"
import debounce from "./lib/debounce"

    
type DisplayMode = "grid" | "list" | "map"

function InitiativesManager() {

  const initiatives = useInitiativesStore<Initiative[]>((state) => state.initiativesFiltered())
  const sortBy = useInitiativesStore<SortBy>((state) => state.sortBy)
  const updateSortBy = useInitiativesStore((state) => state.updateSortBy)
  const updateStoreSearch = useInitiativesStore((state) => state.updateSearchInput)
  const searchInput = useInitiativesStore((state) => state.searchInput)
  const [displayMode, setDisplayMode] = useState("grid" as DisplayMode)

  const [searchValue, setSearchValue] = useState(searchInput)

  const updateSearchMemoed = useMemo( 
    () => debounce((value) => { updateStoreSearch(value) }, 500), [updateStoreSearch] )

  useEffect(() => {
    updateSearchMemoed(searchValue)
  }, [searchValue, updateSearchMemoed])





  return (<div id="initiatives-container">
    <Filter />
    <div className="mt-lg-5 pb-5 mb-5 ifr-border-bottom">
      <div className="mt-3 mt-lg-auto d-lg-flex justify-content-between">
        <div className="sort-by-controller">
          <div className="sort-by color-primary">Sort by
            <button id="sort-latest" key="sort-latest" onClick={() => updateSortBy("DATE")} className={`ms-2 ifr-button mt-2 ${sortBy === "DATE" ? 'active' : ''}`}>Latest</button>
            <button id="sort-latest" key="sort-az" onClick={() => updateSortBy("NAME")}  className={`ifr-button mt-2 ${sortBy === "NAME" ? 'active' : ''}`}>A - Z</button>
          </div>
        </div>
        <div className="search-container mt-3 mt-lg-auto">
          <div className="ifr-input-field">
            { searchValue === "" && (<span className="ifr-input-icon"><i className="fa-solid fa-magnifying-glass"></i></span>)}
            { searchValue !== "" && (<span className="ifr-input-icon" onClick={() => setSearchValue("")}><i className="cursor-pointer fa-solid fa-xmark"></i></span>)}
            <input type="text" name="search" id="search" value={searchValue} onInput={(e: React.FormEvent<EventTarget>) => setSearchValue((e.target as HTMLInputElement).value)} className="ifr-input search-input" placeholder="Search" />
          </div>
        </div>
        <div className="mt-3 mt-lg-auto display-modes color-primary">Display
          <button id="display-mode-grid" key="display-mode-grid" className={`ms-2 ifr-button ${displayMode === "grid" && "active"}`} onClick={() => setDisplayMode("grid")}>
            <div className="ifr-input-icon"><i className="fa-solid fa-grip"></i></div>
          </button>
          <button id="display-mode-list" key="display-mode-list" className={`ifr-button ${displayMode === "list" && "active"}`} onClick={() => setDisplayMode("list")}>
            <div className="ifr-input-icon"><i className="fa-solid fa-list"></i></div>
          </button>
          <button id="display-mode-list" key="display-mode-map" className={`ifr-button ${displayMode === "map" && "active"}`} onClick={() => setDisplayMode("map")}>
            <div className="ifr-input-icon"><i className="fa-regular fa-map"></i></div>
          </button>
        </div>
      </div>
    </div>
    { displayMode === "grid" && <InitiativeGridView initiatives={initiatives} />}
    { displayMode === "list" && <InitiativeListView initiatives={initiatives} /> }
    { displayMode === "map" && <InitiativeCountryMap initiatives={initiatives} /> }
  </div>)
}


export default InitiativesManager

