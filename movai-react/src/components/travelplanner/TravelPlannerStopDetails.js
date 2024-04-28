import React, { useEffect, useState } from 'react';
import StopDetailsComponent from './StopDetailsChild';
import TravelPlannerDetailsModal from './TravelPlannerDetailsModal';
import useIsMobile from './../../hooks/useIsMobile';

async function fetchStopDetails(nsrId) {
    const response = await fetch('https://api.entur.io/journey-planner/v3/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ET-Client-Name': 'movai-alpha-node',
      },
      body: JSON.stringify({
        query: `
          {
            quay(id: "${nsrId}") {
              id
              description
              latitude
              longitude
              name
              publicCode
              situations {
                description {
                  language
                  value
                }
                severity
                summary {
                  language
                  value
                }
              }
              wheelchairAccessible
              stopType
            }
          }
        `,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    return response.json();
  }

// Component that fetches and displays stop details for a given NSR ID, and optionally displays them in a modal on mobile devices
const TravelPlannerStopDetails = ({ nsrId }) => {
    const [stopDetails, setStopDetails] = useState(null);
    const isMobile = useIsMobile();
    const [modalOpen, setModalOpen] = useState(false);
  
    useEffect(() => {
        fetchStopDetails(nsrId)
            .then(data => {
                setStopDetails(data.data.quay);
				// Automatically open the modal on mobile devices upon data load
                if (isMobile) setModalOpen(true); 
            })
            .catch(error => console.error('Error fetching stop details:', error));
    }, [nsrId, isMobile]);
  
    if (!stopDetails) {
        return <div>Laster</div>;
    }
  
    return (
      <>
        {isMobile ? (
			<TravelPlannerDetailsModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
				<StopDetailsComponent stopDetails={stopDetails} />
			</TravelPlannerDetailsModal>
        ) : ( <StopDetailsComponent stopDetails={stopDetails} /> )}
      </>
    );
  };
  
  export default TravelPlannerStopDetails;