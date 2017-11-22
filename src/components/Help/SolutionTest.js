import React from 'react';

export default function() {
    return <div className="solutions-comp">
        <h2>What is a test fixture?</h2>
        <p>
        The test fixture is used to write code that will validate the kata solution. The entire set of code in this block acts as a single test case. To see an example of how the test fixture can be used, click "Insert Example", which will insert example code for your selected language.
        </p>
        <h2>Validating the solution:</h2>
        <p>
        Once your solution and fixtures have code you can click "validate solution" to check if your code validates. Generally only reference/syntax errors will be descriptive. Failed test expectations will have generic messages unless you provide a custom message. These are the same errors that others will see when they are solving your kata.
        </p>
        <h2>Previewing the challenge:</h2>
        <p>Un-published kata's have the ability to preview solving them. This action is available in the top right of the action bar. It is recommended that you try to take the challenge yourself and see what types of common errors may come up during the process. This is a useful way of discovering ways in which you can provide Test.expect methods with custom messages to help guide others. These custom messages can be much more useful then the standard runtime errors that would otherwise be shown.</p>
    </div>
}