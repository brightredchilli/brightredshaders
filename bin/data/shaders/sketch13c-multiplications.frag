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

    st.x *= 10;
    st.x = fract(st.x);

    float radius = .07;
    float dist = .01;

    // multiplication gives a logical AND
    float pct = softCircle(st, vec2(.5 - dist, .5), radius, .01) * softCircle(st, vec2(.5 + dist, .5), radius, .01);

    color = mix(color, vec3(1., 0., 0.), pct);

    outputColor = vec4(color, 1.);
}
