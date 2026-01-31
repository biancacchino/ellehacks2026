export class Player {
  constructor(scene, x, y) {
    this.scene = scene;
    this.direction = 'down'; // Track current direction
    
    // Get the sprite prefix (alex or robin) from registry
    this.spritePrefix = scene.game.registry.get('spritePrefix') || 'alex';
    
    // Create sprite from the loaded atlas
    this.sprite = scene.add.sprite(x, y, 'player', `${this.spritePrefix}_down_idle`);
    this.sprite.setDepth(10);
    this.sprite.setScale(2); // Scale up the small ~15x20 pixel sprites (2x sprite * 2x camera = 4x total)
    this.sprite.setOrigin(0.5, 0.5); // Center the sprite origin
    
    // Create animations for 4 directions using atlas frames
    this.createAnimations(scene);
  }

  createAnimations(scene) {
    const prefix = this.spritePrefix;
    const directions = ['down', 'up', 'left', 'right'];
    
    directions.forEach(dir => {
      // Remove existing animations first (in case of character switch)
      if (scene.anims.exists(`walk-${dir}`)) {
        scene.anims.remove(`walk-${dir}`);
      }
      if (scene.anims.exists(`idle-${dir}`)) {
        scene.anims.remove(`idle-${dir}`);
      }
      
      // Walk animation (walk1 -> idle -> walk2 -> idle for smooth 2-frame walk cycle)
      scene.anims.create({
        key: `walk-${dir}`,
        frames: [
          { key: 'player', frame: `${prefix}_${dir}_walk1` },
          { key: 'player', frame: `${prefix}_${dir}_idle` },
          { key: 'player', frame: `${prefix}_${dir}_walk2` },
          { key: 'player', frame: `${prefix}_${dir}_idle` }
        ],
        frameRate: 8,
        repeat: -1
      });
      
      // Idle animation (single frame)
      scene.anims.create({
        key: `idle-${dir}`,
        frames: [{ key: 'player', frame: `${prefix}_${dir}_idle` }],
        frameRate: 1
      });
    });
    
    // Start with idle-down
    this.sprite.play('idle-down');
  }

  playWalkAnimation(direction) {
    this.direction = direction;
    const animKey = `walk-${direction}`;
    if (this.sprite.anims.currentAnim?.key !== animKey) {
      this.sprite.play(animKey, true);
    }
  }

  playIdleAnimation() {
    const animKey = `idle-${this.direction}`;
    if (this.sprite.anims.currentAnim?.key !== animKey) {
      this.sprite.play(animKey, true);
    }
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
