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

float box(in vec2 _st, in vec2 _size) {

    _size = vec2(0.5) - _size * 0.5;
    vec2 uv = smoothstep(_size, _size + vec2(0.001), _st);
    uv *= smoothstep(_size, _size + vec2(0.001), vec2(1.0) - _st);
    return uv.x * uv.y;
}

float cross(in vec2 _st, float _size) {
    return box(_st, vec2(_size, _size / 4.)) + box(_st, vec2(_size / 4., _size));
}

void main() {

    // this line normalizes the x, if it is larger than y.

    st.x *= normalizer;
    st.x -= 0.17;
    vec3 color = vec3(0.0);

    color += vec3(cross(st,0.2));

    // To move the cross we move the space
    vec2 t1 = vec2(0.,sin(u_time)) * 0.35;
    st += t1;
    color += vec3(cross(st,0.2));
    st -= t1;

    vec2 t2 = vec2(cos(u_time),0.0) * 0.35;
    st += t2;
    color += vec3(cross(st,0.2));

    outputColor = vec4(color, 1.0);
}
