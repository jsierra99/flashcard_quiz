import React, { useState, useEffect, useRef } from "react";
import FlashcardList from "./components/FlashcardList.js";
import "./app.scss";
import axios from "axios";

function App() 
{
  const [flashcards, setFlashcards] = useState([]);
  const [categories, setCategories] = useState([]);

  const categoryEl = useRef();
  const amountEl = useRef();

  useEffect(() =>
  {
    axios
    .get("https://opentdb.com/api_category.php")
    .then(res =>
    {
      setCategories(res.data.trivia_categories)
    })
  }, [])

  useEffect(() =>
  {
    
  }, [])

  const decodeString = str =>
  {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = str;
    return textarea.value;
  }

  const handleSubmit = e =>
  {
    e.preventDefault();
    axios
    .get("https://opentdb.com/api.php",
    {
      params:
      {
        amount: amountEl.current.value,
        category: categoryEl.current.value
      }
    })
    .then(res =>
    {
      setFlashcards(res.data.results.map((a, b) =>
      {
        const answer = decodeString(a.correct_answer);
        const options = 
        [
          ...a.incorrect_answers.map(a => decodeString(a)
          ), 
          answer
        ];

        return {
          id: `${b}-${Date.now()}`,
          questions: decodeString(a.question),
          answer: answer,
          options: options.sort(() => Math.random() - .5)
        }
      }))
    })
  }

  return (
    <>
      <form class="header" onSubmit={handleSubmit}>
        <div class="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryEl}>
            {categories.map(cat =>
              {
                return <option value={cat.id} key={cat.id}>{cat.name}</option>
              })}
          </select>
        </div>
        <div class="form-group">
          <label htmlFor="amount">Number Of Questions</label>
          <input type="number" id="amount" min="1" step="1" defaultValue={10} ref={amountEl} />
        </div>
        <div class="form-group">
          <button>Generate</button>
        </div>
      </form>
      <div class="container">
        <FlashcardList i={flashcards} />
      </div>
    </>
  );
}

export default App;
