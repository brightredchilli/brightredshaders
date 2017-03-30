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

float box(in vec2 _st, in vec2 _size){
    _size = vec2(0.5) - _size * 0.5;
    vec2 uv = smoothstep(_size, _size + vec2(0.001), _st);
    uv *= smoothstep(_size, _size + vec2(0.001), vec2(1.0) - _st);
    return uv.x * uv.y;
}

void main() {

    // remap space from -1 to 1
    st = st * 2. - 1.;

    // this line normalizes the x, if it is larger than y.
    st.x *= u_bounds.x/u_bounds.y;

    vec3 color = vec3(0.0);

    color = box(st, vec2(0.5,0.5));

    outputColor = vec4(color, 1.0);
}
