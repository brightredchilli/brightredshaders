#version 150

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_bounds;
uniform vec2 u_mouse;
uniform float u_time;

out vec4 outputColor;

#define PI 3.14159265359

float plot (vec2 st, float pct) {
    return  smoothstep( pct-0.01, pct, st.y) - smoothstep( pct, pct+0.01, st.y);
}

float sigmoid1(float x) {
    // have to figure out why we need to do the weird 1.0 - term in the beginning
    return  1.0 - (1.0 / (1.0 + exp((x * 16.0) - 8.0)));
}

vec2 norm_point = gl_FragCoord.xy/u_bounds;

void main() {
    float x = norm_point.x;
    float y = norm_point.y;
    vec3 color = vec3(0.0);

    float x1 = (x * 2.0) - 1.0;
    color = mix(color, skyBlue, plot(norm_point, 0.5 + mod(x1, x1 - x1 / 2.0))); // weird interference patterns
    color = mix(color, colorB, plot(norm_point, 0.5 + mod(x1, x1 - 0.8))); // weird interference patterns 2
    color = mix(color, skyBlue, plot(norm_point, fract(x*3.0) / ceil(x*3.0)));
    outputColor = vec4(color,1.0);
}
