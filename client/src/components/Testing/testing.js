//Client Secret = "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"

import React, { useState } from 'react'


const Testing = () => {
    const [events, setEvents] = useState([])

    const gapi = window.gapi
    // const CLIENT_ID = "391972270506-tkc1n8d8setttid80mf8c78fmag5gcei.apps.googleusercontent.com"
    // const API_KEY = 'AIzaSyA1K7VqJWBklsYJnUJxC2mKSkHqeOBpDiY'
    // const DISCOVERY_DOC = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']
    // const SCOPES = 'https://www.googleapis.com/auth/calendar.events'
    function authenticate() {
        return gapi.auth2.getAuthInstance()
            .signIn({scope: process.env.REACT_APP_CALENDAR_SCOPES})
            .then(function() { console.log("Sign-in successful"); },
                  function(err) { console.error("Error signing in", err); });
      }
      function loadClient() {
        gapi.client.setApiKey(process.env.REACT_APP_CALENDAR_API);
        return gapi.client.load(process.env.REACT_APP_CALENDAR_DISCOVERS_DOCS)
            .then(function() { console.log("GAPI client loaded for API"); },
                  function(err) { console.error("Error loading GAPI client for API", err); });
      }
      // Make sure the client is loaded and sign-in is complete before calling this method.
      function execute() {
        return gapi.client.calendar.events.list({
            'calendarId': 'nathan.grandinette@gmail.com'
        })
            .then(function(response) {
                    // Handle the results here (response.result has the parsed body).
                    console.log("Response", response);
                    setEvents(response.result.items)
                  },
                  function(err) { console.error("Execute error", err); });
      }
      gapi.load("client:auth2", function() {
        gapi.auth2.init({clientId: process.env.REACT_APP_CALENDAR_CLIENT_ID,
        plugin_name: "chat"});
      });
    return (
        <div>
            <button onClick={() => {
                authenticate().then(loadClient)
            }}>authorize and load</button>
            <button onClick={() => execute()}>execute</button>
            <div>
            {events && events.map((event) => {
                return (
                    <div>
                        <div>{event.summary} {event.start.dateTime}</div>
                    </div>
                )
            })}
            </div>
        </div> 
        )
}

export default Testing