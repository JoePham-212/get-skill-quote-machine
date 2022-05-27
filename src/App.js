import React, { useEffect, useState } from 'react';
import './App.scss';
import COLORS_ARRAY from './colorsArray.js'
let quoteDBB = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
function App() {
  const [number, setNumber] = useState(0)
  const [quoteArr, setquoteArr] = useState(null)
  const [quote, setQuote] = useState('If you look at what you have in life, you’ll always have more. If you look at what you don’t have in life, you’ll never have enough.')
  const [author, setAuthor] = useState('Oprah Winfrey')
  const [accentColor, setAccentColor] = useState('black')
  const fetchQuotes = async (url) => {
    const response = await fetch(url)
    const parsedJSON = await response.json()
    setquoteArr(parsedJSON.quotes)
    console.log(parsedJSON)
  }
  useEffect(() => {
    fetchQuotes(quoteDBB)
  }, [quoteDBB])
  const getRandomQuote = () => {
    let randomInterger = Math.floor(Math.random() * quoteArr.length)
    setNumber(randomInterger)
    setQuote(quoteArr[randomInterger].quote)
    setAuthor(quoteArr[randomInterger].author)
    setAccentColor(COLORS_ARRAY[randomInterger])

  }
  return <div className='App'>
    <div className='App-header' style={
      { backgroundColor: accentColor }}>
      <div id='quote-box' style={
        { color: accentColor }}>
        <div id='text'>
          <p id='quote'><i class='fa fa-quote-left'></i> {quote}</p>
          <p id='author'>- {author}</p>
        </div>
        <a id='tweet-quote' title='Tweet this quote!' style={
          { backgroundColor: accentColor }} href={encodeURI(`http://www.twitter.com/intent/tweet?text="${quote} -${author}`)}>
          <i className='fa fa-twitter' style={{ color: 'white', padding: 10 }}></i>
        </a>
        <button style={
          { backgroundColor: accentColor }} id='new-quote' onClick={getRandomQuote}>Get quote</button>

      </div>
    </div>

  </div>
}


export default App;
