// Code Javascript

let quotes = document.getElementById("quotes");
let authors = document.getElementById("authors");
let btnNew = document.getElementById("btn-new");

// Quote
// 10 Quotes
let arrayOfQuotes = [
  {
    quote: `“ یحدث أحیاناً أن نلتقي بأشخاص نجھلھم تمام الجھل ومع ذلك نشعر باھتمام
            بھم وبدافع یقربنا منھم قبل أن نبادلھم كلمھ واحدة ”`,
    author: "فيودور دوستويفسكي",
  },

  {
    quote: `“ قد يتحول كل شي ضدك و يبقى الله معك ، فكن مع الله يكن كل شي معك .  ”`,
    author: "صلاح الدين الايوبي",
  },

  {
    quote: `“ لا يوجد ما يستحق الندم غير ما يضيع من العمر فى هذا الندم .”`,
    author: "صلاح الدين الايوبي",
  },

  {
    quote: `“ كل عسير اذا استعنت بالله فهو يسير . ”`,
    author: "صلاح الدين الايوبي",
  },

  {
    quote: `“ احياناً يغلق الله سبحانه و تعالى أمامنا باباً لكي يفتح لنا بابا آخر افضل منه 
    ، ولكن معظم الناس يضيع تركيزه و وقته 
    و طاقته في النظر الى الباب الذي أغلق ، 
     بدلا من باب الامل الذي انفتح أمامه على مصراعيه . ”`,
    author: "ابراهيم الفقي",
  },

  {
    quote: `“ امنح كل يوم الفرصة لأن يكون أجمل أيام حياتك . ”`,
    author: "مارك توين",
  },

  {
    quote: `“ إذا لم تغامر من أجل شيء تحبه، فاصمت إذا خسرته . ”`,
    author: "مارك توين",
  },

  {
    quote: `“ امنح كل يوم الفرصة لأن يكون أجمل أيام حياتك . ”`,
    author: "مارك توين",
  },

  {
    quote: `“ كثيرون يؤمنون بالحقيقة .. وقليلون ينطقون بها. ”`,
    author: "مارك توين",
  },

  {
    quote: `“ تكمن الشجاعة الحقيقية في ان تكون الشخص الوحيد الذي يعرف انه خائف . ”`,
    author: "أبو الطيب المتنبي",
  },

  {
    quote: `“ إن الجبان يموت آلاف المرات ، ولكن الشجاع لا يذوق الموت الا مرة واحدة . ”`,
    author: "وليام شكسبير",
  },

  {
    quote: `“ مقدار نجاحك هو مقدار تحكمك في نفسك .”`,
    author: "بنيامين دزرائيلي",
  },
];

// ======== ADD EVENT LISTENER FOR BUTTON ========

btnNew.addEventListener("click", () => {
  const randomQuote = Number.parseInt(Math.random() * arrayOfQuotes.length + 1);
  quotes.innerHTML = `${arrayOfQuotes[randomQuote].quote}`;
  authors.innerHTML = `-- ${arrayOfQuotes[randomQuote].author}`;
});
