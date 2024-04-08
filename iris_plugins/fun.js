
//══════════════════════════════════════════════════════════════════════════════════════════════════════// 
//                                                                                                      //
//                                     LIGHT-WEIGHT WHATSAPP BOT                                        //
//                                                                                                      //
//                                             𝚅.1.2.7                                                  // 
//                                                                                                      //
//                          ██╗ ██████╗ ██╗███████╗    ███╗   ███╗ ██████╗                              //
//                          ██║ ██╔══██╗██║██╔════╝    ████╗ ████║ ██╔══██╗                             //
//                          ██║ ██████╔╝██║███████╗    ██╔████╔██║ ██║  ██║                             //
//                          ██║ ██╔══██╗██║╚════██║    ██║╚██╔╝██║ ██║  ██║                             //
//                          ██║ ██║  ██║██║███████║    ██║ ╚═╝ ██║ ██████╔╝                             //
//                          ╚═╝ ╚═╝  ╚═╝╚═╝╚══════╝    ╚═╝     ╚═╝ ╚═════╝                              //
//                                                                                                      //
//                                          BY: VENOX-SENPAI                                            //
//                                                                                                      //
//                                                                                                      //
//══════════════════════════════════════════════════════════════════════════════════════════════════════//

/**

* @project_name : IRIS-MD
* @Developer : Venox-Senpai
* @Version : v.1.2.7
* @license : APACHE-2.0

THIS PROJECT IS MADE UNDER THE CIRCUMSTANCES OF "APACHE-2.0"
MEANS ANY KIND OF (MISLEADING, RE-UPLOADING, RENG) WILL LEAD YOU
TO A DMCA REPORT FROM THE OFFICIAL GITHUB, WHICH RESULT IN 
REMOVING UR COPIED/RE-UPLOADED PROJECT FROM THERE, IN SOME
CONDITIONS IT CAN LEADS TO TERMINATE UR ACCOUNT FROM THAT PLATFORM

│• @C_holder : Venox-Senpai

**/














const { iris, isPublic } = require("../lib/commands.js");
const axios = require('axios');
const { dare, truth, random_question } = require('../lib/truth-dare.js');
const info = require('../info.js');
//---------------------------------------------------------------------------
iris(
    {
        name: "question",
        fromMe: isPublic,
        desc: "random questions",
        category: "fun",
    },
    async ({
        m, client 
    }) => {
        return await m.reply(`${random_question()}`);
    }
);

//---------------------------------------------------------------------------
iris(
    {
        name: "truth",
        fromMe: isPublic,
        desc: "random truth",
        category: "fun",
    },
    async ({
        m, client 
    }) => {
        return await m.reply(`${truth()}`);
    }
);

//---------------------------------------------------------------------------
iris(
    {
        name: "dare",
        fromMe: isPublic,
        desc: "random dare",
        category: "fun",
    },
    async ({
        m, client 
    }) => {
        return await m.reply(`${dare()}`);
    }
);

//---------------------------------------------------------------------------
iris(
    {
        name: "fact",
        fromMe: isPublic,
        desc: "sends random facts",
        category: "fun",
    },
    async ({
        m, client 
    }) => {
        try {
            const { data } = await axios.get(`https://nekos.life/api/v2/fact`);
            return m.reply(`*Fact:* ${data.fact}\n\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ɪʀɪs-ʙᴏᴛ*`);
        } catch (error) {
            console.error("Error fetching random fact:", error);
            return m.reply("Sorry, couldn't fetch a random fact at the moment.");
        }
    }
);

//---------------------------------------------------------------------------
iris(
    {
        name: "quotes",
        fromMe: isPublic,
        desc: "sends random quotes",
        category: "fun",
    },
    async ({
        m, client 
    }) => {
        try {
            const { data } = await axios.get(`https://favqs.com/api/qotd`);
            const replyf = `
                ╔════◇
                ║ *🎗️Content:* ${data.quote.body}
                ║ *👤Author:* ${data.quote.author}
                ║    
                ╚════════════╝ `;
            return m.reply(replyf);
        } catch (error) {
            console.error("Error fetching random quote:", error);
            return m.reply("Sorry, couldn't fetch a random quote at the moment.");
        }
    }
);
