function fighterCollision(fighterAttack, fighterTakeHit, timer) {
  if (
    rectangularCollision({
      rect1: fighterAttack,
      rect2: fighterTakeHit,
    }) &&
    fighterAttack.isAttacking &&
    fighterAttack.framesCurrent === fighterAttack.attackFrame
  ) {
    fighterTakeHit.takeHit(fighterAttack.damage);
    fighterAttack.isAttacking = false;

    if (fighterTakeHit.health > 0) {
      document.querySelector(
        `#fighter-health-${fighterTakeHit.spawnPosition}`
      ).style.width = fighterTakeHit.health + '%';
    } else {
      document.querySelector(
        `#fighter-health-${fighterTakeHit.spawnPosition}`
      ).style.width = 0;
      massage.displayMassage(fighterAttack, fighterTakeHit);
    }
  }

  if (
    fighterAttack.isAttacking &&
    fighterAttack.framesCurrent === fighterAttack.attackFrame
  ) {
    fighterAttack.isAttacking = false;
  }
}
