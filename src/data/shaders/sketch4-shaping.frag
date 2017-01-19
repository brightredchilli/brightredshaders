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

// Plot a line on Y using a value between 0.0-1.0
float lineplot(float x, float y) {

    return cubicPulse(x, 0.6, y) + impulse(3.0, abs(x - y));
}

vec2 norm_point = gl_FragCoord.xy/u_bounds;

void main() {

    float x = norm_point.x;
    float y = norm_point.y;

    // Plot a line
    float opacity = lineplot((sin(u_time * 3 + x * 5) + 1.0) / 3.0, y);
    vec3 color = opacity * vec3(x,1.0,1-y);

    outputColor = vec4(color,1.0);
    
}
