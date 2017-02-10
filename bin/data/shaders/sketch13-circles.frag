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

float circle(in vec2 st, in vec2 origin, float radius) {
    vec2 direction = st - origin;
    direction.x *= u_bounds.x/u_bounds.y; // scale because y axis is larger than x, taking direction into account
    vec2 adjusted_st = origin + direction; // reconstruct new point based on this
    return step(radius, distance(adjusted_st, origin));
}

void main() {

    vec3 color = vec3(.9, .93, .81); // background

    color = mix(vec3(9., .1, .2), color, circle(st, vec2(.5, .5), .2));

    outputColor = vec4(color,1.0);
}
