import React from 'react';
import axios from 'axios'
const SelfCare = () => {
  const [quote, setQuote] = React.useState('');

  React.useEffect(() => {
    axios.get('https://zenquotes.io/api/random')
      .then(res => res.json())
      .then(data => setQuote(data.quote))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>Self Care</h1>
      <p>{quote}</p>
    </div>
  );
};
export default SelfCare;