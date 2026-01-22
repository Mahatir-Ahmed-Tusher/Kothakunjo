import { Groq } from 'groq-sdk';
import axios from 'axios';
import { GoogleGenAI } from "@google/genai";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const gemini = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const GEMINI_MODELS = ["gemini-3-flash-preview", "gemini-2.0-flash-exp", "gemini-2.5-flash"];
const GROQ_MODELS = ["openai/gpt-oss-120b", "llama-3.3-70b-versatile", "llama-3.1-70b-versatile"];

interface SearchResult {
    title: string;
    link: string;
    snippet: string;
}

async function performWebSearch(query: string): Promise<{ results: SearchResult[], searchQuery: string }> {
    try {
        const response = await axios.post(
            'https://google.serper.dev/search',
            { q: query },
            {
                headers: {
                    'X-API-KEY': process.env.SERPER_API_KEY || '',
                    'Content-Type': 'application/json'
                }
            }
        );

        const results: SearchResult[] = (response.data.organic || []).slice(0, 5).map((item: any) => ({
            title: item.title,
            link: item.link,
            snippet: item.snippet
        }));

        return { results, searchQuery: query };
    } catch (error) {
        console.error('Serper API Error:', error);
        return { results: [], searchQuery: query };
    }
}

export async function POST(request: Request) {
    try {
        const { message, history, character, plugins, isTitleGen, userConfig } = await request.json();

        if (isTitleGen) {
            let title = "New Chat";
            let success = false;

            // 1. Try GPT-OSS-120B first (Groq)
            try {
                const titleGenResponse = await groq.chat.completions.create({
                    messages: [
                        { role: 'system', content: 'Generate a very short, concise chat title (2-4 words) in the same language as the user message. Return ONLY the title text, nothing else.' },
                        { role: 'user', content: `Message: ${message}` }
                    ],
                    model: "openai/gpt-oss-120b",
                    temperature: 0.5,
                });
                title = titleGenResponse.choices[0]?.message?.content?.trim() || "New Chat";
                success = true;
            } catch (err) {
                console.error("Groq (gpt-oss-120b) Title Error:", err);
            }

            // 2. Try Gemini models next
            if (!success) {
                for (const model of GEMINI_MODELS) {
                    try {
                        const geminiResponse = await gemini.models.generateContent({
                            model: model,
                            contents: `User Message: "${message}"\n\nGenerate a very short, concise chat title (2-4 words) in the same language as the user message. Return ONLY the title text, nothing else.`,
                        });
                        title = geminiResponse.text?.trim() || "New Chat";
                        success = true;
                        break;
                    } catch (err) {
                        console.error(`Gemini (${model}) Title Error:`, err);
                    }
                }
            }

            // 3. Last fallback to other Groq models
            if (!success) {
                for (const model of GROQ_MODELS) {
                    if (model === "openai/gpt-oss-120b") continue;
                    try {
                        const titleGenResponse = await groq.chat.completions.create({
                            messages: [
                                { role: 'system', content: 'Generate a very short, concise chat title (2-4 words) in the same language as the user message. Return ONLY the title text, nothing else.' },
                                { role: 'user', content: `Message: ${message}` }
                            ],
                            model: model,
                            temperature: 0.5,
                        });
                        title = titleGenResponse.choices[0]?.message?.content?.trim() || "New Chat";
                        success = true;
                        break;
                    } catch (err) {
                        console.error(`Groq (${model}) Title Error:`, err);
                    }
                }
            }
            return Response.json({ title });
        }

        let systemPrompt = character ?
            `আপনি কথাকুঞ্জ (Kothakunjo), যা কথাকুঞ্জ দল (Kothakunjo Team) দ্বারা ডিজাইন করা হয়েছে। আপনি বাংলা ভাষায় বানানো একটি সৃজনশীল এবং বহুমুখী এআই সহকারী।
            
            আপনার বর্তমান চরিত্র:
            নাম: ${character.name}, ভূমিকা: ${character.role}। 
            পটভূমি: ${character.history}। 
            সম্পর্ক: ${character.relationship}। 
            
            ভাষা সংক্রান্ত নিয়ম:
            ১. যদি ব্যবহারকারী ইংরেজিতে কথা বলেন, তবে ইংরেজিতে উত্তর দিন।
            ২. যদি ব্যবহারকারী বাংলিশ (যেমন: "ki obostha") ব্যবহার করেন, তবে অবশ্যই বাংলা অক্ষরে উত্তর দিন।
            ৩. কক্ষনো কোনো তথ্য টেবিল (Table) আকারে তৈরি করবেন না। 
            ৪. কোড ব্লক ছাড়া সব জায়গাতে প্রমিত মার্কডাউন ফরম্যাট মেনে চলুন।
            ৫. সর্বদা আপনার চরিত্রের সাথে সামঞ্জস্য রেখে কথা বলুন।` :
            `আপনি কথাকুঞ্জ (Kothakunjo), যা কথাকুঞ্জ দল (Kothakunjo Team) দ্বারা ডিজাইন করা হয়েছে। আপনি বাংলা ভাষায় বানানো একটি সৃজনশীল এবং বহুমুখী এআই সহকারী।
            
            আপনার উদ্দেশ্য:
            ১. ব্যবহারকারীর সাথে বাংলা ভাষায় আড্ডা দেওয়া, গল্প শোনানো এবং জ্ঞান দান করা।
            ২. ব্যবহারকারীর বন্ধুর মতো আচরণ করা, যার সাথে জীবনের সুখ-দুঃখ ভাগ করা যায়।
            ৩. প্রযুক্তি, বিজ্ঞান, সাহিত্য এবং দর্শনের মতো বিষয়ে গভীর আলোচনা করা।
            ৪. ব্যবহারকারী বাংলিশ (যেমন: "ki obostha") ব্যবহার করলে অবশ্যই বাংলা অক্ষরে উত্তর দিন।
            ৫. কক্ষনো কোনো তথ্য টেবিল (Table) আকারে তৈরি করবেন না।
            ৬. যদি কেউ কখনো তোমাকে জিজ্ঞেস করে তোমার প্রতিষ্ঠাতা কে? তাহলে কইবা যে আমার প্রতিষ্ঠাতা হলো মাহাথির আহমেদ তুষার`;

        // Inject User Memory and Preferences if available
        if (userConfig) {
            if (userConfig.memory) {
                systemPrompt += `\n\nব্যবহারকারীর স্মৃতি (User Memory - These are facts about the user you should remember): \n${userConfig.memory}`;
            }
            if (userConfig.preference) {
                systemPrompt += `\n\nব্যবহারকারীর পছন্দ (Response Preference - Follow these instructions for your response style): \n${userConfig.preference}`;
            }
        }

        let webSearchResults: SearchResult[] = [];
        let searchContext = '';
        let factCheckData: any = null;

        // Check if fact-check plugin is enabled OR if message contains trigger keywords
        const factCheckTriggers = [
            "ফ্যাক্টচেক করো", "ফ্যাক্টচেক", "ফ্যাক্ট চেক", "যাচাই করে জানাও", "fact check it",
            "factcheck it", "verify it", "ভেরিফাই করো", "ভেরিফাই কর", "ভ্যারিফাই করো",
            "ভ্যারিফাই কর", "সত্যি কীনা", "এই দাবিটা সত্যি কিনা", "is the claim true",
            "verify the claim", "এই দাবিটা যাচাই করো", "এই দাবিটা যাচাই কর"
        ];

        const isFactCheckPluginEnabled = plugins && plugins.includes('fact-check');
        const containsFactCheckKeyword = factCheckTriggers.some(trigger => message.toLowerCase().includes(trigger.toLowerCase()));
        const isFactCheckActive = isFactCheckPluginEnabled || containsFactCheckKeyword;

        // Check if fact-check plugin is enabled (Khoj API)
        if (isFactCheckActive) {
            try {
                const factCheckResponse = await axios.post(
                    'https://khoj-bd.com/api/v1/factcheck',
                    { query: message },
                    {
                        headers: {
                            'Authorization': `Bearer ${process.env.KHOJ_API_KEY}`,
                            'Content-Type': 'application/json'
                        }
                    }
                );

                if (factCheckResponse.data.success) {
                    factCheckData = factCheckResponse.data.data;
                    searchContext += `\n\nFact-Check Report for "${message}":
Verdict: ${factCheckData.verdict}
Report: ${factCheckData.report}
Sources used for verification: ${factCheckData.sources?.length || 0}

Fact checked by [khoj](https://khoj-bd.com)

IMPORTANT: Incorporate this fact-check result into your answer. If the claim is false or unverified, clearly state that based on the provided report. At the end of your response, if you used this fact check, mention "Fact checked by [khoj](https://khoj-bd.com)".`;
                }
            } catch (error) {
                console.error('Khoj Fact-Check API Error:', error);
            }
        }

        // Check if web-search plugin is enabled OR if message contains trigger keywords
        const webSearchTriggers = [
            "চলমান", "এইমাত্র প্রকাশিত", "দাম কত", "বর্তমান মূল্য", "ফলাফল", "স্কোর", "ভোটের ফল",
            "আবহাওয়া", "আপডেট দাও", "কবে প্রকাশ হয়েছে", "রিসেন্ট কিছু মুভি", "recent kichu movie", "recent kichu series", "এখন পাওয়া যাচ্ছে কি না", "ডাউনলোড লিংক",
            "সার্চ করো", "সার্চ কর", "search koro", "price koto", "update dao", "current price",
            "current news", "latest score", "IMDB", "score koto", "খোঁজ নাও", "বর্তমানে কোন",
            "বর্তমানে এভাইলেবল", "ekhon available", "currently available", "ajker weather", "recent news", "lastest news", "recent news",
            "ajker date", "today's date", "আজকের তারিখ", "আজকের আবহাওয়া", "আজকের ওয়েদার",
            "কবে আসবে", "কোথায় পাবো", "কী কী আছে", "কি কি আছে", "ki ki ache", "ki ki ase",
            "kobe ashbe", "kobe asbe", "kbe asbe", "kothay pabo", "kothai pbo", "kthy pbo",
            "kobe release hobe", "khelar score koto", "কবে মুক্তি পাবে", "কবে রিলিজ হবে",
            "খেলার স্কোর কতো", "খেলার স্কোর কত", "আশেপাশে রেস্টুরেন্ট", "কাছে হাসপাতাল",
            "আশেপাশে হাসপাতাল", "when will it be released", "restaurant near", "hospital near",
            "ashe pashe hospital", "bhalo doctor kothay", "bhalo kono doctor",
            "bhalo restaurant suggest", "restaurant suggest", "recent movie suggest",
            "রিসেন্ট মুভি সাজেস্ট", "রিসেন্ট মুভি রিকমেন্ড", "সাম্প্রতিক সময়ের সিনেমা",
            "recent movie recommend", "recent kichu movie recommend", "recent book fair e",
            "এবারের বই মেলায়", "এই বছর কি", "search it", "khoj niye janao", "bengali ai fact checker", "who is the founder of", "who is the founder of khoj", "khoj ke banaise?", "খোঁজ এর প্রতিষ্ঠাতা কে", "যাচাই করো", "বাংলা এআই ফ্যাক্টচেকার", "খোঁজ ফ্যাক্টচেকার", "খোঁজ ফ্যাক্ট চেকার", "এআই ফ্যাক্টচেক", "এআই ফ্যাক্ট চেক", "এ বছর কী"
        ];

        const isWebSearchPluginEnabled = plugins && plugins.includes('web-search');
        const containsWebSearchKeyword = webSearchTriggers.some(trigger => message.toLowerCase().includes(trigger.toLowerCase()));

        if (isWebSearchPluginEnabled || containsWebSearchKeyword) {
            // First, ask LLM to generate a search query
            const queryExtractionPrompt = `Based on this user message, generate a concise search query (2-5 words) that would be best for a web search. Only return the search query, nothing else.

User message: "${message}"

Search query:`;

            let searchQuery = message;
            let querySuccess = false;

            // 1. Try GPT-OSS-120B first
            try {
                const queryResponse = await groq.chat.completions.create({
                    messages: [
                        { role: 'system', content: 'You are a search query optimizer. Generate concise, effective search queries.' },
                        { role: 'user', content: queryExtractionPrompt }
                    ],
                    model: "openai/gpt-oss-120b",
                    temperature: 0.3,
                    max_completion_tokens: 50,
                });
                searchQuery = queryResponse.choices[0]?.message?.content?.trim() || message;
                querySuccess = true;
            } catch (err) {
                console.error("Groq (gpt-oss-120b) Search Query Error:", err);
            }

            // 2. Try Gemini models
            if (!querySuccess) {
                for (const model of GEMINI_MODELS) {
                    try {
                        const geminiQueryResponse = await gemini.models.generateContent({
                            model: model,
                            contents: `Based on this user message, generate a concise search query (2-5 words) that would be best for a web search. Only return the search query, nothing else.\n\nUser message: "${message}"`,
                        });
                        searchQuery = geminiQueryResponse.text?.trim() || message;
                        querySuccess = true;
                        break;
                    } catch (err) {
                        console.error(`Gemini (${model}) Search Query Error:`, err);
                    }
                }
            }

            // 3. Fallback to other Groq models
            if (!querySuccess) {
                for (const model of GROQ_MODELS) {
                    if (model === "openai/gpt-oss-120b") continue;
                    try {
                        const queryResponse = await groq.chat.completions.create({
                            messages: [
                                { role: 'system', content: 'You are a search query optimizer. Generate concise, effective search queries.' },
                                { role: 'user', content: queryExtractionPrompt }
                            ],
                            model: model,
                            temperature: 0.3,
                            max_completion_tokens: 50,
                        });
                        searchQuery = queryResponse.choices[0]?.message?.content?.trim() || message;
                        querySuccess = true;
                        break;
                    } catch (err) {
                        console.error(`Groq (${model}) Search Query Error:`, err);
                    }
                }
            }

            // Perform web search
            const searchData = await performWebSearch(searchQuery);
            webSearchResults = searchData.results;

            // Build search context for LLM
            if (webSearchResults.length > 0) {
                searchContext = `\n\nWeb Search Results for "${searchQuery}":\n` +
                    webSearchResults.map((result, index) =>
                        `[${index + 1}] ${result.title}\n${result.snippet}\nURL: ${result.link}`
                    ).join('\n\n') +
                    `\n\nIMPORTANT: Use these search results to answer the user's question. Cite sources using [1], [2], etc. format when referencing information from the search results.`;
            }
        }

        // Check if image-generation plugin is enabled OR if message contains trigger keywords
        const imageTriggers = [
            "generate image", "ছবি বানাও", "ছবি জেনারেট করো", "generate pic", "generate an image",
            "generate a photo", "generate photo", "ছবি আঁকো", "ফটো বানাও", "জেনারেট কর",
            "জেনারেট করো", "জেনারেট করেন", "জেনারেট করুন", "আঁকো", "draw an image",
            "draw a photo", "make a photo", "make an image", "aako", "aak", "ako", "draw koro", "draw kro", "draw kor", "eke dao", "aika dao", "aika daw", "eke daw", "create an image",
            "ছবি বানান", "ছবি বানা"
        ];

        const isImagePluginEnabled = plugins && plugins.includes('image-generation');
        const containsImageKeyword = imageTriggers.some(trigger => message.toLowerCase().includes(trigger.toLowerCase()));

        let imagePrompt = '';
        if (isImagePluginEnabled || containsImageKeyword) {
            const imageDetectionPrompt = `Based on this user message, determine if they want to generate or create an image.
If YES, provide a detailed English descriptive prompt for an image generator (e.g., "A high-quality 4k digital painting of..."). 
If NO, simply return "NO".

User message: "${message}"

Response:`;

            let detectionResult = "NO";
            let detectionSuccess = false;

            // 1. Try GPT-OSS-120B first
            try {
                const imageDetectionResponse = await groq.chat.completions.create({
                    messages: [
                        { role: 'system', content: 'You are an image prompt engineer.' },
                        { role: 'user', content: imageDetectionPrompt }
                    ],
                    model: "openai/gpt-oss-120b",
                    temperature: 0.3,
                });
                detectionResult = imageDetectionResponse.choices[0]?.message?.content?.trim() || "NO";
                detectionSuccess = true;
            } catch (err) {
                console.error("Groq (gpt-oss-120b) Image Detection Error:", err);
            }

            // 2. Try Gemini models
            if (!detectionSuccess) {
                for (const model of GEMINI_MODELS) {
                    try {
                        const geminiImageResponse = await gemini.models.generateContent({
                            model: model,
                            contents: `Based on this user message, determine if they want to generate or create an image. If YES, provide a detailed English descriptive prompt for an image generator (e.g., "A high-quality 4k digital painting of..."). If NO, simply return "NO".\n\nUser message: "${message}"`,
                        });
                        detectionResult = geminiImageResponse.text?.trim() || "NO";
                        detectionSuccess = true;
                        break;
                    } catch (err) {
                        console.error(`Gemini (${model}) Image Detection Error:`, err);
                    }
                }
            }

            // 3. Fallback to other Groq models
            if (!detectionSuccess) {
                for (const model of GROQ_MODELS) {
                    if (model === "openai/gpt-oss-120b") continue;
                    try {
                        const imageDetectionResponse = await groq.chat.completions.create({
                            messages: [
                                { role: 'system', content: 'You are an image prompt engineer.' },
                                { role: 'user', content: imageDetectionPrompt }
                            ],
                            model: model,
                            temperature: 0.3,
                        });
                        detectionResult = imageDetectionResponse.choices[0]?.message?.content?.trim() || "NO";
                        detectionSuccess = true;
                        break;
                    } catch (err) {
                        console.error(`Groq (${model}) Image Detection Error:`, err);
                    }
                }
            }
            if (detectionResult !== "NO" && detectionResult.length > 5) {
                imagePrompt = detectionResult;
            }
        }

        // Generate Image if needed
        let generatedImageUrl = undefined;
        if (imagePrompt) {
            try {
                const pollinationsKey = process.env.POLLINATION_API_KEY;
                if (pollinationsKey) {
                    const pollinationsUrl = `https://gen.pollinations.ai/image/${encodeURIComponent(imagePrompt)}?model=flux&width=1024&height=1024&nologo=true&enhance=true`;

                    const imageResponse = await axios.get(pollinationsUrl, {
                        headers: {
                            'Authorization': `Bearer ${pollinationsKey}`
                        },
                        responseType: 'arraybuffer',
                        timeout: 30000 // 30 second timeout for image generation
                    });

                    const base64Image = Buffer.from(imageResponse.data, 'binary').toString('base64');

                    // Upload to FreeImage.host for permanent storage
                    try {
                        const formData = new FormData();
                        formData.append('key', '6d207e02198a847aa98d0a2a901485a5');
                        formData.append('action', 'upload');
                        formData.append('source', base64Image);
                        formData.append('format', 'json');

                        const freeImageResponse = await axios.post('https://freeimage.host/api/1/upload', formData);

                        if (freeImageResponse.data.status_code === 200) {
                            generatedImageUrl = freeImageResponse.data.image.url;
                        } else {
                            // Fallback to local base64 if upload fails
                            generatedImageUrl = `data:image/png;base64,${base64Image}`;
                        }
                    } catch (uploadError) {
                        console.error('FreeImage Upload Error:', uploadError);
                        generatedImageUrl = `data:image/png;base64,${base64Image}`;
                    }
                }
            } catch (error) {
                console.error('Pollinations API Error:', error);
            }
        }

        // Check if image-generation plugin is enabled OR if message contains trigger keywords
        const imageInstruction = imagePrompt
            ? `\n\nIMPORTANT: The user wants to generate an image and your internal tools have already successfully triggered the image generation based on this prompt: "${imagePrompt}". 
               Do NOT say "I cannot help" or "I am an AI and cannot create images". 
               Instead, respond positively and briefly in the user's language. 
               Suggested Bengali: "অবশ্যই, এই যে আপনার অনুরোধ করা ছবিটি তৈরি করে ফেলেছি!" 
               Suggested English: "Sure, I have generated the image you asked for!"`
            : "";

        // Convert chat history to Gemini format
        const geminiMessages = [
            ...(history?.map((msg: any) => ({
                role: msg.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: msg.content }],
            })) || []),
            { role: 'user', parts: [{ text: message }] }
        ];

        let responseText = "";
        let chatSuccess = false;

        // 1. Try GPT-OSS-120B first (Groq)
        try {
            const messages = [
                { role: 'system', content: systemPrompt + searchContext + imageInstruction },
                ...(history?.map((msg: any) => ({
                    role: msg.role === 'assistant' ? 'assistant' : 'user',
                    content: msg.content,
                })) || []),
                { role: 'user', content: message }
            ];

            const chatCompletion = await groq.chat.completions.create({
                messages: messages as any,
                model: "openai/gpt-oss-120b",
                temperature: 0.7,
                max_completion_tokens: 8192,
                top_p: 1,
                stream: false,
            });
            responseText = chatCompletion.choices[0]?.message?.content || "";
            chatSuccess = true;
        } catch (err) {
            console.error("Groq (gpt-oss-120b) Main Chat Error:", err);
        }

        // 2. Try Gemini models next
        if (!chatSuccess) {
            const geminiMessages = [
                ...(history?.map((msg: any) => ({
                    role: msg.role === 'assistant' ? 'model' : 'user',
                    parts: [{ text: msg.content }],
                })) || []),
                { role: 'user', parts: [{ text: message }] }
            ];

            for (const model of GEMINI_MODELS) {
                try {
                    const geminiChatResponse = await gemini.models.generateContent({
                        model: model,
                        contents: geminiMessages as any,
                        config: {
                            systemInstruction: systemPrompt + searchContext + imageInstruction,
                            thinkingConfig: {
                                includeThoughts: true,
                            },
                            temperature: 1.0,
                        },
                    });
                    responseText = geminiChatResponse.text?.trim() || "";
                    chatSuccess = true;
                    break;
                } catch (err) {
                    console.error(`Gemini (${model}) Main Chat Error:`, err);
                }
            }
        }

        // 3. Fallback to other Groq models
        if (!chatSuccess) {
            const messages = [
                { role: 'system', content: systemPrompt + searchContext + imageInstruction },
                ...(history?.map((msg: any) => ({
                    role: msg.role === 'assistant' ? 'assistant' : 'user',
                    content: msg.content,
                })) || []),
                { role: 'user', content: message }
            ];

            for (const model of GROQ_MODELS) {
                if (model === "openai/gpt-oss-120b") continue;
                try {
                    const chatCompletion = await groq.chat.completions.create({
                        messages: messages as any,
                        model: model,
                        temperature: 0.7,
                        max_completion_tokens: 8192,
                        top_p: 1,
                        stream: false,
                    });
                    responseText = chatCompletion.choices[0]?.message?.content || "";
                    chatSuccess = true;
                    break;
                } catch (err) {
                    console.error(`Groq (${model}) Main Chat Error:`, err);
                }
            }
        }

        // Return response with search results if available
        return Response.json({
            response: responseText,
            searchResults: webSearchResults.length > 0 ? webSearchResults : undefined,
            imagePrompt: imagePrompt || undefined,
            generatedImage: generatedImageUrl,
            factCheck: factCheckData || undefined,
            isFactCheck: isFactCheckActive
        });
    } catch (error: any) {
        console.error('API Error:', error);
        return Response.json(
            { error: 'Failed to generate response', details: error.message },
            { status: 500 }
        );
    }
}
