const splitKeywords = (...sentences) => {
  const result = sentences.reduce((previous, sentence) => {
    const keywords = sentence.toLowerCase().match(/[^_\W]+/g);
    previous.push(...keywords);
    return previous;
  }, []);
  return result;
};

export { splitKeywords };
