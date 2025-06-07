function normalizeAngle(angle: number) {
    if (angle > 360) return angle - 360;
    if (angle < 0) return 360 + angle;
    else return angle;
  }
  
  function getAngleBetweenPoints(cx: number, cy: number, ex: number, ey: number) {
    var dy = ey - cy;
    var dx = ex - cx;
    var theta = Math.atan2(dy, dx);
    theta *= 180 / Math.PI;
    return theta;
  }
  
  export function getAngleBetweenVertices(vert1: Vertex, vert2: Vertex) {
    return {
      x: normalizeAngle(
        getAngleBetweenPoints(
          vert1.position.z,
          vert1.position.x,
          vert2.position.z,
          vert2.position.x
        )
      ),
      y: normalizeAngle(
        getAngleBetweenPoints(
          vert1.position.z,
          vert1.position.y,
          vert2.position.z,
          vert2.position.y
        )
      ),
      z: normalizeAngle(
        getAngleBetweenPoints(
          vert1.position.x,
          vert1.position.y,
          vert2.position.x,
          vert2.position.y
        )
      )
    };
  }
  
  export class Vertex {
    public position: {
      x: number;
      y: number;
      z: number;
    };
  
    constructor([x, y, z]: [number, number, number]) {
      this.position = {
        x,
        y,
        z
      };
    }
  }
  