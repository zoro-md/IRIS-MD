const { iris, getVar } = require('../lib');

iris({ 
    on: "all", 
    pattern: 'automention', 
    sucReact: "💗",  
    category: ["external"], 
    type: "opt" 
}, async (m, client, match) => {
    try {
        let { INFO } = await getVar();
        let Owners = INFO.split(';').filter(info => info.startsWith('Owner=')).map(owner => owner.split('=')[1]);
        let IsBot = client.user.jid.split('@')[0];
        Owners.push(IsBot);

        if (Owners.includes(m.sender.split('@')[0])) {
            console.log("Message sender is either the bot or one of the owners");
        } else {
            await client.sendText(m.chat, match.sucReact);
        }
    } catch (error) {
        console.error("Error:", error);
    }
});
