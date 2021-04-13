import React from 'react';
import Flashcard from './Flashcard.js';

const FlashcardList = ({ i }) => 
{
    return (
        <div class="card-grid">
            {i.map(x =>
            {
                return <Flashcard y={x} key={x.id} />
            })}
        </div>
    )
}

export default FlashcardList
