const _ = require('lodash')
/** @todo
 *
 * @param inputData
 * @returns {*}
 */
module.exports = async ({items, photosCount}) => {
  let lastPhoto;
  let lastProcessedPhotoIndex;
  let i = 0;
  let slides = [];
  let minPhoto;
  for (let index in items) {
    minPhoto = minPhoto || index;
    if (items[index].tagsCount > items[minPhoto].tagsCount) minPhoto = index;
  }

  processSlide(items[minPhoto]);
  runFind(slides);

  return slides;

  function pushSlide(slide1, slide2) {
    if (slide2) {
      slides.push(`${slide1.index} ${slide2.index}`) //махнути местом
      lastPhoto = slide2;
    } else {
      slides.push(`${slide1.index}`);
      lastPhoto = slide1;
    }
  }


  function processSlide(slide) {

    if (slide.h) {
      pushSlide(slide);
      delete items[slide.index];
    } else {
      let slide2;
      delete items[slide.index];

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
      slide2 && pushSlide(slide, slide2);
    }
  }


  function runFind(slides) {
    i++;
    //lastProcessedPhotoIndex =
    let _keys = Object.keys(items);
    console.log("_keys : " + _keys.length);
    if (!_keys.length || i > 1000) {
      return;
    }

    let nextSlide = findSimilar(lastPhoto);
    if (!nextSlide) nextSlide = items[_keys[0]];
    if (nextSlide) {
      processSlide(nextSlide);
      return runFind(slides);
    }
    return;

  }

  function findSimilar(slide1, orientation) {
    for (let index in items) {
      if (getMin(items[index], slide1)) {
        if (!orientation || (orientation && items[index][orientation])) {
          return items[index];
        }
      }
    }
  }

  // function getLast() {
  //   let last = _.last(slides);
  //   return items[_.last(last.split(' '))];
  // }
};


function getMin(slide1, slide2) {
  let args, minPhoto, maxPhoto;
  if (slide1.tagsCount >= slide2.tagsCount) {
    minPhoto = slide2;
    maxPhoto = slide1;
  } else {
    minPhoto = slide1;
    maxPhoto = slide2;
  }

  let dif1 = _.difference(minPhoto.tags, maxPhoto.tags).length;
  let dif2 = _.difference(maxPhoto.tags, minPhoto.tags).length;
  let dif3 = maxPhoto.tagsCount - dif2;
  let min = Math.min(dif1, dif2, dif3);
  return min;
}