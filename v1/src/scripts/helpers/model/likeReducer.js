const reducer = (model, type, ACTION) => {
  if (ACTION === 'INCREASE') {
    if (type === 'Like') {
      model.likeCount += 1;
    } else {
      model.dislikeCount += 1;
    }
  }
  if (ACTION === 'DECREASE') {
    if (type === 'Like') {
      model.likeCount -= 1;
    } else {
      model.dislikeCount -= 1;
    }
  }
  if (ACTION === 'CHANGE') {
    if (type === 'Like') {
      model.likeCount += 1;
      model.dislikeCount -= 1;
    } else {
      model.dislikeCount += 1;
      model.likeCount -= 1;
    }
  }
  return model;
};

export default reducer;
