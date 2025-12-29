 <script>
  document.querySelectorAll(".scratch-card").forEach(card => {
    const canvas = card.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    function init() {
      canvas.width = card.offsetWidth;
      canvas.height = card.offsetHeight;

      // IMPORTANT: reset mode
      ctx.globalCompositeOperation = "source-over";

      // draw visible scratch layer
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // enable scratching
      ctx.globalCompositeOperation = "destination-out";
    }

    init();
    window.addEventListener("resize", init);

    let scratching = false;

    canvas.addEventListener("pointerdown", () => scratching = true);
    canvas.addEventListener("pointerup", () => scratching = false);
    canvas.addEventListener("pointerleave", () => scratching = false);

    canvas.addEventListener("pointermove", e => {
      if (!scratching) return;

      const rect = canvas.getBoundingClientRect();
      ctx.beginPath();
      ctx.arc(
        e.clientX - rect.left,
        e.clientY - rect.top,
        18,
        0,
        Math.PI * 2
      );
      ctx.fill();

      const hint = card.querySelector(".scratch-hint");
      if (hint) hint.style.opacity = "0";
    });
  });
</script>
