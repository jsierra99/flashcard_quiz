import React, { useState, useEffect, useRef } from 'react';

const Flashcard = ({ y }) => 
{
    const [flip, setFlip] = useState(false);
    const [height, setHeight] = useState("initial");

    const frontEl = useRef();
    const backEl = useRef();

    const setMaxHeight = () =>
    {
        const frontHeight = frontEl.current.getBoundingClientRect().height;
        const backHeight = backEl.current.getBoundingClientRect().height;
        setHeight(Math.max(frontHeight, backHeight, 100));
    } 

    useEffect(setMaxHeight, [y.questions, y.answer, y.options]);
    useEffect(() =>
    {
        window.addEventListener("resize", setMaxHeight)
        return () => window.removeEventListener("resize", setMaxHeight)
    }, []);

    return (
        <div 
            class={`card ${flip ? "flip" : ""}`}
            style={{height: height}}
            onClick={() => setFlip(!flip)}
        >
            <div class="front" ref={frontEl}>
                <h3>{y.questions}</h3>
                <div class="flashcard-options">
                    {y.options.map(a =>
                    {
                        return <div class="flashcard-option" key={a}>{a}</div>
                    })}
                </div>
            </div>
            <div class="back" ref={backEl}>{y.answer}</div>
        </div>
    )
}

export default Flashcard
