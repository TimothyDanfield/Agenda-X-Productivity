import React from 'react';
import axios from 'axios'
import { useEffect, useState } from 'react'
const SelfCare = () => {
  const [quote, setQuote] = useState('');

  const randomIndex = Math.floor((Math.random() * 1643))

  const randomQuote = async () => {
    try {
      const response = await axios.get('https://type.fit/api/quotes')
      setQuote(response.data[randomIndex].text)
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    randomQuote()
  }, [])

  /* React.useEffect(() => {
     axios.get('https://zenquotes.io/api/random')
       .then(res => res.json())
       .then(data => setQuote(data.quote))
       .catch(err => console.log(err));
   }, []);*/

  return (
    <div>
      <h1>Self Care</h1>
      <p>{quote}</p>
    </div>
  );
};
export default SelfCare;