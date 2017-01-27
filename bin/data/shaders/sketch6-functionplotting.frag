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

float sigmoid1(float x) {
    // have to figure out why we need to do the weird 1.0 - term in the beginning
    return  1.0 - (1.0 / (1.0 + exp((x * 16.0) - 8.0)));
}


float skyBlue = vec3(0.38, 0.47, 0.74);
float sunYellow = vec3(1.00, 0.94, 0.40);
float sunOrange = vec3(0.98, 0.65, 0.15);
float cloudWhite = vec3(0.98, 0.91, 0.69);


// Plot a line on Y using a value between 0.0-1.0
float lineplot(float x, float y) {

    return cubicPulse(x, 0.6, y) + impulse(3.0, abs(x - y));
}

vec2 norm_point = gl_FragCoord.xy/u_bounds;

vec3 colorA = vec3(0.149,0.141,0.912);
vec3 colorB = vec3(1.000,0.833,0.224);

void main() {
    vec3 color = vec3(0.0);

    float pct = impulse(2.0, cos(u_time) + 0.5);

    float s = sigmoid1(norm_point.x);
    color = (1 - s) * colorA + s * colorB;
    color = mix(color, vec3(1.0,0.0,0.0), plot(norm_point, s));
    outputColor = vec4(color,1.0);
}















