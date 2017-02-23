#version 150

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_bounds;
uniform vec2 u_mouse;
uniform float u_time;

out vec4 outputColor;

vec2 xy = gl_FragCoord.xy;
vec2 st = gl_FragCoord.xy/u_bounds;


void main() {

    vec3 color = vec3(1., 1., 1.); // background

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
