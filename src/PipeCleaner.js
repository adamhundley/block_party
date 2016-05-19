export default class PipeCleaner {
  constructor(pipe) {
    this.entryTop = this.pipeUpperBound(pipe);
    this.entryBottom = this.pipeLowerBound(pipe);
    this.entranceX = this.pipeEntranceX(pipe);
    this.exitX = this.pipeExitX(pipe);
    this.pipeColor = this.pipeColor(pipe);
  }

  pipeUpperBound(pipe){
    if (pipe) {
      return pipe.y;
    }
  }

  pipeLowerBound(pipe){
    if (pipe) {
      return pipe.y + pipe.height;
    }
  }

  pipeEntranceX(pipe){
    if (pipe) {
      return pipe.x
    }
  }

  pipeExitX(pipe){
    if (pipe) {
      return pipe.x + pipe.width
    }
  }

  pipeColor(pipe){
    if (pipe) {
      return pipe.color
    }
  }
}
