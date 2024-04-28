import useIsMobile from './../../hooks/useIsMobile';
import React, { useEffect, useState } from 'react';
import TravelPlannerDetailsModal from './TravelPlannerDetailsModal';
import LineDetailsComponent from './LineDetailsChild';

async function fetchLineDetails(lineId) {
    const theId = lineId;
    const response = await fetch('https://api.entur.io/journey-planner/v3/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ET-Client-Name': 'movai-alpha-node'
      },
      body: JSON.stringify({
        query: `
        {
            serviceJourney(
              id: "${theId}") 
             {
                privateCode
                transportMode
                transportSubmode
                estimatedCalls {
                  quay {
                    name
                    id
                    stopType
                    publicCode
                    situations {
                      advice {
                        language
                        value
                      }
                      description {
                        language
                        value
                      }
                      infoLinks {
                        label
                        uri
                      }
                      severity
                      summary {
                        language
                        value
                      }
                    }
                    longitude
                    latitude
                  }
                  expectedArrivalTime
                  notices {
                    id
                    publicCode
                    text
                  }
                  forAlighting
                  forBoarding
                  expectedDepartureTime
                }
                publicCode
                wheelchairAccessible
                operator {
                  name
                  id
                  phone
                  url
                }
                line {
                    id
                    name
                    publicCode
                  }
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

// The component to render line details, with a modal for mobile devices
const TravelPlannerLineDetails = ({ lineId }) => {
    const [lineDetails, setLineDetails] = useState(null);
    const isMobile = useIsMobile();
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        fetchLineDetails(lineId)
            .then(data => {
                setLineDetails(data.data);
                // Automatically open the modal on mobile devices upon data load
                if (isMobile) setModalOpen(true);
            })
            .catch(error => console.error('Error fetching line details:', error));
    }, [lineId, isMobile]);

    if (!lineDetails) {
        return <div>Laster</div>;
    }

    return (
        <>
            {isMobile ? (
                <TravelPlannerDetailsModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                    <LineDetailsComponent lineDetails={lineDetails} />
                </TravelPlannerDetailsModal>
            ) : (
                <LineDetailsComponent lineDetails={lineDetails} />
            )}
        </>
    );
};

export default TravelPlannerLineDetails;
