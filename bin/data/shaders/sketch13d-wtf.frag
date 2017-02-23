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

    float x = mod(u_time, 10.) / 10.;
    x = mix(-.4, 4., x);
    float pct = max(distance(st, vec2(x, .5)), distance(st, vec2(.8, .5)));
    pct *= max(distance(st, vec2(.5, x)), distance(st, vec2(.1, .5)));
    pct *= min(pct, max(pct, distance(st, vec2(.3, .4))));

    color = mix(color, vec3(1., 0., 0.), pct);

    outputColor = vec4(color, 1.);
}
