const express = require('express');
const app = express();
const cors = require('cors')
app.use(express.static('public'));
app.use(cors());
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);
let currentQuestionTimeoutIDs = []

let data = [
    {
        "name": "Ertaç Özbir",
        "age": 33,
        "pos": "Kaleci",
        "num": 25,
        "nationality": "turkey",
        "team": "adanademirspor",
        "picture_path": ""
    },
    {
        "name": "Goran Karacic",
        "age": 26,
        "pos": "Kaleci",
        "num": 18,
        "nationality": "bosnia-herzegovina",
        "team": "adanademirspor",
        "picture_path": ""
    },
    {
        "name": "Vedat Karakuş",
        "age": 18,
        "pos": "Kaleci",
        "num": 39,
        "nationality": "turkey",
        "team": "adanademirspor",
        "picture_path": "/images/players/adanademirspor/vedat-karakus.jpg"
    },
    {
        "name": "Mert Çetin",
        "age": 26,
        "pos": "Defans",
        "num": 45,
        "nationality": "turkey",
        "team": "adanademirspor",
        "picture_path": ""
    },
    {
        "name": "Simon Deli",
        "age": 31,
        "pos": "Defans",
        "num": 19,
        "nationality": "ivoire",
        "team": "adanademirspor",
        "picture_path": "/images/players/adanademirspor/simon-deli.png"
    },
    {
        "name": "Semih Güler",
        "age": 28,
        "pos": "Defans",
        "num": 4,
        "nationality": "turkey",
        "team": "adanademirspor",
        "picture_path": "/images/players/adanademirspor/semih-güler.jpg"
    },
    {
        "name": "Jovan Manev",
        "age": 22,
        "pos": "Defans",
        "num": 15,
        "nationality": "north-macedonia",
        "team": "adanademirspor",
        "picture_path": ""
    },
    {
        "name": "Kévin Rodrigues",
        "age": 28,
        "pos": "Defans",
        "num": 77,
        "nationality": "portugal",
        "team": "adanademirspor",
        "picture_path": ""
    },
    {
        "name": "Abdurrahim Dursun",
        "age": 24,
        "pos": "Defans",
        "num": 3,
        "nationality": "turkey",
        "team": "adanademirspor",
        "picture_path": ""
    },
    {
        "name": "Jonas Svensson",
        "age": 29,
        "pos": "Defans",
        "num": 22,
        "nationality": "norway",
        "team": "adanademirspor",
        "picture_path": "/images/players/adanademirspor/svensson.jpg"
    },
    {
        "name": "Ismail Çokçalış",
        "age": 22,
        "pos": "Defans",
        "num": 16,
        "nationality": "france",
        "team": "adanademirspor",
        "picture_path": "/images/players/adanademirspor/ismail-cokcalis.png"
    },
    {
        "name": "Jorge Morel",
        "age": 25,
        "pos": "Defans",
        "num": -1,
        "nationality": "paraguay",
        "team": "adanademirspor",
        "picture_path": ""
    },
    {
        "name": "Benjamin Stambouli",
        "age": 32,
        "pos": "Defans",
        "num": 90,
        "nationality": "france",
        "team": "adanademirspor",
        "picture_path": "/images/players/adanademirspor/stambouli.jpg"
    },
    {
        "name": "Gökhan İnler",
        "age": 38,
        "pos": "Ortasaha",
        "num": 88,
        "nationality": "switzerland",
        "team": "adanademirspor",
        "picture_path": "/images/players/adanademirspor/gokhan-inler.jpg"
    },
    {
        "name": "Badou Ndiaye",
        "age": 32,
        "pos": "Ortasaha",
        "num": 17,
        "nationality": "turkey",
        "team": "adanademirspor",
        "picture_path": ""
    },
    {
        "name": "Furkan Soyalp",
        "age": 27,
        "pos": "Ortasaha",
        "num": -1,
        "nationality": "turkey",
        "team": "adanademirspor",
        "picture_path": ""
    },
    {
        "name": "Mustafa Kapı",
        "age": 20,
        "pos": "Ortasaha",
        "num": 6,
        "nationality": "turkey",
        "team": "adanademirspor",
        "picture_path": "/images/players/adanademirspor/mustafa-kapi.png"
    },
    {
        "name": "Younès Belhanda",
        "age": 33,
        "pos": "Ortasaha",
        "num": 10,
        "nationality": "morocco",
        "team": "adanademirspor",
        "picture_path": "/images/players/adanademirspor/belhanda.jpg"
    },
    {
        "name": "Emre Akbaba",
        "age": 30,
        "pos": "Ortasaha",
        "num": 20,
        "nationality": "turkey",
        "team": "adanademirspor",
        "picture_path": ""
    },
    {
        "name": "Birkir Bjarnason",
        "age": 34,
        "pos": "Ortasaha",
        "num": 8,
        "nationality": "iceland",
        "team": "adanademirspor",
        "picture_path": "/images/players/adanademirspor/bjarnason.png"
    },
    {
        "name": "Erhun Öztümer",
        "age": 31,
        "pos": "Ortasaha",
        "num": 50,
        "nationality": "turkey",
        "team": "adanademirspor",
        "picture_path": "/images/players/adanademirspor/erhun-oztumer.png"
    },
    {
        "name": "Henry Onyekuru",
        "age": 25,
        "pos": "Ortasaha",
        "num": 7,
        "nationality": "england",
        "team": "adanademirspor",
        "picture_path": ""
    },
    {
        "name": "Yusuf Erdoğan",
        "age": 30,
        "pos": "Ortasaha",
        "num": 32,
        "nationality": "turkey",
        "team": "adanademirspor",
        "picture_path": ""
    },
    {
        "name": "David Akintola",
        "age": 27,
        "pos": "Ortasaha",
        "num": 11,
        "nationality": "nigeria",
        "team": "adanademirspor",
        "picture_path": "/images/players/adanademirspor/akintola.jpg"
    },
    {
        "name": "Yusuf Sarı",
        "age": 24,
        "pos": "Ortasaha",
        "num": 26,
        "nationality": "turkey",
        "team": "adanademirspor",
        "picture_path": ""
    },
    {
        "name": "Salih Kavrazli",
        "age": 20,
        "pos": "Ortasaha",
        "num": 28,
        "nationality": "turkey",
        "team": "adanademirspor",
        "picture_path": ""
    },
    {
        "name": "Samuel Nongoh",
        "age": 18,
        "pos": "Ortasaha",
        "num": 46,
        "nationality": "cameroon",
        "team": "adanademirspor",
        "picture_path": ""
    },
    {
        "name": "Fredrik Gulbrandsen",
        "age": 30,
        "pos": "Forvet",
        "num": 23,
        "nationality": "norway",
        "team": "adanademirspor",
        "picture_path": ""
    },
    {
        "name": "Cherif Ndiaye",
        "age": 27,
        "pos": "Forvet",
        "num": 29,
        "nationality": "senegal",
        "team": "adanademirspor",
        "picture_path": ""
    },


    //Alanyaspor
    {
        "name": "Runar Alex Runarsson",
        "age": 28,
        "pos": "Kaleci",
        "num": 13,
        "nationality": "iceland",
        "team": "alanyaspor",
        "picture_path": "/images/players/alanyaspor/runar-alex-runarsson.png"
    },
    {
        "name": "Yusuf Karagöz",
        "age": 23,
        "pos": "Kaleci",
        "num": 99,
        "nationality": "turkey",
        "team": "alanyaspor",
        "picture_path": "/images/players/alanyaspor/yusuf-karagoz.PNG"
    },
    {
        "name": "Fatih Aksoy",
        "age": 25,
        "pos": "Defans",
        "num": 14,
        "nationality": "turkey",
        "team": "alanyaspor",
        "picture_path": "/images/players/alanyaspor/fatih-aksoy.PNG"
    },
    {
        "name": "Zouhair Feddal",
        "age": 33,
        "pos": "Defans",
        "num": -1,
        "nationality": "morocco",
        "team": "alanyaspor",
        "picture_path": ""
    },
    {
        "name": "Furkan Bayır",
        "age": 23,
        "pos": "Defans",
        "num": 4,
        "nationality": "turkey",
        "team": "alanyaspor",
        "picture_path": "/images/players/alanyaspor/furkan-bayır.PNG"
    },
    {
        "name": "Khadim Rassoul",
        "age": 27,
        "pos": "Defans",
        "num": 23,
        "nationality": "senegal",
        "team": "alanyaspor",
        "picture_path": "/images/players/alanyaspor/khadim-rassoul.png"
    },
    {
        "name": "Ümit Akdağ",
        "age": 19,
        "pos": "Defans",
        "num": 5,
        "nationality": "turkey",
        "team": "alanyaspor",
        "picture_path": "/images/players/alanyaspor/umit-akdag.png"
    },
    {
        "name": "Jure Balkovec",
        "age": 28,
        "pos": "Defans",
        "num": 29,
        "nationality": "slovenia",
        "team": "alanyaspor",
        "picture_path": "/images/players/alanyaspor/welinton-souza-silva.png"
    },
    {
        "name": "Yusuf Özdemir",
        "age": 22,
        "pos": "Defans",
        "num": 88,
        "nationality": "turkey",
        "team": "alanyaspor",
        "picture_path": "/images/players/alanyaspor/yusuf-ozdemir.png"
    },
    {
        "name": "Ahmet Gülay",
        "age": 20,
        "pos": "Defans",
        "num": 3,
        "nationality": "turkey",
        "team": "alanyaspor",
        "picture_path": "/images/players/alanyaspor/ahmet-gulay.png"
    },
    {
        "name": "Pedro Pereira",
        "age": 25,
        "pos": "Defans",
        "num": 27,
        "nationality": "portugal",
        "team": "alanyaspor",
        "picture_path": "/images/players/alanyaspor/pedro-pereira.png"
    },
    {
        "name": "Yunus Bahadır",
        "age": 20,
        "pos": "Defans",
        "num": 42,
        "nationality": "turkey",
        "team": "alanyaspor",
        "picture_path": "/images/players/alanyaspor/yunus-bahadır.png"
    },
    {
        "name": "Çağan Kayra Erciyas",
        "age": 20,
        "pos": "Defans",
        "num": 39,
        "nationality": "turkey",
        "team": "alanyaspor",
        "picture_path": "/images/players/alanyaspor/cagan-kayra-erciyas.PNG"
    },
    {
        "name": "Idrissa Doumbia",
        "age": 24,
        "pos": "Ortasaha",
        "num": 98,
        "nationality": "ivoire",
        "team": "alanyaspor",
        "picture_path": "/images/players/alanyaspor/idrissa-doumbia.PNG"
    },
    {
        "name": "Leroy Fer",
        "age": 33,
        "pos": "Ortasaha",
        "num": 8,
        "nationality": "turkey",
        "team": "alanyaspor",
        "picture_path": "/images/players/alanyaspor/leroy-fer.png"
    },
    {
        "name": "Umut Güneş",
        "age": 22,
        "pos": "Ortasaha",
        "num": 6,
        "nationality": "canada",
        "team": "alanyaspor",
        "picture_path": "/images/players/alanyaspor/umut-gunes.png"
    },
    {
        "name": "Efkan Bekiroğlu",
        "age": 27,
        "pos": "Ortasaha",
        "num": 11,
        "nationality": "portugal",
        "team": "alanyaspor",
        "picture_path": "/images/players/alanyaspor/efkan-bekiroglu.PNG"
    },
    {
        "name": "Arnaud Lusamba",
        "age": 26,
        "pos": "Ortasaha",
        "num": 97,
        "nationality": "congo",
        "team": "alanyaspor",
        "picture_path": "/images/players/alanyaspor/arnaud-lusamba.PNG"
    },
    {
        "name": "Mert Yusuf Torlak",
        "age": 20,
        "pos": "Ortasaha",
        "num": 37,
        "nationality": "turkey",
        "team": "alanyaspor",
        "picture_path": "/images/players/alanyaspor/mert-yusuf-torlak.png"
    },
    {
        "name": "Ivan Cavaleiro",
        "age": 29,
        "pos": "Ortasaha",
        "num": 19,
        "nationality": "portugal",
        "team": "alanyaspor",
        "picture_path": "/images/players/alanyaspor/ivan-cavaleiro.png"
    },
    {
        "name": "Oğuz Aydın",
        "age": 22,
        "pos": "Ortasaha",
        "num": 70,
        "nationality": "turkey",
        "team": "alanyaspor",
        "picture_path": "/images/players/alanyaspor/oguz-aydin.png"
    },
    {
        "name": "Wilson Eduardo",
        "age": 32,
        "pos": "Ortasaha",
        "num": 17,
        "nationality": "angola",
        "team": "alanyaspor",
        "picture_path": "/images/players/alanyaspor/wilson-eduardo.png"
    },
    {
        "name": "Zinedine Ferhat",
        "age": 29,
        "pos": "Ortasaha",
        "num": 10,
        "nationality": "algeria",
        "team": "alanyaspor",
        "picture_path": "/images/players/alanyaspor/zinedine-ferhat.png"
    },
    {
        "name": "Efecan Karaca",
        "age": 33,
        "pos": "Ortasaha",
        "num": 7,
        "nationality": "turkey",
        "team": "alanyaspor",
        "picture_path": "/images/players/alanyaspor/efecan-karaca.PNG"
    },
    {
        "name": "Daniel Candeias",
        "age": 35,
        "pos": "Ortasaha",
        "num": 21,
        "nationality": "portugal",
        "team": "alanyaspor",
        "picture_path": "/images/players/alanyaspor/daniel-candeias.PNG"
    },
    {
        "name": "Ahmed Hassan",
        "age": 29,
        "pos": "Forvet",
        "num": 93,
        "nationality": "egypt",
        "team": "alanyaspor",
        "picture_path": "/images/players/alanyaspor/ahmed-hassan.png"
    },
    {
        "name": "Efthymios Koulouris",
        "age": 26,
        "pos": "Forvet",
        "num": -1,
        "nationality": "greece",
        "team": "alanyaspor",
        "picture_path": "g"
    },
    {
        "name": "Erencan Yardımcı",
        "age": 21,
        "pos": "Forvet",
        "num": 9,
        "nationality": "turkey",
        "team": "alanyaspor",
        "picture_path": "/images/players/alanyaspor/erencan-yardimci.PNG"
    },


    //Antalyaspor
    {
        "name": "Helton Leite",
        "age": 32,
        "pos": "Kaleci",
        "num": 90,
        "nationality": "brazil",
        "team": "antalyaspor",
        "picture_path": "/images/players/antalyaspor/helton-leite.png"
    },
    {
        "name": "Alperen Uysal",
        "age": 29,
        "pos": "Kaleci",
        "num": 1,
        "nationality": "turkey",
        "team": "antalyaspor",
        "picture_path": "/images/players/antalyaspor/alperen-uysal.png"
    },
    {
        "name": "Ataberk Dadakdeniz",
        "age": 23,
        "pos": "Kaleci",
        "num": 35,
        "nationality": "turkey",
        "team": "antalyaspor",
        "picture_path": "/images/players/antalyaspor/ataberk-dadakdeniz.png"
    },
    {
        "name": "Emrecan Uzunhan",
        "age": 22,
        "pos": "Defans",
        "num": -1,
        "nationality": "turkey",
        "team": "antalyaspor",
        "picture_path": "/images/players/antalyaspor/emrecan-uzunhan.png"
    },
    {
        "name": "Christian Luyindama",
        "age": 29,
        "pos": "Defans",
        "num": 28,
        "nationality": "turkey",
        "team": "antalyaspor",
        "picture_path": "/images/players/antalyaspor/christian-luyindama.png"
    },
    {
        "name": "Mark Mampassi",
        "age": 19,
        "pos": "Defans",
        "num": 26,
        "nationality": "russia",
        "team": "antalyaspor",
        "picture_path": "/images/players/antalyaspor/mark-mampassi.png"
    },
    {
        "name": "Ömer Toprak",
        "age": 33,
        "pos": "Defans",
        "num": 21,
        "nationality": "turkey",
        "team": "antalyaspor",
        "picture_path": "/images/players/antalyaspor/omer-toprak.png"
    },
    {
        "name": "Veysel Sarı",
        "age": 34,
        "pos": "Defans",
        "num": 89,
        "nationality": "slovenia",
        "team": "antalyaspor",
        "picture_path": "/images/players/antalyaspor/veysel-sari.png"
    },
    {
        "name": "Fedor Kudryashov",
        "age": 35,
        "pos": "Defans",
        "num": 13,
        "nationality": "russia",
        "team": "antalyaspor",
        "picture_path": "/images/players/antalyaspor/fedor-kudriashov.png"
    },
    {
        "name": "Amar Gerxhaliu",
        "age": 20,
        "pos": "Defans",
        "num": 4,
        "nationality": "kosovo",
        "team": "antalyaspor",
        "picture_path": "/images/players/antalyaspor/amar-gerxhaliu.png"
    },
    {
        "name": "Cemali Sertel",
        "age": 23,
        "pos": "Defans",
        "num": 3,
        "nationality": "turkey",
        "team": "antalyaspor",
        "picture_path": "/images/players/antalyaspor/cemali-sertel.png"
    },
    {
        "name": "Güray Vural",
        "age": 34,
        "pos": "Defans",
        "num": 11,
        "nationality": "turkey",
        "team": "antalyaspor",
        "picture_path": "/images/players/antalyaspor/guray-vural.png"
    },
    {
        "name": "Berat Pınar",
        "age": 20,
        "pos": "Defans",
        "num": -1,
        "nationality": "turkey",
        "team": "antalyaspor",
        "picture_path": ""
    },
    {
        "name": "Bünyamin Balcı",
        "age": 22,
        "pos": "Defans",
        "num": 7,
        "nationality": "turkey",
        "team": "antalyaspor",
        "picture_path": "/images/players/antalyaspor/bunyamin-balci.png"
    },
    {
        "name": "Sherel Floranus",
        "age": 24,
        "pos": "Defans",
        "num": 2,
        "nationality": "netherlands",
        "team": "antalyaspor",
        "picture_path": "/images/players/antalyaspor/sherel-floranus.png"
    },
    {
        "name": "Fernando Martins",
        "age": 30,
        "pos": "Ortasaha",
        "num": 8,
        "nationality": "brazil",
        "team": "antalyaspor",
        "picture_path": "/images/players/antalyaspor/fernando-martins.png"
    },
    {
        "name": "Ufuk Akyol",
        "age": 25,
        "pos": "Ortasaha",
        "num": 19,
        "nationality": "turkey",
        "team": "antalyaspor",
        "picture_path": "/images/players/antalyaspor/ufuk-akyol.png"
    },
    {
        "name": "Fredy Riberio",
        "age": 32,
        "pos": "Ortasaha",
        "num": 16,
        "nationality": "angola",
        "team": "antalyaspor",
        "picture_path": "/images/players/antalyaspor/fredy-riberio.png"
    },
    {
        "name": "Erdal Rakip",
        "age": 27,
        "pos": "Ortasaha",
        "num": 6,
        "nationality": "turkey",
        "team": "antalyaspor",
        "picture_path": "/images/players/antalyaspor/erdal-rakip.png"
    },
    {
        "name": "Ivan Cavaleiro",
        "age": 29,
        "pos": "Ortasaha",
        "num": 19,
        "nationality": "portugal",
        "team": "antalyaspor",
        "picture_path": "/images/players/antalyaspor/ivan-cavaleiro.png"
    },
    {
        "name": "Mustafa Erdilman",
        "age": 19,
        "pos": "Ortasaha",
        "num": 30,
        "nationality": "turkey",
        "team": "antalyaspor",
        "picture_path": "/images/players/antalyaspor/mustafa-erdilman.png"
    },
    {
        "name": "Mevlüthan Ekelik",
        "age": 18,
        "pos": "Ortasaha",
        "num": 23,
        "nationality": "turkey",
        "team": "antalyaspor",
        "picture_path": "/images/players/antalyaspor/mevlüthan-ekelik.png"
    },
    {
        "name": "Shoya Nakajima",
        "age": 28,
        "pos": "Ortasaha",
        "num": 22,
        "nationality": "japan",
        "team": "antalyaspor",
        "picture_path": "/images/players/antalyaspor/shoya-nakajima.png"
    },
    {
        "name": "Balint Szabo",
        "age": 22,
        "pos": "Ortasaha",
        "num": -1,
        "nationality": "hungary",
        "team": "antalyaspor",
        "picture_path": "/images/players/antalyaspor/balint-szabo.png"
    },
    {
        "name": "Doğukan Sinik",
        "age": 24,
        "pos": "Ortasaha",
        "num": 70,
        "nationality": "turkey",
        "team": "antalyaspor",
        "picture_path": "/images/players/antalyaspor/dogukhan-sinik.png"
    },
    {
        "name": "Sam Larsson",
        "age": 29,
        "pos": "Ortasaha",
        "num": 20,
        "nationality": "norway",
        "team": "antalyaspor",
        "picture_path": "/images/players/antalyaspor/sam-larsson.png"
    },
    {
        "name": "Houssam Ghacha",
        "age": 27,
        "pos": "Ortasaha",
        "num": 27,
        "nationality": "algeria",
        "team": "antalyaspor",
        "picture_path": "/images/players/antalyaspor/houssam-chacha.png"
    },
    {
        "name": "Alassane Ndao",
        "age": 26,
        "pos": "Ortasaha",
        "num": 18,
        "nationality": "senegal",
        "team": "antalyaspor",
        "picture_path": "/images/players/antalyaspor/alassane-ndao.png"
    },
    {
        "name": "Sinan Gümüs",
        "age": 29,
        "pos": "Ortasaha",
        "num": 77,
        "nationality": "turkey",
        "team": "antalyaspor",
        "picture_path": "/images/players/antalyaspor/sinan-gumus.png"
    },
    {
        "name": "Admir Mehmedi",
        "age": 31,
        "pos": "Ortasaha",
        "num": 14,
        "nationality": "switzerland",
        "team": "antalyaspor",
        "picture_path": "/images/players/antalyaspor/admir-mehmedi.png"
    },
    {
        "name": "Haji Wright",
        "age": 24,
        "pos": "Forvet",
        "num": 9,
        "nationality": "usa",
        "team": "antalyaspor",
        "picture_path": "/images/players/antalyaspor/haji-wright.png"
    },
    {
        "name": "Bertuğ Özgür Yıldırım",
        "age": 20,
        "pos": "Forvet",
        "num": 17,
        "nationality": "turkey",
        "team": "antalyaspor",
        "picture_path": "/images/players/antalyaspor/bertug-ozgur-yildirim.png"
    },
    //Beşiktaş
    {
        "name": "Ersin Destanoğlu",
        "age": 22,
        "pos": "Kaleci",
        "num": 1,
        "nationality": "turkey",
        "team": "besiktas",
        "picture_path": "/images/players/besiktas/ersin-destanoglu.png"
    },
    {
        "name": "Mert Günok",
        "age": 33,
        "pos": "Kaleci",
        "num": 34,
        "nationality": "turkey",
        "team": "besiktas",
        "picture_path": "/images/players/besiktas/mert-gunok.png"
    },
    {
        "name": "Emre Bilgin",
        "age": 18,
        "pos": "Kaleci",
        "num": 99,
        "nationality": "turkey",
        "team": "besiktas",
        "picture_path": "/images/players/besiktas/emre-bilgin.png"
    },
    {
        "name": "Utku Yuvakuran",
        "age": 25,
        "pos": "Kaleci",
        "num": 97,
        "nationality": "turkey",
        "team": "besiktas",
        "picture_path": "/images/players/besiktas/utku-yuvakuran.png"
    },
    {
        "name": "Romain Saïss",
        "age": 32,
        "pos": "Defans",
        "num": 26,
        "nationality": "morocco",
        "team": "besiktas",
        "picture_path": "/images/players/besiktas/romain-saiss.png"
    },
    {
        "name": "Tayyip Talha Sanuc",
        "age": 23,
        "pos": "Defans",
        "num": 3,
        "nationality": "turkey",
        "team": "besiktas",
        "picture_path": "/images/players/besiktas/tayyip-talha-sanuc.jpg"
    },
    {
        "name": "Necip Uysal",
        "age": 32,
        "pos": "Defans",
        "num": 20,
        "nationality": "turkey",
        "team": "besiktas",
        "picture_path": "/images/players/besiktas/necip-uysal.png"
    },
    {
        "name": "Welinton",
        "age": 33,
        "pos": "Defans",
        "num": 23,
        "nationality": "brazil",
        "team": "besiktas",
        "picture_path": "/images/players/besiktas/welinton-souza-silva.png"
    },
    {
        "name": "Arthur Masuaku",
        "age": 29,
        "pos": "Defans",
        "num": 25,
        "nationality": "congo",
        "team": "besiktas",
        "picture_path": "/images/players/besiktas/arthur-masuaku.png"
    },
    {
        "name": "Umut Meras",
        "age": 27,
        "pos": "Defans",
        "num": 77,
        "nationality": "turkey",
        "team": "besiktas",
        "picture_path": "/images/players/besiktas/umut-meras.png"
    },
    {
        "name": "Valentin Rosier",
        "age": 26,
        "pos": "Defans",
        "num": 2,
        "nationality": "france",
        "team": "besiktas",
        "picture_path": "/images/players/besiktas/valentin-rosier.png"
    },
    {
        "name": "Onur Bulut",
        "age": 28,
        "pos": "Defans",
        "num": 4,
        "nationality": "turkey",
        "team": "besiktas",
        "picture_path": ""
    },
    {
        "name": "Tayfur Bingöl",
        "age": 30,
        "pos": "Defans",
        "num": 88,
        "nationality": "turkey",
        "team": "besiktas",
        "picture_path": "/images/players/besiktas/tayfur-bingol.jpg"
    },
    {
        "name": "Amir Hadziahmetovic",
        "age": 25,
        "pos": "Ortasaha",
        "num": 19,
        "nationality": "bosnia-herzegovina",
        "team": "besiktas",
        "picture_path": "/images/players/besiktas/amir-hadziahmetovic.png"
    },
    {
        "name": "Berkay Vardar",
        "age": 20,
        "pos": "Ortasaha",
        "num": 22,
        "nationality": "turkey",
        "team": "besiktas",
        "picture_path": "/images/players/besiktas/berkay-vardar.jpg"
    },
    {
        "name": "Atiba Hutchinson",
        "age": 40,
        "pos": "Ortasaha",
        "num": 13,
        "nationality": "canada",
        "team": "besiktas",
        "picture_path": "/images/players/besiktas/atiba-hutchinson.png"
    },
    {
        "name": "Gedson Fernandes",
        "age": 24,
        "pos": "Ortasaha",
        "num": 83,
        "nationality": "portugal",
        "team": "besiktas",
        "picture_path": "/images/players/besiktas/gedson-carvalho-fernandes.png"
    },
    {
        "name": "Salih Ucan",
        "age": 29,
        "pos": "Ortasaha",
        "num": 8,
        "nationality": "turkey",
        "team": "besiktas",
        "picture_path": "/images/players/besiktas/salih-ucan.png"
    },
    {
        "name": "Kerem Atakan Kesgin",
        "age": 22,
        "pos": "Ortasaha",
        "num": 17,
        "nationality": "turkey",
        "team": "besiktas",
        "picture_path": "/images/players/besiktas/kerem-atakan-kesgin.jpg"
    },
    {
        "name": "Dele Alli",
        "age": 26,
        "pos": "Ortasaha",
        "num": 11,
        "nationality": "england",
        "team": "besiktas",
        "picture_path": "/images/players/besiktas/dele-alli.jpg"
    },
    {
        "name": "Alexandru Maxim",
        "age": 32,
        "pos": "Ortasaha",
        "num": -1,
        "nationality": "romania",
        "team": "besiktas",
        "picture_path": ""
    },
    {
        "name": "Nathan Redmond",
        "age": 28,
        "pos": "Ortasaha",
        "num": 15,
        "nationality": "england",
        "team": "besiktas",
        "picture_path": "/images/players/besiktas/nathan-redmond.png"
    },
    {
        "name": "Georges-Kevin N'Koudou",
        "age": 28,
        "pos": "Ortasaha",
        "num": 7,
        "nationality": "france",
        "team": "besiktas",
        "picture_path": "/images/players/besiktas/georges-kevin-nkoudou.png"
    },
    {
        "name": "Rachid Ghezzal",
        "age": 30,
        "pos": "Ortasaha",
        "num": 18,
        "nationality": "algeria",
        "team": "besiktas",
        "picture_path": "/images/players/besiktas/rachid-ghezzal.png"
    },
    {
        "name": "Jackson Muleka",
        "age": 23,
        "pos": "Ortasaha",
        "num": 40,
        "nationality": "congo",
        "team": "besiktas",
        "picture_path": "/images/players/besiktas/jackson-muleka.png"
    },
    {
        "name": "Vincent Aboubakar",
        "age": 31,
        "pos": "Forvet",
        "num": 10,
        "nationality": "cameroon",
        "team": "besiktas",
        "picture_path": "/images/players/besiktas/vincent-aboubakar.png"
    },
    {
        "name": "Cenk Tosun",
        "age": 31,
        "pos": "Forvet",
        "num": 9,
        "nationality": "turkey",
        "team": "besiktas",
        "picture_path": "/images/players/besiktas/cenk-tosun.png"
    },
    //Fatih Karagümrük
    {
        "name": "Emiliano Viviano",
        "age": 37,
        "pos": "Kaleci",
        "num": 2,
        "nationality": "italy",
        "team": "fatihkaragumruk",
        "picture_path": "/images/players/fatihkaragumruk/emiliano-viviano.png"
    },
    {
        "name": "Batuhan Sen",
        "age": 24,
        "pos": "Kaleci",
        "num": 1,
        "nationality": "turkey",
        "team": "fatihkaragumruk",
        "picture_path": "/images/players/fatihkaragumruk/batuhan-sen.png"
    },
    {
        "name": "Cem Kablan",
        "age": 23,
        "pos": "Kaleci",
        "num": 23,
        "nationality": "turkey",
        "team": "fatihkaragumruk",
        "picture_path": "/images/players/fatihkaragumruk/cem-kablan.png"
    },
    {
        "name": "Bruno Rodrigues",
        "age": 21,
        "pos": "Defans",
        "num": 6,
        "nationality": "portugal",
        "team": "fatihkaragumruk",
        "picture_path": "/images/players/fatihkaragumruk/bruno-rodrigues.png"
    },
    {
        "name": "Davide Biraschi",
        "age": 28,
        "pos": "Defans",
        "num": 4,
        "nationality": "italy",
        "team": "fatihkaragumruk",
        "picture_path": "/images/players/fatihkaragumruk/davide-biraschi.png"
    },
    {
        "name": "Ibrahim Dresevic",
        "age": 26,
        "pos": "Defans",
        "num": 5,
        "nationality": "russia",
        "team": "fatihkaragumruk",
        "picture_path": "/images/players/fatihkaragumruk/ibrahim-dresevic.png"
    },
    {
        "name": "Rayyan Baniya",
        "age": 24,
        "pos": "Defans",
        "num": 99,
        "nationality": "turkey",
        "team": "fatihkaragumruk",
        "picture_path": "/images/players/fatihkaragumruk/rayyan-baniya.png"
    },
    {
        "name": "Emir Tintis",
        "age": 19,
        "pos": "Defans",
        "num": 3,
        "nationality": "turkey",
        "team": "fatihkaragumruk",
        "picture_path": "/images/players/fatihkaragumruk/emir-tintis.png"
    },
    {
        "name": "Salih Dursun",
        "age": 31,
        "pos": "Defans",
        "num": 54,
        "nationality": "turkey",
        "team": "fatihkaragumruk",
        "picture_path": "/images/players/fatihkaragumruk/salih-dursun.png"
    },
    {
        "name": "Efecan Mizrakci",
        "age": 19,
        "pos": "Defans",
        "num": 37,
        "nationality": "turkey",
        "team": "fatihkaragumruk",
        "picture_path": "/images/players/fatihkaragumruk/efecan-mizrakci.png"
    },
    {
        "name": "Matteo Ricci",
        "age": 28,
        "pos": "Ortasaha",
        "num": 8,
        "nationality": "italy",
        "team": "fatihkaragumruk",
        "picture_path": "/images/players/fatihkaragumruk/matteo-ricci.png"
    },
    {
        "name": "Magomed Ozdoev",
        "age": 30,
        "pos": "Ortasaha",
        "num": 27,
        "nationality": "russia",
        "team": "fatihkaragumruk",
        "picture_path": "/images/players/fatihkaragumruk/magomed-ozdoev.png"
    },
    {
        "name": "Otabek Shukurov",
        "age": 26,
        "pos": "Ortasaha",
        "num": 29,
        "nationality": "ozbekistan",
        "team": "fatihkaragumruk",
        "picture_path": "/images/players/fatihkaragumruk/otabek-shukurov.png"
    },
    {
        "name": "Andrea Bertolacci",
        "age": 32,
        "pos": "Ortasaha",
        "num": 91,
        "nationality": "italy",
        "team": "fatihkaragumruk",
        "picture_path": "/images/players/fatihkaragumruk/andrea-bertolacci.png"
    },
    {
        "name": "Levent Mercan",
        "age": 22,
        "pos": "Ortasaha",
        "num": 18,
        "nationality": "turkey",
        "team": "fatihkaragumruk",
        "picture_path": "/images/players/fatihkaragumruk/levent-mercan.png"
    },
    {
        "name": "Efe Tatlı",
        "age": 20,
        "pos": "Ortasaha",
        "num": 14,
        "nationality": "turkey",
        "team": "fatihkaragumruk",
        "picture_path": "/images/players/fatihkaragumruk/efe-tatli.jpg"
    },
    {
        "name": "Adnan Uğur",
        "age": 21,
        "pos": "Ortasaha",
        "num": 77,
        "nationality": "turkey",
        "team": "fatihkaragumruk",
        "picture_path": "/images/players/fatihkaragumruk/adnan-ugur.png"
    },
    {
        "name": "Lawrence Nicholas",
        "age": 21,
        "pos": "Ortasaha",
        "num": 24,
        "nationality": "nigeria",
        "team": "fatihkaragumruk",
        "picture_path": "/images/players/fatihkaragumruk/lawrence-nicholas.png"
    },
    {
        "name": "Fatih Kurnaz",
        "age": 21,
        "pos": "Ortasaha",
        "num": 25,
        "nationality": "turkey",
        "team": "fatihkaragumruk",
        "picture_path": "/images/players/fatihkaragumruk/fatih-kurnaz.png"
    },
    {
        "name": "Adem Ljajic",
        "age": 31,
        "pos": "Ortasaha",
        "num": 33,
        "nationality": "serbia",
        "team": "fatihkaragumruk",
        "picture_path": "/images/players/fatihkaragumruk/adem-ljajić.png"
    },
    {
        "name": "Samed Onur",
        "age": 20,
        "pos": "Ortasaha",
        "num": 17,
        "nationality": "turkey",
        "team": "fatihkaragumruk",
        "picture_path": "/images/players/fatihkaragumruk/samed-onur.png"
    },
    {
        "name": "Saba Lobzhanidze",
        "age": 28,
        "pos": "Ortasaha",
        "num": -1,
        "nationality": "georgia",
        "team": "fatihkaragumruk",
        "picture_path": "/images/players/fatihkaragumruk/saba-lobzhanidze.png"
    },
    {
        "name": "Fabio Borini",
        "age": 31,
        "pos": "Ortasaha",
        "num": 16,
        "nationality": "italy",
        "team": "fatihkaragumruk",
        "picture_path": "/images/players/fatihkaragumruk/shoya-nakajima.png"
    },
    {
        "name": "Kerim Frei",
        "age": 29,
        "pos": "Ortasaha",
        "num": 11,
        "nationality": "turkey",
        "team": "fatihkaragumruk",
        "picture_path": "/images/players/fatihkaragumruk/kerim-frei.png"
    },
    {
        "name": "Brahim Darri",
        "age": 28,
        "pos": "Ortasaha",
        "num": -1,
        "nationality": "netherlands",
        "team": "fatihkaragumruk",
        "picture_path": "/images/players/fatihkaragumruk/brahim-darri.jpg"
    },
    {
        "name": "Ebrima Colley",
        "age": 23,
        "pos": "Ortasaha",
        "num": 19,
        "nationality": "gambia",
        "team": "fatihkaragumruk",
        "picture_path": "/images/players/fatihkaragumruk/ebrima-colley.png"
    },
    {
        "name": "Burak Kapacak",
        "age": 23,
        "pos": "Ortasaha",
        "num": 22,
        "nationality": "turkey",
        "team": "fatihkaragumruk",
        "picture_path": "/images/players/fatihkaragumruk/burak-kapacak.png"
    },
    {
        "name": "Sofiane Feghouli",
        "age": 33,
        "pos": "Ortasaha",
        "num": 89,
        "nationality": "algeria",
        "team": "fatihkaragumruk",
        "picture_path": "/images/players/fatihkaragumruk/sofiane-feghouli.png"
    },
    {
        "name": "Mbaye Diagne",
        "age": 31,
        "pos": "Forvet",
        "num": 9,
        "nationality": "senegal",
        "team": "fatihkaragumruk",
        "picture_path": "/images/players/fatihkaragumruk/mbaye-diagne.png"
    },
    {
        "name": "Colin Kazim-Richards",
        "age": 36,
        "pos": "Forvet",
        "num": 13,
        "nationality": "turkey",
        "team": "fatihkaragumruk",
        "picture_path": "/images/players/fatihkaragumruk/colin-kazim-richards.png"
    },

    //Fenerbahçe
    {
        "name": "Altay Bayındır",
        "age": 24,
        "pos": "Kaleci",
        "num": 1,
        "nationality": "turkey",
        "team": "fenerbahce",
        "picture_path": "/images/players/fenerbahce/altay-bayindir.png"
    },
    {
        "name": "İrfan Can Eğribayat",
        "age": 24,
        "pos": "Kaleci",
        "num": 70,
        "nationality": "turkey",
        "team": "fenerbahce",
        "picture_path": "/images/players/fenerbahce/irfancan-egribayat.png"
    },
    {
        "name": "Ertuğrul Çetin",
        "age": 19,
        "pos": "Kaleci",
        "num": 54,
        "nationality": "turkey",
        "team": "fenerbahce",
        "picture_path": "/images/players/fenerbahce/ertugrul-cetin.png"
    },
    {
        "name": "Attila Szalai",
        "age": 25,
        "pos": "Defans",
        "num": 41,
        "nationality": "hungary",
        "team": "fenerbahce",
        "picture_path": "/images/players/fenerbahce/attila-szalai.png"
    },
    {
        "name": "Luan Peres",
        "age": 28,
        "pos": "Defans",
        "num": 28,
        "nationality": "brazil",
        "team": "fenerbahce",
        "picture_path": "/images/players/fenerbahce/luan-peres.png"
    },
    {
        "name": "Gustavo Henrique",
        "age": 29,
        "pos": "Defans",
        "num": 2,
        "nationality": "brazil",
        "team": "fenerbahce",
        "picture_path": "/images/players/fenerbahce/gustavo-henrique.png"
    },
    {
        "name": "Samet Akaydın",
        "age": 28,
        "pos": "Defans",
        "num": 3,
        "nationality": "turkey",
        "team": "fenerbahce",
        "picture_path": ""
    },
    {
        "name": "Serdar Aziz",
        "age": 32,
        "pos": "Defans",
        "num": 4,
        "nationality": "turkey",
        "team": "fenerbahce",
        "picture_path": "/images/players/fenerbahce/serdar-aziz.png"
    },
    {
        "name": "Ezgjan Alioski",
        "age": 31,
        "pos": "Defans",
        "num": 6,
        "nationality": "north-macedonia",
        "team": "fenerbahce",
        "picture_path": "/images/players/fenerbahce/ezgjan-alioski.png"
    },
    {
        "name": "Jayden Oosterwolde",
        "age": 21,
        "pos": "Defans",
        "num": 24,
        "nationality": "netherlands",
        "team": "fenerbahce",
        "picture_path": ""
    },
    {
        "name": "Ferdi Kadıoğlu",
        "age": 23,
        "pos": "Defans",
        "num": 7,
        "nationality": "italy",
        "team": "fenerbahce",
        "picture_path": "/images/players/fenerbahce/ferdi-kadioglu.png"
    },
    {
        "name": "Bright Osayi-Samuel",
        "age": 25,
        "pos": "Defans",
        "num": 21,
        "nationality": "nigeria",
        "team": "fenerbahce",
        "picture_path": "/images/players/fenerbahce/nazim-sangare.png"
    },
    {
        "name": "Willian Arao",
        "age": 30,
        "pos": "Ortasaha",
        "num": 5,
        "nationality": "brazil",
        "team": "fenerbahce",
        "picture_path": "/images/players/fenerbahce/willian-arao.png"
    },
    {
        "name": "Miguel Crespo",
        "age": 26,
        "pos": "Ortasaha",
        "num": 27,
        "nationality": "portugal",
        "team": "fenerbahce",
        "picture_path": "/images/players/fenerbahce/miguel-crespo.png"
    },
    {
        "name": "Miha Zajc",
        "age": 28,
        "pos": "Ortasaha",
        "num": 26,
        "nationality": "slovenia",
        "team": "fenerbahce",
        "picture_path": "/images/players/fenerbahce/miha-zajc.png"
    },
    {
        "name": "İsmail Yüksek",
        "age": 24,
        "pos": "Ortasaha",
        "num": 80,
        "nationality": "turkey",
        "team": "fenerbahce",
        "picture_path": "/images/players/fenerbahce/ismail-yuksek.png"
    },
    {
        "name": "Mert Hakan Yandaş",
        "age": 28,
        "pos": "Ortasaha",
        "num": 8,
        "nationality": "turkey",
        "team": "fenerbahce",
        "picture_path": "/images/players/fenerbahce/mert-hakan-yandas.png"
    },
    {
        "name": "Arda Güler",
        "age": 18,
        "pos": "Ortasaha",
        "num": 10,
        "nationality": "turkey",
        "team": "fenerbahce",
        "picture_path": "/images/players/fenerbahce/arda-guler.png"
    },
    {
        "name": "Lincoln",
        "age": 24,
        "pos": "Ortasaha",
        "num": 18,
        "nationality": "brazil",
        "team": "fenerbahce",
        "picture_path": "/images/players/fenerbahce/lincoln.png"
    },
    {
        "name": "Diego Rossi",
        "age": 24,
        "pos": "Ortasaha",
        "num": 9,
        "nationality": "uruguay",
        "team": "fenerbahce",
        "picture_path": "/images/players/fenerbahce/diego-rossi.png"
    },
    {
        "name": "İrfan Can Kahveci",
        "age": 27,
        "pos": "Ortasaha",
        "num": 17,
        "nationality": "turkey",
        "team": "fenerbahce",
        "picture_path": "/images/players/fenerbahce/irfancan-kahveci.png"
    },
    {
        "name": "Emre Mor",
        "age": 25,
        "pos": "Ortasaha",
        "num": 99,
        "nationality": "turkey",
        "team": "fenerbahce",
        "picture_path": "/images/players/fenerbahce/emre-mor.png"
    },
    {
        "name": "Michy Batshuayi",
        "age": 29,
        "pos": "Forvet",
        "num": 23,
        "nationality": "belgium",
        "team": "fenerbahce",
        "picture_path": "/images/players/fenerbahce/michy-batshuayi.png"
    },
    {
        "name": "Joao Pedro",
        "age": 30,
        "pos": "Forvet",
        "num": 20,
        "nationality": "italy",
        "team": "fenerbahce",
        "picture_path": "/images/players/fenerbahce/joao-pedro.png"
    },
    {
        "name": "Joshua King",
        "age": 31,
        "pos": "Forvet",
        "num": 15,
        "nationality": "norway",
        "team": "fenerbahce",
        "picture_path": "/images/players/fenerbahce/joshua-king.png"
    },
    {
        "name": "Enner Valencia",
        "age": 33,
        "pos": "Forvet",
        "num": 13,
        "nationality": "ecuador",
        "team": "fenerbahce",
        "picture_path": "/images/players/fenerbahce/enner-valencia.png"
    },
    {
        "name": "Serdar Dursun",
        "age": 31,
        "pos": "Forvet",
        "num": 19,
        "nationality": "turkey",
        "team": "fenerbahce",
        "picture_path": "/images/players/fenerbahce/serdar-dursun.png"
    },

    //Galatasaray
    {
        "name": "Fernando Muslera",
        "age": 36,
        "pos": "Kaleci",
        "num": 1,
        "nationality": "uruguay",
        "team": "galatasaray",
        "picture_path": "/images/players/galatasaray/fernando-muslera.png"
    },
    {
        "name": "Okan Koçuk",
        "age": 27,
        "pos": "Kaleci",
        "num": 34,
        "nationality": "turkey",
        "team": "galatasaray",
        "picture_path": "/images/players/galatasaray/okan-kocuk.png"
    },
    {
        "name": "Jankat Yilmaz", "age": 18, "pos": "Kaleci", "num": 50, "nationality": "turkey", "team": "galatasaray",
        "picture_path": "/images/players/galatasaray/jankat-yilmaz.png"
    },
    {
        "name": "Victor Nelsson",
        "age": 24,
        "pos": "Defans",
        "num": 25,
        "nationality": "denmark",
        "team": "galatasaray",
        "picture_path": "/images/players/galatasaray/victor-enok-nelsson.png"
    },
    {
        "name": "Kaan Ayhan", "age": 28, "pos": "Defans", "num": 23, "nationality": "turkey", "team": "galatasaray",
        "picture_path": ""
    },
    {
        "name": "Abdülkerim Bardakçı",
        "age": 28,
        "pos": "Defans",
        "num": 42,
        "nationality": "turkey",
        "team": "galatasaray",
        "picture_path": "/images/players/galatasaray/abdülkerim-bardakci.png"
    },
    {
        "name": "Mathias Ross", "age": 22, "pos": "Defans", "num": 4, "nationality": "denmark", "team": "galatasaray",
        "picture_path": "/images/players/galatasaray/mathias-ross-jensen.png"
    },
    {
        "name": "Emin Bayram", "age": 19, "pos": "Defans", "num": 40, "nationality": "turkey", "team": "galatasaray",
        "picture_path": "/images/players/galatasaray/emin-bayram.png"
    },
    {
        "name": "Sam Adekugbe", "age": 28, "pos": "Defans", "num": 32, "nationality": "canada", "team": "galatasaray",
        "picture_path": ""
    },
    {
        "name": "Kazımcan Karataş",
        "age": 20,
        "pos": "Defans",
        "num": 88,
        "nationality": "turkey",
        "team": "galatasaray",
        "picture_path": "/images/players/galatasaray/kazımcan-karatas.png"
    },
    {
        "name": "Emre Taşdemir", "age": 27, "pos": "Defans", "num": 13, "nationality": "turkey", "team": "galatasaray",
        "picture_path": "/images/players/galatasaray/emre-tasdemir.png"
    },
    {
        "name": "Sacha Boey", "age": 22, "pos": "Defans", "num": 93, "nationality": "france", "team": "galatasaray",
        "picture_path": "/images/players/galatasaray/sacha-boey.png"
    },
    {
        "name": "Léo Dubois", "age": 28, "pos": "Defans", "num": 2, "nationality": "france", "team": "galatasaray",
        "picture_path": "/images/players/galatasaray/leo-dubois.png"
    },
    {
        "name": "Lucas Torreira",
        "age": 27,
        "pos": "Ortasaha",
        "num": 5,
        "nationality": "uruguay",
        "team": "galatasaray",
        "picture_path": "/images/players/galatasaray/lucas-torreira.png"
    },
    {
        "name": "Fredrik Midtsjö",
        "age": 29,
        "pos": "Ortasaha",
        "num": 6,
        "nationality": "norway",
        "team": "galatasaray",
        "picture_path": "/images/players/galatasaray/fredrik-midtsjo.png"
    },
    {
        "name": "Sérgio Oliveira",
        "age": 30,
        "pos": "Ortasaha",
        "num": 27,
        "nationality": "portugal",
        "team": "galatasaray",
        "picture_path": "/images/players/galatasaray/sergio-oliveira.png"
    },
    {
        "name": "Berkan Kutlu",
        "age": 25,
        "pos": "Ortasaha",
        "num": 22,
        "nationality": "turkey",
        "team": "galatasaray",
        "picture_path": "/images/players/galatasaray/berkan-kutlu.png"
    },
    {
        "name": "Hamza Akman", "age": 18, "pos": "Ortasaha", "num": 81, "nationality": "turkey", "team": "galatasaray",
        "picture_path": "/images/players/galatasaray/hamza-yigit-akman.png"
    },
    {
        "name": "Nicolò Zaniolo",
        "age": 23,
        "pos": "Ortasaha",
        "num": 17,
        "nationality": "turkey",
        "team": "galatasaray",
        "picture_path": ""
    },
    {
        "name": "Juan Mata", "age": 34, "pos": "Ortasaha", "num": 64, "nationality": "spain", "team": "galatasaray",
        "picture_path": "/images/players/galatasaray/juan-mata.png"
    },
    {
        "name": "Kerem Aktürkoğlu",
        "age": 24,
        "pos": "Ortasaha",
        "num": 7,
        "nationality": "turkey",
        "team": "galatasaray",
        "picture_path": "/images/players/galatasaray/muhammed-kerem-akturkoglu.png"
    },
    {
        "name": "Barış Alper Yılmaz",
        "age": 22,
        "pos": "Ortasaha",
        "num": 53,
        "nationality": "turkey",
        "team": "galatasaray",
        "picture_path": "/images/players/galatasaray/baris-alper-yilmaz.png"
    },
    {
        "name": "Yunus Akgün",
        "age": 22,
        "pos": "Ortasaha",
        "num": 11,
        "nationality": "turkey",
        "team": "galatasaray",
        "picture_path": "/images/players/galatasaray/yunus-akgun.png"
    },
    {
        "name": "Yusuf Demir",
        "age": 19,
        "pos": "Ortasaha",
        "num": 30,
        "nationality": "austria",
        "team": "galatasaray",
        "picture_path": "/images/players/galatasaray/yusuf-demir.png"
    },
    {
        "name": "Milot Rashica",
        "age": 26,
        "pos": "Ortasaha",
        "num": 26,
        "nationality": "kosovo",
        "team": "galatasaray",
        "picture_path": "/images/players/galatasaray/milot-rashica.png"
    },
    {
        "name": "Dries Mertens",
        "age": 35,
        "pos": "Forvet",
        "num": 10,
        "nationality": "belgium",
        "team": "galatasaray",
        "picture_path": "/images/players/galatasaray/dries-mertens.png"
    },
    {
        "name": "Mauro Icardi", "age": 30, "pos": "Forvet", "num": 99, "nationality": "uruguay", "team": "galatasaray",
        "picture_path": "/images/players/galatasaray/mauro-icardi.png"
    },
    {
        "name": "Bafétimbi Gomis",
        "age": 37,
        "pos": "Forvet",
        "num": 18,
        "nationality": "france",
        "team": "galatasaray",
        "picture_path": "/images/players/galatasaray/bafetimbi-gomis.png"
    },

    //Gaziantep FK
    {
        "name": "Erten Ersu",
        "age": 28,
        "pos": "Kaleci",
        "num": 54,
        "nationality": "turkey",
        "team": "gaziantepfk",
        "picture_path": "/images/players/gaziantepfk/erten-ersu.png"
    },
    {
        "name": "Ertuğrul Ersoy",
        "age": 26,
        "pos": "Kaleci",
        "num": 15,
        "nationality": "turkey",
        "team": "gaziantepfk",
        "picture_path": "/images/players/gaziantepfk/ertugrul-ersoy.png"
    },
    {
        "name": "Matej Hanousek",
        "age": 29,
        "pos": "Defans",
        "num": 16,
        "nationality": "czech-republic",
        "team": "gaziantepfk",
        "picture_path": "/images/players/gaziantepfk/matej-hanousek.png"
    },
    {
        "name": "Attila Szalai",
        "age": 25,
        "pos": "Defans",
        "num": 41,
        "nationality": "hungary",
        "team": "gaziantepfk",
        "picture_path": "/images/players/gaziantepfk/attila-szalai.png"
    },
    {
        "name": "Stelios Kitsiou",
        "age": 29,
        "pos": "Defans",
        "num": 70,
        "nationality": "greece",
        "team": "gaziantepfk",
        "picture_path": "/images/players/gaziantepfk/stelios-kitsiou.png"
    },
    {
        "name": "Berkan Küpelikılınç",
        "age": 20,
        "pos": "Defans",
        "num": 2,
        "nationality": "turkey",
        "team": "gaziantepfk",
        "picture_path": "/images/players/gaziantepfk/berkan-kupelikilinc.png"
    },
    {
        "name": "Marko Jevtovic",
        "age": 29,
        "pos": "Ortasaha",
        "num": 8,
        "nationality": "serbia",
        "team": "gaziantepfk",
        "picture_path": "/images/players/gaziantepfk/marko-jevtovic.png"
    },
    {
        "name": "Bahadir Gölgeli",
        "age": 19,
        "pos": "Ortasaha",
        "num": 91,
        "nationality": "turkey",
        "team": "gaziantepfk",
        "picture_path": "/images/players/gaziantepfk/bahadir-golgeli.png"
    },
    {
        "name": "Alexander Merkel",
        "age": 31,
        "pos": "Ortasaha",
        "num": 52,
        "nationality": "kazakhistan",
        "team": "gaziantepfk",
        "picture_path": "/images/players/gaziantepfk/alexander-merkel.png"
    },
    {
        "name": "Onurhan Babuscu",
        "age": 19,
        "pos": "Ortasaha",
        "num": 30,
        "nationality": "austria",
        "team": "gaziantepfk",
        "picture_path": "/images/players/gaziantepfk/onurhan-babuscu.png"
    },
    {
        "name": "Angelo Sagal",
        "age": 29,
        "pos": "Ortasaha",
        "num": 28,
        "nationality": "chile",
        "team": "gaziantepfk",
        "picture_path": "/images/players/gaziantepfk/angelo-sagal.png"
    },
    {
        "name": "Abdulkerim Çakar",
        "age": 21,
        "pos": "Ortasaha",
        "num": 23,
        "nationality": "turkey",
        "team": "gaziantepfk",
        "picture_path": "/images/players/gaziantepfk/abdulkerim-cakar.png"
    },


    //Giresunspor
    {
        "name": "Onurcan Piri",
        "age": 28,
        "pos": "Kaleci",
        "num": 1,
        "nationality": "turkey",
        "team": "giresunspor",
        "picture_path": "/images/players/giresunspor/onurcan-piri.png"
    },
    {
        "name": "Ferhat Kaplan",
        "age": 34,
        "pos": "Kaleci",
        "num": 35,
        "nationality": "turkey",
        "team": "giresunspor",
        "picture_path": "/images/players/giresunspor/ferhat-kaplan.png"
    },
    {
        "name": "Doğaç Çifçi",
        "age": 20,
        "pos": "Kaleci",
        "num": 37,
        "nationality": "turkey",
        "team": "giresunspor",
        "picture_path": "/images/players/giresunspor/dogan-ciftci.png"
    },
    {
        "name": "Erkan Anapa",
        "age": 25,
        "pos": "Kaleci",
        "num": 74,
        "nationality": "turkey",
        "team": "giresunspor",
        "picture_path": "/images/players/giresunspor/erkan-anapa.png"
    },
    {
        "name": "Alexis Perez",
        "age": 28,
        "pos": "Defans",
        "num": 25,
        "nationality": "colombia",
        "team": "giresunspor",
        "picture_path": "/images/players/giresunspor/alexis-perez.png"
    },
    {
        "name": "Ramón Arias",
        "age": 30,
        "pos": "Defans",
        "num": 21,
        "nationality": "uruguay",
        "team": "giresunspor",
        "picture_path": "/images/players/giresunspor/ramon-arias.png"
    },
    {
        "name": "Faustin Senghor",
        "age": 29,
        "pos": "Defans",
        "num": 5,
        "nationality": "senegal",
        "team": "giresunspor",
        "picture_path": "/images/players/giresunspor/faustin-senghor.png"
    },
    {
        "name": "Kadir Seven",
        "age": 19,
        "pos": "Defans",
        "num": 50,
        "nationality": "turkey",
        "team": "giresunspor",
        "picture_path": "/images/players/giresunspor/kadir-seven.png"
    },
    {
        "name": "Arda Kılıç",
        "age": 18,
        "pos": "Defans",
        "num": 3,
        "nationality": "turkey",
        "team": "giresunspor",
        "picture_path": "/images/players/giresunspor/arda-kilic.png"
    },
    {
        "name": "Alper Uludağ",
        "age": 32,
        "pos": "Defans",
        "num": 6,
        "nationality": "turkey",
        "team": "giresunspor",
        "picture_path": "/images/players/giresunspor/alper-uludag.png"
    },
    {
        "name": "Faruk Can Genç",
        "age": 23,
        "pos": "Defans",
        "num": 99,
        "nationality": "turkey",
        "team": "giresunspor",
        "picture_path": "/images/players/giresunspor/faruk-can-genc.png"
    },
    {
        "name": "Hayrullah Bilazer",
        "age": 27,
        "pos": "Defans",
        "num": 77,
        "nationality": "turkey",
        "team": "giresunspor",
        "picture_path": "/images/players/giresunspor/hayrullah-bilazer.png"
    },
    {
        "name": "Talha Ülvan",
        "age": 21,
        "pos": "Defans",
        "num": 2,
        "nationality": "turkey",
        "team": "giresunspor",
        "picture_path": "/images/players/giresunspor/talha-ulvan.png"
    },
    {
        "name": "Jorman Campuzano",
        "age": 26,
        "pos": "Ortasaha",
        "num": 30,
        "nationality": "colombia",
        "team": "giresunspor",
        "picture_path": "/images/players/giresunspor/jorman-campuzano.png"
    },
    {
        "name": "Robert Mejía",
        "age": 22,
        "pos": "Ortasaha",
        "num": 14,
        "nationality": "colombia",
        "team": "giresunspor",
        "picture_path": "/images/players/giresunspor/robert-mejia.png"
    },
    {
        "name": "Vukan Savicevic",
        "age": 29,
        "pos": "Ortasaha",
        "num": 26,
        "nationality": "montenegro",
        "team": "giresunspor",
        "picture_path": "/images/players/giresunspor/vukan-savicevic.png"
    },
    {
        "name": "Murat Cem Akpinar",
        "age": 24,
        "pos": "Ortasaha",
        "num": 22,
        "nationality": "turkey",
        "team": "giresunspor",
        "picture_path": "/images/players/giresunspor/murat-cem-akpinar.png"
    },
    {
        "name": "Rahmetullah Berisbek",
        "age": 23,
        "pos": "Ortasaha",
        "num": 19,
        "nationality": "turkey",
        "team": "giresunspor",
        "picture_path": "/images/players/giresunspor/rahmetullah-berisbek.png"
    },
    {
        "name": "Dogan Can Davas",
        "age": 25,
        "pos": "Ortasaha",
        "num": 17,
        "nationality": "turkey",
        "team": "giresunspor",
        "picture_path": "/images/players/giresunspor/dogan-can-davas.png"
    },
    {
        "name": "Görkem Sağlam",
        "age": 24,
        "pos": "Ortasaha",
        "num": 23,
        "nationality": "turkey",
        "team": "giresunspor",
        "picture_path": "/images/players/giresunspor/gorkem-saglam.png"
    },
    {
        "name": "Borja Sainz",
        "age": 22,
        "pos": "Ortasaha",
        "num": 7,
        "nationality": "spain",
        "team": "giresunspor",
        "picture_path": "/images/players/giresunspor/borja-sainz.png"
    },
    {
        "name": "Sergio",
        "age": 27,
        "pos": "Ortasaha",
        "num": 10,
        "nationality": "brazil",
        "team": "giresunspor",
        "picture_path": "/images/players/giresunspor/sergio.png"
    },
    {
        "name": "Brandley Kuwas",
        "age": 30,
        "pos": "Ortasaha",
        "num": 11,
        "nationality": "curacao",
        "team": "giresunspor",
        "picture_path": "/images/players/giresunspor/brandley-kuwas.png"
    },
    {
        "name": "Riad Bajic",
        "age": 28,
        "pos": "Forvet",
        "num": 9,
        "nationality": "bosnia-herzegovina",
        "team": "giresunspor",
        "picture_path": "/images/players/giresunspor/riad-bajic.png"
    },
    {
        "name": "Mert Kurt",
        "age": 20,
        "pos": "Forvet",
        "num": 75,
        "nationality": "turkey",
        "team": "giresunspor",
        "picture_path": "/images/players/giresunspor/mert-kurt.png"
    },

    //Hatayspor
    {
        "name": "Erce Kardesler",
        "age": 28,
        "pos": "Kaleci",
        "num": 1,
        "nationality": "turkey",
        "team": "hatayspor",
        "picture_path": "/images/players/hatayspor/erce-kardeşler.png"
    },
    {
        "name": "Yavuz Bugra Boyar",
        "age": 24,
        "pos": "Kaleci",
        "num": 33,
        "nationality": "turkey",
        "team": "hatayspor",
        "picture_path": "/images/players/hatayspor/yavuz-bugra-boyar.png"
    },
    {
        "name": "Burak Öksüz",
        "age": 27,
        "pos": "Defans",
        "num": 53,
        "nationality": "turkey",
        "team": "hatayspor",
        "picture_path": "/images/players/hatayspor/burak-oksuz.png"
    },
    {
        "name": "Ognjen Vranjes",
        "age": 33,
        "pos": "Defans",
        "num": 5,
        "nationality": "bosnia-herzegovina",
        "team": "hatayspor",
        "picture_path": "/images/players/hatayspor/ognjen-vranjes.png"
    },
    {
        "name": "Burak Bekaroğlu",
        "age": 25,
        "pos": "Defans",
        "num": 86,
        "nationality": "turkey",
        "team": "hatayspor",
        "picture_path": "/images/players/hatayspor/burak-bekaroglu.png"
    },
    {
        "name": "Burak Yılmaz",
        "age": 27,
        "pos": "Defans",
        "num": 15,
        "nationality": "turkey",
        "team": "hatayspor",
        "picture_path": "/images/players/hatayspor/burak-yilmaz.png"
    },
    {
        "name": "Simon Falette",
        "age": 31,
        "pos": "Defans",
        "num": 3,
        "nationality": "guinea",
        "team": "hatayspor",
        "picture_path": "/images/players/hatayspor/simon-falette.png"
    },
    {
        "name": "Engin Can Aksoy",
        "age": 19,
        "pos": "Defans",
        "num": 57,
        "nationality": "turkey",
        "team": "hatayspor",
        "picture_path": "/images/players/hatayspor/engin-can-aksoy.png"
    },
    {
        "name": "Kamil Ahmet Çörekçi",
        "age": 31,
        "pos": "Defans",
        "num": 12,
        "nationality": "turkey",
        "team": "hatayspor",
        "picture_path": "/images/players/hatayspor/kamil-ahmet-corekci.png"
    },
    {
        "name": "Kerim Alıcı",
        "age": 25,
        "pos": "Defans",
        "num": 22,
        "nationality": "turkey",
        "team": "hatayspor",
        "picture_path": "/images/players/hatayspor/kerim-alici.png"
    },
    {
        "name": "Onur Ergün",
        "age": 30,
        "pos": "Ortasaha",
        "num": 4,
        "nationality": "turkey",
        "team": "hatayspor",
        "picture_path": "/images/players/hatayspor/onur-ergun.png"
    },
    {
        "name": "Rayane Aabid",
        "age": 31,
        "pos": "Ortasaha",
        "num": 10,
        "nationality": "morocco",
        "team": "hatayspor",
        "picture_path": "/images/players/hatayspor/rayane-aabid.png"
    },
    {
        "name": "Musa Çağıran",
        "age": 30,
        "pos": "Ortasaha",
        "num": 6,
        "nationality": "turkey",
        "team": "hatayspor",
        "picture_path": "/images/players/hatayspor/musa-cagiran.png"
    },
    {
        "name": "Ruben Ribeiro",
        "age": 35,
        "pos": "Ortasaha",
        "num": 7,
        "nationality": "portugal",
        "team": "hatayspor",
        "picture_path": "/images/players/hatayspor/ruben-riberio.png"
    },
    {
        "name": "Muhammed Mert",
        "age": 28,
        "pos": "Ortasaha",
        "num": 19,
        "nationality": "turkey",
        "team": "hatayspor",
        "picture_path": "/images/players/hatayspor/muhammed-mert.png"
    },
    {
        "name": "Jeremy Dudziak",
        "age": 27,
        "pos": "Ortasaha",
        "num": 71,
        "nationality": "tunisia",
        "team": "hatayspor",
        "picture_path": "/images/players/hatayspor/jeremy-dudziak.png"
    },
    {
        "name": "Dylan Saint-Louis",
        "age": 27,
        "pos": "Ortasaha",
        "num": 9,
        "nationality": "congo",
        "team": "hatayspor",
        "picture_path": "/images/players/hatayspor/dylan-saint-louis.png"
    },
    {
        "name": "Ayoub El Kaabi",
        "age": 29,
        "pos": "Ortasaha",
        "num": 25,
        "nationality": "morocco",
        "team": "hatayspor",
        "picture_path": "/images/players/hatayspor/ayoub-el-kaabi.png"
    },
    {
        "name": "Sadık Baş",
        "age": 28,
        "pos": "Ortasaha",
        "num": 77,
        "nationality": "turkey",
        "team": "hatayspor",
        "picture_path": "/images/players/hatayspor/sadik-bas.png"
    },
    {
        "name": "Ze Luís",
        "age": 32,
        "pos": "Forvet",
        "num": 29,
        "nationality": "cape-verde",
        "team": "hatayspor",
        "picture_path": "/images/players/hatayspor/ze-luis.png"
    },
    {
        "name": "Kevin Soni",
        "age": 24,
        "pos": "Forvet",
        "num": 93,
        "nationality": "cameroon",
        "team": "hatayspor",
        "picture_path": "/images/players/hatayspor/kevin-soni.png"
    },

    // İstanbul Başakşehir FK
    {
        "name": "Muhammed Şengezer",
        "age": 26,
        "pos": "Kaleci",
        "num": 16,
        "nationality": "turkey",
        "team": "istanbulbasaksehirfk",
        "picture_path": "/images/players/istanbulbasaksehirfk/muhammed-sengezer.jpg"
    },
    {
        "name": "Volkan Babacan",
        "age": 34,
        "pos": "Kaleci",
        "num": 1,
        "nationality": "turkey",
        "team": "istanbulbasaksehirfk",
        "picture_path": "/images/players/istanbulbasaksehirfk/volkan-babacan.jpg"
    },
    {
        "name": "Yağız Efe Erataman",
        "age": 17,
        "pos": "Kaleci",
        "num": 78,
        "nationality": "turkey",
        "team": "istanbulbasaksehirfk",
        "picture_path": "/images/players/istanbulbasaksehirfk/yagiz-efe-erataman.jpg"
    },
    {
        "name": "Ognjen Vranjes",
        "age": 33,
        "pos": "Defans",
        "num": 5,
        "nationality": "bosnia-herzegovina",
        "team": "istanbulbasaksehirfk",
        "picture_path": "/images/players/istanbulbasaksehirfk/ognjen-vranjes.png"
    },
    {
        "name": "Deniz Dilmen",
        "age": 17,
        "pos": "Kaleci",
        "num": 98,
        "nationality": "turkey",
        "team": "istanbulbasaksehirfk",
        "picture_path": "/images/players/istanbulbasaksehirfk/deniz-dilmen.jpg"
    },
    {
        "name": "Edgar Le",
        "age": 28,
        "pos": "Defans",
        "num": 51,
        "nationality": "portugal",
        "team": "istanbulbasaksehirfk",
        "picture_path": "/images/players/istanbulbasaksehirfk/edgar-le.jpg"
    },
    {
        "name": "Leonardo Duarte",
        "age": 26,
        "pos": "Defans",
        "num": 5,
        "nationality": "brazil",
        "team": "istanbulbasaksehirfk",
        "picture_path": "/images/players/istanbulbasaksehirfk/leonardo-duarte.jpg"
    },
    {
        "name": "Ahmed Touba",
        "age": 24,
        "pos": "Defans",
        "num": 59,
        "nationality": "algeria",
        "team": "istanbulbasaksehirfk",
        "picture_path": "/images/players/istanbulbasaksehirfk/ahmed-touba.jpg"
    },
    {
        "name": "Shaocong Wu",
        "age": 22,
        "pos": "Defans",
        "num": 4,
        "nationality": "china",
        "team": "istanbulbasaksehirfk",
        "picture_path": "/images/players/istanbulbasaksehirfk/shaocong-wu.jpg"
    },
    {
        "name": "Efe Arda Koyuncu",
        "age": 17,
        "pos": "Defans",
        "num": 41,
        "nationality": "turkey",
        "team": "istanbulbasaksehirfk",
        "picture_path": "/images/players/istanbulbasaksehirfk/efe-arda-koyuncu.jpg"
    },
    {
        "name": "Lucas Lima",
        "age": 31,
        "pos": "Defans",
        "num": 60,
        "nationality": "brazil",
        "team": "istanbulbasaksehirfk",
        "picture_path": "/images/players/istanbulbasaksehirfk/lucal-lima.jpg"
    },
    {
        "name": "Caner Erkin",
        "age": 34,
        "pos": "Defans",
        "num": 88,
        "nationality": "turkey",
        "team": "istanbulbasaksehirfk",
        "picture_path": "/images/players/istanbulbasaksehirfk/caner-erkin.jpg"
    },
    {
        "name": "Ömer Ali Şahiner",
        "age": 31,
        "pos": "Defans",
        "num": 42,
        "nationality": "turkey",
        "team": "istanbulbasaksehirfk",
        "picture_path": "/images/players/istanbulbasaksehirfk/omer-ali-sahiner.jpg"
    },
    {
        "name": "Ayberk Kaygısız",
        "age": 18,
        "pos": "Defans",
        "num": -1,
        "nationality": "turkey",
        "team": "istanbulbasaksehirfk",
        "picture_path": "/images/players/istanbulbasaksehirfk/ayberk-kaygisiz.jpg"
    },
    {
        "name": "Şener Özbayraklı",
        "age": 33,
        "pos": "Defans",
        "num": 2,
        "nationality": "turkey",
        "team": "istanbulbasaksehirfk",
        "picture_path": "/images/players/istanbulbasaksehirfk/sener-ozbayraklı.jpg"
    },
    {
        "name": "Eden Karzev",
        "age": 22,
        "pos": "Ortasaha",
        "num": 72,
        "nationality": "israel",
        "team": "istanbulbasaksehirfk",
        "picture_path": "/images/players/istanbulbasaksehirfk/eden-karzev.jpg"
    },
    {
        "name": "Lucas Biglia",
        "age": 37,
        "pos": "Ortasaha",
        "num": 20,
        "nationality": "argentina",
        "team": "istanbulbasaksehirfk",
        "picture_path": "/images/players/istanbulbasaksehirfk/lucas-biglia.jpg"
    },
    {
        "name": "Mahmut Tekdemir",
        "age": 35,
        "pos": "Ortasaha",
        "num": 21,
        "nationality": "turkey",
        "team": "istanbulbasaksehirfk",
        "picture_path": "/images/players/istanbulbasaksehirfk/mahmut-tekdemir.jpg"
    },
    {
        "name": "Berkay Özcan",
        "age": 25,
        "pos": "Ortasaha",
        "num": 19,
        "nationality": "turkey",
        "team": "istanbulbasaksehirfk",
        "picture_path": "/images/players/istanbulbasaksehirfk/berkay-ozcan.jpg"
    },
    {
        "name": "Deniz Türüç",
        "age": 30,
        "pos": "Ortasaha",
        "num": 23,
        "nationality": "turkey",
        "team": "istanbulbasaksehirfk",
        "picture_path": "/images/players/istanbulbasaksehirfk/deniz-turuc.jpg"
    },
    {
        "name": "Danijel Aleksic",
        "age": 31,
        "pos": "Ortasaha",
        "num": 8,
        "nationality": "serbia",
        "team": "istanbulbasaksehirfk",
        "picture_path": "/images/players/istanbulbasaksehirfk/danijel-aleksic.jpg"
    },
    {
        "name": "Mesut Özil",
        "age": 34,
        "pos": "Ortasaha",
        "num": 10,
        "nationality": "germany",
        "team": "istanbulbasaksehirfk",
        "picture_path": "/images/players/istanbulbasaksehirfk/mesut-ozil.jpg"
    },
    {
        "name": "Serdar Gürler",
        "age": 31,
        "pos": "Ortasaha",
        "num": 7,
        "nationality": "turkey",
        "team": "istanbulbasaksehirfk",
        "picture_path": "/images/players/istanbulbasaksehirfk/serdar-gurler.jpg"
    },
    {
        "name": "Adnan Januzaj",
        "age": 28,
        "pos": "Ortasaha",
        "num": 11,
        "nationality": "belgium",
        "team": "istanbulbasaksehirfk",
        "picture_path": "/images/players/istanbulbasaksehirfk/adnan-januzaj.jpg"
    },
    {
        "name": "Patryk Szysz",
        "age": 24,
        "pos": "Ortasaha",
        "num": 18,
        "nationality": "poland",
        "team": "istanbulbasaksehirfk",
        "picture_path": "/images/players/istanbulbasaksehirfk/patryk-szysz.jpg"
    },
    {
        "name": "João Figueiredo",
        "age": 26,
        "pos": "Forvet",
        "num": 25,
        "nationality": "brazil",
        "team": "istanbulbasaksehirfk",
        "picture_path": "/images/players/istanbulbasaksehirfk/joao-figueiredo.jpg"
    },
    {
        "name": "Stefano Okaka",
        "age": 33,
        "pos": "Forvet",
        "num": 77,
        "nationality": "italy",
        "team": "istanbulbasaksehirfk",
        "picture_path": "/images/players/istanbulbasaksehirfk/stefano-okaka.jpg"
    },
    {
        "name": "Philippe Keny",
        "age": 23,
        "pos": "Forvet",
        "num": 17,
        "nationality": "senegal",
        "team": "istanbulbasaksehirfk",
        "picture_path": "/images/players/istanbulbasaksehirfk/philippe-keny.jpg"
    },
    {
        "name": "Muhammet Arslantaş",
        "age": 22,
        "pos": "Forvet",
        "num": 34,
        "nationality": "turkey",
        "team": "istanbulbasaksehirfk",
        "picture_path": "/images/players/istanbulbasaksehirfk/muhammet-arslantas.jpg"
    },
    {
        "name": "Batuhan Çelik",
        "age": 18,
        "pos": "Forvet",
        "num": 15,
        "nationality": "turkey",
        "team": "istanbulbasaksehirfk",
        "picture_path": "/images/players/istanbulbasaksehirfk/batuhan-celik.jpg"
    },

    // Kasımpaşa
    {
        "name": "Günay Güvenç",
        "age": 31,
        "pos": "Kaleci",
        "num": -1,
        "nationality": "turkey",
        "team": "kasimpasa",
        "picture_path": "/images/players/kasimpasa/gunay-guvenc.png"
    },
    {
        "name": "Ertuğrul Taşkıran",
        "age": 33,
        "pos": "Kaleci",
        "num": 1,
        "nationality": "turkey",
        "team": "kasimpasa",
        "picture_path": "/images/players/kasimpasa/ertugrul-taskiran.png"
    },
    {
        "name": "Erdem Canpolat",
        "age": 21,
        "pos": "Kaleci",
        "num": 22,
        "nationality": "turkey",
        "team": "kasimpasa",
        "picture_path": "/images/players/kasimpasa/erdem-canpolat.png"
    },
    {
        "name": "Enes Sarı",
        "age": 22,
        "pos": "Defans",
        "num": 67,
        "nationality": "turkey",
        "team": "kasimpasa",
        "picture_path": ""
    },
    {
        "name": "Daniel Graovac",
        "age": 29,
        "pos": "Defans",
        "num": 6,
        "nationality": "bosnia-herzegovina",
        "team": "kasimpasa",
        "picture_path": "/images/players/kasimpasa/daniel-graovac.png"
    },
    {
        "name": "Papy Djilobodji",
        "age": 34,
        "pos": "Defans",
        "num": -1,
        "nationality": "senegal",
        "team": "kasimpasa",
        "picture_path": ""
    },
    {
        "name": "Leonardo Duarte",
        "age": 26,
        "pos": "Defans",
        "num": 5,
        "nationality": "brazil",
        "team": "kasimpasa",
        "picture_path": "/images/players/kasimpasa/leonardo-duarte.jpg"
    },
    {
        "name": "Tarkan Serbest",
        "age": 28,
        "pos": "Defans",
        "num": 15,
        "nationality": "turkey",
        "team": "kasimpasa",
        "picture_path": "/images/players/kasimpasa/tarkan-serbest.png"
    },
    {
        "name": "Sadik Çiftpınar",
        "age": 30,
        "pos": "Defans",
        "num": 18,
        "nationality": "turkey",
        "team": "kasimpasa",
        "picture_path": "/images/players/kasimpasa/sadik-ciftpinar.png"
    },
    {
        "name": "Gökhan Gül",
        "age": 24,
        "pos": "Defans",
        "num": 21,
        "nationality": "turkey",
        "team": "kasimpasa",
        "picture_path": "/images/players/kasimpasa/gokhan-gul.png"
    },
    {
        "name": "Ryan Donk",
        "age": 36,
        "pos": "Defans",
        "num": 4,
        "nationality": "surinam",
        "team": "kasimpasa",
        "picture_path": "/images/players/kasimpasa/ryan-donk.png"
    },
    {
        "name": "Caner Erkin",
        "age": 34,
        "pos": "Defans",
        "num": 88,
        "nationality": "turkey",
        "team": "kasimpasa",
        "picture_path": "/images/players/kasimpasa/caner-erkin.jpg"
    },
    {
        "name": "Yasin Özcan",
        "age": 16,
        "pos": "Defans",
        "num": 58,
        "nationality": "turkey",
        "team": "kasimpasa",
        "picture_path": "/images/players/kasimpasa/yasin-ozcan.png"
    },
    {
        "name": "Mortadha Ben Ouanes",
        "age": 28,
        "pos": "Defans",
        "num": 12,
        "nationality": "tunisia",
        "team": "kasimpasa",
        "picture_path": "/images/players/kasimpasa/mortadha-ben-ouanes.png"
    },
    {
        "name": "Florent Hadergjonaj",
        "age": 28,
        "pos": "Defans",
        "num": 94,
        "nationality": "kosovo",
        "team": "kasimpasa",
        "picture_path": "/images/players/kasimpasa/florent-hadergjonaj.png"
    },
    {
        "name": "Fabiano Silva",
        "age": 22,
        "pos": "Defans",
        "num": 2,
        "nationality": "brazil",
        "team": "kasimpasa",
        "picture_path": "/images/players/kasimpasa/fabiano-silva.png"
    },
    {
        "name": "Feyzi Yıldırım",
        "age": 27,
        "pos": "Defans",
        "num": 23,
        "nationality": "turkey",
        "team": "kasimpasa",
        "picture_path": "/images/players/kasimpasa/mehmet-feyzi-yildirim.png"
    },
    {
        "name": "Mickaël Malsa",
        "age": 27,
        "pos": "Ortasaha",
        "num": -1,
        "nationality": "france",
        "team": "kasimpasa",
        "picture_path": "/images/players/kasimpasa/mickael-malsa.png"
    },
    {
        "name": "Aytaç Kara",
        "age": 29,
        "pos": "Ortasaha",
        "num": 35,
        "nationality": "turkey",
        "team": "kasimpasa",
        "picture_path": "/images/players/kasimpasa/aytac-kara.png"
    },
    {
        "name": "Turgay Gemicibaşı",
        "age": 26,
        "pos": "Ortasaha",
        "num": 81,
        "nationality": "turkey",
        "team": "kasimpasa",
        "picture_path": "/images/players/kasimpasa/turgay-gemicibasi.png"
    },
    {
        "name": "Danijel Aleksic",
        "age": 31,
        "pos": "Ortasaha",
        "num": 8,
        "nationality": "serbia",
        "team": "kasimpasa",
        "picture_path": "/images/players/kasimpasa/danijel-aleksic.jpg"
    },
    {
        "name": "Mickael Tırpan",
        "age": 29,
        "pos": "Ortasaha",
        "num": 24,
        "nationality": "belgium",
        "team": "kasimpasa",
        "picture_path": "/images/players/kasimpasa/mickael-tirpan.png"
    },
    {
        "name": "Haris Hajradinovic",
        "age": 29,
        "pos": "Ortasaha",
        "num": 10,
        "nationality": "bosnia-herzegovina",
        "team": "kasimpasa",
        "picture_path": "/images/players/kasimpasa/haris-hajradinovic.png"
    },
    {
        "name": "Valentin Eysseric",
        "age": 30,
        "pos": "Ortasaha",
        "num": 13,
        "nationality": "france",
        "team": "kasimpasa",
        "picture_path": "/images/players/kasimpasa/valentin-eysseric.png"
    },
    {
        "name": "Yunus Mallı",
        "age": 31,
        "pos": "Ortasaha",
        "num": 11,
        "nationality": "turkey",
        "team": "kasimpasa",
        "picture_path": "/images/players/kasimpasa/yunus-malli.png"
    },
    {
        "name": "Mounir Chouiar",
        "age": 24,
        "pos": "Ortasaha",
        "num": 16,
        "nationality": "morocco",
        "team": "kasimpasa",
        "picture_path": "/images/players/kasimpasa/mounir-chouiar.png"
    },
    {
        "name": "Ahmet Engin",
        "age": 26,
        "pos": "Ortasaha",
        "num": 17,
        "nationality": "turkey",
        "team": "kasimpasa",
        "picture_path": "/images/players/kasimpasa/ahmet-engin.png"
    },
    {
        "name": "Berat Kalkan",
        "age": 19,
        "pos": "Ortasaha",
        "num": 41,
        "nationality": "turkey",
        "team": "kasimpasa",
        "picture_path": "/images/players/kasimpasa/berat-kalkan.png"
    },
    {
        "name": "Ali Gholizadeh",
        "age": 26,
        "pos": "Ortasaha",
        "num": 88,
        "nationality": "iran",
        "team": "kasimpasa",
        "picture_path": "/images/players/kasimpasa/ali-gholizadeh.png"
    },
    {
        "name": "Mamadou Fall",
        "age": 31,
        "pos": "Ortasaha",
        "num": 7,
        "nationality": "senegal",
        "team": "kasimpasa",
        "picture_path": "/images/players/kasimpasa/mamadou-fall.png"
    },
    {
        "name": "Mustafa Eskihellaç",
        "age": 24,
        "pos": "Ortasaha",
        "num": -1,
        "nationality": "turkey",
        "team": "kasimpasa",
        "picture_path": "/images/players/kasimpasa/mustafa-eskihellac.png"
    },
    {
        "name": "Tunay Torun",
        "age": 32,
        "pos": "Ortasaha",
        "num": 8,
        "nationality": "turkey",
        "team": "kasimpasa",
        "picture_path": "/images/players/kasimpasa/tunay-torun.png"
    },
    {
        "name": "Stéphane Bahoken",
        "age": 30,
        "pos": "Forvet",
        "num": 19,
        "nationality": "cameroon",
        "team": "kasimpasa",
        "picture_path": "/images/players/kasimpasa/stephane-bahoken.png"
    },
    {
        "name": "Fode Koita",
        "age": 32,
        "pos": "Forvet",
        "num": 9,
        "nationality": "iran",
        "team": "kasimpasa",
        "picture_path": "/images/players/kasimpasa/fode-koita.png"
    },
    {
        "name": "Ali Demirel",
        "age": 20,
        "pos": "Forvet",
        "num": 99,
        "nationality": "turkey",
        "team": "kasimpasa",
        "picture_path": "/images/players/kasimpasa/ali-demirel.png"
    },


    // Kayserispor
    {
        "name": "Bilal Bayazit",
        "age": 23,
        "pos": "Kaleci",
        "num": 25,
        "nationality": "turkey",
        "team": "kayserispor",
        "picture_path": "/images/players/kayserispor/bilal-bayazit.png"
    },
    {
        "name": "Cenk Gönen",
        "age": 35,
        "pos": "Kaleci",
        "num": 1,
        "nationality": "turkey",
        "team": "kayserispor",
        "picture_path": "/images/players/kayserispor/cenk-gonen.png"
    },
    {
        "name": "Abdulkadir Tasdan",
        "age": 19,
        "pos": "Kaleci",
        "num": 12,
        "nationality": "turkey",
        "team": "kayserispor",
        "picture_path": "/images/players/kayserispor/abdulkadir-tasdan.png"
    },
    {
        "name": "Samil Öztürk",
        "age": 17,
        "pos": "Kaleci",
        "num": 39,
        "nationality": "turkey",
        "team": "kayserispor",
        "picture_path": "/images/players/kayserispor/samil-ozturk.png"
    },
    {
        "name": "Majid Hosseini",
        "age": 26,
        "pos": "Defans",
        "num": 5,
        "nationality": "iran",
        "team": "kayserispor",
        "picture_path": "/images/players/kayserispor/majid-hosseini.png"
    },
    {
        "name": "Dimitrios Kolovetsios",
        "age": 31,
        "pos": "Defans",
        "num": 4,
        "nationality": "greece",
        "team": "kayserispor",
        "picture_path": "/images/players/kayserispor/dimitrios-kolovetsios.png"
    },
    {
        "name": "Arif Kocaman",
        "age": 19,
        "pos": "Defans",
        "num": 54,
        "nationality": "turkey",
        "team": "kayserispor",
        "picture_path": "/images/players/kayserispor/arif-kocaman.png"
    },
    {
        "name": "Lionel Carole",
        "age": 31,
        "pos": "Defans",
        "num": 21,
        "nationality": "france",
        "team": "kayserispor",
        "picture_path": "/images/players/kayserispor/lionel-carole.png"
    },
    {
        "name": "Muhammed Eren Arıkan",
        "age": 18,
        "pos": "Defans",
        "num": 40,
        "nationality": "turkey",
        "team": "kayserispor",
        "picture_path": "/images/players/kayserispor/muhammed-eren-arikan.png"
    },
    {
        "name": "Gustavo Campanharo",
        "age": 30,
        "pos": "Ortasaha",
        "num": 88,
        "nationality": "brazil",
        "team": "kayserispor",
        "picture_path": "/images/players/kayserispor/gustavo-campanharo.png"
    },
    {
        "name": "Joseph Attamah",
        "age": 28,
        "pos": "Ortasaha",
        "num": 3,
        "nationality": "ghana",
        "team": "kayserispor",
        "picture_path": "/images/players/kayserispor/joseph-attamah.png"
    },
    {
        "name": "Anthony Uzodimma",
        "age": 23,
        "pos": "Ortasaha",
        "num": 80,
        "nationality": "nigeria",
        "team": "kayserispor",
        "picture_path": "/images/players/kayserispor/anthony-uzodimma.png"
    },
    {
        "name": "Olivier Kemen",
        "age": 26,
        "pos": "Ortasaha",
        "num": 10,
        "nationality": "cameroon",
        "team": "kayserispor",
        "picture_path": "/images/players/kayserispor/olivier-kemen.png"
    },
    {
        "name": "Yaw Ackah",
        "age": 23,
        "pos": "Ortasaha",
        "num": 89,
        "nationality": "ghana",
        "team": "kayserispor",
        "picture_path": "/images/players/kayserispor/yaw-ackah.png"
    },
    {
        "name": "Ali Karimi",
        "age": 29,
        "pos": "Ortasaha",
        "num": 6,
        "nationality": "iran",
        "team": "kayserispor",
        "picture_path": "/images/players/kayserispor/ali-karimi.png"
    },
    {
        "name": "Bernard Mensah",
        "age": 28,
        "pos": "Ortasaha",
        "num": 43,
        "nationality": "ghana",
        "team": "kayserispor",
        "picture_path": "/images/players/kayserispor/bernard-mensah.png"
    },
    {
        "name": "Baran Gezek",
        "age": 17,
        "pos": "Ortasaha",
        "num": 26,
        "nationality": "turkey",
        "team": "kayserispor",
        "picture_path": "/images/players/kayserispor/baran-gezek.png"
    },
    {
        "name": "Mame Thiam",
        "age": 30,
        "pos": "Ortasaha",
        "num": 27,
        "nationality": "senegal",
        "team": "kayserispor",
        "picture_path": "/images/players/kayserispor/mame-thiam.png"
    },
    {
        "name": "Gökhan Sazdağı",
        "age": 28,
        "pos": "Ortasaha",
        "num": 11,
        "nationality": "turkey",
        "team": "kayserispor",
        "picture_path": "/images/players/kayserispor/gokhan-sazdagi.png"
    },
    {
        "name": "Nurettin Korkmaz",
        "age": 20,
        "pos": "Ortasaha",
        "num": 77,
        "nationality": "turkey",
        "team": "kayserispor",
        "picture_path": "/images/players/kayserispor/nurettin-korkmaz.png"
    },
    {
        "name": "Miguel Cardoso",
        "age": 28,
        "pos": "Ortasaha",
        "num": 7,
        "nationality": "portugal",
        "team": "kayserispor",
        "picture_path": "/images/players/kayserispor/miguel-cardoso.png"
    },
    {
        "name": "Carlos Mane",
        "age": 28,
        "pos": "Ortasaha",
        "num": 20,
        "nationality": "guinea-bissau",
        "team": "kayserispor",
        "picture_path": "/images/players/kayserispor/mickael-tirpan.png"
    },
    {
        "name": "Emrah Başsan",
        "age": 30,
        "pos": "Ortasaha",
        "num": 17,
        "nationality": "turkey",
        "team": "kayserispor",
        "picture_path": "/images/players/kayserispor/emrah-bassan.png"
    },
    {
        "name": "Ramazan Civelek",
        "age": 27,
        "pos": "Ortasaha",
        "num": 28,
        "nationality": "turkey",
        "team": "kayserispor",
        "picture_path": "/images/players/kayserispor/ramazan-civelek.png"
    },
    {
        "name": "Mario Gavranovic",
        "age": 33,
        "pos": "Forvet",
        "num": 19,
        "nationality": "switzerland",
        "team": "kayserispor",
        "picture_path": "/images/players/kayserispor/mario-gavranovic.png"
    },
    {
        "name": "İlhan Parlak",
        "age": 36,
        "pos": "Forvet",
        "num": 23,
        "nationality": "turkey",
        "team": "kayserispor",
        "picture_path": "/images/players/kayserispor/ilhan-parlak.png"
    },
    {
        "name": "Talha Sariarslan",
        "age": 19,
        "pos": "Forvet",
        "num": 30,
        "nationality": "turkey",
        "team": "kayserispor",
        "picture_path": "/images/players/kayserispor/talha-sariarslan.png"
    },

    // Konyaspor
    {
        "name": "İbrahim Sehic",
        "age": 34,
        "pos": "Kaleci",
        "num": 13,
        "nationality": "bosnia-herzegovina",
        "team": "konyaspor",
        "picture_path": "/images/players/konyaspor/ibrahim-sehic.png"
    },
    {
        "name": "Erhan Erentürk",
        "age": 27,
        "pos": "Kaleci",
        "num": 1,
        "nationality": "turkey",
        "team": "konyaspor",
        "picture_path": "/images/players/konyaspor/erhan-erenturk.png"
    },
    {
        "name": "Mehmet Erdoğan",
        "age": 18,
        "pos": "Kaleci",
        "num": 64,
        "nationality": "turkey",
        "team": "konyaspor",
        "picture_path": "/images/players/konyaspor/mehmet-erdogan.png"
    },
    {
        "name": "Adil Demirbağ",
        "age": 25,
        "pos": "Defans",
        "num": 4,
        "nationality": "turkey",
        "team": "konyaspor",
        "picture_path": "/images/players/konyaspor/adil-demirbag.png"
    },
    {
        "name": "Francisco Calvo",
        "age": 30,
        "pos": "Defans",
        "num": 15,
        "nationality": "costa-rica",
        "team": "konyaspor",
        "picture_path": "/images/players/konyaspor/francisco-calvo.png"
    },
    {
        "name": "Ugurcan Yazgılı",
        "age": 23,
        "pos": "Defans",
        "num": 5,
        "nationality": "turkey",
        "team": "konyaspor",
        "picture_path": "/images/players/konyaspor/ugurcan-yazgili.png"
    },
    {
        "name": "Metehan Mert",
        "age": 23,
        "pos": "Defans",
        "num": -1,
        "nationality": "turkey",
        "team": "konyaspor",
        "picture_path": "/images/players/konyaspor/metehan-mert.png"
    },
    {
        "name": "Kahraman Demirtaş",
        "age": 28,
        "pos": "Defans",
        "num": 20,
        "nationality": "turkey",
        "team": "konyaspor",
        "picture_path": "/images/players/konyaspor/kahraman-demirtas.png"
    },
    {
        "name": "Guilherme",
        "age": 32,
        "pos": "Defans",
        "num": 12,
        "nationality": "turkey",
        "team": "konyaspor",
        "picture_path": "/images/players/konyaspor/guilherme-sitya.png"
    },
    {
        "name": "Yasir Subaşı",
        "age": 27,
        "pos": "Defans",
        "num": 3,
        "nationality": "turkey",
        "team": "konyaspor",
        "picture_path": "/images/players/konyaspor/yasir-subasi.png"
    },
    {
        "name": "Ahmet Oğuz",
        "age": 30,
        "pos": "Defans",
        "num": 22,
        "nationality": "turkey",
        "team": "konyaspor",
        "picture_path": "/images/players/konyaspor/ahmet-oguz.png"
    },
    {
        "name": "Cebrail Karayel",
        "age": 28,
        "pos": "Defans",
        "num": 90,
        "nationality": "turkey",
        "team": "konyaspor",
        "picture_path": "/images/players/konyaspor/cebrail-karayel.png"
    },
    {
        "name": "Ogulcan Ülgün",
        "age": 24,
        "pos": "Ortasaha",
        "num": 35,
        "nationality": "turkey",
        "team": "konyaspor",
        "picture_path": "/images/players/konyaspor/ogulcan-ulgun.png"
    },
    {
        "name": "Bruno Paz",
        "age": 24,
        "pos": "Ortasaha",
        "num": 80,
        "nationality": "portugal",
        "team": "konyaspor",
        "picture_path": "/images/players/konyaspor/bruno-paz.png"
    },
    {
        "name": "Andreas Bouchalakis",
        "age": 29,
        "pos": "Ortasaha",
        "num": 32,
        "nationality": "greece",
        "team": "konyaspor",
        "picture_path": "/images/players/konyaspor/andreas-bounchalakis.png"
    },
    {
        "name": "Soner Dikmen",
        "age": 29,
        "pos": "Ortasaha",
        "num": 14,
        "nationality": "turkey",
        "team": "konyaspor",
        "picture_path": "/images/players/konyaspor/soner-dikmen.png"
    },
    {
        "name": "Domagoj Pavicic",
        "age": 28,
        "pos": "Ortasaha",
        "num": 10,
        "nationality": "croatia",
        "team": "konyaspor",
        "picture_path": "/images/players/konyaspor/domagoj-pavicic.png"
    },
    {
        "name": "Endri Cekici",
        "age": 26,
        "pos": "Ortasaha",
        "num": 23,
        "nationality": "albania",
        "team": "konyaspor",
        "picture_path": "/images/players/konyaspor/endri-cekici.png"
    },
    {
        "name": "Alejandro Pozuelo",
        "age": 31,
        "pos": "Ortasaha",
        "num": 24,
        "nationality": "turkey",
        "team": "konyaspor",
        "picture_path": "/images/players/konyaspor/alejandro-pouzelo.png"
    },
    {
        "name": "Mehmet Ali Büyüksayar",
        "age": 18,
        "pos": "Ortasaha",
        "num": 42,
        "nationality": "turkey",
        "team": "konyaspor",
        "picture_path": "/images/players/konyaspor/mehmet-ali-buyuksayar.png"
    },
    {
        "name": "Robert Muric",
        "age": 26,
        "pos": "Ortasaha",
        "num": 11,
        "nationality": "croatia",
        "team": "konyaspor",
        "picture_path": "/images/players/konyaspor/robert-muric.png"
    },
    {
        "name": "Konrad Michalak",
        "age": 25,
        "pos": "Ortasaha",
        "num": 77,
        "nationality": "poland",
        "team": "konyaspor",
        "picture_path": "/images/players/konyaspor/konrad-michalak.png"
    },
    {
        "name": "Marlos Moreno",
        "age": 26,
        "pos": "Ortasaha",
        "num": 70,
        "nationality": "colombia",
        "team": "konyaspor",
        "picture_path": "/images/players/konyaspor/marlos-moreno.png"
    },
    {
        "name": "Muhammet Demir",
        "age": 31,
        "pos": "Forvet",
        "num": 9,
        "nationality": "turkey",
        "team": "konyaspor",
        "picture_path": "/images/players/konyaspor/muhammet-demir.png"
    },
    {
        "name": "Mahir Emreli",
        "age": 25,
        "pos": "Forvet",
        "num": 19,
        "nationality": "azerbaijan",
        "team": "konyaspor",
        "picture_path": "/images/players/konyaspor/mahir-emreli.png"
    },
    {
        "name": "Mame Diouf",
        "age": 35,
        "pos": "Forvet",
        "num": 99,
        "nationality": "senegal",
        "team": "konyaspor",
        "picture_path": "/images/players/konyaspor/mame-diouf.png"
    },
    {
        "name": "Uche Ikpeazu",
        "age": 27,
        "pos": "Forvet",
        "num": 29,
        "nationality": "uganda",
        "team": "konyaspor",
        "picture_path": "/images/players/konyaspor/uche-ikpeazu.png"
    },

    //MKE Ankaragücü
    {
        "name": "Gökhan Akkan",
        "age": 28,
        "pos": "Kaleci",
        "num": 32,
        "nationality": "turkey",
        "team": "mke-ankaragucu",
        "picture_path": "/images/players/mke-ankaragucu/gokhan-akkan.png"
    },
    {
        "name": "Bahadir Güngördü",
        "age": 27,
        "pos": "Kaleci",
        "num": 99,
        "nationality": "turkey",
        "team": "mke-ankaragucu",
        "picture_path": "/images/players/mke-ankaragucu/bahadir-han-gungordu.png"
    },
    {
        "name": "Doğukan Kaya",
        "age": 23,
        "pos": "Kaleci",
        "num": 25,
        "nationality": "turkey",
        "team": "mke-ankaragucu",
        "picture_path": "/images/players/mke-ankaragucu/dogukan-kaya.png"
    },
    {
        "name": "Kaan Çinkaya",
        "age": 19,
        "pos": "Kaleci",
        "num": 98,
        "nationality": "turkey",
        "team": "mke-ankaragucu",
        "picture_path": "/images/players/mke-ankaragucu/kaan-cinkaya.png"
    },
    {
        "name": "Atakan Çankaya",
        "age": 24,
        "pos": "Defans",
        "num": 4,
        "nationality": "turkey",
        "team": "mke-ankaragucu",
        "picture_path": "/images/players/mke-ankaragucu/atakan-cankaya.png"
    },
    {
        "name": "Uros Radakovic",
        "age": 28,
        "pos": "Defans",
        "num": 26,
        "nationality": "serbia",
        "team": "mke-ankaragucu",
        "picture_path": "/images/players/mke-ankaragucu/uros-radakovic.png"
    },
    {
        "name": "Nihad Mujakic",
        "age": 24,
        "pos": "Defans",
        "num": 18,
        "nationality": "bosnia-herzegovina",
        "team": "mke-ankaragucu",
        "picture_path": "/images/players/mke-ankaragucu/nihad-mujakiic.png"
    },
    {
        "name": "Arda Kızıldağ",
        "age": 24,
        "pos": "Defans",
        "num": -1,
        "nationality": "turkey",
        "team": "mke-ankaragucu",
        "picture_path": ""
    },
    {
        "name": "Marlon Xavier",
        "age": 25,
        "pos": "Defans",
        "num": 3,
        "nationality": "brazil",
        "team": "mke-ankaragucu",
        "picture_path": "/images/players/mke-ankaragucu/marlon-xavier.png"
    },
    {
        "name": "Hasan Ali Kaldırım",
        "age": 33,
        "pos": "Defans",
        "num": -1,
        "nationality": "turkey",
        "team": "mke-ankaragucu",
        "picture_path": "/images/players/mke-ankaragucu/yasir-subasi.png"
    },
    {
        "name": "Mahmut Akan",
        "age": 28,
        "pos": "Defans",
        "num": 2,
        "nationality": "turkey",
        "team": "mke-ankaragucu",
        "picture_path": "/images/players/mke-ankaragucu/mahmut-akan.png"
    },
    {
        "name": "Enock Kwateng",
        "age": 25,
        "pos": "Defans",
        "num": -1,
        "nationality": "turkey",
        "team": "mke-ankaragucu",
        "picture_path": ""
    },
    {
        "name": "Kevin Malcuit",
        "age": 31,
        "pos": "Defans",
        "num": 24,
        "nationality": "turkey",
        "team": "mke-ankaragucu",
        "picture_path": "/images/players/mke-ankaragucu/kevin-malcuit.png"
    },
    {
        "name": "Fıratcan Üzüm",
        "age": 23,
        "pos": "Defans",
        "num": 88,
        "nationality": "turkey",
        "team": "mke-ankaragucu",
        "picture_path": "/images/players/mke-ankaragucu/firatcan-uzum.png"
    },
    {
        "name": "Lamine Diack",
        "age": 22,
        "pos": "Ortasaha",
        "num": 14,
        "nationality": "greece",
        "team": "mke-ankaragucu",
        "picture_path": "/images/players/mke-ankaragucu/lamine-djack.png"
    },
    {
        "name": "Andrej Djokanovic",
        "age": 21,
        "pos": "Ortasaha",
        "num": 16,
        "nationality": "bosnia-herzegovina",
        "team": "mke-ankaragucu",
        "picture_path": ""
    },
    {
        "name": "Taylan Antalyalı",
        "age": 28,
        "pos": "Ortasaha",
        "num": 48,
        "nationality": "turkey",
        "team": "mke-ankaragucu",
        "picture_path": "/images/players/mke-ankaragucu/talyan-antalyali.png"
    },
    {
        "name": "Pedrinho",
        "age": 30,
        "pos": "Ortasaha",
        "num": 8,
        "nationality": "portugal",
        "team": "mke-ankaragucu",
        "picture_path": "/images/players/mke-ankaragucu/pedrinho.png"
    },
    {
        "name": "Ender Aygören",
        "age": 22,
        "pos": "Ortasaha",
        "num": -1,
        "nationality": "turkey",
        "team": "mke-ankaragucu",
        "picture_path": ""
    },
    {
        "name": "Ghayas Zahid",
        "age": 28,
        "pos": "Ortasaha",
        "num": 19,
        "nationality": "norway",
        "team": "mke-ankaragucu",
        "picture_path": "/images/players/mke-ankaragucu/ghayas-zahid.png"
    },
    {
        "name": "Milson",
        "age": 23,
        "pos": "Ortasaha",
        "num": -1,
        "nationality": "angola",
        "team": "mke-ankaragucu",
        "picture_path": ""
    },
    {
        "name": "Giorgi Beridze",
        "age": 25,
        "pos": "Ortasaha",
        "num": 21,
        "nationality": "georgia",
        "team": "mke-ankaragucu",
        "picture_path": "/images/players/mke-ankaragucu/giorgi-beridze.png"
    },
    {
        "name": "Emre Kılınç",
        "age": 28,
        "pos": "Ortasaha",
        "num": 54,
        "nationality": "turkey",
        "team": "mke-ankaragucu",
        "picture_path": "/images/players/mke-ankaragucu/emre-kilinc.png"
    },
    {
        "name": "Anastasios Chatzigiovanis",
        "age": 25,
        "pos": "Ortasaha",
        "num": 7,
        "nationality": "turkey",
        "team": "mke-ankaragucu",
        "picture_path": "/images/players/mke-ankaragucu/anastasios-chatzigiovanis.png"
    },
    {
        "name": "Gboly Ariyibi",
        "age": 28,
        "pos": "Ortasaha",
        "num": 12,
        "nationality": "azerbaijan",
        "team": "mke-ankaragucu",
        "picture_path": "/images/players/mke-ankaragucu/gboly-ariyibi.png"
    },
    {
        "name": "Muhammed Yasir Karabay",
        "age": 24,
        "pos": "Ortasaha",
        "num": -1,
        "nationality": "senegal",
        "team": "mke-ankaragucu",
        "picture_path": ""
    },
    {
        "name": "Ali Sowe",
        "age": 28,
        "pos": "Forvet",
        "num": 22,
        "nationality": "gambia",
        "team": "mke-ankaragucu",
        "picture_path": "/images/players/mke-ankaragucu/ali-sowe.png"
    },
    {
        "name": "Bevic Moussiti-Oko",
        "age": 28,
        "pos": "Forvet",
        "num": 29,
        "nationality": "congo",
        "team": "mke-ankaragucu",
        "picture_path": ""
    },
    {
        "name": "Sitki Ferdi Imdat",
        "age": 21,
        "pos": "Forvet",
        "num": 80,
        "nationality": "turkey",
        "team": "mke-ankaragucu",
        "picture_path": ""
    },

    //Sivasspor
    {
        "name": "Ali Şaşal Vural",
        "age": 32,
        "pos": "Kaleci",
        "num": 35,
        "nationality": "turkey",
        "team": "sivasspor",
        "picture_path": "/images/players/sivasspor/ali-sasal-vural.png"
    },
    {
        "name": "Muammer Yıldırım",
        "age": 32,
        "pos": "Kaleci",
        "num": 25,
        "nationality": "turkey",
        "team": "sivasspor",
        "picture_path": "/images/players/sivasspor/muammer-yildirim.png"
    },
    {
        "name": "Baver Kuckar",
        "age": 20,
        "pos": "Kaleci",
        "num": 16,
        "nationality": "turkey",
        "team": "sivasspor",
        "picture_path": ""
    },
    {
        "name": "Emre Satılmış",
        "age": 26,
        "pos": "Kaleci",
        "num": 18,
        "nationality": "turkey",
        "team": "sivasspor",
        "picture_path": "/images/players/sivasspor/emre-satilmis.png"
    },
    {
        "name": "Dimitrios Goutas",
        "age": 28,
        "pos": "Defans",
        "num": 6,
        "nationality": "greece",
        "team": "sivasspor",
        "picture_path": "/images/players/sivasspor/dimitrios-goutas.png"
    },
    {
        "name": "Aaron Appindangoye",
        "age": 31,
        "pos": "Defans",
        "num": 4,
        "nationality": "gabon",
        "team": "sivasspor",
        "picture_path": "/images/players/sivasspor/aaron-appindangoye.png"
    },
    {
        "name": "Samba Camara",
        "age": 30,
        "pos": "Defans",
        "num": 14,
        "nationality": "mali",
        "team": "sivasspor",
        "picture_path": "/images/players/sivasspor/samba-camara.png"
    },
    {
        "name": "Caner Osmanpasa",
        "age": 35,
        "pos": "Defans",
        "num": 88,
        "nationality": "turkey",
        "team": "sivasspor",
        "picture_path": "/images/players/sivasspor/caner-osmanpasa.png"
    },
    {
        "name": "Mehmet Albayrak",
        "age": 19,
        "pos": "Defans",
        "num": 96,
        "nationality": "turkey",
        "team": "sivasspor",
        "picture_path": "/images/players/sivasspor/mehmet-albayrak.png"
    },
    {
        "name": "Ugur Çiftçi",
        "age": 30,
        "pos": "Defans",
        "num": 3,
        "nationality": "turkey",
        "team": "sivasspor",
        "picture_path": "/images/players/sivasspor/ugur-ciftci.png"
    },
    {
        "name": "Ziya Erdal",
        "age": 35,
        "pos": "Defans",
        "num": 58,
        "nationality": "turkey",
        "team": "sivasspor",
        "picture_path": "/images/players/sivasspor/ziya-erdal.png"
    },
    {
        "name": "Murat Paluli",
        "age": 28,
        "pos": "Defans",
        "num": 2,
        "nationality": "turkey",
        "team": "sivasspor",
        "picture_path": "/images/players/sivasspor/murat-paluli.png"
    },
    {
        "name": "Alaaddin Okumuş",
        "age": 27,
        "pos": "Defans",
        "num": 13,
        "nationality": "turkey",
        "team": "sivasspor",
        "picture_path": "/images/players/sivasspor/alaaddin-okumus.png"
    },
    {
        "name": "Kader Keita",
        "age": 22,
        "pos": "Ortasaha",
        "num": 28,
        "nationality": "ivoire",
        "team": "sivasspor",
        "picture_path": "/images/players/sivasspor/kader-keita.png"
    },
    {
        "name": "Robin Yalçın",
        "age": 29,
        "pos": "Ortasaha",
        "num": 8,
        "nationality": "turkey",
        "team": "sivasspor",
        "picture_path": "/images/players/sivasspor/robin-yalcin.png"
    },
    {
        "name": "Isaac Cofie",
        "age": 31,
        "pos": "Ortasaha",
        "num": 5,
        "nationality": "ghana",
        "team": "sivasspor",
        "picture_path": "/images/players/sivasspor/isaac-cofie.png"
    },
    {
        "name": "Fredrik Ulvestad",
        "age": 30,
        "pos": "Ortasaha",
        "num": 23,
        "nationality": "norway",
        "team": "sivasspor",
        "picture_path": "/images/players/sivasspor/fredrik-ulvestad.png"
    },
    {
        "name": "Charilaos Charisis",
        "age": 28,
        "pos": "Ortasaha",
        "num": 15,
        "nationality": "greece",
        "team": "sivasspor",
        "picture_path": "/images/players/sivasspor/charis-charisis.png"
    },
    {
        "name": "Hakan Arslan",
        "age": 34,
        "pos": "Ortasaha",
        "num": 37,
        "nationality": "turkey",
        "team": "sivasspor",
        "picture_path": "/images/players/sivasspor/hakan-arslan.png"
    },
    {
        "name": "Armin Djerlek",
        "age": 22,
        "pos": "Ortasaha",
        "num": 27,
        "nationality": "serbia",
        "team": "sivasspor",
        "picture_path": "/images/players/sivasspor/armin-derlek.png"
    },
    {
        "name": "Max Gradel",
        "age": 35,
        "pos": "Ortasaha",
        "num": 7,
        "nationality": "ivoire",
        "team": "sivasspor",
        "picture_path": "/images/players/sivasspor/max-gradel.png"
    },
    {
        "name": "Samu Saiz",
        "age": 32,
        "pos": "Ortasaha",
        "num": 24,
        "nationality": "spain",
        "team": "sivasspor",
        "picture_path": "/images/players/sivasspor/samu-saiz.png"
    },
    {
        "name": "Ahmed Musa",
        "age": 30,
        "pos": "Ortasaha",
        "num": 26,
        "nationality": "nigeria",
        "team": "sivasspor",
        "picture_path": "/images/players/sivasspor/ahmed-musa.png"
    },
    {
        "name": "Erdoğan Yeşilyurt",
        "age": 29,
        "pos": "Ortasaha",
        "num": 17,
        "nationality": "turkey",
        "team": "sivasspor",
        "picture_path": "/images/players/sivasspor/erdogan-yesilyurt.png"
    },
    {
        "name": "Clinton N'Jie",
        "age": 29,
        "pos": "Ortasaha",
        "num": 10,
        "nationality": "cameroon",
        "team": "sivasspor",
        "picture_path": "/images/players/sivasspor/clinton-njie.png"
    },
    {
        "name": "Karol Angielski",
        "age": 26,
        "pos": "Forvet",
        "num": 19,
        "nationality": "senegal",
        "team": "sivasspor",
        "picture_path": "/images/players/sivasspor/karol-angielski.png"
    },
    {
        "name": "Jordy Caicedo",
        "age": 25,
        "pos": "Forvet",
        "num": 30,
        "nationality": "ecuador",
        "team": "sivasspor",
        "picture_path": "/images/players/sivasspor/jordy-caicedo.png"
    },
    {
        "name": "Mustapha Yatabare",
        "age": 37,
        "pos": "Forvet",
        "num": 9,
        "nationality": "mali",
        "team": "sivasspor",
        "picture_path": "/images/players/sivasspor/mustapha-yatabare.png"
    },
    {
        "name": "Leke James",
        "age": 30,
        "pos": "Forvet",
        "num": 90,
        "nationality": "nigeria",
        "team": "sivasspor",
        "picture_path": "/images/players/sivasspor/leke-samson-james.png"
    },

    // Ümraniyespor
    {
        "name": "Berke Özer",
        "age": 22,
        "pos": "Kaleci",
        "num": 35,
        "nationality": "turkey",
        "team": "umraniyespor",
        "picture_path": "/images/players/umraniyespor/berke-ozer.png"
    },
    {
        "name": "Orkun Özdemir",
        "age": 27,
        "pos": "Kaleci",
        "num": 13,
        "nationality": "turkey",
        "team": "umraniyespor",
        "picture_path": "/images/players/umraniyespor/orkun-ozdemir.png"
    },
    {
        "name": "Serkan Kırıntılı",
        "age": 38,
        "pos": "Kaleci",
        "num": 1,
        "nationality": "turkey",
        "team": "umraniyespor",
        "picture_path": "/images/players/umraniyespor/serkan-kirintili.png"
    },
    {
        "name": "Anıl Demir",
        "age": 26,
        "pos": "Kaleci",
        "num": 34,
        "nationality": "turkey",
        "team": "umraniyespor",
        "picture_path": "/images/players/umraniyespor/anil-demir.png"
    },
    {
        "name": "Tomislav Glumac",
        "age": 31,
        "pos": "Defans",
        "num": 44,
        "nationality": "croatia",
        "team": "umraniyespor",
        "picture_path": "/images/players/umraniyespor/tomislav-glumac.png"
    },
    {
        "name": "Allyson",
        "age": 32,
        "pos": "Defans",
        "num": 33,
        "nationality": "brazil",
        "team": "umraniyespor",
        "picture_path": "/images/players/umraniyespor/allyson.png"
    },
    {
        "name": "Mustafa Eser",
        "age": 21,
        "pos": "Defans",
        "num": 4,
        "nationality": "turkey",
        "team": "umraniyespor",
        "picture_path": "/images/players/umraniyespor/mustafa-eser.png"
    },
    {
        "name": "Alexandru Epureanu",
        "age": 36,
        "pos": "Defans",
        "num": 24,
        "nationality": "moldova",
        "team": "umraniyespor",
        "picture_path": "/images/players/umraniyespor/alexandru-epureanu.png"
    },
    {
        "name": "Ermir Lenjani",
        "age": 33,
        "pos": "Defans",
        "num": 3,
        "nationality": "albania",
        "team": "umraniyespor",
        "picture_path": "/images/players/umraniyespor/ermir-lenjani.png"
    },
    {
        "name": "Onur Atasayar",
        "age": 28,
        "pos": "Defans",
        "num": 16,
        "nationality": "turkey",
        "team": "umraniyespor",
        "picture_path": "/images/players/umraniyespor/onur-atasayar.png"
    },
    {
        "name": "Strahil Popov",
        "age": 32,
        "pos": "Defans",
        "num": 90,
        "nationality": "bulgaria",
        "team": "umraniyespor",
        "picture_path": "/images/players/umraniyespor/strahil-popov.png"
    },
    {
        "name": "Mert Yılmaz",
        "age": 23,
        "pos": "Defans",
        "num": 2,
        "nationality": "turkey",
        "team": "umraniyespor",
        "picture_path": "/images/players/umraniyespor/mert-yilmaz.png"
    },
    {
        "name": "Kartal Kayra Yılmaz",
        "age": 22,
        "pos": "Ortasaha",
        "num": 41,
        "nationality": "turkey",
        "team": "umraniyespor",
        "picture_path": "/images/players/umraniyespor/kartal-kayra-yilmaz.png"
    },
    {
        "name": "Isaac Sackey",
        "age": 28,
        "pos": "Ortasaha",
        "num": 5,
        "nationality": "ghana",
        "team": "umraniyespor",
        "picture_path": "/images/players/umraniyespor/isaac-sackey.png"
    },
    {
        "name": "Oğuz Gürbulak",
        "age": 30,
        "pos": "Ortasaha",
        "num": 20,
        "nationality": "turkey",
        "team": "umraniyespor",
        "picture_path": "/images/players/umraniyespor/oguz-gurbulak.png"
    },
    {
        "name": "Serkan Göksu",
        "age": 29,
        "pos": "Ortasaha",
        "num": 8,
        "nationality": "turkey",
        "team": "umraniyespor",
        "picture_path": "/images/players/umraniyespor/serkan-goksu.png"
    },
    {
        "name": "Durel Avounou",
        "age": 25,
        "pos": "Ortasaha",
        "num": 14,
        "nationality": "kongo",
        "team": "umraniyespor",
        "picture_path": "/images/players/umraniyespor/durel-avounou.png"
    },
    {
        "name": "Fatih Şanlıtürk",
        "age": 20,
        "pos": "Ortasaha",
        "num": 23,
        "nationality": "turkey",
        "team": "umraniyespor",
        "picture_path": "/images/players/umraniyespor/fatih-sanliturk.png"
    },
    {
        "name": "Antonio Mrsic",
        "age": 35,
        "pos": "Ortasaha",
        "num": 39,
        "nationality": "croatia",
        "team": "umraniyespor",
        "picture_path": "/images/players/umraniyespor/antonio-mrsic.png"
    },
    {
        "name": "Yunus Mertoğlu",
        "age": 21,
        "pos": "Ortasaha",
        "num": 6,
        "nationality": "turkey",
        "team": "umraniyespor",
        "picture_path": "/images/players/umraniyespor/yunus-mertoglu.png"
    },
    {
        "name": "Valentin Gheorghe",
        "age": 26,
        "pos": "Ortasaha",
        "num": 7,
        "nationality": "romania",
        "team": "umraniyespor",
        "picture_path": "/images/players/umraniyespor/valentin-gheorghe.png"
    },
    {
        "name": "Jesse Sekidika",
        "age": 26,
        "pos": "Ortasaha",
        "num": 77,
        "nationality": "nigeria",
        "team": "umraniyespor",
        "picture_path": "/images/players/umraniyespor/jesse-sekidika.png"
    },
    {
        "name": "Geraldo",
        "age": 31,
        "pos": "Ortasaha",
        "num": 29,
        "nationality": "angola",
        "team": "umraniyespor",
        "picture_path": "/images/players/umraniyespor/geraldo.png"
    },
    {
        "name": "Onur Ayık",
        "age": 33,
        "pos": "Ortasaha",
        "num": 11,
        "nationality": "turkey",
        "team": "umraniyespor",
        "picture_path": "/images/players/umraniyespor/onur-ayik.png"
    },
    {
        "name": "Olarenwaju Kayode",
        "age": 29,
        "pos": "Forvet",
        "num": 9,
        "nationality": "nigeria",
        "team": "umraniyespor",
        "picture_path": "/images/players/umraniyespor/olarenwaju-kayode.png"
    },
    {
        "name": "Umut Nayir",
        "age": 29,
        "pos": "Forvet",
        "num": 18,
        "nationality": "turkey",
        "team": "umraniyespor",
        "picture_path": "/images/players/umraniyespor/umut-nayir.png"
    },
    {
        "name": "Adel Bettaieb",
        "age": 26,
        "pos": "Forvet",
        "num": 27,
        "nationality": "tunisia",
        "team": "umraniyespor",
        "picture_path": "/images/players/umraniyespor/adel-bettaieb.png"
    },

    // Trabzonspor
    {
        "name": "Uğurcan Çakır",
        "age": 26,
        "pos": "Kaleci",
        "num": 1,
        "nationality": "turkey",
        "team": "trabzonspor",
        "picture_path": "/images/players/trabzonspor/ugurcan-cakir.png"
    },
    {
        "name": "Muammet Taha Tepe",
        "age": 22,
        "pos": "Kaleci",
        "num": 54,
        "nationality": "turkey",
        "team": "trabzonspor",
        "picture_path": "/images/players/trabzonspor/muammet-taha-tepe.png"
    },
    {
        "name": "Kağan Moradaoğlu",
        "age": 20,
        "pos": "Kaleci",
        "num": 98,
        "nationality": "turkey",
        "team": "trabzonspor",
        "picture_path": "/images/players/trabzonspor/kagan-moradaoglu.png"
    },
    {
        "name": "Hakan Aydın",
        "age": 20,
        "pos": "Kaleci",
        "num": 96,
        "nationality": "turkey",
        "team": "trabzonspor",
        "picture_path": "/images/players/trabzonspor/hakan-aydin.png"
    },
    {
        "name": "Vitor Hugo",
        "age": 31,
        "pos": "Defans",
        "num": 13,
        "nationality": "brazil",
        "team": "trabzonspor",
        "picture_path": "/images/players/trabzonspor/vitor-hugo.png"
    },
    {
        "name": "Marc Bartra",
        "age": 32,
        "pos": "Defans",
        "num": 3,
        "nationality": "spain",
        "team": "trabzonspor",
        "picture_path": "/images/players/trabzonspor/marc-bartra.png"
    },
    {
        "name": "Stefano Denswil",
        "age": 29,
        "pos": "Defans",
        "num": 24,
        "nationality": "surinam",
        "team": "trabzonspor",
        "picture_path": "/images/players/trabzonspor/stefano-denswil.png"
    },
    {
        "name": "Taha Altıkardeş",
        "age": 19,
        "pos": "Defans",
        "num": 11,
        "nationality": "turkey",
        "team": "trabzonspor",
        "picture_path": "/images/players/trabzonspor/taha-altikardes.png"
    },
    {
        "name": "Hüseyin Türkmen",
        "age": 25,
        "pos": "Defans",
        "num": 4,
        "nationality": "turkey",
        "team": "trabzonspor",
        "picture_path": "/images/players/trabzonspor/huseyin-turkmen.png"
    },
    {
        "name": "Eren Elmalı",
        "age": 22,
        "pos": "Defans",
        "num": 18,
        "nationality": "turkey",
        "team": "trabzonspor",
        "picture_path": "/images/players/trabzonspor/eren-elmali.png"
    },
    {
        "name": "Arif Boşluk",
        "age": 19,
        "pos": "Defans",
        "num": 72,
        "nationality": "turkey",
        "team": "trabzonspor",
        "picture_path": ""
    },
    {
        "name": "Jens Stryger Larsen",
        "age": 32,
        "pos": "Defans",
        "num": 19,
        "nationality": "denmark",
        "team": "trabzonspor",
        "picture_path": "/images/players/trabzonspor/jens-stryger-larsen.png"
    },
    {
        "name": "Bruno Peres",
        "age": 32,
        "pos": "Defans",
        "num": 33,
        "nationality": "brazil",
        "team": "trabzonspor",
        "picture_path": "/images/players/trabzonspor/bruno-peres.png"
    },
    {
        "name": "Serkan Asan",
        "age": 23,
        "pos": "Defans",
        "num": 99,
        "nationality": "turkey",
        "team": "trabzonspor",
        "picture_path": "/images/players/trabzonspor/serkan-asan.png"
    },
    {
        "name": "Jean-Philippe Gbamin",
        "age": 27,
        "pos": "Ortasaha",
        "num": 25,
        "nationality": "ivoire",
        "team": "trabzonspor",
        "picture_path": "/images/players/trabzonspor/jean-philippe-gbamin.png"
    },
    {
        "name": "Manolis Siopis",
        "age": 28,
        "pos": "Ortasaha",
        "num": 6,
        "nationality": "greece",
        "team": "trabzonspor",
        "picture_path": "/images/players/trabzonspor/manolis-siopis.png"
    },
    {
        "name": "Doğucan Haspolat",
        "age": 23,
        "pos": "Ortasaha",
        "num": 34,
        "nationality": "turkey",
        "team": "trabzonspor",
        "picture_path": "/images/players/trabzonspor/dogucan-haspolat.png"
    },
    {
        "name": "Dorukhan Toköz",
        "age": 26,
        "pos": "Ortasaha",
        "num": 8,
        "nationality": "turkey",
        "team": "trabzonspor",
        "picture_path": "/images/players/trabzonspor/dorukhan-tokoz.png"
    },
    {
        "name": "Marek Hamsik",
        "age": 35,
        "pos": "Ortasaha",
        "num": 17,
        "nationality": "slovakia",
        "team": "trabzonspor",
        "picture_path": "/images/players/trabzonspor/marek-hamsik.png"
    },
    {
        "name": "Abdulkadir Parmak",
        "age": 28,
        "pos": "Ortasaha",
        "num": -1,
        "nationality": "turkey",
        "team": "trabzonspor",
        "picture_path": ""
    },
    {
        "name": "Yusuf Yazıcı",
        "age": 26,
        "pos": "Ortasaha",
        "num": 61,
        "nationality": "turkey",
        "team": "trabzonspor",
        "picture_path": "/images/players/trabzonspor/yusuf-yazici.png"
    },
    {
        "name": "Anastasios Bakasetas",
        "age": 29,
        "pos": "Ortasaha",
        "num": 11,
        "nationality": "greece",
        "team": "trabzonspor",
        "picture_path": "/images/players/trabzonspor/anastasios-bakasetas.png"
    },
    {
        "name": "Abdülkadir Ömür",
        "age": 23,
        "pos": "Ortasaha",
        "num": 10,
        "nationality": "turkey",
        "team": "trabzonspor",
        "picture_path": "/images/players/trabzonspor/albulkadir-omur.png"
    },
    {
        "name": "Enis Bardhi",
        "age": 27,
        "pos": "Ortasaha",
        "num": 29,
        "nationality": "north-macedonia",
        "team": "trabzonspor",
        "picture_path": "/images/players/trabzonspor/enis-bardhi.png"
    },
    {
        "name": "Mahmoud Trezeguet",
        "age": 28,
        "pos": "Ortasaha",
        "num": 27,
        "nationality": "egypt",
        "team": "trabzonspor",
        "picture_path": "/images/players/trabzonspor/trezeguet.png"
    },
    {
        "name": "Naci Ünüvar",
        "age": 19,
        "pos": "Ortasaha",
        "num": 23,
        "nationality": "netherlands",
        "team": "trabzonspor",
        "picture_path": "/images/players/trabzonspor/naci-unuvar.png"
    },
    {
        "name": "Edin Visca",
        "age": 33,
        "pos": "Ortasaha",
        "num": 7,
        "nationality": "bosnia-herzegovina",
        "team": "trabzonspor",
        "picture_path": "/images/players/trabzonspor/edin-visca.png"
    },
    {
        "name": "Lazar Markovic",
        "age": 28,
        "pos": "Ortasaha",
        "num": 50,
        "nationality": "netherlands",
        "team": "trabzonspor",
        "picture_path": ""
    },
    {
        "name": "Montasser Lahtimi",
        "age": 21,
        "pos": "Ortasaha",
        "num": 80,
        "nationality": "morocco",
        "team": "trabzonspor",
        "picture_path": "/images/players/trabzonspor/montassir-lahtimi.png"
    },
    {
        "name": "Maxi Gómez",
        "age": 26,
        "pos": "Forvet",
        "num": 30,
        "nationality": "uruguay",
        "team": "trabzonspor",
        "picture_path": "/images/players/trabzonspor/maxi-gomez.png"
    },
    {
        "name": "Umut Bozok",
        "age": 26,
        "pos": "Forvet",
        "num": 9,
        "nationality": "turkey",
        "team": "trabzonspor",
        "picture_path": "/images/players/trabzonspor/umut-bozok.png"
    },
]

