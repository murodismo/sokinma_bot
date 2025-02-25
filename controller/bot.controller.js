const TelegramBot = require('node-telegram-bot-api');
require("dotenv").config()


const TOKEN = process.env.BOT_TOKEN;
const bot = new TelegramBot(TOKEN, { polling: true });

const badWords = [
    // "suka" varianti
    "suka", "sukaa", "sukka", "suukaa", "s*ka", "s.k.a", "suk@", "сука", "сукаа", "сукка", "су*ка", "с.у.к.а", "сук@", 
    
    // "bla", "blya", "blyat" varianti
    "bla", "blat", "bl@", "b.l.a", "бла", "бля", "бл@", "б.л.я", 
    "blyat", "blyaat", "blya", "bl*at", "bl.yat", "блять", "блят", "бл*ять", "бл.ять",
    
    // "onangni omi" varianti
    "onangni omi", "onangniomi", "onangni omii", "onangni omm", "onangni o.m.i", "onangni0mi",
    "онаңни оми", "онангни оми", "онангниоми", "онангни о.м.и", "онангни0ми",
    
    // "om" varianti
    "om", "omm", "ommm", "o.m", "o*m", "o-m", "ом", "омм", "о.м", "о*м",
    
    // "yaloqi" varianti
    "yaloqi", "yalokki", "yaloqii", "yalo.qi", "yal*oqi", "ялоки", "ялокки", "ял*оки", "я.л.о.ки",
    
    // "dinnaxuy" varianti
    "dinnaxuy", "dinaxuy", "dinahuy", "din.naxuy", "dinax*", "динахуй", "динаxуй", "дина.хуй",
    
    // "xuy" varianti
    "xuy", "huy", "xuuy", "xu.y", "x.u.y", "x*y", "хуи", "хуй", "хууй", "х.у.й", "х*й",
    
    // "idinaxuy" varianti
    "idinaxuy", "idinahuy", "idinnaxuy", "idihaxuy", "idi.naxuy", "иди нахуй", "идинахуй", "иди.нахуй",
    
    // "pizdes" varianti
    "pizdes", "pzd", "pzdets", "pizdets", "pi.zdets", "пиzдец", "пзд", "пиздец", "п.и.з.д.е.ц",
    
    // "dnx", "nx" varianti
    "dnx", "dnnx", "d.nx", "d*n*x", "днх", "д.н.х", "д*н*х",
    "nx", "nxx", "nx*", "n.x", "нх", "н.х", "н*х",
    
    // "xuyna" varianti
    "xuyna", "huyna", "xuyyna", "xu.y.na", "x*yna", "хуина", "хуйна", "ху.й.на", "х*йна",

    // "qo'to", "qotog", "qotoq" varianti
    "qo'to", "qotog", "qotoq", "qotoqq", "q.o.t.o.q", "qo*t*oq", "қо'то", "қотог", "қотоқ", "қо.тоқ", "қ*тоқ",
    
    // "qo'tog'im", "qotogim" varianti
    "qo'tog'im", "qotogim", "qotoqim", "qo'togimmm", "q.o.t.o.g.i.m", "қо'тоғим", "қотоғим", "қотоғиммм", "қ.о.т.о.ғ.и.м",
    
    // "qo'toni yebsan" varianti
    "qo'toni yebsan", "qotoni yebsan", "qo'toniyebsan", "qotoqni yebsan", "қо'тони ебсан", "қотоқни ебсан", "қотониебсан",
    
    // "am" varianti
    "am", "amm", "ammm", "a.m", "a*m", "а.м", "а*м", "ам", "амм", "аммм",
    
    // "skey", "ske", "sikay" varianti
    "skey", "ske", "sikay", "skay", "s.k.e.y", "s.k.e", "s*kay", "sk*ey", "ски", "скай", "с.кай", "с*кай"
];

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id
    bot.sendMessage(chatId, `Assalomu aleykum. Bu botni siz kanalingizga admin qilib qo'yish bilan kanalingizdagi so'kinishlarni oldini olgan holda odob bilan muloqot qilishini taminlashingiz mumkin agarda biron bir so'kinishlar ban bo'lmay qolayotgan bo'lsa shu bo'tga shunchaki xabar yozing va adminlar bu so'zni ham qo'shib qoyadi`)
}) 



bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const messageId = msg.message_id;
    const userId = msg.from.id;
    const text = msg.text ? msg.text.toLowerCase() : '';

    if (badWords.some(word => text.includes(word))) {
        try {
            // Xabarni o‘chirish
            await bot.deleteMessage(chatId, messageId);
            bot.sendMessage(chatId, `❌ <b>${msg.from.first_name}</b>, iltimos odob bilan gapiring!`, { parse_mode: "HTML" });
        } catch (error) {
            console.error('Xatolik:', error);
        }
    }
});


const postBadWords = (req, res, next) => {
    try{
        const sokinish = req.body.bad_words

        if (!Array.isArray(sokinish)) {
            res.status(400).json({
                message: `Siz kiritgan malumot array shaklida emas. Misol:["sokinish1", "sokinish2", "sokinish3"]`
            })
        }

        badWords.push(...sokinish)
        res.json("qo'shildi!")
    }catch(err){
        next(err)
    }
}

module.exports ={
    postBadWords
}