$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }

    // Create walls - do not delete or modify this code
    createPlatform(-50, -50, canvas.width + 100, 50); // top wall
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200, "navy"); // bottom wall
    createPlatform(-50, -50, 50, canvas.height + 500); // left wall
    createPlatform(canvas.width, -50, 50, canvas.height + 100); // right wall

    //////////////////////////////////
    // ONLY CHANGE BELOW THIS POINT //
    //////////////////////////////////

    // TODO 1 - Enable the Grid
    toggleGrid();

    // TODO 2 - Create Platforms
    createPlatform(150, 650, 120, 20);
    createPlatform(170, 600, 120, 20);
    createPlatform(300, 500, 150, 20);
    createPlatform(450, 400, 100, 20);
    createPlatform(600, 300, 80, 20);
    createPlatform(700, 200, 60, 20);
    createPlatform(800, 100, 40, 20);

    // TODO 3 - Create Collectables
    createCollectable("diamond", 200, 450, 0.5, 0.7);
    createCollectable("grace", 350, 350, 0.5, 0.7);
    createCollectable("kennedi", 500, 250, 0.5, 0.7);
    createCollectable("max", 600, 150, 0.5, 0.7);
    createCollectable("steve", 700, 100, 0.5, 0.7);
    createCollectable("database", 800, 50, 0.5, 0.7);
    createCollectable("diamond", 200, 450, 0.5, 0.7);
    createCollectable("grace", 350, 350, 0.5, 0.7);
    createCollectable("kennedi", 500, 250, 0.5, 0.7);
    createCollectable("max", 600, 150, 0.5, 0.7);
    createCollectable("steve", 700, 100, 0.5, 0.7);
    createCollectable("database", 800, 50, 0.5, 0.7);
    createCollectable("diamond", 200, 450, 0.5, 0.7);
    createCollectable("grace", 350, 350, 0.5, 0.7);
    createCollectable("kennedi", 500, 250, 0.5, 0.7);
    createCollectable("max", 600, 150, 0.5, 0.7);
    createCollectable("steve", 700, 100, 0.5, 0.7);
    createCollectable("database", 800, 50, 0.5, 0.7);
    createCollectable("diamond", 200, 450, 0.5, 0.7);
    createCollectable("grace", 350, 350, 0.5, 0.7);
    createCollectable("kennedi", 500, 250, 0.5, 0.7);
    createCollectable("max", 600, 150, 0.5, 0.7);
    createCollectable("steve", 700, 100, 0.5, 0.7);
    createCollectable("database", 800, 50, 0.5, 0.7);

    // TODO 4 - Create Cannons
    createCannon("top", 900, 100);
    createCannon("bottom", 400, 300);
    createCannon("left", 50, 200);
    createCannon("right", 600, 400);
    createCannon("top", 500, 200);
    createCannon("top", 525, 210);
    createCannon("top", 550, 220);
    createCannon("top", 575, 230);
    createCannon("top", 600, 240);
    createCannon("top", 625, 250);
    createCannon("top", 650, 260);
    createCannon("top", 675, 270);
    createCannon("top", 700, 280);
    createCannon("top", 725, 290);
    createCannon("top", 750, 300);
    createCannon("top", 775, 310);
    //////////////////////////////////
    // ONLY CHANGE ABOVE THIS POINT //
    //////////////////////////////////
  }

  registerSetup(setup);
});
