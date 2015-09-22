import 'gsap';

export function fadeIn(element) {
  if (element) {
    TweenLite.fromTo(
      element, 0.5,
      {opacity: 0, ease: "Power1.easeOut"},
      {opacity: 1}
    );
  };
};
