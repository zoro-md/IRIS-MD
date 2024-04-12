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















const {
    iris,
    commands,
    isPublic
} = require("../lib/commands.js");
let gis = require("g-i-s");
const { 
  existsSync, 
  mkdirSync, 
  writeFileSync,
  readFileSync,
  createWriteStream
} = require('fs');
const fetch = require('node-fetch')
const yts = require("yt-search")
const ytdl = require("youtubedl-core");
const NodeID3 = require('node-id3')
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const axios = require("axios")
const {
  AddMp3Meta
} = require("../lib/functions.js");




iris(
    {
        name: "insta",
        fromMe: isPublic,
        desc: "Instagram downloader",
        category: "downloader",
    },
    async ({
        m, client, args
    }) => {
        args = args || m.quoted?.text;
        if (!args) return await m.reply("_Enter Link_");
        let dl = await client.sendMessage(m.jid, {
            text: "_Downloading..._"
        }, {
            quoted: m
        })
        try {
            const res = await axios.get(`https://api.maher-zubair.tech/download/instagram?url=${args}`)
            let response = await res.data
            for (let i of response.data) {
                await m.sendMsg(m.jid, i.url, { quoted : m }, i.type)
            }
        } catch (e) {
            client.sendMessage(m.jid, {
                text: `_Error_`, edit: dl.key
            })
        }
    }
);

iris(
    {
        name: "story",
        fromMe: isPublic,
        desc: "Instagram story downloader",
        category: "downloader",
    },
    async ({
        m, client, args
    }) => {
        args = args || m.quoted?.text;
        if (!args) return await m.reply("_Enter Link_");
        let dl = await client.sendMessage(m.jid, {
            text: "_Just a moment..._"
        }, {
            quoted: m
        })

        let url = args
        let res = await axios.get(`https://api-aswin-sparky.koyeb.app/api/downloader/story?url=${url}`)
        let response = await res.data
        let data = response.data[0]
        let datai = `Total Stories\nUrl : ${url}\n\n`
        for (let i = 1; i < response.data.length+1; i++) {
            datai += `_${i} . ${i}/${response.data.length} - ${response.data[i-1].type}_\n`
        }
        datai += '\nReply with Number'
        m.sendMsg(m.jid, datai, {
            edit: dl.key
        })
    }
);

iris(
    {
        name: "image",
        fromMe: isPublic,
        desc: "Google Image search",
        category: "downloader",
    },
    async ({
        m, client, args
    }) => {
        try {
            async function gimage(query, amount = 5) {
                let list = [];
                return new Promise((resolve, reject) => {
                    gis(query, async (error, result) => {
                        for (
                            var i = 0;
                            i < (result.length < amount ? result.length: amount);
                            i++
                        ) {
                            list.push(result[i].url);
                            resolve(list);
                        }
                    });
                });
            }
            if (!args) return await m.reply("_Enter Query,Number_");
            let [query,
                amount] = args.split(",");
            let result = await gimage(query, amount);
            await m.reply(
                `_Downloading ${amount || 5} images for ${query}_`
            );
            for (let i of result) {
                await m.sendMsg(m.jid , i, {}, "image")
            }

        } catch (e) {
            console.log(e)
        }
    }
);


iris(
    {
        name: "gdrive",
        fromMe: isPublic,
        desc: "Instagram story downloader",
        category: "downloader",
    },
    async ({
        m, client, args
    }) => {
        args = args || m.quoted?.text;
        if (!args) return await m.reply("_Enter Link_");
var document= await fetch(`https://api.maher-zubair.tech/download/gdrive?url=${args}`);
        var zip = await document.json();
        client.sendMessage(m.jid, { document :{ url: zip.data.downloadUrl }, fileName: `${zip.data.fileName}` , mimetype: "application/x-zip-compressed" }, {quoted: m })
    }
    );

iris(
    {
        name: "mediafire",
        fromMe: isPublic,
        desc: "Instagram story downloader",
        category: "downloader",
    },
    async ({
        m, client, args
    }) => {
        args = args || m.quoted?.text;
        if (!args) return await m.reply("_Enter Link_");
var document= await fetch(`https://api.maher-zubair.tech/download/mediafire?url=${args}`);
        var zip = await document.json();
        client.sendMessage(m.jid, { document :{ url: zip.data.link }, fileName: `${zip.data.name}` , mimetype: "application/zip" }, {quoted: m })
    }
    );


iris(
    {
        name: "xvdl",
        fromMe: isPublic,
        desc: "Instagram story downloader",
        category: "downloader",
    },
    async ({
        m, client, args
    }) => {
        args = args || m.quoted?.text;
        if (!args) return await m.reply("_Enter Link/Reply to a link_");
m.reply("_Downloading..._")
let xvdl = await fetch(`https://api-aswin-sparky.koyeb.app/api/downloader/xdl?url=${args}`);
var data = await xvdl.json();

  client.sendMessage(m.jid, { video :{ url: data.data }, caption: "ehehehe" }, {quoted: m })
    }
  );


iris(
    {
        name: "ytv",
        fromMe: isPublic,
        desc: "yt vid downloader",
        category: "downloader",
    },
    async ({
        m, client, args
    }) => {
        args = args || m.quoted?.text;
if (!args) return await m.reply("_Reply to a link_");
let dll = `https://api-viper-x.koyeb.app/api/ytdl?video360p=${args}`
client.sendMessage(m.jid, { video :{ url: dll }, caption: "_IRIS-MD_"}, {quoted: m })
    }
    );


iris(
    {
        name: "song",
        fromMe: isPublic,
        category: "downloader",
        desc: "To download song"
    },
    async ({
        m, client, args
    }) => {
      args = args || m.quoted?.text;
        if (!args) return m.reply("_Enter a Query !_")
      let mes = await client.sendMessage(m.jid, { text : `_Searching..._` } , { quoted : m })
   const res = await axios.get(`https://api-viper-x.koyeb.app/api/song?name=${args}`)
    let response = await res.data
    let coverBuffer = await (await fetch(`${response.data.thumbnail}`)).buffer()
     client.sendMessage(m.jid, { text : `_Downloading : ${response.data.title}_` , edit : mes.key })
   const songbuff = await (await fetch(`${response.data.downloadUrl}`)).buffer()
   const song = await AddMp3Meta(songbuff , coverBuffer , { title : response.data.title , artist : response.data.channel.name } )
     return await client.sendMessage(m.jid , {audio : song ,  mimetype : 'audio/mpeg'} , { quoted : m })
      
    })
