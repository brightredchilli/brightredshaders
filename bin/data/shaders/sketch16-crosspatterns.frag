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
#define TWO_PI (2 * PI)

vec2 st = gl_FragCoord.xy/u_bounds.xy;
float normalizer = u_bounds.x/u_bounds.y;


// origin is from bottom left
float rect(in vec2 st, in vec2 origin, in vec2 size) {
    float left = step(origin.x, st.x);
    float bottom = step(origin.y, st.y);
    float right = step(origin.x + size.x, st.x) * -1. + 1.;
    float top = step(origin.y + size.y, st.y) * -1. + 1.;
    return left * bottom * right * top;
}

mat2 rotate2d(float angle) {
    return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}

void main() {

    // this line normalizes the x, if it is larger than y.
    st.x *= normalizer;
    vec3 color = vec3(0.0);

    st *= vec2(3.,3.);

    vec2 original_st = st;

    st = fract(st); // Wrap arround 1.0

    st -= 0.5;

    vec2 uv = step(vec2(1., 1.), original_st) * (1 - step(vec2(3., 2.), original_st));
    float mult = uv.x * uv.y;

    st = mix(rotate2d(sin(u_time) * PI * 0.5) * st, rotate2d(sin(u_time + PI) * PI * 0.5) * st, mult);

    color = vec3(st.x + 0.5,st.y + 0.5,0.0);

    vec2 origin = vec2(-.05,-.2);
    vec2 size = vec2(.1, .4);
    color = mix(color, vec3(1.), rect(st, origin, size));
    color = mix(color, vec3(1.), rect(st, origin.yx, size.yx));

    outputColor = vec4(color, 1.0);
}
