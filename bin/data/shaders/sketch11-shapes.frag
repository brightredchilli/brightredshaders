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

void main() {
    vec3 color = vec3(0.0);

    vec2 bottomleft = smoothstep(vec2(.1), vec2(.15), st);
    vec2 topright = smoothstep(vec2(.9), vec2(.85), st);
    float pct = bottomleft.x * bottomleft.y * topright.x * topright.y;
    color = vec3( pct );

    color = mix(vec3(1., 0., 0.), vec3(1., 1., 1.), pct);

    outputColor = vec4(color,1.0);
}
