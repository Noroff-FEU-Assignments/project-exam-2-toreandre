import React, { useState, useEffect } from 'react';

// Displays a combined list of news and situation messages on the backend
function CombinedMessageContainer() {
    const [messages, setMessages] = useState([]);

    const fetchData = async () => {
        try {
            // Fetch and process news
            const newsResponse = await fetch('./../cr-data/newsData.json');
            const newsData = await newsResponse.json();
            const formattedNews = newsData.map(article => ({
                ...article,
                date: new Date(article.published || article.pubDate),
                type: 'RSS feed',
                source: article.source || "Ukjent kilde",
                description: article.description || "No description available"
            }));

            // Fetch and process situations
            const situationResponse = await fetch('./../cr-data/situations.json');
            const situationData = await situationResponse.json();
            const formattedSituations = situationData.map(item => ({
                ...item,
                date: new Date(item.creationTime),
                type: 'Entur avviksmelding',
                source: item.participant || "Ukjent kilde",
                summary: item.summary.map(s => s.value).join(' / '), 
                description: item.description.map(d => d.value).join(' / '),
                affected: parseAffected(item.affects),
                severity: item.severity || "normal"
            }));

            // Combine the entries and sort by date
            const combinedMessages = [...formattedNews, ...formattedSituations].sort((a, b) => b.date - a.date);

            setMessages(combinedMessages);
        } catch (error) {
            console.error('Error loading messages:', error);
        }
    };

    // Fetch data on mount and every minute
    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 60000);
        return () => clearInterval(interval);
    }, []);

    // affected lines or quays
    function parseAffected(affects) {
        return affects.filter(affect => affect.line || affect.quay)
            .map(affect => affect.line ? affect.line.name : affect.quay.name)
            .filter(name => name)
            .join(', ');
    }

    return (
        <div className="backend-situation-messages">
            {messages.map((message, index) => (
                <div key={index} className={`situationItem ${message.type}`} >
                    <div className="situation-item-meta">
                        <small>{message.source}</small>
                        <small>{message.type}</small>
                        <small className="text-white">{message.date.toLocaleString()}</small>
                    </div>
                    <h3 className="text-white">{message.title}</h3>
                    <p className="text-white">{message.description}</p>
                    {message.affected && <small><br />Påvirker: {message.affected}</small>}
                </div>
            ))}
        </div>
    );
}

export default CombinedMessageContainer;
