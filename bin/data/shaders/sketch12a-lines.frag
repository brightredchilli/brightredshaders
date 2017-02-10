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

// axis line only works vertically and horizontally
float axisline(in vec2 start, in vec2 end float stroke) {



    float halfstroke = stroke * .5;
    return rect(st, origin - halfstroke, size + halfstroke) - rect(st, origin + halfstroke, size - stroke * 1.5);
}

void main() {

    vec3 color = vec3(0.0);

    vec2 linestart = vec2(.5);

    float pct = outlinerect(st, linestart, vec2(.3), .01);

    float rect1 = outlinerect(st, vec2(-.1), vec2(.7, 2.), .01);
    float rect2 = outlinerect(st, vec2(-.1), vec2(.9, 2.), .01);
    float rect3 = outlinerect(st, vec2(-.1), vec2(2., .7), .01);
    float rect4 = outlinerect(st, vec2(-.1), vec2(2., .4), .01);
    float rect5 = outlinerect(st, vec2(-.1), vec2(2., .15), .01);

    pct = rect1 + rect2 + rect3 + rect4 + rect5; // addition + works like a logical 'OR'

    color = mix(vec3(0., 0., 0.), vec3(1., 1., 1.), pct);

    outputColor = vec4(color,1.0);
}
