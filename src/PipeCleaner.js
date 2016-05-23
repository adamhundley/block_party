export default class PipeCleaner {
  constructor(pipe) {
    if (pipe) {
      this.entryTop = this.pipeUpperBound(pipe);
      this.entryBottom = this.pipeLowerBound(pipe);
      this.entranceX = this.pipeEntranceX(pipe);
      this.exitX = this.pipeExitX(pipe);
      this.pipeColor = this.pipeColor(pipe);
    }
  }

  pipeUpperBound(pipe){
    return pipe.y;
  }

  pipeLowerBound(pipe){
    return pipe.y + pipe.height;
  }

  pipeEntranceX(pipe){
    return pipe.x;
  }

  pipeExitX(pipe){
    return pipe.x + pipe.width;
  }

  pipeColor(pipe){
    return pipe.color;
  }
}
