const _ = require('lodash')
/** @todo
 *
 * @param inputData
 * @returns {*}
 */
module.exports = async ({items, photosCount}) => {
  let lastProcessedPhotoIndex;
  let slides = [];
  let minPhoto;
  for (let index in items) {
    minPhoto = minPhoto || index;
    if (items[index].tagsCount < items[minPhoto].tagsCount) minPhoto = index;
  }

  processSlide(items[minPhoto]);
  runFind(slides, items);

  return slides;

  function pushSlide(slide1, slide2) {
    if (slide2) {
      slides.push(`${slide1.index} ${slide2.index}`) //махнути местом
    } else {
      slides.push(`${slide1.index}`)
    }
  }


  function processSlide(slide) {
    if (slide.h) {
      pushSlide(slide);
      delete items[slide.index];
    } else {
      let slide2;
      delete items[slide.index];
      return;

      slide2 = findSimilar(slide, 'v');

      if (slide2) {
        delete items[slide2.index];
      } else if (!slide2) {
        for (let index in items) {
          if (items[index].v) {
            slide2 = items[index];
            delete items[index];
            break;
          }
        }
      }
      pushSlide(slide, slide2);
    }
  }


  function runFind(slides, items) {
    //lastProcessedPhotoIndex =
    let _keys = Object.keys(items);
    console.log("_keys : " + _keys.length);
    if (!_keys.length) {
      return;
    }
    let nextSlide = findSimilar(_.last(slides));
    if (!nextSlide) nextSlide = items[_keys[0]];
    if (nextSlide) {
      processSlide(nextSlide);
      return runFind(slides, items);
    }
    return;

  }
  function findSimilar(slide1, orientation) {
    for (let index in items) {
      if (isSimilar(items[index], slide1)) {
        if (!orientation || (orientation && items[index][orientation])) {
          return items[index];
        }
      }
    }
  }
};






function isSimilar(slide1, slide2) {
  let args, min;
  if (slide1.tagsCount >= slide2.tagsCount) {
    args = [slide1, slide2];
    min = slide2.tagsCount;
  } else {
    args = [slide2, slide1];
    min = slide1.tagsCount;
  }
  let dif = _.difference(...args);
  return dif.length <= min;
}