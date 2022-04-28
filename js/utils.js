function rectangularCollision({ rect1, rect2 }) {
  return (
    rect1.attackBox.position.x + rect1.attackBox.width >= rect2.position.x &&
    rect1.attackBox.position.x <=
      rect2.hitBox.position.x + rect2.hitBox.width &&
    rect1.attackBox.position.y + rect1.attackBox.height >= rect2.position.y &&
    rect1.attackBox.position.y <= rect2.hitBox.position.y + rect2.hitBox.height
  );
}

function deepClone(obj) {
  const copy = {};

  for (const i in obj) {
    if (obj[i] instanceof Object) {
      copy[i] = deepClone(obj[i]);
      continue;
    }
    copy[i] = obj[i];
  }
  return copy;
}

function deepAssign(...objs) {
  const endObject = {};

  objs.map((obj) => {
    Object.assign(endObject, deepClone(obj));
  });

  return endObject;
}
