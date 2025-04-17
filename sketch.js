let seaweeds = [];
let bubbles = [];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('pointer-events', 'none'); // 讓滑鼠事件穿透畫布
  canvas.position(0, 0); // 畫布覆蓋整個視窗
  clear(); // 設置畫布背景為透明

  // 初始化多條海草
  for (let i = 0; i < 200; i++) {
    seaweeds.push({
      x: random(width), // 隨機的 x 座標
      y: height, // 固定在畫布底部
      height: random(80, 300), // 調大海草的高度
      width: 40, // 固定寬度
      color: color(random(255), random(255), random(255)), // 隨機鮮豔顏色
      offset: random(TWO_PI) // 每條海草的搖擺起始偏移
    });
  }

  // 初始化氣泡
  for (let i = 0; i < 20; i++) {
    bubbles.push({
      x: random(width), // 隨機的 x 座標
      y: random(height, height + 100), // 初始位置在畫布底部以下
      size: random(10, 20), // 隨機大小
      speed: random(0.5, 2) // 隨機上升速度
    });
  }
}

function draw() {
  clear(); // 確保背景透明

  // 繪製海草
  for (let seaweed of seaweeds) {
    drawSeaweed(seaweed);
  }

  // 繪製氣泡
  drawBubbles();
}

function drawSeaweed(seaweed) {
  noFill();
  stroke(seaweed.color);
  strokeWeight(6); // 將海草的線條粗度調整為 6

  beginShape();
  for (let i = 0; i <= 10; i++) {
    let t = i / 10; // 分段比例
    let sway = t < 0.2 ? 0 : sin(frameCount * 0.03 + seaweed.offset + t * PI) * seaweed.width * (1 - t); // 更自然的搖擺
    let x = seaweed.x + sway;
    let y = seaweed.y - t * seaweed.height;
    vertex(x, y);
  }
  endShape();
}

function drawBubbles() {
  noStroke();
  for (let bubble of bubbles) {
    fill(255, 255, 255, 150); // 半透明白色
    ellipse(bubble.x, bubble.y, bubble.size);

    // 氣泡緩慢上升
    bubble.y -= bubble.speed;

    // 如果氣泡超出畫布頂部，重置到底部
    if (bubble.y < -bubble.size) {
      bubble.y = height + bubble.size;
      bubble.x = random(width);
      bubble.size = random(10, 20);
      bubble.speed = random(0.5, 2);
    }
  }
}
