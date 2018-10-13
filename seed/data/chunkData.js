export const chunkData = [
    {
        chunk_id: '1c',
        module_id: '1m',
        type: 'head',
        context: {
            url: 'http://localhost:5000',
            previousChunk: null,
            nextChunk: null,
        },
        action: {
            type: "click"
        },
        target: {
            DOMObject: {},
            element: '<div></div>',
        },  
        description: "This is a test chunk!",
    },
    {
        chunk_id: '2c',
        module_id: '1m',
        type: 'body',
        context: {
            url: 'http://localhost:5000',
            previousChunk: null,
            nextChunk: null,
        },
        action: {
            type: "click",
        },
        target: {
            DOMObject: {},
            element: '<div></div>',
        },  
        description: "This is a test chunk!",
    },
    {
        chunk_id: '3c',
        module_id: '2m',
        type: 'head',
        context: {
            url: 'http://localhost:5000',
            previousChunk: null,
            nextChunk: null,
        },
        action: {
            type: "click",
        },
        target: {
            DOMObject: {},
            element: '<div></div>',
        },  
        description: "This is a test chunk!",
    }
]