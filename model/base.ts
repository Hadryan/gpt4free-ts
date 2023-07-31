import {EventStream, getTokenSize} from "../utils";

export interface ChatOptions {
}

export interface ChatResponse {
    content?: string;
    error?: string;
}

export type Message = {
    role: string;
    content: string;
}

export enum ModelType {
    GPT3p5Turbo = 'gpt-3.5-turbo',
    GPT3p5_16k = 'gpt-3.5-turbo-16k',
    GPT4 = 'gpt-4',
    GPT4_32k = 'gpt-4-32k',
    Sage = 'sage',
    NetGpt3p5 = 'net-gpt3.5-turbo',
    ClaudeInstance = 'claude-instance',
    Claude = 'claude',
    Claude100k = 'claude-100k',
    Claude2_100k = 'claude-2-100k',
    Gpt4free = 'gpt4free',
    GooglePalm = 'google-palm',
    Llama_2_70b = 'llama-2-70b',
    Llama_2_13b = 'llama-2-13b',
    Llama_2_7b = 'llama-2-7b',
}

export enum Site {
    // define new model here
    You = 'you',
    Phind = 'phind',
    Forefront = 'forefront',
    ForefrontNet = 'forefront_net',
    Mcbbs = 'mcbbs',
    ChatDemo = 'chatdemo',
    Vita = 'vita',
    Copilot = 'copilot',
    Skailar = 'skailar',
    FakeOpen = 'fakeopen',
    EasyChat = 'easychat',
    Better = 'better',
    PWeb = 'pweb',
    Bai = 'bai',
    Gra = 'gra',
    Magic = 'magic',
    Chim = 'chim',
    Poe = 'poe',
    Ram = 'ram',
    Chur = 'chur',
    Xun = 'xun',
    VVM = 'vvm',
    Poef = 'poef',
    Claude = 'claude',
    Cursor = 'cursor',
    Auto = 'auto',
    ChatBase = 'chatbase',
    OpenPrompt = 'openprompt',
}

export interface ChatRequest {
    prompt: string;
    model: ModelType;
    messages: Message[];
}

export function PromptToString(prompt: string, limit: number): [string, Message[]] {
    try {
        const messages: Message[] = JSON.parse(prompt);
        const res = `${messages.map(item => `${item.role}: ${item.content}`).join('\n')}\nassistant: `;
        console.log(prompt.length, limit, getTokenSize(res));
        if (getTokenSize(res) >= limit && messages.length > 1) {
            return PromptToString(JSON.stringify(messages.slice(1, messages.length)), limit);
        }
        return [res, messages];
    } catch (e) {
        return [prompt, [{role: 'user', content: prompt}]];
    }
}

export abstract class Chat {
    protected options: ChatOptions | undefined;

    protected constructor(options?: ChatOptions) {
        this.options = options;
    }

    public abstract support(model: ModelType): number

    public abstract ask(req: ChatRequest): Promise<ChatResponse>

    public abstract askStream(req: ChatRequest, stream: EventStream): Promise<void>
}
