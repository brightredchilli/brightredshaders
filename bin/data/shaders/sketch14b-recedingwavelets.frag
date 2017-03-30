#version 150

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_bounds;
uniform vec2 u_mouse;
uniform float u_time;
uniform float u_variableA;

out vec4 outputColor;

#define PI 3.14159265359

float plot (vec2 st, float pct){
    return smoothstep( pct-0.02, pct, st.y) - smoothstep( pct, pct+0.02, st.y);
}

// c = center
// x = 0 -> 1
// w = 'std dev'
// this is a modification of cubicPulse so that the 'peak' is negative. note the 1.0f -
float cubicPulse(float c, float w, float x ) {
    x = abs(x - c);
    if( x>w ) return 0.0f;
    x /= w;
    return 1.0f - x*x*(3.0f-2.0f*x);
}


float wavelet(float a, float numPhases, float amplitudeScale, float sizeScale) {
    float phaseLength = 2 * PI / numPhases;
    float f = -cubicPulse(phaseLength/2., 0.5, mod(a, phaseLength)) * amplitudeScale + sizeScale;
    return f;
}

// change the angle slightly based on how far we are, this provides a pleasing 'warp' look
float angleShift(float r, float shiftAmt) {
    return r * shiftAmt;
}

vec2 st = gl_FragCoord.xy/u_bounds.xy;

void main() {

    // this line normalizes the x, if it is larger than y.
    st.x *= u_bounds.x/u_bounds.y;
    vec3 color = vec3(0.0);

    vec2 pos = st - vec2(.5 * u_bounds.x/u_bounds.y, .5);

    float r = length(pos);
    float a = atan(pos.y,pos.x);

    float f = wavelet(a + angleShift(r, .9), 8, .7, .7875);
    float f1 = wavelet(a + angleShift(r, -.5) + 2., 10, .9, 1.0);
    float f2 = wavelet(a + angleShift(r, .3) + 2., 15, .9, 1.0);
    float f3 = wavelet(a + angleShift(r, .01) + 2., 16, .8, .9);

    color = vec3(1. - step(f * r , 0.2));
    color = mix(color, vec3(1. - step(f1 * r , 0.12)) - .3, step(color.r, .5));
    color = mix(color, vec3(1. - step(f2 * r , 0.12)) - .5, step(color.r, .5));
    color = mix(color, vec3(1. - step(f3 * r , 0.08)) - .8, step(color.r, .5));

    outputColor = vec4(color, 1.0);
}

