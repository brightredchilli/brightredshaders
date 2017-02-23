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

float softCircle(in vec2 st, in vec2 origin, float radius, float feather) {
    vec2 direction = st - origin;
    direction.x *= u_bounds.x/u_bounds.y; // scale because y axis is larger than x, taking direction into account
    vec2 adjusted_st = origin + direction; // reconstruct new point based on this

    float dist = distance(adjusted_st, origin);
    return smoothstep(radius + feather, radius - feather, dist);
}

void main() {

    vec3 color = vec3(1., 1., 1.); // background

    float radius = .07;
    float dist = .2;

    float x = mod(u_time, 10.) / 10.;
    x = mix(-.4, 4., x);
    x = .5;

    float utimesin = sin(u_time);
    float utimecos = cos(u_time);

    float point = distance(st, vec2(utimesin / 10. + .5, utimecos / 10. + .5));

    float bottomleft = distance(st, vec2(utimecos, utimesin));
    float bottomright = distance(st, vec2(1., 0.));
    float topleft = distance(st, vec2(0., 1. + utimesin / .5));
    float topright = distance(st, vec2(1. + utimecos / .5, 1.));

    float pct = pow(point, bottomleft);
    pct = pow(pct, bottomright);
    pct = pow(pct, topleft);
    pct = pow(pct, topright);

    color = mix(color, vec3(1., 0., 0.), pct);

    outputColor = vec4(color, 1.);
}
