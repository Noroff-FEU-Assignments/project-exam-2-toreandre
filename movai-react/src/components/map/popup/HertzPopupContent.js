const HertzPopupContent = ({ feature }) => {
    let availableVehiclesText = '';
    const availableCars = JSON.parse(feature.properties.available_vehicles);

    if (availableCars.length !== 0) {
        availableVehiclesText = availableCars.filter(car => 
            car.station_id === feature.properties.station_id &&
            !car.is_reserved &&
            !car.is_disabled
        ).map(car => {
            const propulsionType = car.propulsion_type === "electric" ? "Elektrisk" : car.propulsion_type === "combustion" ? "Bensin" : "Ukjent";
            return (
                <div className='cr-popup-car' key={car.id}>
                    <p>{car.title}</p>
                    <p className='cr-popup-meta'>{propulsionType}</p>
                </div>
            );
        });
    } else {
        availableVehiclesText = <div className="cr-popup-car"><p>Ingen ledige biler</p></div>;
    }

    return (
        <div className="cr-popup-content">
            <div className="cr-popup-header">
                <h3>{feature.properties.operator}</h3>
                <p className="cr-popup-meta">Bildeling</p>
            </div>
            <div className="cr-popup-body">
                <p><b>Tilgjengelige kjøretøy</b></p>
                {availableVehiclesText}
            </div>
            <p className="text-align-center"><b>Åpne</b></p>
            <div className="pop-up-logos">
                <a href={feature.properties.url_web}>    
                    <img src="./images/desktop-icon.png" alt="desktop icon" />
                </a>
            </div>
        </div>
    );
};

export default HertzPopupContent;
