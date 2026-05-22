(() => {
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
      stats.chartsCount = e.target.value.length;
      stats.chartsNoSpaceCount = e.target.value.split('').filter((value) => {
        return value != ' ';
      }).length;

      // using regexp, all signs in [] will be replaced as ' ' (meaning space), then it create array that store all words separately, then we count it.
      stats.wordCount = e.target.value.replaceAll(/[,/.?!+=""''_\-(){}:;><|[\]\\@#&]/g, ' ').split(' ').filter((value) => {
        return value;
      }).length;
      stats.sentenceCount = e.target.value.replaceAll(/[?!]/g, '.').replaceAll(/\s/g,'').split('.').filter((value) => {
        return value != '';
      }).length;
      stats.standardTextPageCount = Number.parseFloat(parseFloat(stats.chartsCount/1800).toFixed(2));
      stats.readTimeCount = parseFloat((Math.floor(stats.wordCount/2.5)));
      // stats.readTimeCount = `${Math.floor(readTimeRawCount / 60)}:${readTimeRawCount % 60}`;
      // readTimeCount = `${Math.floor(readTimeCount / 60)}:${readTimeCount % 60}`;
      console.log(stats)
    }

    function renderStats(stats) {
      counterLetters.innerHTML = stats.chartsCount;
      counterLettersNoSpace.innerHTML = stats.chartsNoSpaceCount;
      counterWords.innerHTML = stats.wordCount;
      counterSentences.innerHTML = stats.sentenceCount;
      counterStandardTextPageCount.innerHTML = stats.standardTextPageCount;
      counterReadTime.innerHTML = `${Math.floor(stats.readTimeCount / 60)}:${stats.readTimeCount % 60}`;
    }
  });
})();
