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















// Type 1: Group Management Commands
//───────────────────────────────────

iris({
    name: "mute",
    fromMe: isPublic,
    desc: "Mutes the group.",
    category: "group"
}, async ({ m, client, args }) => {
    if (!m.isAdmin) return m.reply("_You do not have administrative privileges._");
    await client.groupSettingUpdate(m.jid, 'announcement');
    return await m.reply("_Group messages restricted to admins._");
});

iris({
    name: "unmute",
    fromMe: isPublic,
    desc: "Unmutes the group",
    category: "group"
}, async ({ m, client, args }) => {
    if (!m.isAdmin) return m.reply("_You do not have administrative privileges._");
    await client.groupSettingUpdate(m.jid, 'not_announcement');
    return await m.reply("_Group messages unrestricted._");
});

iris({
    name: "promote",
    fromMe: isPublic,
    desc: "Promotes a user to admin",
    category: "group"
}, async ({ m, client, args }) => {
    try {
        if (!m.isAdmin) return m.reply("_You do not have administrative privileges._");
        if (!(args || m.quoted)) return m.reply("_Mention a user to promote._");

        let user = args ? args.replace("@", "") + '@s.whatsapp.net' : m.quoted.sender;

        if (!m.isAdmin(user)) return m.reply("_The user is already an admin._");

        await client.groupParticipantsUpdate(m.jid, [user], "promote");
        m.sendMsg(m.jid , `_@${user.split("@")[0]} has been promoted to admin._`, { mentions : [user] , quoted : m})
    } catch (e) {
        console.log(e);
    }
});

iris({
    name: "demote",
    fromMe: isPublic,
    desc: "Demotes a user from admin",
    category: "group"
}, async ({ m, client, args }) => {
    try {
        if (!m.isAdmin) return m.reply("_You do not have administrative privileges._");
        if (!(args || m.quoted)) return m.reply("_Mention a user to demote._");

        let user = args ? args.replace("@", "") + '@s.whatsapp.net' : m.quoted.sender;

        if (!m.isAdmin(user)) return m.reply("_The user is not an admin._");

        await client.groupParticipantsUpdate(m.jid, [user], "demote");
        m.sendMsg(m.jid , `_@${user.split("@")[0]} has been demoted from admin role._`, { mentions : [user] , quoted : m })
    } catch (e) {
        console.log(e);
    }
});

// Type 2: Group Actions
//────────────────────────

iris({
    name : "left",
    fromMe: true,
    category : "group",
    desc: "Leave the group.",
}, async ({ m, client }) => {
    if (!m.isGroup) {
        return await m.reply("*_This command can only be used in a group!_*");
    }
    await client.groupLeave(m.jid);
});

iris({
    name : "invite",
    fromMe: true,
    category : "group",
    desc: "Generate group invite link.",
}, async ({ m, client }) => {
    if (!m.isAdmin) return m.reply("_You do not have administrative privileges._");
    const response = await client.groupInviteCode(m.jid);
    await m.reply(`_Group invite link: https://chat.whatsapp.com/${response}_`);
});

iris({
    name : "revoke",
    fromMe: true,
    category : "group",
    desc: "Revoke group invite link.",
}, async ({ m, client }) => {
    if (!m.isAdmin) return m.reply("_You do not have administrative privileges._");
    await client.groupRevokeInvite(m.jid);
    await m.reply("_The group invite link has been revoked._");
});

iris({
    name : "join",
    fromMe: true,
    category : "group",
    desc: "Join a group using invite link.",
}, async ({ m, client, args }) => {
    if (!m.isAdmin) return m.reply("_You do not have administrative privileges._");
    const rgx = /^(https?:\/\/)?chat\.whatsapp\.com\/(?:invite\/)?([a-zA-Z0-9_-]{22})$/;
    if (!args || !rgx.test(args)) return await m.reply("_Please provide a valid group invite link._");
    const res = await client.groupAcceptInvite(args.split("/")[3]);
    if (!res) return await m.reply("_Invalid group link!_");
    return await m.reply("_Successfully joined the group!_");
});

// Type: Group Information (Admin Only)
//───────────────────────────────────────

iris({
    name: "groupinfo",
    fromMe: true,
    category: "info",
    desc: "Display information about the group (Admin Only)",
}, async ({ m, client }) => {
    if (!m.isGroup) return await m.reply("_This command can only be used in a group._");

    const isUserAdmin = await client.isGroupAdmin(m.chat, m.sender);
    const isBotAdmin = await client.isGroupAdmin(m.chat, client.user.jid);

    if (!isUserAdmin || !isBotAdmin) return await m.reply("_You need to be a group admin to use this command._");

    const chat = await client.getChatById(m.chat);

    const groupInfo = {
        name: chat.name || "_Group name not available._",
        description: chat.description || "_Group description not available._",
        inviteLink: chat.groupMetadata && chat.groupMetadata.inviteCode 
                        ? `https://chat.whatsapp.com/${chat.groupMetadata.inviteCode}` 
                        : "_Group invite link not available._",
        picUrl: chat.groupMetadata && chat.groupMetadata.profilePicThumbObj 
                        ? await client.getProfilePicture(m.chat).catch(() => null) 
                        : null,
    };

    let response = `*Group Information*\n`;
    response += `Name: ${groupInfo.name}\n`;
    response += `Description: ${groupInfo.description}\n`;
    response += `Invite Link: ${groupInfo.inviteLink}\n`;

    if (groupInfo.picUrl) {
        // If group picture is available, send the picture along with the text
        await client.sendImage(m.chat, groupInfo.picUrl, 'group-pic.jpg', response, m);
    } else {
        // If group picture is not available, send only the text
        return await m.reply(response);
    }
});
