export function managePerimeterCollision(state, obj){
  if(atLowerBound(state.screen, obj)){
    state.currentScore += 10;
    obj.gravity = false;
  } else if (atUpperBound(obj)) {
    state.currentScore += 10;
    obj.gravity = true;
  }
}

export function toggleGravity(obj) {
  obj.gravity = !obj.gravity;
}

export function resetVelocity(obj){
  obj.velocity = obj.initialVelocity;
}

export function atVerticalLimit(screen, obj) {
  return atUpperBound(obj) || atLowerBound(obj);
}

export function atUpperBound(obj) {
  return obj.y < 0;
}

export function atLowerBound(screen, obj) {
  return obj.y > screen.height - obj.height;
}

export function accelerate(state, obj) {
  obj.gravity ? accelerateDown(state, obj) : accelerateUp(state, obj);
}

export function accelerateDown(state, obj){
  obj.y += acceleratedVelocity(obj);
}

export function accelerateUp(state, obj){
  obj.y -= acceleratedVelocity(obj);
}

export function acceleratedVelocity(obj) {
  return obj.velocity *= obj.acceleration;
}

export function jetPack(key, obj){
  toggleGravity(obj);
  if(key === 38 && obj.gravity){
    obj.y -= (obj.velocity *= obj.jetAcceleration);
  } else if  (key === 40 && !obj.gravity) {
    obj.y += (obj.velocity *= obj.jetAcceleration);
  }
  setTimeout(function() {resetVelocity(obj);}, 200);
  setTimeout(function() {toggleGravity(obj);}, 200);
}
