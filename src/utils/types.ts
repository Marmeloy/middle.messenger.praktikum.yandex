export type message = {
    type: string,
    ingoing: boolean,
    time: string,
    status: boolean,
    content: string
}

export type messages = { timestamp: string, messages: message[]};

export type chat = {
    name: string,
    excerpt: string,
    time: string,
    counter: number
};
