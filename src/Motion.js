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
  if (obj.gravity) {
    accelerateDown(state, obj);
  } else {
    accelerateUp(state, obj);
  }
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

export function lateralJetPack(obj, state, key){
  if(key === 37 && obj.x > 0){
    obj.x -= obj.lateralVelocity;
  } else if(key === 39){
    obj.x += obj.lateralVelocity;
  }
}

export function mobileJetPack(obj) {
  if(obj.gravity){
    jetPackDown(obj);
  } else if(!obj.gravity) {
    jetPackUp(obj);
  }
}

export function jetPack(obj, key) {
  if(key === 38 && obj.gravity){
    jetPackDown(obj);
  } else if(key === 40 && !obj.gravity) {
    jetPackUp(obj);
  }
}

function jetPackDown(obj) {
  toggleGravity(obj);
  obj.y -= (obj.velocity *= obj.jetAcceleration);
  resetGravityAndVelocity(obj);
}

function jetPackUp(obj) {
  toggleGravity(obj);
  obj.y += (obj.velocity *= obj.jetAcceleration);
  resetGravityAndVelocity(obj);
}

function resetGravityAndVelocity(obj) {
  setTimeout(function() {resetVelocity(obj);}, 200);
  setTimeout(function() {toggleGravity(obj);}, 200);
}
