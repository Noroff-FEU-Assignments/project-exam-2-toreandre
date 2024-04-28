import React from "react";

const defaultOperators = [
    { 
        operator: "Voi",
        shortname: "Voi",
        id: "voi-unclustered-point",
        active: true,
        icon: "voi-bouble",
        type: "scooter",
        sourceFile: "voiData"
    },
    {
        operator: "Bolt",
        shortname: "Bolt",
        id: "bolt-unclustered-point",
        active: true,
        icon: "bolt-bouble",
        type: "scooter",
        sourceFile: "boltData"
    },
    {
        operator: "Ryde",
        shortname: "Ryde",
        id: "ryde-unclustered-point",
        active: true,
        icon: "ryde-bouble",
        type: "scooter",
        sourceFile: "rydeData"
    },
    
    {
        operator: "Oslo bysykkel",
        id: "oslo-bysykkel-unclustered-point",
        shortname: "Oslo",
        active: true,
        icon: "citybike-station-bouble",
        type: "bike",
        sourceFile: "osloBysykkelData"
    },
    {
        operator: "Bergen bysykkel",
        id: "bergen-bysykkel-unclustered-point",
        shortname: "Bergen",
        active: true,
        icon: "citybike-station-bouble",
        type: "bike",
        sourceFile: "bergenbysykkelData"
    },
    {
        operator: "Trondheim bysykkel",
        id: "trondheim-bysykkel-unclustered-point",
        shortname: "Trondheim",
        active: true,
        icon: "citybike-station-bouble",
        type: "bike",
        sourceFile: "trondheimbysykkelData"
    },
    {
        operator: "kolumbusbysykkel",
        id: "kolumbusbysykkel-unclustered-point",
        shortname: "Kolumbus",
        active: true,
        icon: "citybike-station-bouble",
        type: "bike",
        sourceFile: "kolumbusbysykkelData"
    },
    {
        operator: "hertz",
        id: "hertz-unclustered-point",
        shortname: "Hertz",
        active: true,
        icon: "car-bouble-marker",
        type: "car",
        sourceFile: "hertzData"
    },
    {
        operator: "otto",
        id: "otto-unclustered-point",
        shortname: "otto",
        active: true,
        icon: "car-bouble-marker",
        type: "car",
        sourceFile: "ottoData"
    },
    { 
        operator: "akt",
        shortname: "AKT",
        id: "aktStops-unclustered-point",
        active: false,
        icon: "bus-stop-bouble-marker",
        type: "busStop",
        sourceFile: "aktData"
    },
    { 
        operator: "ruter",
        shortname: "Ruter",
        id: "ruterStops-unclustered-point",
        active: false,
        icon: "bus-stop-bouble-marker",
        type: "busStop",
        sourceFile: "stopsRuterData"
    },
    { 
        operator: "atb",
        shortname: "ATB",
        id: "atbStops-unclustered-point",
        active: false,
        icon: "bus-stop-bouble-marker",
        type: "busStop",
        sourceFile: "atbData"
    },
    { 
        operator: "brakar",
        shortname: "Brakar",
        id: "brakarStops-unclustered-point",
        active: false,
        icon: "bus-stop-bouble-marker",
        type: "busStop",
        sourceFile: "brakarData"
    },
    { 
        operator: "nfk",
        shortname: "NFK",
        id: "nfkStops-unclustered-point",
        active: false,
        icon: "bus-stop-bouble-marker",
        type: "busStop",
        sourceFile: "stopsNfkData"
    },
    {
        operator: "elbillader",
        shortname: "elbillader",
        id: "elbillader-unclustered-point",
        active: false,
        icon: "charging-station-bouble",
        type: "elbillader",
        sourceFile: "chargerData"
    },
    {
        operator: "hyre",
        id: "hyre-unclustered-point",
        shortname: "Hyre",
        active: true,
        icon: "car-bouble-marker",
        type: "car",
        sourceFile: "hyreData"
    },
    {
        operator: "badetemperatur-unclustered-point",
        shortname: "Badetemperatur",
        id: "badetemperatur",
        active: false,
        icon: "badetemperatur",
        type: "badetemperatur",
        sourceFile: "badeData"
    }
];

export default defaultOperators;