let playerList = []
let scores = {}
let currentQuestion
let isQuestionGuessed = false;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/game', (req, res) => {
    res.sendFile(__dirname + '/game.html');
});

app.get("/players", (req, res) => {
    let playerUsernames = playerList.map(value => {
            return {"username": value["username"], "role": value["role"]}
        }
    )
    console.log(playerUsernames)
    res.json(playerUsernames)
})

app.get("/scores", (req, res) => {
    res.json(scores)
})


io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on("PLAYER_JOIN_REQUEST_RECEIVED", function (username) {
        let role = "host"
        if (playerList.length !== 0)
            role = "player"
        else {
            io.emit("GAME_CREATED", username)
        }
        playerList.push({"socket": socket, "username": username, "role": role})
        scores[username] = 0
        io.emit("PLAYER_JOINED", {"username": username, "role": role})
    })

    socket.on("START_GAME_REQUEST_RECEIVED", async function () {
        io.emit("GAME_STARTED")
        startGameLoop(function (answer) {
            io.emit("QUESTION_COULD_NOT_GUESSED", answer)
        })
    })

    socket.on("GUESS_RECEIVED", function (data) {
        console.log("GUESS_RECEIVED arrived with data: ", JSON.stringify(data))
        let guessByUser = data["username"]
        let guess = data["guess"]
        if (normalizeAnswer(currentQuestion["name"]).includes(normalizeGuess(guess))) {
            if (scores.hasOwnProperty(guessByUser)) {
                console.log(`player ${guessByUser} found on scores object. Current score: ${scores[guessByUser]}`)
                scores[guessByUser]++;
            } else {
                console.log("player is not found on scores object. assigning the user...")
                scores[guessByUser] = 1
            }
            isQuestionGuessed = true;
            io.emit("SCOREBOARD_UPDATED", scores)
            io.emit("QUESTION_GUESSED", {
                "guessedBy": guessByUser,
                "name": currentQuestion["name"],
                "picture_path": currentQuestion["picture_path"]
            })
            for (let timeout of currentQuestionTimeoutIDs) {
                clearTimeout(timeout)
            }
            currentQuestionTimeoutIDs = []
            setTimeout(function () {
                startGameLoop(function (answer, picturePath) {
                    io.emit("QUESTION_COULD_NOT_GUESSED", {"name": answer, "picture_path": picturePath})
                })
            }, 5000)
        } else {
            io.emit("WRONG_GUESS_RECEIVED", guessByUser)
            console.log("wrong answer")
        }
    })
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});

