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


float plot (vec2 st, float pct) {
    return smoothstep( pct-0.01, pct, st.y) - smoothstep( pct, pct+0.01, st.y);
}

// origin is from bottom left
float rect(in vec2 st, in vec2 origin, in vec2 size) {
    float left = step(origin.x, st.x);
    float bottom = step(origin.y, st.y);
    float right = step(origin.x + size.x, st.x) * -1. + 1.;
    float top = step(origin.y + size.y, st.y) * -1. + 1.;
    return left * bottom * right * top;
}

float outlinerect(in vec2 st, in vec2 origin, in vec2 size, float stroke) {
    float halfstroke = stroke * .5;
    return rect(st, origin - halfstroke, size + halfstroke) - rect(st, origin + halfstroke, size - stroke * 1.5);
}

void main() {

    vec3 color = vec3(0.0);

    vec2 linestart = vec2(.5);

    float pct = outlinerect(st, linestart, vec2(.3), .01);

    color = mix(vec3(0., 0., 0.), vec3(1., 1., 1.), pct);

    outputColor = vec4(color,1.0);
}
