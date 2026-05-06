const textAnalyzers = document.querySelectorAll('.js-text-analyzer');

textAnalyzers.forEach(textAnalyzer => {
  const input = textAnalyzer.querySelector('.js-textarea');
  const counterLetters = textAnalyzer.querySelector('.js-counter-letters');
  const counterLettersNoSpace = textAnalyzer.querySelector('.js-counter-letters-no-space');
  const counterWords = textAnalyzer.querySelector('.js-counter-words');
  const counterSentences = textAnalyzer.querySelector('.js-counter-sentences');
  const counterStandardTextPage = textAnalyzer.querySelector('.js-counter-standerd-text-page');
  const counterReadTime = textAnalyzer.querySelector('.js-counter-read-time');

  input.addEventListener("input", (e) => {
    
    //counter for letters with spacers
    let lettersLength = 0;
    lettersLength = e.target.value.length;
    counterLetters.innerHTML = lettersLength;

    //counter for letters without spacers
    let lettersLengthNoSpace = 0;
    const letterArray = e.target.value.split('');
    lettersLengthNoSpace = letterArray.filter((value) => {
      return value != ' ';
    });
    counterLettersNoSpace.innerHTML = lettersLengthNoSpace.length;

    //counter for words
    let wordLength = 0;
    const wordArray = e.target.value.replaceAll(/[,/.?!+=""''_\-(){}:;><|[\]\\]/g, ' ').split(' ');
    wordLength = wordArray.filter((value) => {
      return value;
    });
    counterWords.innerHTML = wordLength.length;

    // counter for sentences
    let sentenceLenght = 0;
    const sentenceArray = e.target.value.replaceAll(/[?!]/g, '.').replaceAll(/\s/g,'').split('.');
    sentenceLenght = sentenceArray.filter((value) => {
      return value != '';
    });
    counterSentences.innerHTML = sentenceLenght.length;

    // counter for standard text page
    counterStandardTextPage.innerHTML = Number.parseFloat(lettersLength/1800).toFixed(2);

    //counter for read time 
    counterReadTime.innerHTML = `${Number.parseFloat(wordLength.length/200).toFixed()} min`;
  });

  //btn for text eraser
  const btnEraser = textAnalyzer.querySelector('.js-btn-eraser');
  btnEraser.addEventListener('click' , () => {
    input.value = ""
    input.dispatchEvent(new Event('input'))
  });

  //btn for text cleaner
  const btnCleaner = textAnalyzer.querySelector('.js-btn-cleaner');
  btnCleaner.addEventListener('click', () => {
    input.value = input.value.replaceAll(/[\s]/g, ' ').trim();
    input.value = input.value.replaceAll(/ + /g, ' ').trim();
    input.dispatchEvent(new Event('input'))
  })
});
