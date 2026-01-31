export class Player {
  constructor(scene, x, y) {
    this.scene = scene;
    // Create a physics sprite instead of a simple rectangle
    // Using a blank texture or create one if needed, assuming we want a simple box for now
    // If 'player' texture exists, use it, otherwise use a colored rectangle texture
    if (scene.textures.exists('player')) {
        this.sprite = scene.physics.add.sprite(x, y, 'player');
    } else {
        // Fallback: create a placeholder texture
        if (!scene.textures.exists('player_placeholder')) {
            const graphics = scene.make.graphics().fillStyle(0x00ff00).fillRect(0, 0, 32, 32);
            graphics.generateTexture('player_placeholder', 32, 32);
            graphics.destroy();
        }
        this.sprite = scene.physics.add.sprite(x, y, 'player_placeholder');
    }
    
    // --- HITBOX TUNING ---
    // Make the collision box smaller than the sprite (e.g. 16x16 instead of 32x32)
    // This makes it less likely to get stuck on corners or accidentally trigger doors
    this.sprite.body.setSize(20, 20); 
    this.sprite.body.setOffset(6, 12); // Center it towards the bottom (feet)

    this.sprite.setCollideWorldBounds(true);
    this.sprite.setDepth(10);
  }

  // physics body doesn't need manual update but we can expose methods to set velocity
  setVelocity(x, y) {
    this.sprite.setVelocity(x, y);
  }

  moveTo(x, y) {
    this.sprite.setPosition(x, y);
  }

  getPosition() {
    return {
      x: this.sprite.x,
      y: this.sprite.y
    };
  }

  destroy() {
    if (this.sprite) {
      this.sprite.destroy();
    }
  }
}
