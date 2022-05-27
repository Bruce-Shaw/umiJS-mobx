export const scrollAnimation = (
  targetY: number,
  currentY = document.documentElement.scrollTop || document.body.scrollTop,
  cb?: any
) => {
  const needScrollTop = targetY - currentY;
  let _currentY = currentY;
  let dist = 0;
  window.scrollTimeout = setTimeout(() => {
    dist = Math.ceil(needScrollTop / 5);
    _currentY += dist;
    window.scrollTo(0, _currentY);
    if (needScrollTop > 5 || needScrollTop < -5) {
      scrollAnimation(targetY, _currentY, cb);
    } else {
      window.scrollTo(_currentY, targetY);
      clearTimeout(window.scrollTimeout);
      if (typeof cb === "function") {
        cb();
      }
    }
  }, 10);
};
