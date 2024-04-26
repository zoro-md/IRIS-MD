const { iris, isPublic } = require("../lib/commands.js");
const fetch = require("node-fetch");


iris(
    {
        name: "dalle",
        fromMe: isPublic,
        category: "ai",
        desc: "imagine an image",
    },
    async ({
        m, client, args
    }) => {
        if (!args || args.length === 0)
            return await m.reply("_Please provide a question_");
      
        const question = args.join(' ');
        await m.reply("_Imagining with Dalle..._");
        const axios = require('axios');

        try {
            let apiResponse = await axios.get(`https://api.maher-zubair.tech/ai/dalle?q=${encodeURIComponent(question)}`);
            let imaginedImage = apiResponse.data.imaginedImage;
            await client.sendMessage(m.jid, { image: imaginedImage }, { quoted: m });
        } catch (error) {
            console.error("Error imagining image with Dalle:", error);
            await m.reply("_Error imagining image with Dalle_");
        }
    }
);
