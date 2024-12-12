gsap.registerPlugin(ScrollTrigger);

const line1Tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".containeranime",
    start: "top ",
    scrub: true,
    pin: true,
    toggleActions: "play none none none",
    // markers: true,
  },
});
line1Tl
  .from(".tx1", {
    x: "100vw",
    duration: 10,
    // stagger: 4,
  })
  .to(
    ".containeranime",
    {
      backgroundColor: "#ed9517",
      color: "white",
      duration: 10,
    },
    "<"
  )
  //   .from(
  //     ".tx2",
  //     {
  //       x: "100vw",
  //       duration: 1,
  //     },
  //     "<"
  //   )
  .to(".tx1", {
    x: "-100vw",
    duration: 10,
    opacity: 0,
    delay: 5,
  })

  //   .from(".logo", {
  //     y: "100vh",
  //     opacity: 0,
  //   })
  .to(
    ".logo",
    {
      y: "-90vh",
      opacity: "100%",
      duration: 10,
    },
    "-=9"
  )
  .to(
    ".containeranime",
    {
      backgroundColor: "white",
      duration: 5,
    },
    "+=3"
  )
  .from("header", {
    opacity: 0,
    duration: 10,
    // delay: 5,
  });