function normalizeAnswer(answer) {
    return normalizeGuess(answer).split(" ")
}

function normalizeGuess(guess) {
    guess = guess.toLowerCase()
    guess = guess.replace("ç", "c")
    guess = guess.replace("ı", "i")
    guess = guess.replace("ö", "o")
    guess = guess.replace("ş", "s")
    guess = guess.replace("ü", "u")
    return guess
}

function getRandomQuestion() {
    let randomIdx = Math.floor(Math.random() * data.length);
    return data[randomIdx]
}

function countDownFrom(from, callingFunction, onComplete) {
    let countdownFrom = from;
    let countdownID = setInterval(function () {
        callingFunction(countdownFrom)
        if (countdownFrom === 0) {
            clearInterval(countdownID)
            onComplete()
        }
        countdownFrom--;
    }, 1000)
}

function startGameLoop(onTimeout) {
    countDownFrom(10, function (countdown) {
        io.emit("GAME_WILL_START_IN", countdown)
    }, function () {
        isQuestionGuessed = false;
        currentQuestion = getRandomQuestion()
        io.emit("FIRST_HINT_RECEIVED", {attribute: "nationality", value: currentQuestion["nationality"]})
        let firstHintID = setTimeout(function () {
            io.emit("SECOND_HINT_RECEIVED", {attribute: "position", value: currentQuestion["pos"]})
            let secondHintID = setTimeout(function () {
                io.emit("THIRD_HINT_RECEIVED", {attribute: "team", value: currentQuestion["team"]})
                let thirdHintID = setTimeout(function () {
                    io.emit("FOURTH_HINT_RECEIVED", {attribute: "age", value: currentQuestion["age"]})
                    let fourthHintID = setTimeout(function () {
                        io.emit("FIFTH_HINT_RECEIVED", {attribute: "num", value: currentQuestion["num"]})
                        let fifthHintID = setTimeout(function () {
                            onTimeout(currentQuestion["name"], currentQuestion["picture_path"])
                            currentQuestionTimeoutIDs = []
                            io.emit("QUESTION_COULD_NOT_GUESSED", {"name": currentQuestion["name"], "picture_path": currentQuestion["picture_path"]})
                            setTimeout(function () {
                                startGameLoop(onTimeout)
                            }, 5000)
                        }, 10000)
                        currentQuestionTimeoutIDs.push(fifthHintID)
                    }, 10000);
                    currentQuestionTimeoutIDs.push(fourthHintID)
                }, 10000);
                currentQuestionTimeoutIDs.push(thirdHintID)
            }, 10000);
            currentQuestionTimeoutIDs.push(secondHintID)
        }, 10000);
        currentQuestionTimeoutIDs.push(firstHintID)
    })
}