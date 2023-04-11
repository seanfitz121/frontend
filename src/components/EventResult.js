// EventResults.js
import React, { useEffect, useState } from "react";
import "./EventResults.css";
import ResultChart from "./ResultChart";

const EventResult = ({ eventName, isAdmin }) => {
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    fetchEventData(eventName);
  }, [eventName]);

  const fetchEventData = async (eventName) => {
    try {
      const response = await fetch(`http://localhost:8000/api/events/by-name/${eventName}`);
      const data = await response.json();
      setEventData(data);
    } catch (err) {
      console.error("Error fetching event data:", err);
    }
  };

  const isEventFinished = (event) => {
    return new Date() > new Date(event.event_end);
  };

  const sortedResults = (results) => {
    return results
      .sort((a, b) => {
        const timeA = a.time.split(":").map(parseFloat);
        const timeB = b.time.split(":").map(parseFloat);
        const secondsA = timeA[0] * 3600 + timeA[1] * 60 + timeA[2];
        const secondsB = timeB[0] * 3600 + timeB[1] * 60 + timeB[2];
        return secondsA - secondsB;
      })
      .map((result, index) => {
        return { ...result, position: index + 1 };
      });
  };
  

  return (
    <div>
      {eventData && isEventFinished(eventData) ? (
        <>
          <table className="results-table">
            <thead>
              <tr>
                <th>Participant Name</th>
                <th>Position</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {sortedResults(eventData.results).map((result) => (
                <tr key={result.user_id}>
                  <td>{result.user_name}</td>
                  <td>{result.position}</td>
                  <td>{result.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <ResultChart results={sortedResults(eventData.results)} />
        </>
      ) : (
        <div>
            <h3 style={{textAlign: "center"}}>Event not yet complete!</h3>
            <h4 style={{textAlign: "center"}}>Please check back when the event is finished.</h4>
        </div>
      )}
    </div>
  );
};

export default EventResult;
