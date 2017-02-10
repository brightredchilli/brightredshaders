#version 150

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_bounds;
uniform vec2 u_mouse;
uniform float u_time;

out vec4 outputColor;

#define PI 3.14159265359

vec2 xy = gl_FragCoord.xy;
vec2 st = gl_FragCoord.xy/u_bounds;

float circle(in vec2 st, in vec2 origin, float radius) {
    vec2 direction = st - origin;
    direction.x *= u_bounds.x/u_bounds.y; // scale because y axis is larger than x, taking direction into account
    vec2 adjusted_st = origin + direction; // reconstruct new point based on this
    return step(radius, distance(adjusted_st, origin));
}

float softCircle(in vec2 st, in vec2 origin, float radius, float feather) {
    vec2 direction = st - origin;
    direction.x *= u_bounds.x/u_bounds.y; // scale because y axis is larger than x, taking direction into account
    vec2 adjusted_st = origin + direction; // reconstruct new point based on this

    float dist = distance(adjusted_st, origin);
    return smoothstep(radius - feather, radius + feather, dist);
}

void main() {

    vec3 color = vec3(.9, .93, .81); // background

    float wave = sin(u_time);

    color = mix(vec3(9., .1, .2), color, softCircle(st, vec2(.5, .5), .2, 0.03 + wave * 0.02));

    outputColor = vec4(color,1.0);
}
