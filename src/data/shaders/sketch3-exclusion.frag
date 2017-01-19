#version 150

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_bounds;
uniform vec2 u_mouse;
uniform float u_time;

out vec4 outputColor;

float topLeft(float x, float y) {
    return x < y ? 1.0 : 0.0;
}

float bottomRight(float x, float y) {
    return x >= y ? 1.0 : 0.0;
}

float topRight(float x, float y) {
    return abs(1 - x) < y ? 1.0 : 0.0;
}

float bottomLeft(float x, float y) {
    return abs(1 - x) >= y ? 1.0 : 0.0;
}

vec2 norm_point = gl_FragCoord.xy/u_bounds;

void main() {
    float x = norm_point.x;
    float y = norm_point.y;

    float top = topLeft(x,y) * topRight(x,y);
    float bottom = bottomLeft(x,y) * bottomRight(x,y);
    float left = topLeft(x,y) * bottomLeft(x,y);
    float right = topRight(x,y) * bottomRight(x,y);
    vec3 color = top * vec3(y, 0.8-y, 0.5) +
                 bottom * vec3(x, 1-x, 0.3) +
                 right * vec3(1-x, x, 0.7) +
                 left * vec3(0.4, 1-x, y);

    outputColor = vec4(color,1.0);
}
