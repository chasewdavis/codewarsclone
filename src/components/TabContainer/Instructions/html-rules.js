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

]

export default new Html({ rules })

export const schema = {
    document: {
        nodes: [
            { types: ['paragraph', 'codeblock'] }
        ]
    },
    blocks: {
        paragraph: {
            nodes: [
                { kinds: ['text'] }
            ]
        },
        codeblock: {
            nodes: [
                { kinds: ['pre', 'code', 'text'] }
            ]
        }
    },
    marks: {

    },
}

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
                        kind: 'text',
                        leaves: [
                            {
                                text: 'This  is the initial codeblock'
                            }
                        ]
                    }
                ]
            }
        ]
    }
})
