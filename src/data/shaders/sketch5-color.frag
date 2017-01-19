#version 150

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_bounds;
uniform vec2 u_mouse;
uniform float u_time;

out vec4 outputColor;

#define PI 3.14159265359


float cubicPulse(float c, float w, float x ) {
    x = abs(x - c);
    if( x>w ) return 0.0f;
    x /= w;
    return 1.0f - x*x*(3.0f-2.0f*x);
}


float impulse(float k, float x) {
    float h = k * x;
    return h * exp(1.0f - h);
}

float plot (vec2 st, float pct){
    return  smoothstep( pct-0.01, pct, st.y) -
    smoothstep( pct, pct+0.01, st.y);
}


// Plot a line on Y using a value between 0.0-1.0
float lineplot(float x, float y) {

    return cubicPulse(x, 0.6, y) + impulse(3.0, abs(x - y));
}

vec2 norm_point = gl_FragCoord.xy/u_bounds;

vec3 colorA = vec3(0.149,0.141,0.912);
vec3 colorB = vec3(1.000,0.833,0.224);

void main() {
    vec3 color = vec3(0.0);

    float pct = abs(cubicPulse(0.5, 0.5, cos(u_time)));




    // Mix uses pct (a value from 0-1) to
    // mix the two colors
    color = mix(colorA, colorB, pct);

    vec3 debug = vec3(norm_point.x);
    color = mix(color, vec3(1.0, 0.0, 0.0), plot(norm_point, debug.r));

    outputColor = vec4(color,1.0);
}
