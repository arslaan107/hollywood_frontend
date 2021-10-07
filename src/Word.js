var programming_languages = [
  "inception",
  "thegodfather",
  "interstellar",
  "thereverend",
  "theprestige",
  "themartian",
  "thedarkknight",
  "pulpfiction",
  "12angrymen",
  "fightclub",
  "forrestgump",
  "thematrix",
  "parasite",
  "whiplash",
  "thedeparted",
  "gladiator",
  "thelionking",
  "avatar",
  "avengers",
];

function randomWord() {
  return programming_languages[
    Math.floor(Math.random() * programming_languages.length)
  ];
}

export { randomWord };
