;(() => {
  document.querySelectorAll('.js-text-analyzer').forEach(textAnalyzer => {
    const input = textAnalyzer.querySelector('.js-textarea');
    const counterLetters = textAnalyzer.querySelector('.js-counter-letters');
    const counterLettersNoSpace = textAnalyzer.querySelector('.js-counter-letters-no-space');
    const counterWords = textAnalyzer.querySelector('.js-counter-words');
    const counterSentences = textAnalyzer.querySelector('.js-counter-sentences');
    const counterStandardTextPageCount = textAnalyzer.querySelector('.js-counter-standerd-text-page');
    const counterReadTime = textAnalyzer.querySelector('.js-counter-read-time');
    const stats = {};

    input.addEventListener('input', (e) => {
      gatherStats(e);
      renderStats(stats);
    });

    textAnalyzer.querySelector('.js-btn-eraser').addEventListener('click' , () => {
      input.value = '';
      input.dispatchEvent(new Event('input'));
    });

    textAnalyzer.querySelector('.js-btn-cleaner').addEventListener('click', () => {
      input.value = input.value.replaceAll(/\s/g, ' ').trim();
      input.value = input.value.replaceAll(/ + /g, ' ').trim();
      input.dispatchEvent(new Event('input'));
    });

    function gatherStats(e) {
      stats.chars = e.target.value.length;
      stats.charsNoSpace = e.target.value.split('').filter((value) => value != ' ').length;
      stats.word = e.target.value.replaceAll(/\W/g, ' ').split(' ').filter((value) =>  value).length;
      stats.sentence = e.target.value.replaceAll(/[?!…]/g, '.').replaceAll(/\s/g,'').split('.').filter((value) => value != '').length;
      stats.standardTextPage = Number.parseFloat(parseFloat(stats.chars/1800).toFixed(2));
      stats.readTime = parseFloat((Math.floor(stats.word/2.5)));
    }

    function renderStats(stats) {
      counterLetters.innerHTML = stats.chars;
      counterLettersNoSpace.innerHTML = stats.charsNoSpace;
      counterWords.innerHTML = stats.word;
      counterSentences.innerHTML = stats.sentence;
      counterStandardTextPageCount.innerHTML = stats.standardTextPage;
      counterReadTime.innerHTML = `${Math.floor(stats.readTime / 60)}:${stats.readTime % 60}`;
    }
  });
})();
