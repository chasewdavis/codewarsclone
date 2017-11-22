import React from 'react';
import './Solutions.css';

export default function() {
    return <div className="solutions-comp">
            <h2>What is the description field for?</h2>
            <p>
                Use this area to set the stage for the kata. Describe what the problem is and what the user needs to do to begin to solve it.
            </p>
            <p>
            You can use markdown within the description field to describe your kata. For example you can link to external web links, use bullet points or section headings. Perhaps the most useful markdown feature is the ability to embed code within your description. Simply wrap your code block within three back ticks (```) both before and after the code. After the opening set of back ticks you can specify the language.
            </p>
            <h2>Tips</h2>
            <p>
            Some kata descriptions will be pretty long, especially if you are describing an algorithm that needs to be coded from scratch. Others may end up being very short. Sometimes its easier to put notes within the initial code that the user will see instead of describing things within the description.
            </p>
    </div>
}