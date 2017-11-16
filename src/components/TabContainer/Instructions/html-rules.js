import React from 'react';
import Html from 'slate-html-serializer';
import { Value } from 'slate'

const BLOCK_TAGS = {
    p: 'paragraph',
    codeblock: 'codeblock'
}

const MARK_TAGS = {
    pre: 'pre',
    code: 'code',
    i: 'italic',
    b: 'bold'
}

const rules = [
    {
        deserialize(el, next) {
            const type = BLOCK_TAGS[el.tagName.toLowerCase()]
            if (!type) return
            return {
                kind: 'block',
                type,
                nodes: next(el.childNodes)
            }
        },
        serialize(object, children) {
            if (object.kind != 'block') return
            switch (object.type) {
                case 'paragraph': return <p>{children}</p>
                case 'codeblock': return <div class="code-block"><pre><code>{children}</code></pre></div>    
            }
        }
    },
    {
        deserialize(el, next) {
            const type = MARK_TAGS[el.tagName.toLowerCase()]
            if (!type) return
            return {
                kind: 'mark',
                type,
                nodes: next(el.childNodes)
            }
        },
        serialize(object, children) {
            if (object.kind != 'mark') return
            switch (object.type) {
                case 'code': return <code>{children}</code>
                case 'b': return <b>{children}</b>    
            }
        }
    }
]

export default new Html({ rules })

// export const schema = {
//     document: {
//         nodes: [
//             { types: ['paragraph', 'codeblock'] }
//         ]
//     },
//     blocks: {
//         paragraph: {
//             nodes: [
//                 { kinds: ['text'] }
//             ]
//         },
//         codeblock: {
//             nodes: [
//                 { kinds: ['pre', 'code', 'text'] }
//             ]
//         }
//     },
//     marks: {

//     },
// }

export const initialValue = Value.fromJSON({
    document: {
        nodes: [
            {
                kind: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        kind: 'text',
                        leaves: [
                            {
                                text: 'This is the initial paragraph'
                            }
                        ]
                    }
                ]
            },
            {
                kind: 'block',
                type: 'codeblock',
                nodes: [
                    {
                        kind: 'block',
                        type: 'paragraph',
                        nodes: [
                            {
                                kind: 'text',
                                leaves: [
                                    {
                                        text: 'Press "CTRL + `" to create a codeblock'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        kind: 'block',
                        type: 'paragraph',
                        nodes: [
                            {
                                kind: 'text',
                                leaves: [
                                    {
                                        text: 'Press "CTRL + ENTER" to escape a codeblock'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                kind: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        kind: 'text',
                        leaves: [
                            {
                                text: 'This is the initial closing paragraph'
                            }
                        ]
                    }
                ]
            }
        ]
    }
})
