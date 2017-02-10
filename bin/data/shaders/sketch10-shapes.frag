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

    float left = step(0.1,st.x);   // Similar to ( X greater than 0.1 )
    float bottom = step(0.1,st.y); // Similar to ( Y greater than 0.1 )
    // The multiplication of left*bottom will be similar to the logical AND.
    // but, we can also combine step with a vec to save a step

    vec2 bottomleft = step(vec2(.1), st);
    vec2 topright = step(vec2(.9), st) * -1. + 1.; // step(x) - 1. + 1. inverts it.
    float pct = bottomleft.x * bottomleft.y * topright.x * topright.y;
    color = vec3( pct );

    color = mix(vec3(1., 0., 0.), vec3(1., 1., 1.), pct);

    outputColor = vec4(color,1.0);
}
